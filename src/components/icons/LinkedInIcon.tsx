import { useId } from 'react'

type LinkedInIconProps = {
  className?: string
  variant?: 'brand' | 'light'
}

export default function LinkedInIcon({ className = 'w-5 h-5', variant = 'brand' }: LinkedInIconProps) {
  const gradientId = useId()

  const stops =
    variant === 'light'
      ? [
          { offset: '0%', color: '#FFFFFF' },
          { offset: '100%', color: '#FFE566' },
        ]
      : [
          { offset: '0%', color: '#1E3A5F' },
          { offset: '100%', color: '#4A90D9' },
        ]

  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="100%" x2="100%" y2="0%">
          {stops.map((stop) => (
            <stop key={stop.offset} offset={stop.offset} stopColor={stop.color} />
          ))}
        </linearGradient>
      </defs>
      <path
        fill={`url(#${gradientId})`}
        d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 114.127 0 2.063 2.063 0 01-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
      />
    </svg>
  )
}
