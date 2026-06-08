import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

import PageTransition from '../components/PageTransition.jsx'
import StatBar from '../components/StatBar.jsx'
import ProjectCard from '../components/ProjectCard.jsx'
import SectionHeader from '../components/SectionHeader.jsx'
import Reveal from '../components/Reveal.jsx'
import PhotoPlaceholder from '../components/PhotoPlaceholder.jsx'
import AnimatedCounter from '../components/AnimatedCounter.jsx'
import { projects } from '../data/projects.js'
import { usePublicNews } from '../hooks/usePublicNews.js'
import { useApp } from '../context/AppContext.jsx'

const focusAreas = [
  { en: 'AI Infrastructure Platforms', es: 'Plataformas de Infraestructura de IA', to: '/proyectos' },
  { en: 'Energy Security', es: 'Seguridad Energética', to: '/quienes-somos' },
  { en: 'Digital Ecosystems', es: 'Ecosistemas Digitales', to: '/proyectos' },
  { en: 'Asset Monetization', es: 'Monetización de Activos', to: '/quienes-somos' },
]

export default function Home() {
  const { t, lang, L } = useApp()
  const { news } = usePublicNews()

  return (
    <PageTransition>

      {/* ══════════════════════════════════════════
          1. HERO — full viewport, video background
      ══════════════════════════════════════════ */}
      <section className="relative flex min-h-screen flex-col overflow-hidden">
        <video
          autoPlay muted loop playsInline
          poster="/images/inteligencia-artificial.jpg"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
        >
          <source src="/video-home.mp4" type="video/mp4" />
          <source src="/VIDEO 1 INICIO.mov" type="video/quicktime" />
        </video>

        {/* Overlay sutil */}
        <div
          className="absolute inset-0"
          style={{ background: 'rgba(0,0,0,0.35)' }}
        />

        {/* Headline centrado en el tercio inferior */}
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-24 px-6">
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-center text-white font-bold uppercase"
            style={{
              fontFamily: '"Space Grotesk", system-ui, sans-serif',
              fontSize: 'clamp(2.25rem, 5.5vw, 3rem)',
              letterSpacing: '-0.01em',
              lineHeight: 1.1,
              maxWidth: '780px',
            }}
          >
            {t('home.headline')}
          </motion.h1>
        </div>

        {/* Barra oscura inferior — ticker de stats */}
        <div
          className="absolute bottom-0 inset-x-0 flex items-center"
          style={{ backgroundColor: '#141414', height: '52px' }}
        >
          <div className="w-full flex items-center justify-center gap-0 overflow-x-auto px-6">
            {[
              { value: '3.6 GW', label: t('home.stats.capacity') },
              { value: '4', label: t('home.stats.projects') },
              { value: '$30B+', label: t('home.stats.investment') },
              { value: '2', label: t('home.stats.regions') },
            ].map((item, i) => (
              <div key={item.label} className="flex items-center gap-0 shrink-0">
                {i > 0 && (
                  <span className="mx-6 select-none" style={{ color: 'rgba(255,255,255,0.2)' }}>|</span>
                )}
                <div className="flex items-center gap-2">
                  <span
                    className="text-[0.72rem] font-bold text-white uppercase tracking-[0.08em]"
                    style={{ fontFamily: '"Space Grotesk", system-ui, sans-serif' }}
                  >
                    {item.value}
                  </span>
                  <span
                    className="text-[0.62rem] uppercase tracking-[0.15em] hidden sm:block"
                    style={{
                      fontFamily: '"Space Grotesk", system-ui, sans-serif',
                      color: 'rgba(255,255,255,0.4)',
                    }}
                  >
                    {item.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          2. NEWS CARDS — horizontal strip de 4
      ══════════════════════════════════════════ */}
      <section className="py-16 md:py-20" style={{ backgroundColor: 'var(--bg)' }}>
        <div className="container-content">
          <SectionHeader
            label={t('nav.news')}
            cta={lang === 'es' ? 'TODAS LAS NOTICIAS' : 'ALL NEWS'}
            ctaTo="/noticias"
            className="mb-10"
          />
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {news.slice(0, 4).map((item, i) => (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.07 }}
                className="group relative border border-[color:var(--border)] bg-[color:var(--surface)] p-6 transition-colors duration-200 hover:border-[color:var(--gold)]"
              >
                {/* Icono ↗ top-right */}
                <span
                  className="absolute top-5 right-5 text-[color:var(--border)] group-hover:text-[color:var(--gold)] transition-colors"
                  style={{ fontFamily: '"Space Grotesk", system-ui, sans-serif', fontSize: '1rem' }}
                >
                  ↗
                </span>
                {/* Categoría */}
                <span
                  className="mb-3 block text-[0.6rem] font-bold uppercase tracking-[0.2em]"
                  style={{ fontFamily: '"Space Grotesk", system-ui, sans-serif', color: 'var(--gold)' }}
                >
                  {L(item.category)}
                </span>
                {/* Título */}
                <h3
                  className="text-[1.05rem] font-bold leading-snug text-[color:var(--ink)]"
                  style={{ fontFamily: '"Space Grotesk", system-ui, sans-serif', letterSpacing: '-0.01em' }}
                >
                  {L(item.title)}
                </h3>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          3. ABOUT — lead text + foto
      ══════════════════════════════════════════ */}
      <section className="py-20 md:py-28" style={{ backgroundColor: 'var(--bg)' }}>
        <div className="container-content">
          <SectionHeader
            label={lang === 'es' ? 'QUIÉNES SOMOS' : 'WHO WE ARE'}
            cta={t('common.learnMore')}
            ctaTo="/quienes-somos"
            className="mb-14"
          />

          <Reveal delay={0.04}>
            <h2
              className="font-bold uppercase leading-[1.08] text-[color:var(--ink)]"
              style={{
                fontFamily: '"Space Grotesk", system-ui, sans-serif',
                fontSize: 'clamp(1.9rem, 4vw, 3rem)',
                letterSpacing: '-0.02em',
                maxWidth: '820px',
              }}
            >
              {t('home.about.title')}
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <p
              className="mt-7 mb-8 max-w-2xl text-[1.05rem] leading-relaxed text-[color:var(--body)]"
              style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
            >
              {t('home.about.p1')}
            </p>
          </Reveal>

          <Reveal delay={0.14}>
            <p
              className="mb-14 max-w-2xl text-[1rem] leading-relaxed text-[color:var(--body)]"
              style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
            >
              {t('home.intro')}
            </p>
          </Reveal>

          <Reveal y={30} delay={0.15}>
            <PhotoPlaceholder
              src="/images/image.jpg"
              alt="Black AI — human and robot collaboration"
              aspect="16/9"
            />
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          4. FOCUS AREAS — dark full-bleed foto
      ══════════════════════════════════════════ */}
      <section className="relative overflow-hidden" style={{ minHeight: '480px' }}>
        <PhotoPlaceholder
          src="/images/futuro-robot-inteligencia-artificial-fondo-sistema-red-1.jpg"
          alt="AI Focus Areas"
          aspect="none"
          className="absolute inset-0 h-full w-full"
        />

        {/* Overlay oscuro */}
        <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.55)' }} />

        <div className="container-content relative py-20 md:py-28">
          <SectionHeader
            label={lang === 'es' ? 'COMPETENCIAS CLAVE' : 'CORE COMPETENCIES'}
            light
            className="mb-14"
          />

          <div className="flex flex-col">
            {focusAreas.map((area, i) => (
              <Reveal key={area.en} delay={i * 0.08}>
                <Link
                  to={area.to}
                  className="group flex items-center justify-between py-6"
                  style={{
                    borderBottom: i < focusAreas.length - 1 ? '1px solid rgba(255,255,255,0.15)' : 'none',
                    textDecoration: 'none',
                  }}
                >
                  <h3
                    className="font-bold uppercase text-white whitespace-nowrap overflow-hidden transition-opacity duration-200 group-hover:opacity-70"
                    style={{
                      fontFamily: '"Space Grotesk", system-ui, sans-serif',
                      fontSize: 'clamp(1.6rem, 3.8vw, 3.5rem)',
                      letterSpacing: '-0.02em',
                      lineHeight: 1.05,
                    }}
                  >
                    {lang === 'es' ? area.es : area.en}
                  </h3>
                  <span
                    className="ml-8 shrink-0 text-xl transition-all duration-200 group-hover:translate-x-1 group-hover:opacity-100"
                    style={{ color: 'rgba(255,255,255,0.35)' }}
                  >
                    ↗
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          5. STATS — dark, 4 columnas, números 100px
      ══════════════════════════════════════════ */}
      <StatBar />

      {/* ══════════════════════════════════════════
          6. TYPOGRAPHIC SECTION — masivo
      ══════════════════════════════════════════ */}
      <section className="py-20 md:py-28 overflow-hidden" style={{ backgroundColor: 'var(--bg)' }}>
        <div className="container-content">
          <Reveal>
            <span
              className="mb-6 block text-[0.7rem] font-bold uppercase tracking-[0.35em] text-[color:var(--ink)]"
              style={{ fontFamily: '"Space Grotesk", system-ui, sans-serif' }}
            >
              Black AI
            </span>
          </Reveal>

          <div>
            <Reveal y={40} delay={0.05}>
              <p
                className="font-bold uppercase leading-[0.92] text-[color:var(--ink)]"
                style={{
                  fontFamily: '"Space Grotesk", system-ui, sans-serif',
                  fontSize: 'clamp(3.5rem, 9vw, 8rem)',
                  letterSpacing: '-0.03em',
                }}
              >
                {lang === 'es' ? 'CONSTRUYENDO' : 'BUILDING'}
              </p>
            </Reveal>
            <Reveal y={40} delay={0.1}>
              <p
                className="font-bold uppercase leading-[0.92] text-[color:var(--ink)]"
                style={{
                  fontFamily: '"Space Grotesk", system-ui, sans-serif',
                  fontSize: 'clamp(3.5rem, 9vw, 8rem)',
                  letterSpacing: '-0.03em',
                }}
              >
                {lang === 'es' ? 'EL FUTURO DE LA IA' : 'THE AI FUTURE'}
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.18}>
            <p
              className="mt-10 max-w-xl text-[1.15rem] leading-relaxed text-[color:var(--body)]"
              style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
            >
              {t('home.subheadline')}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          7. PROJECTS STRIP — 2×2 grid
      ══════════════════════════════════════════ */}
      <section className="py-16 md:py-20" style={{ backgroundColor: 'var(--bg-2)' }}>
        <div className="container-content">
          <SectionHeader
            label={lang === 'es' ? 'PROYECTOS' : 'PROJECTS'}
            cta={lang === 'es' ? 'TODOS LOS PROYECTOS' : 'ALL PROJECTS'}
            ctaTo="/proyectos"
            className="mb-10"
          />
          <div className="grid gap-4 md:grid-cols-2">
            {projects.slice(0, 4).map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          8. NEWS PREVIEW — 3 columnas
      ══════════════════════════════════════════ */}
      <section className="py-16 md:py-20" style={{ backgroundColor: 'var(--bg)' }}>
        <div className="container-content">
          <SectionHeader
            label={lang === 'es' ? 'NOTICIAS Y NOVEDADES' : 'NEWS & UPDATES'}
            cta={lang === 'es' ? 'TODAS LAS NOTICIAS' : 'ALL NEWS'}
            ctaTo="/noticias"
            className="mb-10"
          />
          <div className="grid gap-6 md:grid-cols-3">
            {news.slice(0, 3).map((item, i) => (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.08 }}
                className="border border-[color:var(--border)] bg-[color:var(--surface)] p-7 flex flex-col"
              >
                {/* Fecha + categoría */}
                <div className="mb-4 flex items-center gap-3">
                  <span
                    className="text-[0.6rem] uppercase tracking-[0.2em]"
                    style={{ fontFamily: '"Space Grotesk", system-ui, sans-serif', color: 'var(--muted)' }}
                  >
                    {L(item.date)}
                  </span>
                  <span style={{ color: 'var(--border)' }}>|</span>
                  <span
                    className="text-[0.6rem] font-bold uppercase tracking-[0.2em]"
                    style={{ fontFamily: '"Space Grotesk", system-ui, sans-serif', color: 'var(--gold)' }}
                  >
                    {L(item.category)}
                  </span>
                </div>

                {/* Título */}
                <h3
                  className="mb-4 text-[1.1rem] font-bold leading-snug text-[color:var(--ink)]"
                  style={{ fontFamily: '"Space Grotesk", system-ui, sans-serif', letterSpacing: '-0.01em' }}
                >
                  {L(item.title)}
                </h3>

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
              </motion.article>
            ))}
          </div>
        </div>
      </section>

    </PageTransition>
  )
}
