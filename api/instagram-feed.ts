import { fetchInstagramFeed } from '../src/lib/instagram-api'
import { INSTAGRAM_USERNAME } from '../src/constants/social'

export default async function handler(): Promise<Response> {
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
  } catch {
    return Response.json({ error: 'No se pudo cargar el feed de Instagram' }, { status: 502 })
  }
}
