import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Preloader({ onComplete }) {
  const [phase, setPhase] = useState(0) // 0=show, 1=exit
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const tick = setInterval(() => {
      setProgress(p => {
        const next = p + Math.random() * 20
        return next >= 100 ? 100 : next
      })
    }, 60)

    const finishPreloader = () => {
      clearInterval(tick)
      setProgress(100)
      setTimeout(() => setPhase(1), 300)
      setTimeout(() => onComplete(), 750)
    }

    // Wait at least 1000ms and ensure all Google Fonts are fully loaded before removing preloader screen
    const minTimer = setTimeout(() => {
      if (document.fonts) {
        document.fonts.ready.then(finishPreloader).catch(finishPreloader)
      } else {
        finishPreloader()
      }
    }, 1000)

    return () => {
      clearInterval(tick)
      clearTimeout(minTimer)
    }
  }, [onComplete])

  return (
    <AnimatePresence>
      {phase === 0 && (
        <motion.div
          exit={{ opacity: 0, scale: 1.03 }}
          transition={{ duration: 0.45, ease: 'easeInOut' }}
          style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            background: 'var(--bg)',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center', gap: 24,
          }}
        >
          {/* Logo */}
          <motion.div
            initial={{ scale: 0.6, rotate: -10, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
            style={{
              width: 64, height: 64, borderRadius: 16,
              background: 'var(--grad)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'var(--font-head)', fontWeight: 800, fontSize: 24, color: '#fff',
              boxShadow: '0 8px 30px rgba(124,58,237,0.2)',
            }}
          >DK</motion.div>

          {/* Name */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.4 }}
            style={{ textAlign: 'center' }}
          >
            <div style={{
              fontFamily: 'var(--font-head)', fontWeight: 800, fontSize: '1.4rem',
              color: 'var(--text)',
            }}>Deepak Kumar</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9.5, color: 'var(--text-3)', letterSpacing: '0.2em', textTransform: 'uppercase', marginTop: 4 }}>
              Portfolio · 2026
            </div>
          </motion.div>

          {/* Progress */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            style={{ width: 160 }}
          >
            <div style={{ height: 2, background: 'var(--bg-3)', borderRadius: 99, overflow: 'hidden' }}>
              <div style={{
                height: '100%', borderRadius: 99,
                background: 'var(--grad)',
                width: `${Math.min(progress, 100)}%`,
                transition: 'width 0.08s linear',
              }} />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
