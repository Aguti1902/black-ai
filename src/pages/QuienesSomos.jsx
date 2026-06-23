import { motion } from 'framer-motion'

import PageTransition from '../components/PageTransition.jsx'
import PageHero from '../components/PageHero.jsx'
import SEO from '../components/SEO.jsx'
import SectionHeader from '../components/SectionHeader.jsx'
import Reveal from '../components/Reveal.jsx'
import TeamCard from '../components/TeamCard.jsx'
import PhotoPlaceholder from '../components/PhotoPlaceholder.jsx'
import { team, advisors } from '../data/team.js'
import { useApp } from '../context/AppContext.jsx'

const focusAreas = [
  {
    title: { en: 'AI Infrastructure Development', es: 'Desarrollo de Infraestructura de IA' },
    desc: { en: 'Origination, permitting and development of hyperscale AI campuses designed to support the next generation of artificial intelligence and high-performance computing.', es: 'Originación, permisos y desarrollo de campus de IA a hiperescala diseñados para soportar la próxima generación de inteligencia artificial y computación de alto rendimiento.' },
  },
  {
    title: { en: 'Energy Infrastructure Strategy', es: 'Estrategia de Infraestructura Energética' },
    desc: { en: 'Securing scalable, resilient and long-term energy solutions capable of supporting mission-critical AI workloads at hyperscale.', es: 'Asegurar soluciones energéticas escalables, resilientes y a largo plazo capaces de soportar cargas de trabajo de IA críticas a hiperescala.' },
  },
  {
    title: { en: 'Digital Connectivity', es: 'Conectividad Digital' },
    desc: { en: 'Integrating strategic fiber and network infrastructure to connect AI campuses with major digital and cloud ecosystems.', es: 'Integración de fibra estratégica e infraestructura de red para conectar campus de IA con los principales ecosistemas digitales y cloud.' },
  },
  {
    title: { en: 'Capital Formation', es: 'Formación de Capital' },
    desc: { en: 'Structuring institutional investment frameworks designed to accelerate infrastructure development and long-term asset ownership.', es: 'Estructuración de marcos de inversión institucional diseñados para acelerar el desarrollo de infraestructura y la propiedad de activos a largo plazo.' },
  },
  {
    title: { en: 'Asset Monetization & Ownership', es: 'Monetización y Propiedad de Activos' },
    desc: { en: 'Creating investment-grade infrastructure assets capable of generating value through strategic monetization, long-term ownership and future operation.', es: 'Creación de activos de infraestructura de grado inversor capaces de generar valor mediante monetización estratégica, propiedad a largo plazo y operación futura.' },
  },
  {
    title: { en: 'International Platform Expansion', es: 'Expansión Internacional de la Plataforma' },
    desc: { en: 'Scaling a portfolio of AI infrastructure assets across Europe and Latin America through a disciplined, infrastructure-led growth strategy.', es: 'Escalado de una cartera de activos de infraestructura de IA en Europa y América Latina mediante una estrategia de crecimiento disciplinada liderada por la infraestructura.' },
  },
]

export default function QuienesSomos() {
  const { t, L } = useApp()

  return (
    <PageTransition>
      <SEO title="Who We Are" description="Black AI — a global AI infrastructure development and investment company." path="/quienes-somos" />
      <PageHero
        eyebrow={t('about.heroEyebrow')}
        title={t('about.heroTitle')}
        subtitle={t('about.heroSubtitle')}
        imageSrc="/images/inteligencia-artificial-google.jpg"
        videoSrc="/video-about.mp4"
      />

      {/* ── MISSION + large photo ── */}
      <section className="py-20 md:py-28" style={{ backgroundColor: 'var(--bg)' }}>
        <div className="container-content">
          <SectionHeader
            label={t('about.missionEyebrow')}
            cta={t('common.learnMore')}
            ctaTo="/proyectos"
            className="mb-14"
          />

          <Reveal delay={0.05}>
            <p
              className="mb-12 leading-snug text-[color:var(--ink)]"
              style={{
                fontFamily: '"Space Grotesk", system-ui, sans-serif',
                fontSize: 'clamp(1.2rem, 2.2vw, 1.65rem)',
                fontWeight: 600,
                letterSpacing: '-0.01em',
                maxWidth: '820px',
                lineHeight: 1.45,
              }}
            >
              {t('about.lead')}
            </p>
          </Reveal>

          <div className="grid items-stretch gap-12 lg:grid-cols-2 lg:gap-20">
            <div className="flex flex-col justify-center space-y-5">
              <Reveal>
                <p className="text-[1.02rem] leading-relaxed text-[color:var(--body)]">
                  {t('about.p1')}
                </p>
              </Reveal>
              <Reveal delay={0.08}>
                <p className="text-[1.02rem] leading-relaxed text-[color:var(--body)]">
                  {t('about.p2')}
                </p>
              </Reveal>
            </div>

            <Reveal y={40} delay={0.1} className="self-stretch">
              <div style={{ position: 'relative', width: '100%', minHeight: '400px', height: '100%' }}>
                <PhotoPlaceholder
                  src="/images/38_1.jpg"
                  alt="Black AI team at work"
                  aspect="none"
                  className="absolute inset-0 h-full w-full"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── AREAS OF FOCUS ── */}
      <section className="py-20 md:py-28" style={{ backgroundColor: 'var(--bg-2)' }}>
        <div className="container-content">
          <SectionHeader
            label={t('about.focusEyebrow')}
            className="mb-14"
          />

          <div className="grid border-l border-t border-[color:var(--border)] sm:grid-cols-2 lg:grid-cols-3">
            {focusAreas.map((area, i) => (
              <motion.div
                key={area.title.en}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.07 }}
                className="group border-b border-r border-[color:var(--border)] bg-[color:var(--surface)] p-9 transition-colors duration-200 hover:bg-[color:var(--bg-2)]"
              >
                <span
                  className="mb-2 block text-[0.62rem] font-bold uppercase tracking-[0.2em]"
                  style={{ fontFamily: '"Space Grotesk", system-ui, sans-serif', color: '#B8924A' }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3
                  className="mt-4 text-[1.1rem] font-bold uppercase text-[color:var(--ink)]"
                  style={{ fontFamily: '"Space Grotesk", system-ui, sans-serif', letterSpacing: '-0.01em' }}
                >
                  {L(area.title)}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[color:var(--body)]">
                  {L(area.desc)}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MANAGEMENT TEAM ── */}
      <section className="py-20 md:py-28" style={{ backgroundColor: 'var(--bg)' }}>
        <div className="container-content">
          <SectionHeader
            label={t('about.teamTitle')}
            className="mb-12"
          />
          <div className="grid gap-0 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {team.map((member, i) => (
              <TeamCard key={member.name} member={member} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── ADVISORS ── */}
      <section className="py-16 md:py-24" style={{ backgroundColor: 'var(--bg-2)' }}>
        <div className="container-content">
          <SectionHeader
            label={t('about.advisorsTitle')}
            className="mb-12"
          />

          <div className="grid gap-0 sm:grid-cols-2 lg:grid-cols-3">
            {advisors.map((advisor, i) => (
              <TeamCard key={advisor.name} member={advisor} index={i} />
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  )
}
