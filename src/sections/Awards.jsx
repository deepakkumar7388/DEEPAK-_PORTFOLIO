import React, { useState, useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import mongodbCert from '../assets/mongodb.png'
import bgiCert from '../assets/BGI_Certificate.png'

/* ── Highlight items for the scrolling ribbon ── */
const HIGHLIGHTS = [
  { emoji: '🍃', title: 'MongoDB Immersion Day', sub: 'Real-world Data & AI', color: '#10b981' },
  { emoji: '🏆', title: 'National Hackathon Finalist', sub: 'Hacknova 1.0 & Oriental TechHack 2.0', color: '#ec4899' },
  { emoji: '☁️', title: 'AWS Academy Graduate', sub: 'Cloud Foundations — 20 Hours', color: '#f59e0b' },
  { emoji: '🚀', title: 'Live Campus Deployment', sub: 'SISTec Digital Pass — 1000+ Users', color: '#10b981' },
  { emoji: '🌱', title: 'AI Project Finalist', sub: 'AgroTech AI — BGI Hackathon', color: '#3b82f6' },
]

/* ── All credentials (merged awards + certs) ── */
const CREDENTIALS = [
  { emoji: '🍃', title: 'Industry Immersion Day', sub: 'Real-world Data & AI', issuer: 'MongoDB & ICT Academy', year: 'Jul 2026', color: '#10b981', image: mongodbCert },
  { emoji: '🌐', title: 'Cisco CCNA Complete Suite', sub: 'All 3 Core Networking Modules', issuer: 'Cisco Networking Academy', year: 'May–Jun 2026', color: '#3b82f6' },
  { emoji: '🤖', title: 'Cisco — Apply AI', sub: 'Analyze Customer Reviews', issuer: 'Cisco Networking Academy', year: '2026', color: '#8b5cf6' },
  { emoji: '☁️', title: 'AWS Academy Graduate', sub: 'Cloud Foundations', issuer: 'Amazon Web Services', year: '2026', color: '#f59e0b' },
  { emoji: '🏆', title: 'National Hackathons', sub: 'Hacknova 1.0 & TechHack 2.0', issuer: 'Bhabha University / OIST', year: 'Apr 2026', color: '#ec4899', image: bgiCert },
  { emoji: '🌟', title: 'Sagar Euphoria 2026', sub: 'Branch Master Competition', issuer: 'SISTec Ratibad Campus', year: '2026', color: '#10b981' },
  { emoji: '🚀', title: 'SISTec Digital Pass', sub: 'Live Production Deployment', issuer: 'SISTec Bhopal', year: '2026', color: '#0ea5e9' },
  { emoji: '🌱', title: 'AgroTech AI — Finalist', sub: 'Top AI Project Finalist', issuer: 'BGI Hackathon', year: '2025', color: '#3b82f6' },
  { emoji: '🐍', title: 'Cisco Python Essentials', sub: 'Python Essentials 1 & 2', issuer: 'Cisco Networking Academy', year: '2024', color: '#06b6d4' },
  { emoji: '🔒', title: 'Cisco Cybersecurity', sub: 'Intro to Cybersecurity', issuer: 'Cisco Networking Academy', year: '2024', color: '#3b82f6' },
]

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-30px' },
  transition: { duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] },
})

function HighlightCard({ h }) {
  return (
    <div style={{
      flexShrink: 0, width: 300, padding: '22px 24px',
      background: 'var(--bg-card)', border: '1px solid var(--border)',
      borderTop: `3px solid ${h.color}`,
      borderRadius: 18, backdropFilter: 'blur(20px)',
      display: 'flex', alignItems: 'center', gap: 14,
      transition: 'border-color 0.2s, box-shadow 0.2s',
    }}
    onMouseEnter={e => { e.currentTarget.style.borderColor = h.color; e.currentTarget.style.boxShadow = `0 8px 28px ${h.color}15` }}
    onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.boxShadow = 'none' }}
    >
      <div style={{
        width: 48, height: 48, borderRadius: 13, fontSize: 22, flexShrink: 0,
        background: `${h.color}12`, border: `1px solid ${h.color}25`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>{h.emoji}</div>
      <div>
        <h4 style={{ fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: '0.88rem', color: 'var(--text)', lineHeight: 1.25, marginBottom: 3 }}>{h.title}</h4>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, color: h.color, fontWeight: 600 }}>{h.sub}</p>
      </div>
    </div>
  )
}

function CredentialCard({ c, i }) {
  const [hovered, setHovered] = useState(false)
  const cardRef = useRef(null)

  // 3D Tilt Values
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springConfig = { damping: 30, stiffness: 300, mass: 0.5 }
  const springX = useSpring(mouseX, springConfig)
  const springY = useSpring(mouseY, springConfig)

  const rotateX = useTransform(springY, [-0.5, 0.5], [8, -8])
  const rotateY = useTransform(springX, [-0.5, 0.5], [-8, 8])

  const handleMouseMove = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    cardRef.current.style.setProperty('--mouse-x', `${x}px`)
    cardRef.current.style.setProperty('--mouse-y', `${y}px`)

    const pctX = (x / rect.width) - 0.5
    const pctY = (y / rect.height) - 0.5
    mouseX.set(pctX)
    mouseY.set(pctY)
  }

  const handleMouseLeave = () => {
    setHovered(false)
    mouseX.set(0)
    mouseY.set(0)
  }

  const CardComponent = c.image ? motion.a : motion.div
  const extraProps = c.image ? { href: c.image, target: '_blank', rel: 'noopener noreferrer' } : {}

  return (
    <CardComponent
      {...extraProps}
      ref={cardRef}
      initial={{ opacity: 0, y: 18, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{ duration: 0.4, delay: i * 0.05 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      className="project-card-gh"
      style={{
        rotateX,
        rotateY,
        transformPerspective: 1200,
        scale: hovered ? 1.02 : 1,
        background: 'var(--bg-card)',
        border: `1.5px solid ${hovered ? c.color + '40' : 'var(--border)'}`,
        borderTop: `3px solid ${c.color}`,
        borderRadius: 16, padding: '22px 20px',
        boxShadow: hovered ? `0 10px 30px ${c.color}12` : 'var(--shadow-sm)',
        transition: 'border 0.3s ease, box-shadow 0.3s ease, background 0.3s ease',
        transformStyle: 'preserve-3d',
        display: 'flex', flexDirection: 'column', height: '100%',
        ...(c.image ? { textDecoration: 'none', cursor: 'pointer' } : {})
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
        <div style={{
          width: 40, height: 40, borderRadius: 11, fontSize: 18,
          background: `${c.color}12`, border: `1px solid ${c.color}25`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>{c.emoji}</div>
        <span style={{
          fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 700,
          color: c.color, background: `${c.color}10`, border: `1px solid ${c.color}20`,
          padding: '3px 9px', borderRadius: 99,
        }}>{c.year}</span>
      </div>
      <h4 style={{ fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: '0.9rem', color: 'var(--text)', lineHeight: 1.3, marginBottom: 3 }}>{c.title}</h4>
      <p style={{ color: c.color, fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 700, marginBottom: 10 }}>{c.sub}</p>
      <p style={{ color: 'var(--text-3)', fontSize: 11, fontFamily: 'var(--font-mono)', marginTop: 'auto', paddingTop: 12, borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {c.issuer}
        {c.image && <span style={{ fontSize: 10, color: c.color, fontWeight: 'bold' }}>View ↗</span>}
      </p>
    </CardComponent>
  )
}

export default function Achievements() {
  return (
    <section id="achievements" className="section" style={{ background: 'var(--bg-alt)', position: 'relative', overflow: 'hidden' }}>
      <div className="aurora a-violet" style={{ width: 420, height: 420, top: '5%', right: '-5%', opacity: 0.35 }} />
      <div className="aurora a-blue" style={{ width: 350, height: 350, bottom: '5%', left: '-5%', opacity: 0.3, animationDelay: '4s' }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <motion.div {...fadeUp(0)}>
          <p className="kicker">04 / Achievements</p>
          <h2 className="section-h2">Recognition & <span className="gradient-text">Credentials</span></h2>
          <p className="section-lead">Certifications, hackathon wins, live deployments, and project awards that define my journey.</p>
        </motion.div>

        {/* ── Scrolling Highlight Ribbon ── */}
        <motion.div {...fadeUp(0.1)} style={{ marginBottom: 48 }}>
          <div style={{
            overflow: 'hidden',
            maskImage: 'linear-gradient(90deg, transparent, black 5%, black 95%, transparent)',
            WebkitMaskImage: 'linear-gradient(90deg, transparent, black 5%, black 95%, transparent)',
          }}>
            <div className="marquee-track" style={{ gap: 16, animationDuration: '25s' }}>
              {[...HIGHLIGHTS, ...HIGHLIGHTS].map((h, i) => (
                <HighlightCard key={`${h.title}-${i}`} h={h} />
              ))}
            </div>
          </div>
        </motion.div>

        {/* ── Credential Grid ── */}
        <motion.div {...fadeUp(0.15)}>
          <p style={{
            fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-3)',
            marginBottom: 20, textTransform: 'uppercase', letterSpacing: '0.14em',
          }}>All Certifications & Awards</p>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
          gap: 14,
        }}>
          {CREDENTIALS.map((c, i) => (
            <CredentialCard key={i} c={c} i={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
