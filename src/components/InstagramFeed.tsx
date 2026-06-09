import { motion } from 'framer-motion'
import { ArrowRight, Play } from 'lucide-react'
import SectionWrapper from './SectionWrapper'
import InstagramIcon from './icons/InstagramIcon'
import { useInstagramFeed } from '../hooks/useInstagramFeed'
import { INSTAGRAM_HANDLE, INSTAGRAM_URL } from '../constants/social'
import { proxiedInstagramImageUrl } from '../lib/instagram-image'

function FeedSkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="aspect-square rounded-2xl animate-pulse border"
          style={{
            backgroundColor: 'var(--color-bg-secondary)',
            borderColor: 'var(--color-border-light)',
          }}
        />
      ))}
    </div>
  )
}

export default function InstagramFeed() {
  const feed = useInstagramFeed()

  return (
    <SectionWrapper id="instagram" className="py-24 md:py-32" style={{ backgroundColor: 'var(--color-bg-primary)' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="font-semibold text-xs uppercase tracking-[0.2em] mb-3" style={{ color: 'var(--color-accent-label)' }}>
            Redes
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-semibold mb-4 tracking-tight" style={{ color: 'var(--color-text-primary)' }}>
            Sígueme en Instagram
          </h2>
          <p className="text-lg" style={{ color: 'var(--color-text-secondary)' }}>
            Contenido sobre bienestar emocional, tips y reflexiones
          </p>
        </div>

        {feed.status === 'loading' && <FeedSkeleton />}

        {feed.status === 'success' && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {feed.posts.map((post, index) => (
              <motion.a
                key={post.id}
                href={post.permalink}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.45, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
                className="group relative aspect-square overflow-hidden rounded-2xl border shadow-sm hover:shadow-lg transition-shadow duration-300"
                style={{
                  borderColor: 'var(--color-border-light)',
                }}
              >
                <img
                  src={proxiedInstagramImageUrl(post.thumbnailUrl)}
                  alt={post.caption?.slice(0, 120) ?? 'Publicación de Instagram'}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-sky-deep/0 group-hover:bg-sky-deep/25 transition-colors duration-300" />
                {post.isVideo && (
                  <span className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-sky-deep/75 text-white backdrop-blur-sm">
                    <Play className="h-4 w-4 fill-current" strokeWidth={0} />
                  </span>
                )}
              </motion.a>
            ))}
          </div>
        )}

        {feed.status === 'error' && (
          <div className="rounded-2xl border p-10 text-center" style={{
            backgroundColor: 'var(--color-bg-card)',
            borderColor: 'var(--color-border-light)',
          }}>
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-sun/10">
              <InstagramIcon className="h-8 w-8" />
            </div>
            <p className="font-medium mb-2" style={{ color: 'var(--color-text-primary)' }}>No pudimos cargar las publicaciones</p>
            <p className="text-sm mb-6" style={{ color: 'var(--color-text-secondary)' }}>
              Visita el perfil directamente para ver el contenido más reciente.
            </p>
          </div>
        )}

        <div className="mt-10 text-center">
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2.5 rounded-full border px-6 py-3 font-medium shadow-sm hover:shadow-md transition-all duration-300"
            style={{
              backgroundColor: 'var(--color-bg-card)',
              borderColor: 'var(--color-border-light)',
              color: 'var(--color-text-primary)',
            }}
          >
            <InstagramIcon className="h-5 w-5" />
            <span>{INSTAGRAM_HANDLE}</span>
            <ArrowRight
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
              strokeWidth={2}
              style={{ color: 'var(--color-accent-icon)' }}
            />
          </a>
        </div>
      </div>
    </SectionWrapper>
  )
}
