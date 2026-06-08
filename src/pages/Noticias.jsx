import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

import PageTransition from '../components/PageTransition.jsx'
import PageHero from '../components/PageHero.jsx'
import SEO from '../components/SEO.jsx'
import SectionHeader from '../components/SectionHeader.jsx'
import PhotoPlaceholder from '../components/PhotoPlaceholder.jsx'
import { usePublicNews } from '../hooks/usePublicNews.js'
import { useApp } from '../context/AppContext.jsx'

export default function Noticias() {
  const { t, L } = useApp()
  const { news } = usePublicNews()

  return (
    <PageTransition>
      <SEO title="News" description="Latest news and updates from Black AI." path="/noticias" />
      <PageHero
        eyebrow={t('news.heroEyebrow')}
        title={t('news.heroTitle')}
        subtitle={t('news.heroSubtitle')}
        imageSrc="/images/hasta-donde-puede-llegar-la-ia.jpeg"
        videoSrc="/VIDEO 4 NEWS.mp4"
      />

      <section className="py-16 md:py-24" style={{ backgroundColor: 'var(--bg)' }}>
        <div className="container-content">
          <SectionHeader
            label={t('news.heroTitle')}
            className="mb-10"
          />

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {news.map((item, i) => (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, delay: (i % 3) * 0.09, ease: [0.22, 1, 0.36, 1] }}
                className="group flex flex-col border border-[color:var(--border)] bg-[color:var(--surface)] transition-colors duration-200 hover:border-[color:var(--gold)]"
                onClick={() => window.location.href = `/noticias/${item.id}`}
                style={{ cursor: 'pointer' }}
              >
                {/* Foto thumbnail */}
                <div className="overflow-hidden">
                  <PhotoPlaceholder
                    src={item.imageSrc}
                    alt={L(item.title)}
                    aspect="16/10"
                    label={L(item.category)}
                    className="transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                </div>

                <div className="flex flex-1 flex-col p-7">
                  {/* Fecha + categoría */}
                  <div className="mb-4 flex items-center gap-3">
                    <span
                      className="text-[0.6rem] uppercase tracking-[0.22em]"
                      style={{ fontFamily: '"Space Grotesk", system-ui, sans-serif', color: 'var(--muted)' }}
                    >
                      {L(item.date)}
                    </span>
                    <span style={{ color: 'var(--border)' }}>|</span>
                    <span
                      className="text-[0.6rem] font-bold uppercase tracking-[0.2em]"
                      style={{ fontFamily: '"Space Grotesk", system-ui, sans-serif', color: '#B8924A' }}
                    >
                      {L(item.category)}
                    </span>
                  </div>

                  {/* Título */}
                  <h2
                    className="mb-4 text-[1.1rem] font-bold leading-snug text-[color:var(--ink)]"
                    style={{ fontFamily: '"Space Grotesk", system-ui, sans-serif', letterSpacing: '-0.01em' }}
                  >
                    {L(item.title)}
                  </h2>

                  {/* Excerpt */}
                  <p className="flex-1 text-sm leading-relaxed text-[color:var(--body)]">
                    {L(item.excerpt)}
                  </p>

                  {/* Link */}
                  <div className="mt-6 pt-5 border-t border-[color:var(--border)]">
                    <Link
                      to={`/noticias/${item.id}`}
                      className="text-[0.72rem] font-bold uppercase tracking-[0.1em] text-[color:var(--ink)] hover:text-[color:var(--gold)] transition-colors"
                      style={{ fontFamily: '"Space Grotesk", system-ui, sans-serif' }}
                    >
                      {t('common.readMore')} ↗
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  )
}
