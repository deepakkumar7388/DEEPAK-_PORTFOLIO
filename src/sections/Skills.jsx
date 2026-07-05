import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const SKILLS = {
  'Languages': [
    { name: 'Python',       icon: '🐍', level: 88 },
    { name: 'JavaScript',   icon: '🌐', level: 85 },
    { name: 'Java',      icon: '⚙️', level: 72 },
    { name: 'SQL',          icon: '📊', level: 80 },
    { name: 'Bash / Shell', icon: '🖥️', level: 65 },
  ],
  'Web Dev': [
    { name: 'React.js',           icon: '⚛️', level: 90 },
    { name: 'Node.js & Express',  icon: '🟢', level: 84 },
    { name: 'Flask (Python)',      icon: '🌶️', level: 80 },
    { name: 'MongoDB / MySQL',     icon: '🗄️', level: 80 },
    { name: 'REST APIs & JWT',     icon: '🔌', level: 86 },
  ],
  'AI / ML': [
    { name: 'Supervised ML Models', icon: '🤖', level: 85 },
    { name: 'TensorFlow / Keras',   icon: '🧠', level: 72 },
    { name: 'NDVI / Geo Spatial',    icon: '🛰️', level: 74 },
    { name: 'Gemini AI API',         icon: '✨', level: 78 },
  ],
  'Cloud & Tools': [
    { name: 'Git & GitHub',     icon: '🐙', level: 88 },
    { name: 'AWS (Academy)',    icon: '☁️', level: 70 },
    { name: 'Docker',           icon: '🐳', level: 65 },
    { name: 'Postman',          icon: '📮', level: 84 },
    
  ],
}

const CATS = ['All', ...Object.keys(SKILLS)]

function SkillBar({ sk, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.03, duration: 0.4 }}
      whileHover={{ y: -3 }}
      style={{
        background: 'var(--bg-card)', border: '1px solid var(--border)',
        borderRadius: 14, padding: '18px 20px',
        boxShadow: 'var(--shadow-sm)', transition: 'all 0.25s',
      }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--grad-border)'; e.currentTarget.style.boxShadow = 'var(--shadow-md)' }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.boxShadow = 'var(--shadow-sm)' }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 18 }}>{sk.icon}</span>
          <span style={{ fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: '0.9rem', color: 'var(--text)' }}>{sk.name}</span>
        </div>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700, color: 'var(--accent)' }}>{sk.level}%</span>
      </div>
      <div className="prog-track">
        <motion.div
          className="prog-fill"
          initial={{ width: 0 }}
          whileInView={{ width: `${sk.level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: index * 0.03 + 0.1, ease: 'easeOut' }}
        />
      </div>
    </motion.div>
  )
}

export default function Skills() {
  const [cat, setCat] = useState('All')

  // Get displayed skills based on category selection
  const displaySkills = React.useMemo(() => {
    if (cat === 'All') {
      // Flat map all skills from all categories, removing duplicates by name
      const all = Object.values(SKILLS).flat()
      const seen = new Set()
      return all.filter(sk => {
        const duplicate = seen.has(sk.name)
        seen.add(sk.name)
        return !duplicate
      })
    }
    return SKILLS[cat]
  }, [cat])

  return (
    <section id="skills" className="section" style={{ background: 'var(--bg-alt)' }}>
      <div className="aurora a-violet" style={{ width: 420, height: 420, bottom: '0%', right: '-6%', opacity: 0.4 }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>

        <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <p className="kicker">02 / Skills</p>
          <h2 className="section-h2">Technical <span className="gradient-text">Toolbox</span></h2>
          <p className="section-lead">Languages, frameworks, ML tools, and cloud services I actively build with.</p>
        </motion.div>

        {/* Tabs */}
        <motion.div initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
          className="tabs" style={{ marginBottom: 32 }}>
          {CATS.map(c => (
            <button key={c} className={`tab${cat === c ? ' active' : ''}`} onClick={() => setCat(c)}>{c}</button>
          ))}
        </motion.div>

        {/* Skills grid */}
        <AnimatePresence mode="wait">
          <motion.div key={cat}
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 14 }}
          >
            {displaySkills.map((sk, i) => <SkillBar key={sk.name} sk={sk} index={i} />)}
          </motion.div>
        </AnimatePresence>

        {/* Tech pills row */}
        <motion.div initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          style={{ marginTop: 48, paddingTop: 32, borderTop: '1px solid var(--border)' }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-3)', marginBottom: 16, textTransform: 'uppercase', letterSpacing: '0.14em' }}>Also familiar with</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {['Next.js','Tailwind CSS','Redux','Vite','Redis','YOLO v8','scikit-learn','Pandas','NumPy','Matplotlib','Firebase'].map(t => (
              <span key={t} className="tag">{t}</span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
