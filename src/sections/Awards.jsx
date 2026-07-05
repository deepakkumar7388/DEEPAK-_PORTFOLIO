import React, { useState } from 'react'
import { motion } from 'framer-motion'

const AWARDS = [
  {
    emoji: '🤖', year: '2026',
    title: 'Cisco — Apply AI: Analyze Customer Reviews',
    org: 'Sagar Group of Institutions — SISTec / Cisco Networking Academy',
    desc: 'Completed the Apply AI program covering practical techniques to analyze customer review data, sentiment classification, and business intelligence using AI models.',
    badge: 'AI Certified', color: '#6366f1', // Indigo
    prize: 'AI Analytics Graduate', prizeIcon: '🤖',
    link: 'https://github.com/deepakkumar7388'
  },
  {
    emoji: '☁️', year: '2026',
    title: 'AWS Academy Graduate — Cloud Foundations',
    org: 'Amazon Web Services Academy',
    desc: '20-hour structured program covering core AWS cloud concepts: infrastructure, EC2, S3, IAM, pricing models, security architecture, and hands-on lab assessments.',
    badge: '20 Hours', color: '#f59e0b', // Gold / Orange
    prize: 'Cloud Graduate Badge', prizeIcon: '☁️',
    link: 'https://github.com/deepakkumar7388'
  },
  {
    emoji: '🏆', year: 'Apr 2026',
    title: 'National Level Hackathons',
    org: 'Bhabha University / OIST Bhopal / Cybrom Tech',
    desc: 'Represented team "404 Found Us" as a shortlisted finalist at Hacknova 1.0 (Bhabha University, 18th Apr) and successfully competed in Oriental TechHack 2.0 (OIST Bhopal, 30th Apr) national level hackathon.',
    badge: 'Hackathons', color: '#ec4899', // Pink
    prize: 'Shortlisted Finalist & Competitor', prizeIcon: '🏆',
    link: 'https://github.com/deepakkumar7388'
  },
  {
    emoji: '🌟', year: '2026',
    title: 'Sagar Euphoria 2026 — Branch Master',
    org: 'SISTec Ratibad Campus, Bhopal',
    desc: 'Actively participated in the Branch Master competition at the Sagar Euphoria 2026 college fest, demonstrating technical leadership and domain expertise.',
    badge: 'College Fest', color: '#10b981', // Emerald Green
    prize: 'Branch Master Nominee', prizeIcon: '🌟',
    link: 'https://github.com/deepakkumar7388'
  },
  {
    emoji: '🚀', year: '2026',
    title: 'SISTec Digital Pass — Live Production Deployment',
    org: 'SISTec Bhopal',
    desc: 'Designed, developed, and deployed a full-stack RBAC-based digital pass management system for the SISTec campus, serving 1000+ students and faculty daily.',
    badge: 'Deployed', color: '#0ea5e9', // Cyan / Sky Blue
    prize: 'Live Campus Deployment', prizeIcon: '🚀',
    link: 'https://github.com/deepakkumar7388'
  },
  {
    emoji: '🌱', year: '2025',
    title: 'AgroTech AI — Best AI Project Award',
    org: 'SISTec College Tech Fest',
    desc: 'AgroTech AI, a satellite NDVI-based crop health monitoring and disease classification platform, was recognized as the Best AI Project at the SISTec Tech Fest 2025.',
    badge: 'Best AI Project', color: '#3b82f6', // Sapphire Blue
    prize: 'Best AI Project Award', prizeIcon: '🌱',
    link: 'https://github.com/deepakkumar7388'
  },
]

function AwardCard({ a, i }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [hovered, setHovered] = useState(false)

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    // Max rotation 8 degrees for water floating boat feel
    const rX = -(y / (rect.height / 2)) * 8
    const rY = (x / (rect.width / 2)) * 8
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
      initial={{ opacity: 0, x: -24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ delay: i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      style={{ position: 'relative', width: '100%' }}
    >
      {/* Dot */}
      <div style={{
        position: 'absolute', left: -45, top: 20,
        width: 20, height: 20, borderRadius: '50%',
        background: a.color,
        boxShadow: `0 0 0 4px ${a.color}22, 0 0 0 8px ${a.color}0e`,
        zIndex: 2
      }} />

      {/* Card Body */}
      <div
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          background: 'var(--bg-card)',
          borderLeft: '1.5px solid',
          borderRight: '1.5px solid',
          borderBottom: '1.5px solid',
          borderTop: `5px solid ${a.color}`,
          borderColor: hovered ? a.color : 'var(--border)',
          borderRadius: 18,
          padding: '24px 24px 20px',
          boxShadow: hovered ? `0 14px 40px ${a.color}22` : `0 6px 20px rgba(0, 0, 0, 0.05)`,
          transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale3d(${hovered ? 1.015 : 1}, ${hovered ? 1.015 : 1}, 1)`,
          transition: hovered ? 'border-color 0.25s, box-shadow 0.25s' : 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
          transformStyle: 'preserve-3d',
          cursor: 'default',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          overflow: 'hidden',
          width: '100%'
        }}
      >
        {/* Tinted background overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: `linear-gradient(135deg, ${a.color}03 0%, transparent 100%)`,
          pointerEvents: 'none',
          zIndex: 0
        }} />

        <div style={{ position: 'relative', zIndex: 1, width: '100%' }}>
          <div style={{ display: 'flex', gap: 18, width: '100%', marginBottom: 16 }}>
            <div style={{
              width: 50, height: 50, borderRadius: 13, flexShrink: 0,
              background: `${a.color}12`, border: `1px solid ${a.color}25`,
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22,
              boxShadow: `0 4px 12px ${a.color}0a`
            }}>{a.emoji}</div>

            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 8, marginBottom: 5 }}>
                <h4 style={{ fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: '0.96rem', color: 'var(--text)', lineHeight: 1.3 }}>{a.title}</h4>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexShrink: 0 }}>
                  <span style={{
                    fontFamily: 'var(--font-mono)', fontSize: 9.5, fontWeight: 700,
                    padding: '3px 9px', borderRadius: 99,
                    background: `${a.color}12`, border: `1px solid ${a.color}30`, color: a.color,
                  }}>{a.badge}</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-3)' }}>{a.year}</span>
                </div>
              </div>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, color: 'var(--text-3)', marginBottom: 8 }}>{a.org}</p>
              <p style={{ color: 'var(--text-2)', fontSize: '0.875rem', lineHeight: 1.7 }}>{a.desc}</p>
            </div>
          </div>

          {/* Bottom Row: Prize money & View Project link */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            borderTop: '1px solid var(--border)', 
            paddingTop: 14, 
            marginTop: 14 
          }}>
            <span style={{ 
              color: a.color, 
              fontSize: 12, 
              fontWeight: 700, 
              fontFamily: 'var(--font-mono)', 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: 6 
            }}>
              <span>{a.prizeIcon}</span>
              <span>{a.prize}</span>
            </span>
            <a href={a.link} target="_blank" rel="noreferrer" style={{ 
              color: a.color, 
              fontSize: 12.5, 
              fontWeight: 700, 
              fontFamily: 'var(--font-head)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 4,
              textDecoration: 'none'
            }}
            onMouseEnter={e => e.currentTarget.style.textDecoration = 'underline'}
            onMouseLeave={e => e.currentTarget.style.textDecoration = 'none'}
            >
              View Project <span>→</span>
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function Awards() {
  return (
    <section id="awards" className="section" style={{ background: 'var(--bg-alt)' }}>
      <div className="aurora a-violet" style={{ width: 420, height: 420, top: '5%', right: '-5%', opacity: 0.35 }} />
      <div className="aurora a-blue"   style={{ width: 350, height: 350, bottom: '5%', left: '-5%', opacity: 0.3, animationDelay: '4s' }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>

        <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <p className="kicker">Awards & Achievements</p>
          <h2 className="section-h2">Recognition &amp; <span className="gradient-text">Milestones</span></h2>
          <p className="section-lead">Certifications, hackathon participation, live deployments, and project recognitions.</p>
        </motion.div>

        {/* Timeline */}
        <div style={{ position: 'relative' }}>
          <div className="tl-line" />
          <div style={{ paddingLeft: 52, display: 'flex', flexDirection: 'column', gap: 24 }}>
            {AWARDS.map((a, i) => (
              <AwardCard key={i} a={a} i={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
