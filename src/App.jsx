import { useEffect } from 'react'
import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Lenis from 'lenis'

import Navbar         from './components/Navbar.jsx'
import Footer         from './components/Footer.jsx'
import ChatWidget     from './components/ChatWidget.jsx'
import LoadingScreen  from './components/LoadingScreen.jsx'
import CustomCursor   from './components/CustomCursor.jsx'
import CookieBanner   from './components/CookieBanner.jsx'

import Home           from './pages/Home.jsx'
import QuienesSomos   from './pages/QuienesSomos.jsx'
import Proyectos      from './pages/Proyectos.jsx'
import Noticias       from './pages/Noticias.jsx'
import NoticiaDetalle from './pages/NoticiaDetalle.jsx'
import Contacto       from './pages/Contacto.jsx'

import AdminLogin    from './admin/AdminLogin.jsx'
import AdminLayout   from './admin/AdminLayout.jsx'
import AdminDashboard from './admin/AdminDashboard.jsx'
import { AdminBlogList, AdminBlogEditor }       from './admin/AdminBlog.jsx'
import { AdminProjectsList, AdminProjectEditor } from './admin/AdminProjects.jsx'
import AdminImages   from './admin/AdminImages.jsx'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' })
  }, [pathname])
  return null
}

function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.08, smoothWheel: true })
    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)
    return () => lenis.destroy()
  }, [])
}

function PublicSite() {
  const location = useLocation()
  useLenis()

  return (
    <div className="grain relative min-h-screen bg-[color:var(--bg)]">
      <LoadingScreen />
      <CustomCursor />
      <ScrollToTop />
      <Navbar />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/"              element={<Home />} />
          <Route path="/quienes-somos" element={<QuienesSomos />} />
          <Route path="/proyectos"     element={<Proyectos />} />
          <Route path="/noticias"      element={<Noticias />} />
          <Route path="/noticias/:id"  element={<NoticiaDetalle />} />
          <Route path="/contacto"      element={<Contacto />} />
          <Route path="*"              element={<Home />} />
        </Routes>
      </AnimatePresence>
      <Footer />
      <ChatWidget />
      <CookieBanner />
    </div>
  )
}

export default function App() {
  const location = useLocation()
  const isAdmin  = location.pathname.startsWith('/admin')

  if (isAdmin) {
    return (
      <Routes>
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard"    element={<AdminDashboard />} />
          <Route path="blog"         element={<AdminBlogList />} />
          <Route path="blog/:id"     element={<AdminBlogEditor />} />
          <Route path="projects"     element={<AdminProjectsList />} />
          <Route path="projects/:id" element={<AdminProjectEditor />} />
          <Route path="images"       element={<AdminImages />} />
        </Route>
        <Route path="/admin/*" element={<Navigate to="/admin/dashboard" replace />} />
      </Routes>
    )
  }

  return <PublicSite />
}
