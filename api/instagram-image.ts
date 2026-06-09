import { fetchInstagramImage } from '../src/lib/instagram-image'

export default async function handler(request: Request): Promise<Response> {
  const url = new URL(request.url).searchParams.get('url')

  if (!url) {
    return new Response('Parámetro url requerido', { status: 400 })
  }

  return fetchInstagramImage(url)
}
