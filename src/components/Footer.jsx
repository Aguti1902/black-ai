import { Link } from 'react-router-dom'
import { useApp } from '../context/AppContext.jsx'
import { useSiteContact } from '../hooks/useSiteContact.js'
import { resolveSocialLinks } from '../data/siteContact.js'

export default function Footer() {
  const { t, lang } = useApp()
  const { contact } = useSiteContact()

  const loc1 = lang === 'es' ? contact.footerLocationEs : contact.footerLocationEn
  const loc2 = lang === 'es' ? contact.footerLocation2Es : contact.footerLocation2En
  const socialLinks = resolveSocialLinks(contact)

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
        { label: contact.generalEmail, to: '/contacto', external: false },
        ...(contact.generalPhone ? [{ label: contact.generalPhone, to: `tel:${contact.generalPhone.replace(/\s/g, '')}`, external: true }] : []),
        ...(loc1 ? [{ label: loc1, to: '/contacto' }] : []),
        ...(loc2 ? [{ label: loc2, to: '/contacto' }] : []),
      ],
    },
    {
      title: t('footer.legal'),
      links: [
        { label: t('footer.privacy'), to: '/privacidad' },
        { label: t('footer.terms'),   to: '/aviso-legal' },
        { label: t('footer.cookies'), to: '/cookies' },
      ],
    },
  ]

  return (
    <footer style={{ backgroundColor: '#141414' }}>
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

      <div className="container-content">
        <div style={{ height: '1px', background: 'rgba(255,255,255,0.1)', width: '100%' }} />
      </div>

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
                    {l.external ? (
                      <a
                        href={l.to}
                        className="text-sm transition-colors"
                        style={{ color: 'rgba(255,255,255,0.65)' }}
                        onMouseEnter={e => (e.target.style.color = '#B8924A')}
                        onMouseLeave={e => (e.target.style.color = 'rgba(255,255,255,0.65)')}
                      >
                        {l.label}
                      </a>
                    ) : (
                      <Link
                        to={l.to}
                        className="text-sm transition-colors"
                        style={{ color: 'rgba(255,255,255,0.65)' }}
                        onMouseEnter={e => (e.target.style.color = '#B8924A')}
                        onMouseLeave={e => (e.target.style.color = 'rgba(255,255,255,0.65)')}
                      >
                        {l.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {socialLinks.length > 0 && (
          <div className="mt-10 flex flex-wrap gap-6 border-t border-white/10 pt-8">
            {socialLinks.map(link => (
              <a
                key={link.key}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: '"Space Grotesk", system-ui, sans-serif',
                  fontSize: '0.72rem',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                  color: 'rgba(255,255,255,0.4)',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={e => (e.target.style.color = '#B8924A')}
                onMouseLeave={e => (e.target.style.color = 'rgba(255,255,255,0.4)')}
              >
                {link.label} ↗
              </a>
            ))}
          </div>
        )}
      </div>

      <div className="container-content pb-8">
        <div style={{ height: '1px', background: 'rgba(255,255,255,0.08)', width: '100%', marginBottom: '1.5rem' }} />
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <span
            className="text-xs tracking-[0.1em]"
            style={{ fontFamily: '"Space Grotesk", system-ui, sans-serif', color: 'rgba(255,255,255,0.3)' }}
          >
            {t('footer.rights')}
          </span>
          <div className="flex flex-wrap gap-x-5 gap-y-2 items-center">
            {[
              { label: t('footer.privacy'), to: '/privacidad' },
              { label: t('footer.cookies'), to: '/cookies' },
              { label: t('footer.terms'),   to: '/aviso-legal' },
            ].map(l => (
              <Link
                key={l.to}
                to={l.to}
                style={{
                  fontFamily: '"Space Grotesk", system-ui, sans-serif',
                  fontSize: '0.7rem',
                  letterSpacing: '0.08em',
                  color: 'rgba(255,255,255,0.28)',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={e => (e.target.style.color = '#B8924A')}
                onMouseLeave={e => (e.target.style.color = 'rgba(255,255,255,0.28)')}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
