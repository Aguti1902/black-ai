import { useParams, Link, Navigate } from 'react-router-dom'
import PageTransition from '../components/PageTransition.jsx'
import PhotoPlaceholder from '../components/PhotoPlaceholder.jsx'
import SectionHeader from '../components/SectionHeader.jsx'
import Reveal from '../components/Reveal.jsx'
import { usePublicNews } from '../hooks/usePublicNews.js'
import { useApp } from '../context/AppContext.jsx'

export default function NoticiaDetalle() {
  const { id } = useParams()
  const { L, lang } = useApp()
  const { news: allNews, loading } = usePublicNews()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--bg)' }}>
        <span className="text-[color:var(--muted)] text-sm uppercase tracking-widest">Loading…</span>
      </div>
    )
  }

  const item = allNews.find((n) => n.id === id)
  if (!item) return <Navigate to="/noticias" replace />

  const others = allNews.filter((n) => n.id !== id).slice(0, 3)

  return (
    <PageTransition>
      {/* Hero image */}
      <section className="relative h-[55vh] min-h-[360px] overflow-hidden">
        <PhotoPlaceholder
          src={item.imageSrc}
          alt={L(item.title)}
          aspect="none"
          className="absolute inset-0 h-full w-full"
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)' }} />
        <div className="absolute bottom-0 left-0 right-0 container-content pb-12">
          <span
            className="mb-3 block text-[0.65rem] font-bold uppercase tracking-[0.25em]"
            style={{ color: 'var(--gold)', fontFamily: '"Space Grotesk", sans-serif' }}
          >
            {L(item.category)} · {L(item.date)}
          </span>
          <h1
            className="font-bold uppercase text-white"
            style={{
              fontFamily: '"Space Grotesk", system-ui, sans-serif',
              fontSize: 'clamp(1.6rem, 4vw, 2.8rem)',
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
              maxWidth: '820px',
            }}
          >
            {L(item.title)}
          </h1>
        </div>
      </section>

      {/* Article body */}
      <section className="py-16 md:py-24" style={{ backgroundColor: 'var(--bg)' }}>
        <div className="container-content max-w-[780px]">
          <Reveal>
            <p
              className="text-[1.15rem] font-semibold leading-relaxed text-[color:var(--ink)]"
              style={{ fontFamily: '"Space Grotesk", system-ui, sans-serif' }}
            >
              {L(item.excerpt)}
            </p>
          </Reveal>

          {/* Full body — use item.body if exists, otherwise expanded excerpt */}
          {item.body && (
            <Reveal delay={0.08}>
              <div
                className="prose-content mt-8 space-y-5 text-[1rem] leading-relaxed text-[color:var(--body)]"
                style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
              >
                {(Array.isArray(item.body) ? item.body : [item.body]).map((para, i) => (
                  <p key={i}>{typeof para === 'object' ? L(para) : para}</p>
                ))}
              </div>
            </Reveal>
          )}

          {/* Back link */}
          <Reveal delay={0.15}>
            <div className="mt-14 border-t border-[color:var(--border)] pt-8">
              <Link
                to="/noticias"
                className="text-[0.75rem] font-bold uppercase tracking-[0.12em] text-[color:var(--body)] transition-colors hover:text-[color:var(--gold)]"
                style={{ fontFamily: '"Space Grotesk", system-ui, sans-serif' }}
              >
                ← {lang === 'es' ? 'Volver a Noticias' : 'Back to News'}
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* More articles */}
      {others.length > 0 && (
        <section className="py-16" style={{ backgroundColor: 'var(--bg-2)' }}>
          <div className="container-content">
            <SectionHeader
              label={lang === 'es' ? 'MÁS ARTÍCULOS' : 'MORE ARTICLES'}
              className="mb-10"
            />
            <div className="grid gap-6 md:grid-cols-3">
              {others.map((other) => (
                <Link
                  key={other.id}
                  to={`/noticias/${other.id}`}
                  className="group block border border-[color:var(--border)] bg-[color:var(--surface)] p-6 transition-colors hover:border-[color:var(--gold)]"
                >
                  <span
                    className="mb-2 block text-[0.6rem] font-bold uppercase tracking-[0.2em]"
                    style={{ color: 'var(--gold)', fontFamily: '"Space Grotesk", sans-serif' }}
                  >
                    {L(other.category)}
                  </span>
                  <h3
                    className="text-[1rem] font-bold leading-snug text-[color:var(--ink)] transition-opacity group-hover:opacity-70"
                    style={{ fontFamily: '"Space Grotesk", system-ui, sans-serif', letterSpacing: '-0.01em' }}
                  >
                    {L(other.title)}
                  </h3>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </PageTransition>
  )
}
