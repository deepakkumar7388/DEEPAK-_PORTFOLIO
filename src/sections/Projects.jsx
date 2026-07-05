import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const PROJECTS = [
  {
    id: 1, num: '01',
    title: 'Edutrack AI',
    tagline: 'AI-Powered Learning Management System',
    tags: ['Flutter', 'React.js', 'Next.js', 'MongoDB', 'Gemini AI', 'Node.js'],
    category: 'App & Web',
    badge: '⭐ FEATURED', badgeColor: '#6366f1', // Indigo
    year: '2026',
    emoji: '🎓',
    desc: 'A production-grade AI-powered LMS featuring automated quiz generation from uploaded study materials, personalized learning roadmaps, smart chatbot for course queries, and progress analytics.',
    highlights: [
      'Auto-generates quizzes from PDFs and text using Gemini API',
      'Personalized study plans with adaptive AI recommendations',
      'Interactive AI chatbot for real-time course support',
      'Student progress tracking and analytics dashboard',
    ],
    github: 'https://github.com/shivam1264/edutrack_ai',
    live: null,
  },
  {
    id: 2, num: '02',
    title: 'DualShield AI',
    tagline: 'Accident Detection & Safety Platform',
    tags: ['Kotlin', 'TensorFlow Lite', 'Node.js', 'Flask', 'MongoDB'],
    category: 'App',
    badge: '🤖 AI Safety', badgeColor: '#ec4899', // Pink
    year: '2026',
    emoji: '🛡️',
    desc: 'An AI-powered accident detection platform using TensorFlow Lite to classify real-time sensor data from accelerometer, gyroscope, and speed telemetry. Features emergency automated response workflows.',
    highlights: [
      'TF Lite models running on-device for real-time accident detection',
      'Android app with location tracking and automated SOS workflows',
      'Voice-based cancellation, emergency SMS alerts with GPS location',
      'Backend using Node.js & Flask for logging and hazard-zone alerts',
    ],
    github: 'https://github.com/deepakkumar7388',
    live: null,
  },
  {
    id: 3, num: '03',
    title: 'SISTec Digital Pass',
    tagline: 'Campus Gate Pass & Visitor Management',
    tags: ['Kotlin', 'React.js', 'Flask', 'MongoDB', 'Socket.IO', 'Redis', 'RBAC'],
    category: 'App & Web',
    badge: '🚀 Live System', badgeColor: '#10b981', // Emerald Green
    year: '2025–26',
    emoji: '🏫',
    desc: 'Developed a smart campus gate-pass and visitor management system with a 5-tier Role-Based Access Control (RBAC) hierarchy and real-time entry/exit tracking. Built and integrated 30+ REST APIs managing 12 MongoDB collections.',
    highlights: [
      '5-tier Role-Based Access Control (RBAC) hierarchy',
      'Real-time synchronization using Flask-SocketIO and Redis',
      'Geofencing-based location validation for secure pass generation',
      'Built 30+ REST APIs to support authentication and authorization',
    ],
    github: 'https://github.com/deepakkumar7388',
    live: null,
  },
  {
    id: 4, num: '04',
    title: 'Chaudhary Health Care',
    tagline: 'Hospital Management System',
    tags: ['Flutter', 'JavaScript', 'Node.js', 'MongoDB', 'Socket.IO', 'Firebase', 'PWA'],
    category: 'App & Web',
    badge: '🏥 HMS System', badgeColor: '#0ea5e9', // Cyan / Sky Blue
    year: '2025',
    emoji: '🏥',
    desc: 'Developed a responsive Hospital Management System (HMS) with a 4-tier Role-Based Access Control (RBAC) hierarchy to streamline patient admissions, bed management, and discharge workflows.',
    highlights: [
      '4-tier RBAC hierarchy streamlining hospital workflows',
      'Built and integrated 40+ REST APIs with 7 MongoDB collections',
      'Real-time dashboard updates using Socket.IO and Firebase (FCM)',
      'Configured as a Progressive Web App (PWA) with Android TWA wrapper',
    ],
    github: 'https://github.com/deepakkumar7388',
    live: null,
  },
  {
    id: 5, num: '05',
    title: 'AgroTech AI',
    tagline: 'Precision Agriculture Platform',
    tags: ['Python', 'Flask', 'MongoDB', 'XGBoost', 'LangGraph', 'Android'],
    category: 'App & Web',
    badge: '🌱 Agro Tech', badgeColor: '#f59e0b', // Gold / Orange
    year: '2025',
    emoji: '🌾',
    desc: 'An AI-powered precision agriculture platform integrating machine learning models for crop recommendation, fertilizer prediction, and plant disease detection alongside satellite-based NDVI analysis.',
    highlights: [
      'Satellite-based NDVI crop health analysis using Sentinel-2 imagery',
      'XGBoost ML models for crop and fertilizer recommendations',
      'Built 20+ REST APIs and managed 5 MongoDB collections',
      'Android application with weather forecasting and smart notifications',
    ],
    github: 'https://github.com/deepakkumar7388',
    live: null,
  },
  {
    id: 6, num: '06',
    title: 'SPIC Portal — spic.ac.in',
    tagline: 'College Management & Public Web Portal',
    tags: ['HTML', 'CSS', 'JavaScript'],
    category: 'Web',
    badge: '🏫 College Web', badgeColor: '#3b82f6', // Sapphire Blue
    year: '2025–26',
    emoji: '🏢',
    desc: 'Official website and admin portal for Sagar Private Industrial Training College. Integrated student dashboards, admission inquiry tracking, fees updates, and course structures.',
    highlights: [
      'Interactive Online Admission Form System',
      'Comprehensive Admin Control Panel',
      'Dynamic Syllabus & Notice Board Management',
    ],
    live: 'https://spic-college.netlify.app/',
  },
]

const CATS = ['All', 'Web', 'App', 'App & Web']

function ProjectDetailCard({ shown }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [hovered, setHovered] = useState(false)

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    const rX = -(y / (rect.height / 2)) * 5 // 5 degrees max tilt for large cards
    const rY = (x / (rect.width / 2)) * 5
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
      key={shown.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
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
          borderTop: `5px solid ${shown.badgeColor}`,
          borderColor: hovered ? shown.badgeColor : 'var(--border)',
          borderRadius: 22,
          padding: '34px 36px',
          boxShadow: hovered ? `0 14px 40px ${shown.badgeColor}22` : `0 6px 25px rgba(0, 0, 0, 0.05)`,
          transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale3d(${hovered ? 1.015 : 1}, ${hovered ? 1.015 : 1}, 1)`,
          transition: hovered ? 'border-color 0.25s, box-shadow 0.25s' : 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
          transformStyle: 'preserve-3d',
          cursor: 'default',
          position: 'relative',
          overflow: 'hidden',
          width: '100%',
          height: '100%'
        }}
      >

        {/* Dynamic color-tinted card background block */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: `linear-gradient(135deg, ${shown.badgeColor}02 0%, transparent 100%)`,
          pointerEvents: 'none',
          zIndex: 0
        }} />

        <div style={{ position: 'relative', zIndex: 1 }}>
          {/* Emoji + Badge row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
            <div style={{
              width: 54, height: 54, borderRadius: 14, fontSize: 26,
              background: `${shown.badgeColor}12`, border: `1px solid ${shown.badgeColor}25`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: `0 4px 12px ${shown.badgeColor}0a`
            }}>{shown.emoji}</div>
            {shown.badge && (
              <span style={{
                fontFamily: 'var(--font-mono)', fontSize: 10.5, fontWeight: 700,
                padding: '4px 12px', borderRadius: 99,
                background: `${shown.badgeColor}10`,
                border: `1px solid ${shown.badgeColor}20`,
                color: shown.badgeColor,
                textTransform: 'uppercase'
              }}>{shown.badge}</span>
            )}
          </div>

          {/* Title + Tagline */}
          <h3 style={{
            fontFamily: 'var(--font-head)', fontWeight: 800, fontSize: '1.6rem',
            color: 'var(--text)', lineHeight: 1.2, marginBottom: 6,
          }}>{shown.title}</h3>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11.5, color: 'var(--text-3)', marginBottom: 18 }}>{shown.tagline}</p>

          {/* Tech tags */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, marginBottom: 22 }}>
            {shown.tags.map(t => <span key={t} className="tag">{t}</span>)}
          </div>

          {/* Description */}
          <p style={{ color: 'var(--text-2)', lineHeight: 1.82, fontSize: '0.96rem', marginBottom: 24 }}>{shown.desc}</p>

          {/* Highlights */}
          <ul style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 30 }}>
            {shown.highlights.map(h => (
              <li key={h} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                <div style={{
                  width: 20, height: 20, borderRadius: '50%', flexShrink: 0, marginTop: 1,
                  background: `${shown.badgeColor}12`, border: `1.5px solid ${shown.badgeColor}25`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <svg width="10" height="10" fill="none" stroke={shown.badgeColor} strokeWidth="2.5" viewBox="0 0 24 24">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </div>
                <span style={{ color: 'var(--text-2)', fontSize: '0.91rem', lineHeight: 1.65 }}>{h}</span>
              </li>
            ))}
          </ul>

          {/* CTA row */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
            <a href={shown.github} target="_blank" rel="noreferrer" className="btn-grad"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
              </svg>
              View on GitHub
            </a>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-3)' }}>{shown.year}</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function Projects() {
  const [cat, setCat]     = useState('All')
  const [active, setActive] = useState(PROJECTS[0])

  const filtered = cat === 'All' ? PROJECTS : PROJECTS.filter(p => p.category === cat)
  const shown = filtered.find(p => p.id === active.id) || filtered[0]

  const handleCat = c => { setCat(c); setActive(PROJECTS.find(p => c === 'All' || p.category === c) || PROJECTS[0]) }

  return (
    <section id="projects" className="section" style={{ background: 'var(--bg)', position: 'relative' }}>
      {/* Dynamic background aurora */}
      <div className="aurora a-violet" style={{ width: 480, height: 480, top: '5%', right: '-8%', opacity: 0.3 }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>

        <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <p className="kicker">03 / Projects</p>
          <h2 className="section-h2"><span className="gradient-text">Projects</span></h2>
          <p className="section-lead">Production-grade systems built from scratch — real deployments, real users, real impact.</p>
        </motion.div>

        {/* Filter tabs */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          className="tabs" style={{ marginBottom: 36 }}>
          {CATS.map(c => (
            <button key={c} className={`tab${cat === c ? ' active' : ''}`} onClick={() => handleCat(c)}>{c}</button>
          ))}
        </motion.div>

        {/* Split pane layout */}
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,320px) 1fr', gap: 20, alignItems: 'start' }}>

          {/* Project list */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <AnimatePresence mode="popLayout">
              {filtered.map((p, i) => (
                <motion.button key={p.id}
                  layout
                  initial={{ opacity: 0, x: -18 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -18 }}
                  transition={{ delay: i * 0.06 }}
                  onClick={() => setActive(p)}
                  style={{
                    textAlign: 'left', padding: '16px 18px', borderRadius: 14, cursor: 'pointer',
                    border: `1.5px solid ${shown?.id === p.id ? p.badgeColor : 'var(--border)'}`,
                    background: shown?.id === p.id ? `${p.badgeColor}0d` : 'var(--bg-card)',
                    boxShadow: shown?.id === p.id ? `0 4px 15px ${p.badgeColor}15` : 'none',
                    transition: 'all 0.2s',
                    display: 'flex', alignItems: 'center', gap: 12,
                  }}
                  onMouseEnter={e => { if (shown?.id !== p.id) e.currentTarget.style.borderColor = p.badgeColor }}
                  onMouseLeave={e => { if (shown?.id !== p.id) e.currentTarget.style.borderColor = 'var(--border)' }}
                >
                  <span style={{ fontSize: 24, flexShrink: 0 }}>{p.emoji}</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 4 }}>
                      <span style={{
                        fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: '0.9rem', color: 'var(--text)',
                        overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                      }}>{p.title}</span>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-3)', flexShrink: 0 }}>{p.num}</span>
                    </div>
                    <div style={{ fontSize: '0.76rem', color: 'var(--text-3)', marginTop: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.tagline}</div>
                  </div>
                  <svg width="13" height="13" fill="none" stroke={shown?.id === p.id ? p.badgeColor : 'var(--text-3)'} strokeWidth="2" viewBox="0 0 24 24">
                    <polyline points="9 18 15 12 9 6"/>
                  </svg>
                </motion.button>
              ))}
            </AnimatePresence>
          </div>

          {/* Project detail panel */}
          <div style={{ minHeight: 450 }}>
            <AnimatePresence mode="wait">
              {shown && <ProjectDetailCard shown={shown} />}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <style>{`
        @media(max-width:768px){
          #projects .container > div:last-child{grid-template-columns:1fr!important}
        }
      `}</style>
    </section>
  )
}
