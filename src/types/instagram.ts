export interface InstagramPost {
  id: string
  shortcode: string
  permalink: string
  thumbnailUrl: string
  isVideo: boolean
  caption?: string
}

export type InstagramFeedSource = 'live' | 'fallback'

export interface InstagramFeedResult {
  posts: InstagramPost[]
  source: InstagramFeedSource
}

export type InstagramFallbackPost = {
  shortcode: string
  isVideo: boolean
  caption: string
}

export type FeedState =
  | { status: 'loading' }
  | { status: 'success'; posts: InstagramPost[] }
  | { status: 'error' }
