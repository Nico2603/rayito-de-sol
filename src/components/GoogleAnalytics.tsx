import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { initGoogleAnalytics, trackPageView } from '../lib/analytics'

export default function GoogleAnalytics() {
  const location = useLocation()
  const [ready, setReady] = useState(false)

  useEffect(() => {
    void initGoogleAnalytics().then(() => setReady(true))
  }, [])

  useEffect(() => {
    if (!ready) return
    trackPageView(location.pathname)
  }, [ready, location.pathname])

  return null
}
