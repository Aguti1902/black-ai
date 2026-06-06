import { Link } from 'react-router-dom'
import { useApp } from '../context/AppContext.jsx'

export default function Footer() {
  const { t } = useApp()

  const columns = [
    {
      title: t('footer.company'),
      links: [
        { label: t('footer.whoWeAre'), to: '/quienes-somos' },
        { label: t('footer.managementTeam'), to: '/quienes-somos' },
        { label: t('footer.news'), to: '/noticias' },
      ],
    },
    {
      title: t('footer.projects'),
      links: [
        { label: 'DC Malpica AI', to: '/proyectos' },
        { label: 'DC Córdoba AI', to: '/proyectos' },
        { label: 'DC Santa María AI', to: '/proyectos' },
        { label: 'DC Omais Colón AI', to: '/proyectos' },
      ],
    },
    {
      title: t('footer.contact'),
      links: [
        { label: 'info@black-ai.com', to: '/contacto' },
        { label: t('footer.madrid'), to: '/contacto' },
        { label: t('footer.panama'), to: '/contacto' },
      ],
    },
    {
      title: t('footer.legal'),
      links: [
        { label: t('footer.privacy'), to: '/' },
        { label: t('footer.terms'), to: '/' },
        { label: t('footer.cookies'), to: '/' },
      ],
    },
  ]

  return (
    <footer style={{ backgroundColor: '#141414' }}>
      {/* CTA row */}
      <div className="container-content py-16 md:py-20">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <p
            className="max-w-lg text-[1.75rem] font-bold uppercase leading-tight text-white md:text-[2rem]"
            style={{ fontFamily: '"Space Grotesk", system-ui, sans-serif', letterSpacing: '-0.01em' }}
          >
            {t('footer.tagline')}
          </p>
          <Link to="/contacto" className="btn-gold shrink-0">
            {t('common.contactUs')}
            <span aria-hidden>↗</span>
          </Link>
        </div>
      </div>

      {/* Hairline */}
      <div className="container-content">
        <div style={{ height: '1px', background: 'rgba(255,255,255,0.1)', width: '100%' }} />
      </div>

      {/* Links grid */}
      <div className="container-content py-14">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
          {columns.map((col) => (
            <div key={col.title}>
              <h4
                className="mb-5 text-[0.65rem] uppercase tracking-[0.25em]"
                style={{
                  fontFamily: '"Space Grotesk", system-ui, sans-serif',
                  color: 'rgba(255,255,255,0.4)',
                }}
              >
                {col.title}
              </h4>
              <ul className="space-y-3">
                {col.links.map((l, i) => (
                  <li key={`${col.title}-${i}`}>
                    <Link
                      to={l.to}
                      className="text-sm transition-colors"
                      style={{ color: 'rgba(255,255,255,0.65)' }}
                      onMouseEnter={e => (e.target.style.color = '#B8924A')}
                      onMouseLeave={e => (e.target.style.color = 'rgba(255,255,255,0.65)')}
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="container-content pb-8">
        <div style={{ height: '1px', background: 'rgba(255,255,255,0.08)', width: '100%', marginBottom: '1.5rem' }} />
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <span
            className="text-xs tracking-[0.1em]"
            style={{ fontFamily: '"Space Grotesk", system-ui, sans-serif', color: 'rgba(255,255,255,0.3)' }}
          >
            {t('footer.rights')}
          </span>
          <span
            className="text-xs tracking-[0.06em]"
            style={{ fontFamily: '"Space Grotesk", system-ui, sans-serif', color: 'rgba(255,255,255,0.3)' }}
          >
            {t('footer.hq')}
          </span>
        </div>
      </div>
    </footer>
  )
}
