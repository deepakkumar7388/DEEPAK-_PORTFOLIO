import React, { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-40px' },
  transition: { duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] },
})

function Tile({ children, style, delay = 0 }) {
  const cardRef = useRef(null)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springConfig = { damping: 30, stiffness: 300, mass: 0.5 }
  const springX = useSpring(mouseX, springConfig)
  const springY = useSpring(mouseY, springConfig)

  const rotateX = useTransform(springY, [-0.5, 0.5], [6, -6])
  const rotateY = useTransform(springX, [-0.5, 0.5], [-6, 6])

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
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <motion.div
      ref={cardRef}
      {...fadeUp(delay)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="project-card-gh"
      style={{
        rotateX, rotateY, transformPerspective: 1200, transformStyle: 'preserve-3d',
        background: 'var(--bg-card)',
        border: '1px solid var(--border)',
        borderRadius: 20,
        padding: '26px 24px',
        backdropFilter: 'blur(20px)',
        boxShadow: 'var(--shadow-sm)',
        transition: 'border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease',
        position: 'relative',
        ...style,
      }}
    >
      {children}
    </motion.div>
  )
}

function TileHeader({ emoji, label }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
      <span style={{ fontSize: 18 }}>{emoji}</span>
      <span style={{
        fontFamily: 'var(--font-mono)', fontSize: 10.5, fontWeight: 700,
        color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.12em',
      }}>{label}</span>
    </div>
  )
}

export default function About() {
  return (
    <section id="about" className="section" style={{ background: 'var(--bg)', position: 'relative', overflow: 'hidden' }}>
      <div className="aurora a-violet" style={{ width: 500, height: 500, top: '10%', left: '-10%', opacity: 0.3 }} />
      <div className="aurora a-blue" style={{ width: 450, height: 450, bottom: '5%', right: '-5%', opacity: 0.35 }} />

      <div className="container" style={{ position: 'relative', zIndex: 3 }}>
        {/* Section header */}
        <motion.div {...fadeUp(0)}>
          <p className="kicker">01 / About</p>
          <h2 className="section-h2">Building <span style={{ fontStyle: 'italic', fontFamily: 'Georgia, serif' }} className="gradient-text">Impactful</span> Software</h2>
          <p className="section-lead">Full-Stack Engineer & CS student turning ideas into production-grade systems.</p>
        </motion.div>

        {/* ═══ ROW 1: Story + Photo ═══ */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16, marginBottom: 16 }}>
          {/* My Story */}
          <Tile delay={0.05} style={{ minHeight: 200 }}>
            <TileHeader emoji="📖" label="My Story" />
            <p style={{ color: 'var(--text-2)', lineHeight: 1.85, fontSize: '0.95rem', marginBottom: 14 }}>
              I'm <strong style={{ color: 'var(--text)' }}>Deepak Kumar</strong>, a Full-Stack Software Engineer and Computer Science student in my 3rd year of B.Tech CSE at <strong style={{ color: 'var(--text)' }}>SISTec Bhopal</strong>.
            </p>
            <p style={{ color: 'var(--text-2)', lineHeight: 1.85, fontSize: '0.95rem' }}>
              I specialise in building scalable web applications, robust backend services, and intelligent ML systems. My engineering work is fueled by curiosity and practical experience from development and hackathons.
            </p>
          </Tile>

          {/* Profile Photo */}
          <Tile delay={0.1} style={{ padding: 10 }}>
            <div style={{
              width: '100%', height: '100%', minHeight: 260,
              borderRadius: 14, overflow: 'hidden',
              background: 'linear-gradient(135deg, #fef6ee 0%, #fde8d0 100%)',
            }}>
              <img
                src={new URL('../assets/profile.jpeg', import.meta.url).href}
                alt="Deepak Kumar"
                style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 14 }}
              />
            </div>
            {/* Floating year badge */}
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                position: 'absolute', bottom: 20, right: 20,
                width: 64, height: 64, borderRadius: '50%',
                background: 'var(--grad)',
                boxShadow: '0 6px 20px rgba(240,160,80,0.4), 0 0 0 3px var(--bg-card)',
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                color: '#fff',
              }}
            >
              <span style={{ fontSize: 14, fontWeight: 900, lineHeight: 1 }}>3rd</span>
              <span style={{ fontSize: 8, fontFamily: 'var(--font-mono)', fontWeight: 700, textTransform: 'uppercase', marginTop: 1 }}>Year</span>
            </motion.div>
          </Tile>
        </div>

        {/* ═══ ROW 2: Education + Stats ═══ */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16, marginBottom: 16 }}>
          {/* Education */}
          <Tile delay={0.15} style={{ flex: 2 }}>
            <TileHeader emoji="🎓" label="Education" />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              <div style={{ paddingLeft: 16, borderLeft: '2px solid var(--accent)' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, color: 'var(--accent)', fontWeight: 700, marginBottom: 3 }}>2023 — 2027 (Ongoing)</div>
                <h4 style={{ fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: '0.95rem', color: 'var(--text)', marginBottom: 2 }}>B.Tech — Computer Science &amp; Engineering</h4>
                <p style={{ fontSize: 12.5, color: 'var(--text-3)', fontFamily: 'var(--font-mono)' }}>SISTec Bhopal</p>
              </div>
              <div style={{ paddingLeft: 16, borderLeft: '2px solid var(--accent-b)' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, color: 'var(--accent-b)', fontWeight: 700, marginBottom: 3 }}>2020 — 2022</div>
                <h4 style={{ fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: '0.95rem', color: 'var(--text)', marginBottom: 2 }}>
                  Sardar Patel Inter College, Prayagraj
                  <span style={{ fontWeight: 500, color: 'var(--text-2)', fontSize: '0.85rem', marginLeft: 6 }}>(X &amp; XII)</span>
                </h4>
                <p style={{ fontSize: 12.5, color: 'var(--text-3)', fontFamily: 'var(--font-mono)' }}>UP Board — Science</p>
              </div>
            </div>
          </Tile>

          {/* Quick Stats */}
          <Tile delay={0.2}>
            <TileHeader emoji="📊" label="Quick Stats" />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                { val: '4+', label: 'Projects Built' },
                { val: '6+', label: 'Certifications' },
                { val: '81%', label: 'NPTEL Score' },
              ].map(s => (
                <div key={s.label} style={{
                  background: 'var(--bg-alt)', border: '1px solid var(--border)',
                  borderRadius: 12, padding: '12px 14px',
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-2)' }}>{s.label}</span>
                  <span style={{
                    fontFamily: 'var(--font-head)', fontWeight: 800, fontSize: '1.15rem',
                    background: 'var(--grad)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                  }}>{s.val}</span>
                </div>
              ))}
            </div>
          </Tile>
        </div>

        {/* ═══ ROW 3: Approach + Quote + Contact ═══ */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
          {/* My Approach */}
          <Tile delay={0.25}>
            <TileHeader emoji="✍️" label="My Approach" />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {[
                { icon: '🎯', title: 'Problem-First Design', desc: 'Understanding the core user problem before selecting frameworks.' },
                { icon: '⚡', title: 'Efficient & Scalable', desc: 'Clean, optimized code with databases suited for heavy loads.' },
                { icon: '🔄', title: 'Continuous Shipping', desc: 'AWS cloud, version control, and safe automated deployments.' },
              ].map(ap => (
                <div key={ap.title} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  <div style={{
                    width: 34, height: 34, borderRadius: 9, fontSize: 15, flexShrink: 0,
                    background: 'var(--grad-soft)', border: '1px solid var(--grad-border)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>{ap.icon}</div>
                  <div>
                    <h5 style={{ fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: '0.85rem', color: 'var(--text)', margin: 0 }}>{ap.title}</h5>
                    <p style={{ fontSize: 12, color: 'var(--text-2)', marginTop: 2, lineHeight: 1.5 }}>{ap.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </Tile>

          {/* Quote */}
          <Tile delay={0.3} style={{ display: 'flex', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: 32, color: 'var(--accent)', fontFamily: 'Georgia, serif', lineHeight: 0.6, marginBottom: 16, opacity: 0.4 }}>"</div>
              <p style={{
                fontStyle: 'italic', color: 'var(--text-2)', fontSize: '1rem',
                lineHeight: 1.7, fontFamily: 'var(--font-fancy)',
              }}>
                I don't just write code — I build solutions that make a real-world difference.
              </p>
              <div style={{ marginTop: 16, display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--grad)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, color: '#fff', fontWeight: 800 }}>DK</div>
                <div>
                  <span style={{ fontFamily: 'var(--font-head)', fontSize: 12, fontWeight: 700, color: 'var(--text)' }}>Deepak Kumar</span>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--text-3)' }}>Full-Stack Developer</div>
                </div>
              </div>
            </div>
          </Tile>

          {/* Contact Chips */}
          <Tile delay={0.35}>
            <TileHeader emoji="📬" label="Reach Me" />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { icon: '✉️', label: 'Email', value: 'dk21230621@gmail.com', href: 'mailto:dk21230621@gmail.com' },
                { icon: '📞', label: 'Phone', value: '+91 7992054663', href: 'tel:+917992054663' },
                { icon: '📍', label: 'Location', value: 'Prayagraj / Bhopal' },
              ].map(c => (
                <div key={c.value} style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  padding: '10px 12px', borderRadius: 10,
                  background: 'var(--bg-alt)', border: '1px solid var(--border)',
                }}>
                  <span style={{ fontSize: 14 }}>{c.icon}</span>
                  <div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--text-3)', textTransform: 'uppercase' }}>{c.label}</div>
                    {c.href ? (
                      <a href={c.href} style={{ color: 'var(--accent)', fontWeight: 600, fontSize: '0.8rem' }}>{c.value}</a>
                    ) : (
                      <span style={{ color: 'var(--text)', fontWeight: 600, fontSize: '0.8rem' }}>{c.value}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Tile>
        </div>

        {/* CTAs */}
        <motion.div {...fadeUp(0.4)} style={{ display: 'flex', gap: 14, marginTop: 36, justifyContent: 'center', flexWrap: 'wrap' }}>
          <motion.a href="#contact"
            onClick={e => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }) }}
            className="btn-grad" style={{ padding: '12px 28px' }}
            whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
          >Hire Me</motion.a>
          <motion.a href="https://linkedin.com/in/deepak-kumar-84599b308" target="_blank" rel="noreferrer"
            className="btn-ghost" style={{ padding: '11px 26px' }}
            whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
          >View Profile</motion.a>
        </motion.div>
      </div>
    </section>
  )
}
