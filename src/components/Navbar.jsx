import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X, Sun, Moon } from 'lucide-react'
import { useApp } from '../context/AppContext.jsx'

export default function Navbar() {
  const { t, lang, setLang, theme, toggleTheme } = useApp()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const location = useLocation()

  const links = [
    { to: '/', label: t('nav.home') },
    { to: '/quienes-somos', label: t('nav.about') },
    { to: '/proyectos', label: t('nav.projects') },
    { to: '/noticias', label: t('nav.news') },
    { to: '/contacto', label: t('nav.contact') },
  ]

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20)
    fn()
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => { setOpen(false) }, [location.pathname])

  const navLinkBase = `relative font-display font-bold text-[0.8rem] uppercase tracking-[0.06em] transition-colors duration-200`

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'border-b border-[color:var(--border)] bg-[color:var(--bg)]'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <nav className="container-content flex h-[72px] items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className={`font-display font-bold text-[1.55rem] uppercase tracking-[0.12em] transition-colors ${
            scrolled ? 'text-[color:var(--ink)]' : 'text-white'
          }`}
        >
          Black AI
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/'}
              className={({ isActive }) =>
                `${navLinkBase} ${
                  isActive
                    ? scrolled ? 'text-[color:var(--ink)]' : 'text-white'
                    : scrolled
                      ? 'text-[color:var(--body)] hover:text-[color:var(--ink)]'
                      : 'text-white/75 hover:text-white'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {l.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-line"
                      className="absolute -bottom-1.5 left-0 h-px w-full bg-[#B8924A]"
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}

          {/* Lang + theme + CTA */}
          <div className="flex items-center gap-4 pl-2">
            <div className="flex items-center gap-0.5">
              {['EN', 'ES'].map((code) => (
                <button
                  key={code}
                  onClick={() => setLang(code.toLowerCase())}
                  className={`px-1.5 font-display font-bold text-[0.72rem] uppercase tracking-[0.1em] transition-colors ${
                    lang === code.toLowerCase()
                      ? 'text-[color:var(--gold)]'
                      : scrolled ? 'text-[color:var(--muted)] hover:text-[color:var(--body)]' : 'text-white/50 hover:text-white/80'
                  }`}
                >
                  {code}
                </button>
              ))}
            </div>
            <div className={`h-4 w-px ${scrolled ? 'bg-[color:var(--border)]' : 'bg-white/20'}`} />
            <button
              onClick={toggleTheme}
              aria-label={theme === 'dark' ? t('common.lightMode') : t('common.darkMode')}
              className={`transition-colors ${scrolled ? 'text-[color:var(--muted)] hover:text-[color:var(--gold)]' : 'text-white/50 hover:text-white'}`}
            >
              {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
            </button>
            <Link to="/contacto" className="btn-dark ml-2">
              {t('common.contactUs')}
            </Link>
          </div>
        </div>

        {/* Mobile */}
        <div className="flex items-center gap-3 md:hidden">
          <button
            onClick={toggleTheme}
            className={scrolled ? 'text-[#9A9A9A]' : 'text-white/70'}
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <button
            onClick={() => setOpen((v) => !v)}
            className={scrolled ? 'text-[#141414]' : 'text-white'}
            aria-label="Menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-[color:var(--border)] bg-[color:var(--bg)] md:hidden"
          >
            <div className="container-content flex flex-col py-5">
              {links.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  end={l.to === '/'}
                  className={({ isActive }) =>
                    `border-b border-[color:var(--border)] py-4 font-display font-bold text-[0.8rem] uppercase tracking-[0.06em] ${
                      isActive ? 'text-[color:var(--gold)]' : 'text-[color:var(--body)]'
                    }`
                  }
                >
                  {l.label}
                </NavLink>
              ))}
              <div className="flex items-center gap-4 pt-5">
                <div className="flex gap-2">
                  {['EN', 'ES'].map((code) => (
                    <button
                      key={code}
                      onClick={() => setLang(code.toLowerCase())}
                      className={`font-display font-bold text-xs uppercase tracking-widest ${
                        lang === code.toLowerCase() ? 'text-[#B8924A]' : 'text-[#9A9A9A]'
                      }`}
                    >
                      {code}
                    </button>
                  ))}
                </div>
                <Link to="/contacto" className="btn-dark ml-auto text-xs">
                  {t('common.contactUs')}
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
