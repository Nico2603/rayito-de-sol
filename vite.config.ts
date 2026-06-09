import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import type { IncomingMessage, ServerResponse } from 'node:http'
import { fetchInstagramFeed } from './src/lib/instagram-api'
import { fetchInstagramImage } from './src/lib/instagram-image'
import { INSTAGRAM_USERNAME } from './src/constants/social'

async function sendNodeResponse(
  nodeRes: ServerResponse,
  webResponse: Response,
): Promise<void> {
  nodeRes.statusCode = webResponse.status

  webResponse.headers.forEach((value, key) => {
    nodeRes.setHeader(key, value)
  })

  const buffer = Buffer.from(await webResponse.arrayBuffer())
  nodeRes.end(buffer)
}

function instagramDevApi(): Plugin {
  return {
    name: 'instagram-dev-api',
    configureServer(server) {
      server.middlewares.use(async (req: IncomingMessage, res: ServerResponse, next) => {
        if (!req.url?.startsWith('/api/')) {
          next()
          return
        }

        const requestUrl = new URL(req.url, 'http://localhost')

        if (requestUrl.pathname === '/api/instagram-feed') {
          try {
            const { posts, source } = await fetchInstagramFeed(INSTAGRAM_USERNAME, 9)
            res.setHeader('Content-Type', 'application/json')
            res.setHeader('Cache-Control', 'public, max-age=300')
            res.statusCode = 200
            res.end(JSON.stringify({ posts, source }))
          } catch {
            res.statusCode = 502
            res.end(JSON.stringify({ error: 'No se pudo cargar el feed de Instagram' }))
          }
          return
        }

        if (requestUrl.pathname === '/api/instagram-image') {
          const imageUrl = requestUrl.searchParams.get('url')

          if (!imageUrl) {
            res.statusCode = 400
            res.end('Parámetro url requerido')
            return
          }

          await sendNodeResponse(res, await fetchInstagramImage(imageUrl))
          return
        }

        next()
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), instagramDevApi()],
})
