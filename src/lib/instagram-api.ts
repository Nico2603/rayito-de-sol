import type { InstagramPost, InstagramFeedResult } from '../types/instagram'
import { INSTAGRAM_FALLBACK_POSTS } from '../data/instagram-posts'

const IG_APP_ID = '936619743392459'
const IG_USER_AGENT =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36'

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
  const response = await fetch(`https://www.instagram.com/p/${shortcode}/media/?size=l`, {
    redirect: 'manual',
    headers: buildInstagramHeaders('rayitodesol.psico'),
  })

  const location = response.headers.get('location')
  return location && response.status >= 300 && response.status < 400 ? location : null
}

async function fetchLiveInstagramPosts(username: string, limit: number): Promise<InstagramPost[]> {
  const response = await fetch(
    `https://www.instagram.com/api/v1/users/web_profile_info/?username=${encodeURIComponent(username)}`,
    { headers: buildInstagramHeaders(username) },
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

async function fetchFallbackInstagramPosts(limit: number): Promise<InstagramPost[]> {
  const selected = INSTAGRAM_FALLBACK_POSTS.slice(0, limit)

  const posts = await Promise.all(
    selected.map(async (post) => {
      const thumbnailUrl = await resolveInstagramThumbnailUrl(post.shortcode)

      if (!thumbnailUrl) {
        throw new Error(`No se pudo resolver la miniatura de ${post.shortcode}`)
      }

      return {
        id: post.shortcode,
        shortcode: post.shortcode,
        permalink: `https://www.instagram.com/p/${post.shortcode}/`,
        thumbnailUrl,
        isVideo: post.isVideo,
        caption: post.caption,
      }
    }),
  )

  return posts
}

export async function fetchInstagramFeed(
  username: string,
  limit = 9,
): Promise<InstagramFeedResult> {
  try {
    const posts = await fetchLiveInstagramPosts(username, limit)
    if (posts.length > 0) {
      return { posts, source: 'live' }
    }
  } catch {
    // Instagram suele responder 401 cuando limita peticiones; usamos respaldo.
  }

  const posts = await fetchFallbackInstagramPosts(limit)
  return { posts, source: 'fallback' }
}

/** @deprecated Usa fetchInstagramFeed */
export async function fetchInstagramPosts(username: string, limit = 9): Promise<InstagramPost[]> {
  const { posts } = await fetchInstagramFeed(username, limit)
  return posts
}
