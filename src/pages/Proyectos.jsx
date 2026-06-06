import { motion } from 'framer-motion'
import { MapPin, Check } from 'lucide-react'

import PageTransition from '../components/PageTransition.jsx'
import PageHero from '../components/PageHero.jsx'
import SectionHeader from '../components/SectionHeader.jsx'
import Reveal from '../components/Reveal.jsx'
import PdfCover from '../components/PdfCover.jsx'
import { platformPrinciples } from '../data/projects.js'
import { usePublicProjects } from '../hooks/usePublicProjects.js'
import { useApp } from '../context/AppContext.jsx'

function ProjectDetail({ project, index, total }) {
  const { L } = useApp()
  const isEven = index % 2 === 0
  const highlights = L(project.highlights)

  return (
    <section
      id={project.id}
      style={{
        backgroundColor: isEven ? 'var(--bg)' : 'var(--bg-2)',
        paddingTop: '5rem',
        paddingBottom: '5rem',
      }}
    >
      <div className="container-content">
        {/* SectionHeader tipo grenergy */}
        <SectionHeader
          label={`${String(index + 1).padStart(2, '0')} / ${String(total).padStart(2, '0')}`}
          cta={L(project.status)}
          className="mb-10"
        />

        {/* Tags */}
        <div className="mb-10 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="border border-[#B8924A] px-2.5 py-1 text-[0.58rem] font-bold uppercase tracking-[0.2em]"
              style={{ fontFamily: '"Space Grotesk", system-ui, sans-serif', color: '#B8924A' }}
            >
              {tag}
            </span>
          ))}
        </div>

        <div className={`grid items-center gap-12 lg:grid-cols-2 lg:gap-20`}>
          <Reveal y={36} className={isEven ? '' : 'lg:order-2'}>
            <div style={{ overflow: 'hidden', maxHeight: '520px' }}>
              <PdfCover
                src={project.pdfSrc}
                alt={project.name}
              />
            </div>
          </Reveal>

          {/* Content */}
          <div className={isEven ? '' : 'lg:order-1'}>
            <Reveal>
              <h2
                className="font-bold uppercase text-[color:var(--ink)]"
                style={{
                  fontFamily: '"Space Grotesk", system-ui, sans-serif',
                  fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)',
                  letterSpacing: '-0.02em',
                }}
              >
                {project.name}
              </h2>
            </Reveal>
            <Reveal delay={0.08}>
              <p
                className="mt-3 flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[color:var(--muted)]"
                style={{ fontFamily: '"Space Grotesk", system-ui, sans-serif' }}
              >
                <MapPin size={12} style={{ color: '#B8924A' }} />
                {L(project.location)}
              </p>
            </Reveal>
            <Reveal delay={0.13}>
              <p className="mt-6 leading-relaxed text-[color:var(--body)]">
                {L(project.description)}
              </p>
            </Reveal>

            {/* Highlights */}
            <Reveal delay={0.18}>
              <ul className="mt-7 space-y-2.5">
                {highlights.map((h) => (
                  <li key={h} className="flex items-start gap-3">
                    <Check size={15} className="mt-0.5 shrink-0" style={{ color: '#B8924A' }} />
                    <span className="text-sm leading-relaxed text-[color:var(--body)]">{h}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            {/* Specs table — monospace style */}
            <Reveal delay={0.24}>
              <div className="mt-9 border border-[color:var(--border)] bg-[color:var(--surface)]">
                {project.specs.map((spec, si, arr) => (
                  <div
                    key={spec.label.en}
                    className={`flex items-center justify-between gap-4 px-5 py-3 ${
                      si < arr.length - 1 ? 'border-b border-[color:var(--border)]' : ''
                    }`}
                  >
                    <span
                      className="text-[0.62rem] uppercase tracking-[0.2em] text-[color:var(--muted)]"
                      style={{ fontFamily: '"Space Grotesk", system-ui, sans-serif' }}
                    >
                      {L(spec.label)}
                    </span>
                    <span
                      className="text-right text-sm tracking-tight text-[color:var(--ink)]"
                      style={{ fontFamily: '"Space Grotesk", system-ui, sans-serif' }}
                    >
                      {L(spec.value)}
                    </span>
                  </div>
                ))}
              </div>
            </Reveal>

          </div>
        </div>
      </div>
    </section>
  )
}

export default function Proyectos() {
  const { t, L } = useApp()
  const { projects } = usePublicProjects()

  return (
    <PageTransition>
      <PageHero
        eyebrow={t('projects.heroEyebrow')}
        title={t('projects.heroTitle')}
        subtitle={t('projects.heroSubtitle')}
        imageSrc="/images/ia-672c582740ea40627fefbe0cb4692b2b2063d71d.jpg"
        videoSrc="/VIDEO 3 PROJECTS.mp4"
      />

      {/* ── PLATFORM PRINCIPLES ── */}
      <section className="py-16 md:py-20" style={{ backgroundColor: 'var(--bg-2)' }}>
        <div className="container-content">
          <SectionHeader
            label={t('projects.principlesEyebrow')}
            className="mb-10"
          />
          <div className="flex flex-wrap gap-3">
            {platformPrinciples.map((principle, i) => (
              <motion.div
                key={principle.en}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.04 }}
                className="border border-[color:var(--border)] bg-[color:var(--surface)] px-5 py-3 text-sm text-[color:var(--body)] transition-colors hover:border-[color:var(--gold)] hover:text-[color:var(--ink)]"
              >
                {L(principle)}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROJECT DETAILS ── */}
      {projects.map((project, i) => (
        <ProjectDetail key={project.id} project={project} index={i} total={projects.length} />
      ))}
    </PageTransition>
  )
}
