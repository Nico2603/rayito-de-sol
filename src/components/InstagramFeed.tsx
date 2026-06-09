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
          className="aspect-square rounded-2xl bg-sky-pale/60 animate-pulse border border-border-light"
        />
      ))}
    </div>
  )
}

export default function InstagramFeed() {
  const feed = useInstagramFeed()

  return (
    <SectionWrapper id="instagram" className="bg-sky-white py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-sun-ink font-semibold text-xs uppercase tracking-[0.2em] mb-3">
            Redes
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-semibold text-text-primary mb-4 tracking-tight">
            Sígueme en Instagram
          </h2>
          <p className="text-text-secondary text-lg">
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
                className="group relative aspect-square overflow-hidden rounded-2xl border border-border-light bg-sky-pale/30 shadow-sm hover:shadow-lg hover:shadow-sky-deep/10 transition-shadow duration-300"
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
          <div className="rounded-2xl border border-border-light bg-sky-pale/30 p-10 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-sun/10">
              <InstagramIcon className="h-8 w-8" />
            </div>
            <p className="text-text-primary font-medium mb-2">No pudimos cargar las publicaciones</p>
            <p className="text-text-secondary text-sm mb-6">
              Visita el perfil directamente para ver el contenido más reciente.
            </p>
          </div>
        )}

        <div className="mt-10 text-center">
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2.5 rounded-full border border-border-light bg-white px-6 py-3 text-text-primary font-medium shadow-sm hover:border-sky-cerulean/40 hover:shadow-md transition-all duration-300"
          >
            <InstagramIcon className="h-5 w-5" />
            <span>{INSTAGRAM_HANDLE}</span>
            <ArrowRight
              className="h-4 w-4 text-sky-deep transition-transform duration-300 group-hover:translate-x-1"
              strokeWidth={2}
            />
          </a>
        </div>
      </div>
    </SectionWrapper>
  )
}
