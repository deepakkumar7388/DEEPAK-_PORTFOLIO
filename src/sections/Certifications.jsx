import React, { useState } from 'react'
import { motion } from 'framer-motion'

const CERTS = [
  {
    emoji: '🌐',
    title: 'Cisco — CCNA Complete Suite',
    sub: 'All 3 Core Networking Modules',
    detail: 'Completed all core CCNA modules: 1. Introduction to Networks, 2. Switching, Routing & Wireless Essentials, and 3. Enterprise Networking, Security & Automation.',
    issuer: 'Cisco Networking Academy — SISTec',
    year: 'May–Jun 2026',
    badge: 'CCNA Suite',
    color: '#3b82f6', // Cisco Blue
  },
  {
    emoji: '🤖',
    title: 'Cisco — Apply AI',
    sub: 'Analyze Customer Reviews',
    detail: 'Learned practical AI techniques for customer sentiment analysis and business intelligence.',
    issuer: 'Cisco Networking Academy — SISTec',
    year: '2026',
    badge: 'AI Certified',
    color: '#8b5cf6', // Violet
  },
  {
    emoji: '☁️',
    title: 'AWS Academy Graduate',
    sub: 'Cloud Foundations',
    detail: 'Completed 20-hour AWS Cloud Foundations covering EC2, S3, IAM, VPC, and cloud economics.',
    issuer: 'Amazon Web Services Academy',
    year: '2026',
    badge: '20 Hours',
    color: '#f59e0b', // Gold / Orange
  },
  {
    emoji: '🏆',
    title: 'National Level Hackathons',
    sub: 'Hacknova 1.0 & Oriental TechHack 2.0',
    detail: 'Participated in Bhabha University\'s Hacknova 1.0 (finalist representing "404 Found Us") and successfully competed in OIST Bhopal\'s Oriental TechHack 2.0 national hackathon.',
    issuer: 'Bhabha University / OIST Bhopal',
    year: 'Apr 2026',
    badge: 'Hackathons',
    color: '#ec4899', // Pink
  },
  {
    emoji: '🌟',
    title: 'Sagar Euphoria 2026',
    sub: 'Branch Master Competition',
    detail: 'Actively participated in the Branch Master technical competition during the Sagar Euphoria 2026 annual festival, recognised by SISTec Ratibad principals.',
    issuer: 'SISTec Ratibad Campus, Bhopal',
    year: '2026',
    badge: 'College Fest',
    color: '#10b981', // Emerald Green
  },
  {
    emoji: '🐍',
    title: 'Cisco — Python Essentials',
    sub: 'Python Essentials 1 & 2',
    detail: 'Covered Python fundamentals, OOP concepts, file I/O, and exception handling.',
    issuer: 'Cisco Networking Academy',
    year: '2024',
    badge: 'Python',
    color: '#06b6d4', // Cyan
  },
  {
    emoji: '🔒',
    title: 'Cisco — Cybersecurity',
    sub: 'Introduction to Cybersecurity',
    detail: 'Covered cyber threats, vulnerabilities, security controls, and professional awareness.',
    issuer: 'Cisco Networking Academy',
    year: '2024',
    badge: 'Security',
    color: '#3b82f6', // Sapphire Blue
  },
]

function CertCard({ c, i }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [hovered, setHovered] = useState(false)

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    // Max rotation 9 degrees for water floating boat feel
    const rX = -(y / (rect.height / 2)) * 9
    const rY = (x / (rect.width / 2)) * 9
    setTilt({ x: rX, y: rY })
  }

  const handleMouseEnter = () => {
    setHovered(true)
  }

  const handleMouseLeave = () => {
    setHovered(false)
    setTilt({ x: 0, y: 0 })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 22, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{ duration: 0.48, delay: i * 0.08 }}
      style={{ width: '100%', height: '100%' }}
    >
      <div
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          background: 'var(--bg-card)',
          borderLeft: '1.5px solid',
          borderRight: '1.5px solid',
          borderBottom: '1.5px solid',
          borderTop: `5px solid ${c.color}`,
          borderColor: hovered ? c.color : 'var(--border)',
          borderRadius: 18,
          padding: '26px 22px',
          boxShadow: hovered ? `0 14px 40px ${c.color}22` : `0 6px 20px rgba(0, 0, 0, 0.05)`,
          transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale3d(${hovered ? 1.015 : 1}, ${hovered ? 1.015 : 1}, 1)`,
          transition: hovered ? 'border-color 0.25s, box-shadow 0.25s' : 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
          transformStyle: 'preserve-3d',
          cursor: 'default',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          overflow: 'hidden',
          width: '100%',
          height: '100%'
        }}
      >
        {/* Dynamic light color-tinted card background block */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: `linear-gradient(135deg, ${c.color}03 0%, transparent 100%)`,
          pointerEvents: 'none',
          zIndex: 0
        }} />

        <div style={{ position: 'relative', zIndex: 1, height: '100%', display: 'flex', flexDirection: 'column' }}>
          {/* Top row */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
            <div style={{
              width: 44,
              height: 44,
              borderRadius: 12,
              fontSize: 20,
              background: `${c.color}12`,
              border: `1px solid ${c.color}25`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: `0 4px 12px ${c.color}0a`
            }}>{c.emoji}</div>
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 9.5,
              fontWeight: 700,
              padding: '4px 10px',
              borderRadius: 99,
              background: `${c.color}10`,
              border: `1px solid ${c.color}20`,
              color: c.color,
              letterSpacing: '0.02em',
              textTransform: 'uppercase'
            }}>{c.badge}</span>
          </div>

          <h4 style={{ 
            fontFamily: 'var(--font-head)', 
            fontWeight: 700, 
            fontSize: '0.96rem', 
            color: 'var(--text)', 
            marginBottom: 4, 
            lineHeight: 1.35 
          }}>
            {c.title}
          </h4>
          <p style={{ 
            color: c.color, 
            fontFamily: 'var(--font-mono)', 
            fontSize: 10.5, 
            fontWeight: 700, 
            marginBottom: 12,
            letterSpacing: '0.01em'
          }}>
            {c.sub}
          </p>
          <p style={{ 
            color: 'var(--text-2)', 
            fontSize: '0.83rem', 
            lineHeight: 1.7, 
            marginBottom: 20 
          }}>
            {c.detail}
          </p>

          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            borderTop: '1px solid var(--border)', 
            paddingTop: 14, 
            marginTop: 'auto' 
          }}>
            <span style={{ 
              color: 'var(--text-3)', 
              fontSize: 10.5, 
              fontFamily: 'var(--font-mono)', 
              lineHeight: 1.3 
            }}>
              {c.issuer}
            </span>
            <span style={{ 
              color: c.color, 
              fontSize: 11, 
              fontWeight: 800, 
              fontFamily: 'var(--font-mono)', 
              flexShrink: 0 
            }}>
              {c.year}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function Certifications() {
  return (
    <section id="certifications" className="section" style={{ background: 'var(--bg)', position: 'relative' }}>
      {/* Ambient background glow matching Section theme */}
      <div className="aurora a-blue" style={{ width: 380, height: 380, top: '10%', left: '-5%', opacity: 0.25 }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>

        <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <p className="kicker"> Certifications</p>
          <h2 className="section-h2">Verified <span className="gradient-text">Credentials</span></h2>
          <p className="section-lead">Industry-recognized certifications across AI, cloud, security, and development.</p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))', gap: 16 }}>
          {CERTS.map((c, i) => <CertCard key={i} c={c} i={i} />)}
        </div>
      </div>
    </section>
  )
}
