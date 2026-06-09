import { useEffect, useState } from 'react'
import type { InstagramPost } from '../lib/instagram-api'

type FeedState =
  | { status: 'loading' }
  | { status: 'success'; posts: InstagramPost[] }
  | { status: 'error' }

export function useInstagramFeed() {
  const [state, setState] = useState<FeedState>({ status: 'loading' })

  useEffect(() => {
    const controller = new AbortController()

    async function loadFeed() {
      try {
        const response = await fetch('/api/instagram-feed', { signal: controller.signal })

        if (!response.ok) {
          throw new Error('Feed request failed')
        }

        const data = (await response.json()) as { posts: InstagramPost[] }
        setState({ status: 'success', posts: data.posts })
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') return
        setState({ status: 'error' })
      }
    }

    void loadFeed()

    return () => controller.abort()
  }, [])

  return state
}
