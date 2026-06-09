const IG_USER_AGENT =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'

export function isAllowedInstagramImageUrl(url: string): boolean {
  try {
    const { protocol, hostname } = new URL(url)
    return (
      protocol === 'https:' &&
      (hostname.endsWith('.cdninstagram.com') || hostname === 'cdninstagram.com')
    )
  } catch {
    return false
  }
}

export function proxiedInstagramImageUrl(url: string): string {
  return `/api/instagram-image?url=${encodeURIComponent(url)}`
}

export async function fetchInstagramImage(url: string): Promise<Response> {
  if (!isAllowedInstagramImageUrl(url)) {
    return new Response('URL no permitida', { status: 403 })
  }

  const upstream = await fetch(url, {
    headers: {
      Referer: 'https://www.instagram.com/',
      'User-Agent': IG_USER_AGENT,
    },
  })

  if (!upstream.ok) {
    return new Response('No se pudo obtener la imagen', { status: upstream.status })
  }

  const contentType = upstream.headers.get('content-type') ?? 'image/jpeg'
  const body = await upstream.arrayBuffer()

  return new Response(body, {
    headers: {
      'Content-Type': contentType,
      'Cache-Control': 'public, max-age=86400, s-maxage=86400, stale-while-revalidate=604800',
      'Cross-Origin-Resource-Policy': 'cross-origin',
    },
  })
}
