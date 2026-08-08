import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { TypeAnimation } from 'react-type-animation'

const STATS = [
  { value: '4+', label: 'Projects' },
  { value: '6+', label: 'Certifications' },
  { value: '81%', label: 'NPTEL Score' },
  { value: '3rd Year', label: 'B.Tech CSE' },
]

const SOCIALS = [
  { href: 'https://github.com/deepakkumar7388', title: 'GitHub', d: 'M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z' },
  { href: 'https://linkedin.com/in/deepak-kumar-84599b308', title: 'LinkedIn', d: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' },
]

export default function Hero() {
  const [mobile, setMobile] = useState(false)
  useEffect(() => {
    const fn = () => setMobile(window.innerWidth < 900)
    fn(); window.addEventListener('resize', fn)
    return () => window.removeEventListener('resize', fn)
  }, [])

  const profileUrl = new URL('../assets/profile.jpeg', import.meta.url).href

  return (
    <section id="hero" style={{
      minHeight: '100vh', display: 'flex', flexDirection: 'column',
      justifyContent: 'center', position: 'relative', overflow: 'hidden',
      padding: mobile ? '100px 0 50px' : '80px 0 0',
    }}>
      {/* Background gradient mesh */}
      <div className="gradient-mesh" style={{ position: 'absolute', inset: 0, zIndex: 0 }} />

      {/* Decorative glowing orbs */}
      <div style={{
        position: 'absolute', width: 420, height: 420, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(240,160,80,0.12), transparent 70%)',
        top: '10%', right: '-5%', filter: 'blur(60px)', zIndex: 0,
      }} />
      <div style={{
        position: 'absolute', width: 320, height: 320, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(224,120,64,0.08), transparent 70%)',
        bottom: '15%', left: '-3%', filter: 'blur(50px)', zIndex: 0,
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>

        {/* ═══ MAIN HERO GRID ═══ */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: mobile ? '1fr' : '1fr 420px',
          gap: mobile ? 32 : 56,
          alignItems: 'center',
          minHeight: mobile ? 'auto' : 'calc(100vh - 200px)',
        }}>

          {/* ── LEFT: Text content ── */}
          <div style={{ order: mobile ? 2 : 1 }}>

            {/* Status pill */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <span className="status-pill" style={{ marginBottom: 24, display: 'inline-flex' }}>
                <span className="pulse-dot" />
                Open to Internship & Entry-Level Roles
              </span>
            </motion.div>

            {/* Greeting */}
            <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}
              style={{
                fontFamily: 'var(--font-script)', fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
                color: 'var(--text-2)', marginBottom: 6, marginTop: 18,
              }}>Hello, I'm</motion.p>

            {/* Name */}
            <motion.h1 initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: 'var(--font-head)',
                fontWeight: 800,
                fontSize: 'clamp(2.4rem, 6vw, 4.2rem)',
                lineHeight: 1.08, letterSpacing: '-0.03em',
                marginBottom: 12,
              }}
            >
              <span className="gradient-text">Deepak</span>{' '}
              <span style={{ color: 'var(--text)' }}>Kumar</span>
            </motion.h1>

            {/* Role chip + Typewriter */}
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}
              style={{ marginBottom: 22 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                <span style={{
                  fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 600,
                  color: 'var(--accent)', background: 'var(--grad-soft)',
                  border: '1px solid var(--grad-border)',
                  padding: '5px 14px', borderRadius: 8,
                }}>{'</>'} Full-Stack Developer</span>
                <span style={{ color: 'var(--text-3)', fontSize: 14 }}>•</span>
                <TypeAnimation
                  sequence={['Web Apps', 2200, 'Android Apps', 2200, 'AI Platforms', 2200, 'Scalable Systems', 2200]}
                  wrapper="span" speed={55} repeat={Infinity}
                  style={{ fontFamily: 'var(--font-head)', fontSize: 'clamp(1rem, 2vw, 1.2rem)', color: 'var(--accent)', fontWeight: 700 }}
                />
              </div>
            </motion.div>

            {/* Description */}
            <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.85 }}
              style={{
                color: 'var(--text-2)', lineHeight: 1.85, fontSize: '0.95rem',
                maxWidth: 520, marginBottom: 32,
              }}>
              3rd-year <strong style={{ color: 'var(--text)' }}>B.Tech CSE</strong> student at{' '}
              <strong style={{ color: 'var(--text)' }}>SISTec Bhopal</strong> —
              building production-grade web platforms, AI-powered systems, and Android apps.
              Cisco, AWS &amp; Hackathon certified. Always shipping real products.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.95 }}
              style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginBottom: 32 }}>
              <motion.a href="#projects"
                onClick={e => { e.preventDefault(); document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }) }}
                className="btn-grad" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21" /></svg>
                View My Work
              </motion.a>
              <motion.a href="#contact"
                onClick={e => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }) }}
                className="btn-ghost" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
                Hire Me
              </motion.a>
            </motion.div>

            {/* Social Links */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.05 }}
              style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Follow</span>
              <div style={{ width: 24, height: 1, background: 'var(--border)' }} />
              {SOCIALS.map(s => (
                <motion.a key={s.title} href={s.href} target="_blank" rel="noreferrer"
                  title={s.title} className="icon-btn" style={{ width: 38, height: 38 }}
                  whileHover={{ scale: 1.15, y: -2 }}>
                  <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d={s.d} /></svg>
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* ── RIGHT: Profile Photo ── */}
          <div style={{ order: mobile ? 1 : 2, display: 'flex', justifyContent: 'center' }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              style={{ position: 'relative' }}
            >
              {/* Decorative rotating ring behind photo */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                style={{
                  position: 'absolute',
                  top: -18, left: -18, right: -18, bottom: -18,
                  borderRadius: '50%',
                  border: '1.5px dashed var(--grad-border)',
                  opacity: 0.5,
                }}
              />

              {/* Main photo container */}
              <div style={{
                width: mobile ? 240 : 320,
                height: mobile ? 240 : 320,
                borderRadius: '50%',
                background: 'var(--grad)',
                padding: 4,
                boxShadow: '0 0 60px rgba(240,160,80,0.2), 0 20px 60px rgba(0,0,0,0.15)',
                animation: 'floatY 5s ease-in-out infinite',
              }}>
                <div style={{
                  width: '100%', height: '100%', borderRadius: '50%',
                  overflow: 'hidden',
                  border: '4px solid var(--bg)',
                }}>
                  <img src={profileUrl} alt="Deepak Kumar" loading="eager"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                </div>
              </div>

              {/* Floating badge — top right */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                  position: 'absolute', top: mobile ? 0 : 10, right: mobile ? -10 : -20,
                  background: 'var(--bg-card)', border: '1px solid var(--border)',
                  borderRadius: 14, padding: '10px 14px', boxShadow: 'var(--shadow-md)',
                  backdropFilter: 'blur(16px)',
                  display: 'flex', alignItems: 'center', gap: 8,
                }}
              >
                <span style={{ fontSize: 18 }}>🏆</span>
                <div>
                  <div style={{ fontFamily: 'var(--font-head)', fontWeight: 800, fontSize: 14, color: 'var(--text)', lineHeight: 1 }}>81%</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 8.5, color: 'var(--text-3)', textTransform: 'uppercase' }}>NPTEL</div>
                </div>
              </motion.div>

              {/* Floating badge — bottom left */}
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                style={{
                  position: 'absolute', bottom: mobile ? 0 : 20, left: mobile ? -10 : -30,
                  background: 'var(--bg-card)', border: '1px solid var(--border)',
                  borderRadius: 14, padding: '10px 14px', boxShadow: 'var(--shadow-md)',
                  backdropFilter: 'blur(16px)',
                  display: 'flex', alignItems: 'center', gap: 8,
                }}
              >
                <span style={{ fontSize: 18 }}>☁️</span>
                <div>
                  <div style={{ fontFamily: 'var(--font-head)', fontWeight: 800, fontSize: 14, color: 'var(--text)', lineHeight: 1 }}>AWS</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 8.5, color: 'var(--text-3)', textTransform: 'uppercase' }}>Certified</div>
                </div>
              </motion.div>

              {/* Floating badge — bottom right */}
              <motion.div
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                style={{
                  position: 'absolute', bottom: mobile ? -10 : -5, right: mobile ? 20 : 15,
                  background: 'var(--bg-card)', border: '1px solid var(--border)',
                  borderRadius: 14, padding: '10px 14px', boxShadow: 'var(--shadow-md)',
                  backdropFilter: 'blur(16px)',
                  display: 'flex', alignItems: 'center', gap: 8,
                }}
              >
                <span style={{ fontSize: 18 }}>🚀</span>
                <div>
                  <div style={{ fontFamily: 'var(--font-head)', fontWeight: 800, fontSize: 14, color: 'var(--text)', lineHeight: 1 }}>4+</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 8.5, color: 'var(--text-3)', textTransform: 'uppercase' }}>Projects</div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* ═══ BOTTOM STATS BAR ═══ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${STATS.length}, 1fr)`,
            gap: mobile ? 10 : 1,
            marginTop: mobile ? 40 : 0,
            background: mobile ? 'transparent' : 'var(--bg-card)',
            border: mobile ? 'none' : '1px solid var(--border)',
            borderRadius: 18, overflow: 'hidden',
            backdropFilter: mobile ? 'none' : 'blur(20px)',
          }}
        >
          {STATS.map((s, i) => (
            <div key={s.label} style={{
              padding: mobile ? '16px 12px' : '22px 24px',
              textAlign: 'center',
              borderRight: (!mobile && i < STATS.length - 1) ? '1px solid var(--border)' : 'none',
              background: mobile ? 'var(--bg-card)' : 'transparent',
              border: mobile ? '1px solid var(--border)' : 'none',
              borderRadius: mobile ? 14 : 0,
            }}>
              <div style={{
                fontFamily: 'var(--font-head)', fontWeight: 800,
                fontSize: mobile ? '1.1rem' : '1.3rem',
                background: 'var(--grad)', WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                lineHeight: 1.1, marginBottom: 4,
              }}>{s.value}</div>
              <div style={{
                fontFamily: 'var(--font-mono)', fontSize: mobile ? 9 : 10,
                color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.08em',
              }}>{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}
        style={{
          position: mobile ? 'relative' : 'absolute',
          bottom: mobile ? 'auto' : 16, left: '50%', transform: 'translateX(-50%)',
          marginTop: mobile ? 30 : 0,
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, zIndex: 3,
        }}
      >
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--text-3)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>Scroll Down</span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.4, repeat: Infinity }}>
          <svg width="16" height="16" fill="none" stroke="var(--text-3)" strokeWidth="2" viewBox="0 0 24 24"><polyline points="6 9 12 15 18 9" /></svg>
        </motion.div>
      </motion.div>
    </section>
  )
}
