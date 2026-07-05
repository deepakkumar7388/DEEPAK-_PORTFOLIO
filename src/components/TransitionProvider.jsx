import React, { createContext, useContext, useState, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const TransitionContext = createContext(null)

export const useTransitionTrigger = () => useContext(TransitionContext)

export function TransitionProvider({ children }) {
  const [active, setActive] = useState(false)
  const [callback, setCallback] = useState(null)

  const triggerTransition = useCallback((targetCallback) => {
    setCallback(() => targetCallback)
    setActive(true)
  }, [])

  const onHalfway = () => {
    if (callback) {
      callback()
    }
  }

  const onComplete = () => {
    setActive(false)
    setCallback(null)
  }

  return (
    <TransitionContext.Provider value={triggerTransition}>
      {children}
      <AnimatePresence>
        {active && (
          <div style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99999,
            display: 'flex',
            flexDirection: 'column',
            pointerEvents: 'all',
            overflow: 'hidden'
          }}>
            {/* Top Gate Panel */}
            <motion.div
              initial={{ y: '-100%' }}
              animate={{ y: 0 }}
              exit={{ y: '-100%' }}
              transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
              onAnimationComplete={() => {
                // When top gate finishes closing, fire the page change action
                if (active) onHalfway()
              }}
              style={{
                width: '100vw',
                height: '50vh',
                background: 'var(--gate-top-bg)',
                borderBottom: 'var(--gate-border)',
                boxShadow: '0 15px 35px var(--gate-shadow-top)',
                position: 'relative',
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'center',
                overflow: 'hidden'
              }}
            >
              {/* Glowing edge indicator */}
              <div style={{
                width: '100%',
                height: 6,
                background: 'var(--gate-glow-top)',
                boxShadow: '0 0 25px rgba(255,255,255,0.3)'
              }} />
            </motion.div>

            {/* Bottom Gate Panel */}
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
              onAnimationComplete={() => {
                if (!active) onComplete()
              }}
              style={{
                width: '100vw',
                height: '50vh',
                background: 'var(--gate-bottom-bg)',
                borderTop: 'var(--gate-border)',
                boxShadow: '0 -15px 35px var(--gate-shadow-bottom)',
                position: 'relative',
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'center',
                overflow: 'hidden'
              }}
            >
              {/* Glowing edge indicator */}
              <div style={{
                width: '100%',
                height: 6,
                background: 'var(--gate-glow-bottom)',
                boxShadow: '0 0 25px rgba(255,255,255,0.3)'
              }} />
            </motion.div>

            {/* Central High-Tech Scanner Lock Loader */}
            <motion.div
              initial={{ scale: 0.4, opacity: 0, x: '-50%', y: '-50%' }}
              animate={{ scale: 1, opacity: 1, x: '-50%', y: '-50%' }}
              exit={{ scale: 0.4, opacity: 0, x: '-50%', y: '-50%' }}
              transition={{ delay: 0.12, duration: 0.35, ease: 'easeOut' }}
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                zIndex: 10,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                pointerEvents: 'none'
              }}
            >
              {/* Spinning sci-fi rings */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'linear' }}
                style={{
                  width: 104,
                  height: 104,
                  borderRadius: '50%',
                  border: '3px dashed rgba(255,255,255,0.7)',
                  boxShadow: '0 0 25px rgba(255,255,255,0.5)',
                  position: 'absolute'
                }}
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 2.8, repeat: Infinity, ease: 'linear' }}
                style={{
                  width: 124,
                  height: 124,
                  borderRadius: '50%',
                  border: '2px dotted rgba(255,255,255,0.4)',
                  boxShadow: '0 0 35px rgba(255,255,255,0.2)',
                  position: 'absolute'
                }}
              />
              
              {/* Central Glowing Initials Capsule */}
              <div style={{
                width: 72,
                height: 72,
                borderRadius: '50%',
                background: 'var(--gate-capsule-bg)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 35px rgba(255,255,255,0.4), inset 0 0 10px rgba(0,0,0,0.1)',
                border: '2px solid rgba(255,255,255,0.2)',
                zIndex: 11
              }}>
                <span style={{ 
                  fontSize: 25, 
                  fontWeight: 900, 
                  color: 'var(--gate-text-color)',
                  fontFamily: 'var(--font-head)',
                  letterSpacing: '0.02em'
                }}>
                  DK
                </span>
              </div>

              {/* Status Indicator text */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                style={{
                  marginTop: 78,
                  fontFamily: 'var(--font-mono)',
                  fontSize: 11,
                  fontWeight: 600,
                  color: '#fff',
                  letterSpacing: '0.22em',
                  textShadow: '0 0 10px rgba(255,255,255,0.8)',
                  whiteSpace: 'nowrap'
                }}
              >
                INITIALIZING...
              </motion.div>
            </motion.div>

            {/* Delayed opener to trigger the exit transition after halfway point */}
            <ShutterOpener active={active} onComplete={onComplete} />
          </div>
        )}
      </AnimatePresence>
    </TransitionContext.Provider>
  )
}

function ShutterOpener({ active, onComplete }) {
  useEffect(() => {
    if (active) {
      const t = setTimeout(() => {
        onComplete()
      }, 550) // Let it stay closed briefly then open
      return () => clearTimeout(t)
    }
  }, [active, onComplete])
  return null
}
