import React, { useState, useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

const PROJECTS = [
  {
    id: 1, title: 'SISTec Digital Pass', tagline: 'Campus Gate Pass & Visitor Management',
    tags: ['Kotlin', 'React.js', 'Flask', 'MongoDB', 'Socket.IO', 'Redis'],
    badge: '🚀 LIVE SYSTEM', badgeColor: '#10b981', year: '2025–26', emoji: '🏫', featured: true,
    desc: 'Smart campus gate-pass and visitor management system with 5-tier RBAC hierarchy and real-time entry/exit tracking. Built 30+ REST APIs managing 12 MongoDB collections.',
    highlights: ['5-tier Role-Based Access Control (RBAC)', 'Real-time sync using Flask-SocketIO & Redis', 'Geofencing-based location validation', '30+ REST APIs for auth and authorization'],
    github: 'https://github.com/deepakkumar7388',
  },
  {
    id: 2, title: 'Chaudhary Health Care', tagline: 'Hospital Management System',
    tags: ['Flutter', 'JavaScript', 'Node.js', 'MongoDB', 'Socket.IO', 'Firebase'],
    badge: '🏥 HMS', badgeColor: '#0ea5e9', year: '2025', emoji: '🏥',
    desc: 'Responsive Hospital Management System with 4-tier RBAC hierarchy to streamline patient admissions, bed management, and discharge workflows.',
    highlights: ['4-tier RBAC hospital workflows', '40+ REST APIs with 7 MongoDB collections', 'Real-time updates using Socket.IO & Firebase', 'PWA with Android TWA wrapper'],
    github: 'https://github.com/deepakkumar7388',
  },
  {
    id: 3, title: 'Edutrack AI', tagline: 'AI-Powered Learning Management System',
    tags: ['Flutter', 'React.js', 'Next.js', 'MongoDB', 'Gemini AI', 'Node.js'],
    badge: '⭐ FEATURED', badgeColor: '#f0a050', year: '2026', emoji: '🎓',
    desc: 'A production-grade AI-powered LMS featuring automated quiz generation from uploaded study materials, personalized learning roadmaps, smart chatbot for course queries, and progress analytics.',
    highlights: ['Auto-generates quizzes from PDFs and text using Gemini API', 'Personalized study plans with adaptive AI recommendations', 'Interactive AI chatbot for real-time course support', 'Student progress tracking and analytics dashboard'],
    github: 'https://github.com/shivam1264/edutrack_ai',
  },
  {
    id: 4, title: 'DualShield AI', tagline: 'Accident Detection & Safety Platform',
    tags: ['Kotlin', 'TensorFlow Lite', 'Node.js', 'Flask', 'MongoDB'],
    badge: '🤖 AI SAFETY', badgeColor: '#ec4899', year: '2026', emoji: '🛡️',
    desc: 'An AI-powered accident detection platform using TensorFlow Lite to classify real-time sensor data from accelerometer, gyroscope, and speed telemetry.',
    highlights: ['TF Lite models running on-device for real-time detection', 'Android app with automated SOS workflows', 'Voice-based cancellation, emergency SMS with GPS', 'Node.js & Flask backend for hazard-zone alerts'],
    github: 'https://github.com/deepakkumar7388',
  },
  {
    id: 5, title: 'AgroTech AI', tagline: 'Precision Agriculture Platform',
    tags: ['Python', 'Flask', 'MongoDB', 'XGBoost', 'LangGraph', 'Android'],
    badge: '🌱 AGRO TECH', badgeColor: '#f59e0b', year: '2025', emoji: '🌾',
    desc: 'AI-powered precision agriculture platform integrating ML models for crop recommendation, fertilizer prediction, and plant disease detection with satellite-based NDVI analysis.',
    highlights: ['Satellite-based NDVI crop health analysis', 'XGBoost ML models for crop recommendations', '20+ REST APIs, 5 MongoDB collections', 'Android app with weather forecasting'],
    github: 'https://github.com/deepakkumar7388',
  },
  {
    id: 6, title: 'SPIC Portal — spic.ac.in', tagline: 'College Management & Public Web Portal',
    tags: ['HTML', 'CSS', 'JavaScript'],
    badge: '🏫 COLLEGE WEB', badgeColor: '#3b82f6', year: '2025–26', emoji: '🏢',
    desc: 'Official website and admin portal for Sagar Private Industrial Training College with student dashboards, admission inquiry tracking, fees updates, and course structures.',
    highlights: ['Interactive Online Admission Form', 'Admin Control Panel', 'Dynamic Syllabus & Notice Board'],
    github: null, live: 'https://spic-college.netlify.app/',
  },
]

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-40px' },
  transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] },
})

function ProjectCard({ p, index }) {
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

  return (
    <motion.div {...fadeUp(index * 0.05)}
      ref={cardRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      className="project-card-gh"
      style={{
        rotateX,
        rotateY,
        transformPerspective: 1200,
        scale: hovered ? 1.01 : 1,
        '--card-color': p.badgeColor,
        background: 'var(--bg-card)',
        border: `1px solid ${hovered ? p.badgeColor + '40' : 'var(--border)'}`,
        borderRadius: 20,
        padding: p.featured ? '32px 32px' : '26px 26px',
        boxShadow: hovered ? `0 12px 40px ${p.badgeColor}15` : 'var(--shadow-sm)',
        transition: 'border 0.3s ease, box-shadow 0.3s ease, background 0.3s ease',
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Header row: emoji + badge + year */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14, flexWrap: 'wrap' }}>
        <span style={{ fontSize: p.featured ? 28 : 22 }}>{p.emoji}</span>
        <span style={{
          fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 700,
          padding: '4px 12px', borderRadius: 99,
          background: `${p.badgeColor}15`, border: `1px solid ${p.badgeColor}30`,
          color: p.badgeColor, textTransform: 'uppercase', letterSpacing: '0.04em',
        }}>{p.badge}</span>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-3)' }}>{p.year}</span>
      </div>

      {/* Title + tagline */}
      <h3 style={{
        fontFamily: 'var(--font-head)', fontWeight: 800,
        fontSize: p.featured ? '1.5rem' : '1.2rem',
        color: 'var(--text)', lineHeight: 1.2, marginBottom: 4,
      }}>{p.title}</h3>
      <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-3)', marginBottom: 14 }}>{p.tagline}</p>

      {/* Tags */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 16 }}>
        {p.tags.map(t => <span key={t} className="tag">{t}</span>)}
      </div>

      {/* Description */}
      <p style={{ color: 'var(--text-2)', lineHeight: 1.8, fontSize: '0.9rem', marginBottom: 18 }}>{p.desc}</p>

      {/* Highlights */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: p.featured ? 'repeat(auto-fit, minmax(240px, 1fr))' : '1fr',
        gap: 8, marginBottom: 22,
      }}>
        {p.highlights.map(h => (
          <div key={h} style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
            <div style={{
              width: 18, height: 18, borderRadius: '50%', flexShrink: 0, marginTop: 2,
              background: `${p.badgeColor}12`, border: `1.5px solid ${p.badgeColor}30`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <svg width="9" height="9" fill="none" stroke={p.badgeColor} strokeWidth="2.5" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12" /></svg>
            </div>
            <span style={{ color: 'var(--text-2)', fontSize: '0.83rem', lineHeight: 1.55 }}>{h}</span>
          </div>
        ))}
      </div>

      {/* CTAs */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
        {p.github && (
          <a href={p.github} target="_blank" rel="noreferrer" className="btn-grad"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '9px 20px', fontSize: 13 }}>
            <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" /></svg>
            GitHub
          </a>
        )}
        {p.live && (
          <a href={p.live} target="_blank" rel="noreferrer" className="btn-ghost"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '9px 20px', fontSize: 13 }}>
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" /></svg>
            Live Demo
          </a>
        )}
      </div>
    </motion.div>
  )
}

export default function Projects() {
  return (
    <section id="projects" className="section" style={{ background: 'var(--bg)', position: 'relative' }}>
      <div className="aurora a-violet" style={{ width: 480, height: 480, top: '5%', right: '-8%', opacity: 0.3 }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <motion.div {...fadeUp(0)}>
          <p className="kicker">03 / Projects</p>
          <h2 className="section-h2">What I've <span className="gradient-text">Built</span></h2>
          <p className="section-lead">Production-grade systems — real deployments, real users, real impact.</p>
        </motion.div>

        {/* Simple stacked cards — no fragile grid */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.id} p={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
