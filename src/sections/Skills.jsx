import React, { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

const SKILLS = {
  'Languages': { icon: '💻', items: [
    { name: 'Python', icon: '🐍' }, { name: 'JavaScript', icon: '🌐' },
    { name: 'Java', icon: '⚙️' }, { name: 'SQL', icon: '📊' }, { name: 'Bash / Shell', icon: '🖥️' },
  ]},
  'Web Development': { icon: '🌍', items: [
    { name: 'React.js', icon: '⚛️' }, { name: 'Node.js & Express', icon: '🟢' },
    { name: 'Flask (Python)', icon: '🌶️' }, { name: 'MongoDB / MySQL', icon: '🗄️' },
    { name: 'REST APIs & JWT', icon: '🔌' },
  ]},
  'AI / Machine Learning': { icon: '🤖', items: [
    { name: 'Supervised ML', icon: '🤖' }, { name: 'TensorFlow / Keras', icon: '🧠' },
    { name: 'NDVI / Geo Spatial', icon: '🛰️' }, { name: 'Gemini AI API', icon: '✨' },
  ]},
  'Cloud & DevOps': { icon: '☁️', items: [
    { name: 'Git & GitHub', icon: '🐙' }, { name: 'AWS (Academy)', icon: '☁️' },
    { name: 'Docker', icon: '🐳' }, { name: 'Postman', icon: '📮' },
  ]},
}

const EXTRAS = ['Next.js', 'Tailwind CSS', 'Redux', 'Vite', 'Redis', 'YOLO v8', 'scikit-learn', 'Pandas', 'NumPy', 'Matplotlib', 'Firebase']

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-30px' },
  transition: { duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] },
})

function SkillPill({ sk, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.35 }}
      whileHover={{ scale: 1.06, y: -2 }}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 7,
        padding: '8px 14px', borderRadius: 12,
        background: 'var(--bg-alt)', border: '1px solid var(--border)',
        cursor: 'default',
        transition: 'border-color 0.2s, box-shadow 0.2s',
      }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--grad-border)'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(240,160,80,0.08)' }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.boxShadow = 'none' }}
    >
      <span style={{ fontSize: 16 }}>{sk.icon}</span>
      <span style={{ fontFamily: 'var(--font-head)', fontWeight: 600, fontSize: '0.82rem', color: 'var(--text)' }}>{sk.name}</span>
    </motion.div>
  )
}

function SkillCategoryCard({ catName, cat, ci }) {
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
      {...fadeUp(ci * 0.08)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="project-card-gh"
      style={{
        rotateX, rotateY, transformPerspective: 1200, transformStyle: 'preserve-3d',
        background: 'var(--bg-card)', border: '1px solid var(--border)',
        borderRadius: 20, padding: '26px 24px',
        boxShadow: 'var(--shadow-sm)',
        backdropFilter: 'blur(20px)',
        transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
      }}
    >
      {/* Category header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
        <div style={{
          width: 40, height: 40, borderRadius: 11, fontSize: 19,
          background: 'var(--grad-soft)', border: '1px solid var(--grad-border)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>{cat.icon}</div>
        <div>
          <h4 style={{ fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: '0.95rem', color: 'var(--text)', lineHeight: 1.2 }}>{catName}</h4>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-3)' }}>{cat.items.length} skills</span>
        </div>
      </div>

      {/* Skill pills */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {cat.items.map((sk, si) => (
          <SkillPill key={sk.name} sk={sk} delay={ci * 0.08 + si * 0.03} />
        ))}
      </div>
    </motion.div>
  )
}

export default function Skills() {
  return (
    <section id="skills" className="section" style={{ background: 'var(--bg-alt)' }}>
      <div className="aurora a-violet" style={{ width: 420, height: 420, bottom: '0%', right: '-6%', opacity: 0.4 }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <motion.div {...fadeUp(0)}>
          <p className="kicker">02 / Skills</p>
          <h2 className="section-h2">Technical <span className="gradient-text">Toolbox</span></h2>
          <p className="section-lead">Languages, frameworks, ML tools, and cloud services I actively build with.</p>
        </motion.div>

        {/* Category Cards Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 16,
        }}>
          {Object.entries(SKILLS).map(([catName, cat], ci) => (
            <SkillCategoryCard key={catName} catName={catName} cat={cat} ci={ci} />
          ))}
        </div>

        {/* Scrolling Marquee — "Also familiar with" */}
        <motion.div {...fadeUp(0.3)} style={{ marginTop: 48, paddingTop: 32, borderTop: '1px solid var(--border)' }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-3)', marginBottom: 18, textTransform: 'uppercase', letterSpacing: '0.14em', textAlign: 'center' }}>Also familiar with</p>
          <div style={{ overflow: 'hidden', maskImage: 'linear-gradient(90deg, transparent, black 10%, black 90%, transparent)', WebkitMaskImage: 'linear-gradient(90deg, transparent, black 10%, black 90%, transparent)' }}>
            <div className="marquee-track">
              {[...EXTRAS, ...EXTRAS].map((t, i) => (
                <span key={`${t}-${i}`} style={{
                  fontFamily: 'var(--font-head)', fontWeight: 600, fontSize: '0.9rem',
                  color: 'var(--text-3)', padding: '0 24px', whiteSpace: 'nowrap',
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                }}>
                  <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--accent)', opacity: 0.4, display: 'inline-block' }} />
                  {t}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
