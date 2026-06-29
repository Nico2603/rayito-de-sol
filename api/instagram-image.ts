import { fetchInstagramImage } from '../src/lib/instagram-image'

export default {
  async fetch(request: Request): Promise<Response> {
    if (request.method !== 'GET') {
      return new Response('Método no permitido', {
        status: 405,
        headers: { Allow: 'GET' },
      })
    }

    const url = new URL(request.url).searchParams.get('url')

    if (!url) {
      return new Response('Parámetro url requerido', { status: 400 })
    }

    return fetchInstagramImage(url)
  },
}
