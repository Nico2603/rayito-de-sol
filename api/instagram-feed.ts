import { fetchInstagramFeed } from '../src/lib/instagram-api'
import { INSTAGRAM_USERNAME } from '../src/constants/social'

export default {
  async fetch(request: Request): Promise<Response> {
    if (request.method !== 'GET') {
      return new Response('Método no permitido', {
        status: 405,
        headers: { Allow: 'GET' },
      })
    }

    try {
      const { posts, source } = await fetchInstagramFeed(INSTAGRAM_USERNAME, 9)

      return Response.json(
        { posts, source },
        {
          headers: {
            'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
          },
        },
      )
    } catch (error) {
      console.error('[api/instagram-feed] Error al construir el feed.', error)
      return Response.json(
        { error: 'No se pudo cargar el feed de Instagram' },
        { status: 502, headers: { 'Cache-Control': 'no-store' } },
      )
    }
  },
}
