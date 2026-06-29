import { spawn, type ChildProcess } from 'node:child_process'
import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import puppeteer from 'puppeteer'
import { PRERENDER_ROUTES } from '../src/constants/seo-routes.ts'

const DIST_DIR = resolve(process.cwd(), 'dist')
const PREVIEW_PORT = 4173
const PREVIEW_URL = `http://127.0.0.1:${PREVIEW_PORT}`

function waitForServer(url: string, timeoutMs = 60_000): Promise<void> {
  const start = Date.now()

  return new Promise((resolvePromise, reject) => {
    const check = async () => {
      try {
        const response = await fetch(url)
        if (response.ok) {
          resolvePromise()
          return
        }
      } catch {
        // Server not ready yet
      }

      if (Date.now() - start > timeoutMs) {
        reject(new Error(`Preview server did not start within ${timeoutMs}ms`))
        return
      }

      setTimeout(check, 500)
    }

    void check()
  })
}

function startPreview(): ChildProcess {
  const isWindows = process.platform === 'win32'
  const command = isWindows ? 'npx.cmd' : 'npx'
  const child = spawn(command, ['vite', 'preview', '--port', String(PREVIEW_PORT), '--strictPort'], {
    cwd: process.cwd(),
    stdio: 'pipe',
    shell: isWindows,
  })

  child.stderr?.on('data', (chunk: Buffer) => {
    const message = chunk.toString()
    if (message.includes('error') || message.includes('Error')) {
      console.error(message)
    }
  })

  return child
}

function outputPathForRoute(routePath: string): string {
  if (routePath === '/') return resolve(DIST_DIR, 'index.html')
  const normalized = routePath.replace(/^\//, '').replace(/\/$/, '')
  return resolve(DIST_DIR, normalized, 'index.html')
}

async function prerenderRoute(browser: puppeteer.Browser, routePath: string): Promise<void> {
  const page = await browser.newPage()
  const url = `${PREVIEW_URL}${routePath === '/' ? '/' : routePath}`

  await page.goto(url, { waitUntil: 'networkidle0', timeout: 90_000 })
  await page.waitForSelector('#root', { timeout: 30_000 })
  await page.waitForFunction(
    () => document.title && document.title.length > 0,
    { timeout: 30_000 },
  )

  const html = await page.content()
  const outputPath = outputPathForRoute(routePath)
  mkdirSync(dirname(outputPath), { recursive: true })
  writeFileSync(outputPath, html, 'utf8')
  console.log(`Prerendered ${routePath} -> ${outputPath}`)
  await page.close()
}

async function main(): Promise<void> {
  const preview = startPreview()

  try {
    await waitForServer(PREVIEW_URL)
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    })

    try {
      for (const route of PRERENDER_ROUTES) {
        await prerenderRoute(browser, route.path)
      }
    } finally {
      await browser.close()
    }
  } finally {
    preview.kill('SIGTERM')
  }

  console.log(`Prerender complete: ${PRERENDER_ROUTES.length} routes`)
}

main().catch((error: unknown) => {
  console.error('Prerender failed:', error)
  process.exit(1)
})
