import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const TABS = [
  { id: 'story', label: '📖 My Story' },
  { id: 'education', label: '🎓 Education' },
  { id: 'stats', label: '📁 Info & Stats' },
  { id: 'approach', label: '✍️ My Approach' }
]

export default function About({ dark }) {
  const [activeTab, setActiveTab] = useState('story')

  return (
    <section id="about" className="section" style={{ background: 'var(--bg)', position: 'relative', overflow: 'hidden' }}>
      {/* Subtle background glow */}
      <div className="aurora a-violet" style={{ width: 500, height: 500, top: '10%', left: '-10%', opacity: 0.3 }} />
      <div className="aurora a-blue" style={{ width: 450, height: 450, bottom: '5%', right: '-5%', opacity: 0.35 }} />

      <div className="container" style={{ position: 'relative', zIndex: 3 }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 60,
          alignItems: 'center',
          marginTop: 20
        }}>
          {/* ── Left Column: Portrait & Badge ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
            style={{
              display: 'flex',
              justifyContent: 'center',
              position: 'relative',
              width: '100%',
              maxWidth: 440,
              margin: '0 auto'
            }}
          >
            {/* The main picture frame */}
            <div style={{
              width: '100%',
              aspectRatio: '0.85',
              borderRadius: 24,
              padding: 10,
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              boxShadow: 'var(--shadow-lg)',
              position: 'relative',
              overflow: 'visible'
            }}>
              <div style={{
                width: '100%',
                height: '100%',
                borderRadius: 18,
                overflow: 'hidden',
                background: 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)'
              }}>
                <img
                  src={new URL('../assets/prifile-image.jpeg', import.meta.url).href}
                  alt="Deepak Kumar"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
              </div>

              {/* Floating Badge (3rd Year B.Tech) */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                  position: 'absolute',
                  bottom: -15,
                  right: -15,
                  width: 96,
                  height: 96,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #7c3aed 0%, #0ea5e9 100%)',
                  boxShadow: '0 8px 25px rgba(124, 58, 237, 0.45), 0 0 0 5px rgba(255, 255, 255, 0.85)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                  textAlign: 'center',
                  zIndex: 4,
                  border: '1px solid rgba(255, 255, 255, 0.2)'
                }}
              >
                <span style={{ fontSize: 17, fontWeight: 900, lineHeight: 1 }}>3rd</span>
                <span style={{ fontSize: 9, fontFamily: 'var(--font-mono)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.5, marginTop: 2 }}>Year B.Tech</span>
              </motion.div>
            </div>
          </motion.div>

          {/* ── Right Column: About Details ── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.15 }}
          >
            {/* Header kicker */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <div style={{ width: 24, height: 2, background: 'var(--accent)' }} />
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 11,
                fontWeight: 700,
                textTransform: 'uppercase',
                color: 'var(--accent)',
                letterSpacing: '0.15em'
              }}>
                About Me
              </span>
            </div>

            {/* Custom Styled Title */}
            <h2 style={{
              fontFamily: 'var(--font-head)',
              fontWeight: 800,
              fontSize: 'clamp(1.8rem, 4vw, 2.7rem)',
              color: 'var(--text)',
              lineHeight: 1.2,
              marginBottom: 28,
              letterSpacing: '-0.02em'
            }}>
              Building <span style={{
                fontStyle: 'italic',
                fontFamily: 'Georgia, serif',
                background: 'var(--grad)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>Impactful</span> Software from Scratch
            </h2>

            {/* Interactive Tabs Menu */}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 6,
              borderBottom: '1px solid var(--border)',
              paddingBottom: 12,
              marginBottom: 24
            }}>
              {TABS.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    padding: '6px 12px',
                    borderRadius: 30,
                    fontSize: 12.5,
                    fontWeight: 600,
                    fontFamily: 'var(--font-head)',
                    color: activeTab === tab.id ? '#ffffff' : 'var(--text-2)',
                    background: activeTab === tab.id ? 'var(--grad)' : 'var(--bg-alt)',
                    border: activeTab === tab.id ? '1px solid transparent' : '1px solid var(--border)',
                    boxShadow: activeTab === tab.id ? '0 4px 15px rgba(79, 70, 229, 0.25)' : 'none',
                    whiteSpace: 'nowrap',
                    transition: 'all 0.25s ease',
                    cursor: 'pointer'
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab content panel */}
            <div style={{ minHeight: 280, position: 'relative' }}>
              <AnimatePresence mode="wait">
                {activeTab === 'story' && (
                  <motion.div
                    key="story"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.28 }}
                  >
                    <p style={{
                      color: 'var(--text-2)',
                      lineHeight: 1.8,
                      fontSize: '0.98rem',
                      marginBottom: 16
                    }}>
                      I'm <strong style={{ color: 'var(--text)' }}>Deepak Kumar</strong>, a Full-Stack Software Engineer and Computer Science student in my 3rd year of B.Tech CSE at <strong style={{ color: 'var(--text)' }}>SISTec Bhopal</strong>.
                    </p>
                    <p style={{
                      color: 'var(--text-2)',
                      lineHeight: 1.8,
                      fontSize: '0.98rem',
                      marginBottom: 24
                    }}>
                      I specialise in building scalable web applications, robust backend services, and intelligent ML systems. My engineering work is fueled by curiosity, a solid foundation in software architecture, and practical experience from development and hackathons.
                    </p>
                    
                    {/* Styled Quote Box */}
                    <div style={{
                      borderLeft: '3px solid var(--accent)',
                      paddingLeft: 20,
                      margin: '24px 0',
                      fontStyle: 'italic',
                      color: 'var(--text-2)',
                      fontSize: '1.02rem',
                      lineHeight: 1.6
                    }}>
                      "I don't just write code — I build solutions that make a real-world difference."
                    </div>
                  </motion.div>
                )}

                {activeTab === 'education' && (
                  <motion.div
                    key="education"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.28 }}
                    style={{ display: 'flex', flexDirection: 'column', gap: 20 }}
                  >
                    {/* Edu item 1 */}
                    <div style={{ position: 'relative', paddingLeft: 20, borderLeft: '2px solid var(--border)' }}>
                      <div style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--accent)', position: 'absolute', left: -6, top: 6 }} />
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--accent)', fontWeight: 700, marginBottom: 2 }}>2023 - 2027 (Ongoing)</div>
                      <h4 style={{ fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: '1rem', color: 'var(--text)' }}>B.Tech - Computer Science &amp; Engineering</h4>
                      <p style={{ fontSize: 13, color: 'var(--text-3)', fontFamily: 'var(--font-mono)' }}>Sagar Institute of Science &amp; Technology (SISTec), Bhopal</p>
                      <p style={{ fontSize: 13.5, color: 'var(--text-2)', marginTop: 6, lineHeight: 1.6 }}>
                        Focusing on Software Engineering, Database Systems, Computer Networks, and AI algorithms. Built several campus automation tools.
                      </p>
                    </div>

                    {/* Edu item 2 */}
                    <div style={{ position: 'relative', paddingLeft: 20, borderLeft: '2px solid var(--border)' }}>
                      <div style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--accent-b)', position: 'absolute', left: -6, top: 6 }} />
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--accent-b)', fontWeight: 700, marginBottom: 2 }}>2020 - 2022</div>
                      <h4 style={{ fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: '1rem', color: 'var(--text)' }}>
                        <a 
                          href="https://spic-college.netlify.app/" 
                          target="_blank" 
                          rel="noreferrer" 
                          style={{ color: 'var(--accent-b)', textDecoration: 'none', transition: 'opacity 0.2s', display: 'inline-flex', alignItems: 'center', gap: 4 }}
                          onMouseEnter={e => e.currentTarget.style.textDecoration = 'underline'}
                          onMouseLeave={e => e.currentTarget.style.textDecoration = 'none'}
                        >
                          Sardar Patel Inter College, Koraon, Prayagraj
                          <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" style={{ opacity: 0.6 }}>
                            <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
                          </svg>
                        </a>
                        <span style={{ fontWeight: 500, color: 'var(--text-2)', fontSize: '0.9rem', marginLeft: 6 }}>(Class X &amp; XII)</span>
                      </h4>
                      <p style={{ fontSize: 13, color: 'var(--text-3)', fontFamily: 'var(--font-mono)' }}>UP Board</p>
                      <p style={{ fontSize: 13.5, color: 'var(--text-2)', marginTop: 6, lineHeight: 1.6 }}>
                        Specialized in Science stream (Physics, Chemistry, Mathematics).
                      </p>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'stats' && (
                  <motion.div
                    key="stats"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.28 }}
                  >
                    {/* Grid of Counts */}
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(3, 1fr)',
                      gap: 16,
                      marginBottom: 24
                    }}>
                      {[
                        { val: '4+', label: 'Projects Built' },
                        { val: '6+', label: 'Certifications' },
                        { val: '81%', label: 'NPTEL Score' }
                      ].map(s => (
                        <div key={s.label} style={{
                          background: 'var(--bg-card)',
                          border: '1px solid var(--border)',
                          borderRadius: 16,
                          padding: '16px 12px',
                          textAlign: 'center',
                          boxShadow: 'var(--shadow-sm)'
                        }}>
                          <div style={{
                            fontFamily: 'var(--font-head)',
                            fontWeight: 800,
                            fontSize: '1.8rem',
                            background: 'var(--grad)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                            lineHeight: 1
                          }}>{s.val}</div>
                          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-3)', marginTop: 6 }}>{s.label}</div>
                        </div>
                      ))}
                    </div>

                    {/* Contact Chips */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                      {[
                        { icon: '✉️', label: 'Email', value: 'dk21230621@gmail.com', href: 'mailto:dk21230621@gmail.com' },
                        { icon: '📞', label: 'Phone', value: '+91 7992054663', href: 'tel:+917992054663' },
                        { icon: '📍', label: 'Location', value: 'Prayagraj / Bhopal, MP, India', href: null }
                      ].map(c => (
                        <div key={c.value} style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 12,
                          padding: '10px 16px',
                          borderRadius: 12,
                          background: 'var(--bg-card)',
                          border: '1px solid var(--border)'
                        }}>
                          <span style={{ fontSize: 16 }}>{c.icon}</span>
                          <div style={{ fontSize: 13 }}>
                            <span style={{ color: 'var(--text-3)', fontFamily: 'var(--font-mono)' }}>{c.label}: </span>
                            {c.href ? (
                              <a href={c.href} style={{ color: 'var(--accent)', fontWeight: 600, textDecoration: 'none' }} onMouseEnter={e => e.currentTarget.style.textDecoration = 'underline'} onMouseLeave={e => e.currentTarget.style.textDecoration = 'none'}>
                                {c.value}
                              </a>
                            ) : (
                              <span style={{ color: 'var(--text)', fontWeight: 600 }}>{c.value}</span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {activeTab === 'approach' && (
                  <motion.div
                    key="approach"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.28 }}
                  >
                    <p style={{ color: 'var(--text-2)', lineHeight: 1.8, fontSize: '0.98rem', marginBottom: 16 }}>
                      My development approach centers around delivering high-performance, maintainable software architecture:
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 16 }}>
                      {[
                        { title: '🎯 Problem-First Design', desc: 'Focusing on understanding the core user problem before selecting frameworks or tools.' },
                        { title: '⚡ Efficient & Scalable Code', desc: 'Writing clean, optimized algorithms and choosing databases suited for handling loads.' },
                        { title: '🔄 Continuous Shipping', desc: 'Integrating AWS cloud setups and utilizing version control for safe, automated deployments.' }
                      ].map(ap => (
                        <div key={ap.title} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                          <span style={{ color: 'var(--accent)', fontSize: 16, marginTop: 2 }}>✔</span>
                          <div>
                            <h5 style={{ fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: '0.92rem', color: 'var(--text)', margin: 0 }}>{ap.title}</h5>
                            <p style={{ fontSize: 13, color: 'var(--text-2)', marginTop: 2, lineHeight: 1.5 }}>{ap.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Action buttons below */}
            <div style={{ display: 'flex', gap: 16, marginTop: 36, flexWrap: 'wrap' }}>
              <motion.a
                href="#contact"
                onClick={e => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }) }}
                className="btn-grad"
                style={{ padding: '12px 28px' }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
              >
                Hire Me
              </motion.a>
              <motion.a
                href="https://linkedin.com/in/deepak-kumar-84599b308"
                target="_blank"
                rel="noreferrer"
                className="btn-ghost"
                style={{
                  padding: '11px 26px',
                  borderRadius: 50,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8
                }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
              >
                View Profile
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
