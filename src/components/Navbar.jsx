import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTransitionTrigger } from './TransitionProvider'

const NAV = [
  { label: 'Home',        id: 'hero' },
  { label: 'About',       id: 'about' },
  { label: 'Skills',      id: 'skills' },
  { label: 'Projects',    id: 'projects' },
  { label: 'Achievements',id: 'achievements' },
  { label: 'Contact',     id: 'contact' },
]

function ScrollBar() {
  const [pct, setPct] = useState(0)
  useEffect(() => {
    const fn = () => {
      const d = document.documentElement
      setPct(d.scrollHeight > d.clientHeight ? (d.scrollTop / (d.scrollHeight - d.clientHeight)) * 100 : 0)
    }
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])
  return <div id="scroll-bar" style={{ width: `${pct}%` }} />
}

function BackToTop() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const fn = () => setShow(window.scrollY > 500)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])
  return (
    <AnimatePresence>
      {show && (
        <motion.button id="back-top"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <svg width="18" height="18" fill="none" stroke="#fff" strokeWidth="2.5" viewBox="0 0 24 24">
            <polyline points="18 15 12 9 6 15"/>
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  )
}

export default function Navbar({ dark, setDark }) {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive]     = useState('hero')
  const [open, setOpen]         = useState(false)
  const transitionTrigger       = useTransitionTrigger()
  const pillRef                 = useRef(null)
  const [indicator, setIndicator] = useState({ left: 0, width: 0 })

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn, { passive: true }); fn()
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id) }),
      { threshold: 0.25 }
    )
    
    const observed = new Set()
    const checkElements = () => {
      NAV.forEach(l => {
        if (!observed.has(l.id)) {
          const el = document.getElementById(l.id)
          if (el) {
            obs.observe(el)
            observed.add(l.id)
          }
        }
      })
      if (observed.size === NAV.length) clearInterval(interval)
    }
    
    const interval = setInterval(checkElements, 500)
    checkElements()
    
    return () => {
      clearInterval(interval)
      obs.disconnect()
    }
  }, [])

  // Animate sliding indicator to active tab
  useEffect(() => {
    if (!pillRef.current) return
    const activeBtn = pillRef.current.querySelector(`[data-nav="${active}"]`)
    if (activeBtn) {
      const pillRect = pillRef.current.getBoundingClientRect()
      const btnRect = activeBtn.getBoundingClientRect()
      setIndicator({
        left: btnRect.left - pillRect.left,
        width: btnRect.width,
      })
    }
  }, [active])

  const go = id => {
    setOpen(false)
    if (transitionTrigger) {
      transitionTrigger(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'auto' })
      })
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      <ScrollBar />
      <BackToTop />
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16,1,0.3,1], delay: 0.1 }}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
          height: 68,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0 28px',
        }}
      >
        {/* Logo — left side */}
        <button onClick={() => go('hero')} style={{ display: 'flex', alignItems: 'center', gap: 10, zIndex: 10 }}>
          <motion.div
            whileHover={{ rotate: 5, scale: 1.05 }}
            style={{
              width: 40, height: 40, borderRadius: 12, background: 'var(--grad)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 14, color: '#fff',
              boxShadow: '0 4px 14px rgba(192,112,40,0.3)',
            }}
          >DK</motion.div>
          <span className="hide-mobile" style={{ fontFamily: 'var(--font-head)', fontWeight: 800, fontSize: '1.05rem', color: 'var(--text)' }}>
            Deepak<span style={{ color: 'var(--accent)' }}> Kumar</span>
          </span>
        </button>

        {/* Center Floating Pill Nav — desktop only */}
        <div
          ref={pillRef}
          className="hide-mobile"
          style={{
            position: 'absolute',
            left: '50%', transform: 'translateX(-50%)',
            display: 'flex', alignItems: 'center', gap: 2,
            padding: '5px 6px',
            borderRadius: 50,
            background: scrolled ? 'var(--nav-bg)' : 'rgba(255,255,255,0.03)',
            backdropFilter: scrolled ? 'blur(28px) saturate(1.4)' : 'blur(12px)',
            border: `1px solid ${scrolled ? 'var(--nav-border)' : 'rgba(255,255,255,0.04)'}`,
            boxShadow: scrolled ? '0 4px 24px rgba(0,0,0,0.08)' : 'none',
            transition: 'all 0.4s ease',
          }}
        >
          {/* Animated sliding indicator */}
          <motion.div
            animate={{ left: indicator.left, width: indicator.width }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            style={{
              position: 'absolute',
              top: 5, height: 'calc(100% - 10px)',
              borderRadius: 50,
              background: 'var(--grad-soft)',
              border: '1px solid var(--grad-border)',
              pointerEvents: 'none',
            }}
          />
          {NAV.map(l => (
            <button
              key={l.id}
              data-nav={l.id}
              onClick={() => go(l.id)}
              style={{
                padding: '7px 16px', borderRadius: 50, fontSize: 13, fontWeight: 500,
                color: active === l.id ? 'var(--accent)' : 'var(--text-2)',
                background: 'transparent',
                transition: 'color 0.2s',
                position: 'relative', zIndex: 2,
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={e => { if (active !== l.id) e.currentTarget.style.color = 'var(--text)' }}
              onMouseLeave={e => { if (active !== l.id) e.currentTarget.style.color = 'var(--text-2)' }}
            >{l.label}</button>
          ))}
        </div>

        {/* Right side — theme + CTA */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, zIndex: 10 }}>
          <motion.button
            whileHover={{ scale: 1.1, rotate: 15 }} whileTap={{ scale: 0.9 }}
            className="icon-btn"
            onClick={() => setDark(d => !d)}
            title={dark ? 'Light Mode' : 'Dark Mode'}
          >
            {dark
              ? <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
              : <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>
            }
          </motion.button>
          <motion.button
            onClick={() => go('contact')}
            className="btn-grad hide-mobile"
            style={{ padding: '8px 22px', fontSize: 13 }}
            whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
          >Hire Me</motion.button>
          <button id="hamburger"
            onClick={() => setOpen(o => !o)}
            style={{
              width: 38, height: 38, borderRadius: 9, display: 'none',
              alignItems: 'center', justifyContent: 'center',
              border: '1px solid var(--border)', background: 'var(--bg-card)',
            }}
          >
            <svg width="18" height="18" fill="none" stroke="var(--text)" strokeWidth="2" viewBox="0 0 24 24">
              {open ? <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></> : <><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></>}
            </svg>
          </button>
        </div>
      </motion.nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            transition={{ duration: 0.28, ease: [0.16,1,0.3,1] }}
            style={{
              position: 'fixed', top: 68, right: 0, bottom: 0, width: 280,
              background: 'var(--nav-bg)', backdropFilter: 'blur(28px)',
              borderLeft: '1px solid var(--nav-border)',
              zIndex: 999, padding: '24px 18px',
              display: 'flex', flexDirection: 'column', gap: 4,
            }}
          >
            {NAV.map((l, i) => (
              <motion.button key={l.id} onClick={() => go(l.id)}
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04 }}
                style={{
                  padding: '13px 16px', borderRadius: 12, textAlign: 'left',
                  color: active === l.id ? 'var(--accent)' : 'var(--text-2)',
                  background: active === l.id ? 'var(--grad-soft)' : 'transparent',
                  border: active === l.id ? '1px solid var(--grad-border)' : '1px solid transparent',
                  fontSize: 15, fontWeight: 600,
                  fontFamily: 'var(--font-head)',
                }}
              >{l.label}</motion.button>
            ))}
            <div style={{ marginTop: 'auto', paddingTop: 16, borderTop: '1px solid var(--border)' }}>
              <button onClick={() => go('contact')} className="btn-grad" style={{ width: '100%', justifyContent: 'center' }}>
                Hire Me
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
