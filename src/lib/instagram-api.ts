import type { InstagramPost, InstagramFeedResult } from '../types/instagram'
import { INSTAGRAM_FALLBACK_POSTS } from '../data/instagram-posts'

const IG_APP_ID = '936619743392459'
const IG_USER_AGENT =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36'
const IG_PROFILE_TIMEOUT_MS = 6500
const IG_THUMBNAIL_TIMEOUT_MS = 6500
const fallbackThumbnailCache = new Map<string, string>()

interface InstagramTimelineNode {
  id: string
  shortcode: string
  thumbnail_src: string
  is_video: boolean
  edge_media_to_caption?: {
    edges: Array<{ node: { text: string } }>
  }
}

function buildInstagramHeaders(username: string): Record<string, string> {
  return {
    'User-Agent': IG_USER_AGENT,
    'X-IG-App-ID': IG_APP_ID,
    'X-Requested-With': 'XMLHttpRequest',
    Referer: `https://www.instagram.com/${username}/`,
    'Accept-Language': 'es-CO,es;q=0.9,en;q=0.8',
  }
}

export async function resolveInstagramThumbnailUrl(shortcode: string): Promise<string | null> {
  const cached = fallbackThumbnailCache.get(shortcode)
  if (cached) {
    return cached
  }

  try {
    const response = await fetch(`https://www.instagram.com/p/${shortcode}/media/?size=l`, {
      redirect: 'manual',
      headers: buildInstagramHeaders('rayitodesol.psico'),
      signal: AbortSignal.timeout(IG_THUMBNAIL_TIMEOUT_MS),
    })

    const location = response.headers.get('location')
    if (location && response.status >= 300 && response.status < 400) {
      fallbackThumbnailCache.set(shortcode, location)
      return location
    }
    return null
  } catch {
    return null
  }
}

async function fetchLiveInstagramPosts(username: string, limit: number): Promise<InstagramPost[]> {
  const response = await fetch(
    `https://www.instagram.com/api/v1/users/web_profile_info/?username=${encodeURIComponent(username)}`,
    {
      headers: buildInstagramHeaders(username),
      signal: AbortSignal.timeout(IG_PROFILE_TIMEOUT_MS),
    },
  )

  if (!response.ok) {
    throw new Error(`Instagram API responded with ${response.status}`)
  }

  const payload = (await response.json()) as {
    data?: {
      user?: {
        edge_owner_to_timeline_media?: {
          edges?: Array<{ node: InstagramTimelineNode }>
        }
      }
    }
  }

  const edges = payload.data?.user?.edge_owner_to_timeline_media?.edges ?? []

  return edges.slice(0, limit).map(({ node }) => ({
    id: node.id,
    shortcode: node.shortcode,
    permalink: `https://www.instagram.com/p/${node.shortcode}/`,
    thumbnailUrl: node.thumbnail_src,
    isVideo: node.is_video,
    caption: node.edge_media_to_caption?.edges[0]?.node.text,
  }))
}

const FALLBACK_PLACEHOLDER_THUMBNAIL = '/favicon.svg'

function buildFallbackPost(
  post: (typeof INSTAGRAM_FALLBACK_POSTS)[number],
  thumbnailUrl: string,
): InstagramPost {
  return {
    id: post.shortcode,
    shortcode: post.shortcode,
    permalink: `https://www.instagram.com/p/${post.shortcode}/`,
    thumbnailUrl,
    isVideo: post.isVideo,
    caption: post.caption,
  }
}

async function fetchFallbackInstagramPosts(limit: number): Promise<InstagramPost[]> {
  const selected = INSTAGRAM_FALLBACK_POSTS.slice(0, limit)

  const results = await Promise.allSettled(
    selected.map(async (post) => {
      const thumbnailUrl = await resolveInstagramThumbnailUrl(post.shortcode)
      if (!thumbnailUrl) {
        console.warn(`[instagram-api] No se pudo resolver miniatura: ${post.shortcode}`)
        return null
      }
      return buildFallbackPost(post, thumbnailUrl)
    }),
  )

  const posts: InstagramPost[] = []
  results.forEach((result, index) => {
    if (result.status === 'rejected') {
      console.warn(`[instagram-api] Falló miniatura fallback: ${selected[index]?.shortcode}`)
      return
    }
    if (result.value) {
      posts.push(result.value)
    }
  })

  if (posts.length > 0) {
    return posts
  }

  console.warn('[instagram-api] Todas las miniaturas fallback fallaron. Se usa placeholder local.')
  return selected.map((post) => buildFallbackPost(post, FALLBACK_PLACEHOLDER_THUMBNAIL))
}

export async function fetchInstagramFeed(
  username: string,
  limit = 9,
): Promise<InstagramFeedResult> {
  const safeLimit = Math.max(1, Math.min(limit, INSTAGRAM_FALLBACK_POSTS.length))

  try {
    const posts = await fetchLiveInstagramPosts(username, safeLimit)
    if (posts.length > 0) {
      return { posts, source: 'live' }
    }
  } catch (error) {
    // Instagram suele responder 401 cuando limita peticiones; usamos respaldo.
    console.warn('[instagram-api] Feed live no disponible; usando fallback.', error)
  }

  try {
    const posts = await fetchFallbackInstagramPosts(safeLimit)
    return { posts, source: 'fallback' }
  } catch (error) {
    console.error('[instagram-api] Fallback falló:', error)
    const posts = INSTAGRAM_FALLBACK_POSTS.slice(0, safeLimit).map((post) =>
      buildFallbackPost(post, FALLBACK_PLACEHOLDER_THUMBNAIL),
    )
    return { posts, source: 'fallback' }
  }
}

/** @deprecated Usa fetchInstagramFeed */
export async function fetchInstagramPosts(username: string, limit = 9): Promise<InstagramPost[]> {
  const { posts } = await fetchInstagramFeed(username, limit)
  return posts
}
