import React from 'react'
import { motion } from 'framer-motion'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer style={{
      background: 'var(--bg)', borderTop: '1px solid var(--border)',
      padding: '40px 0 28px',
    }}>
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 20 }}>
          <div>
            <div style={{ fontFamily: 'var(--font-head)', fontWeight: 800, fontSize: '1.1rem', color: 'var(--text)', marginBottom: 4 }}>
              Deepak<span style={{ color: 'var(--accent)' }}> Kumar</span>
            </div>
            <p style={{ color: 'var(--text-3)', fontSize: 12.5 }}>Full-Stack &amp; Software Developer · Computer Science Engineering · SISTec Bhopal</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--text-3)', fontSize: 12 }}>
            <span>© {year} Deepak Kumar </span>
            <motion.span animate={{ scale: [1,1.25,1] }} transition={{ duration: 1.2, repeat: Infinity }} style={{ color: '#f43f5e' }}>❤️</motion.span>
          </div>
        </div>
      </div>
    </footer>
  )
}
