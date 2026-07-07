import React, { useRef, useState, useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'
import { TypeAnimation } from 'react-type-animation'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/* ─── 3D Glass Orb with rings + mouse tracking ─── */
function Orb({ mouse }) {
  const group = useRef()
  const mesh = useRef()

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    if (group.current) {
      group.current.rotation.x += (mouse.current.y * 0.45 - group.current.rotation.x) * 0.06
      group.current.rotation.y += (mouse.current.x * 0.45 - group.current.rotation.y) * 0.06 + 0.003
    }
    if (mesh.current) {
      mesh.current.position.y = Math.sin(t * 0.8) * 0.14
    }
  })

  return (
    <group ref={group}>
      <mesh ref={mesh}>
        <sphereGeometry args={[1.55, 64, 64]} />
        <meshPhysicalMaterial
          color="#6d28d9"
          metalness={0.1} roughness={0.05}
          transmission={0.93} thickness={1.6}
          clearcoat={1} clearcoatRoughness={0}
          envMapIntensity={1.3}
        />
      </mesh>
      {/* Inner glowing core */}
      <mesh>
        <sphereGeometry args={[0.9, 32, 32]} />
        <meshBasicMaterial color="#a78bfa" transparent opacity={0.08} />
      </mesh>
      {/* Orbit ring 1 */}
      <mesh rotation={[Math.PI / 2.2, 0, 0]}>
        <torusGeometry args={[2.15, 0.022, 16, 100]} />
        <meshBasicMaterial color="#a78bfa" transparent opacity={0.4} />
      </mesh>
      {/* Orbit ring 2 */}
      <mesh rotation={[Math.PI / 3.5, Math.PI / 5, 0]}>
        <torusGeometry args={[2.5, 0.013, 16, 100]} />
        <meshBasicMaterial color="#38bdf8" transparent opacity={0.25} />
      </mesh>
      {/* Orbit ring 3 */}
      <mesh rotation={[0, Math.PI / 4, Math.PI / 6]}>
        <torusGeometry args={[2.8, 0.01, 16, 100]} />
        <meshBasicMaterial color="#34d399" transparent opacity={0.15} />
      </mesh>
    </group>
  )
}

/* ─── Floating particles ─── */
function Particles() {
  const pts = useRef()
  const count = 130
  const pos = useMemo(() => {
    const a = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      a[i * 3] = (Math.random() - 0.5) * 18
      a[i * 3 + 1] = (Math.random() - 0.5) * 12
      a[i * 3 + 2] = (Math.random() - 0.5) * 8
    }
    return a
  }, [])
  useFrame(s => { if (pts.current) pts.current.rotation.y = s.clock.getElapsedTime() * 0.025 })
  return (
    <points ref={pts}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" array={pos} count={count} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.038} color="#a78bfa" transparent opacity={0.55} />
    </points>
  )
}

/* ─── Floating stat badge ─── */
function Badge({ emoji, value, label, top, right, bottom, left, delay, mobile }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.6, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: 'absolute', top, right, bottom, left,
        background: 'var(--bg)', border: '1px solid var(--border)',
        borderRadius: mobile ? 12 : 16,
        padding: mobile ? '6px 10px' : '10px 16px',
        backdropFilter: 'blur(20px)',
        boxShadow: 'var(--shadow-md)',
        display: 'flex', alignItems: 'center', gap: mobile ? 6 : 10,
        pointerEvents: 'none',
        zIndex: 10,
      }}
    >
      <motion.span
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, delay: delay * 0.4 }}
        style={{ fontSize: mobile ? 16 : 22 }}
      >{emoji}</motion.span>
      <div>
        <div style={{ fontFamily: 'var(--font-head)', fontWeight: 800, fontSize: mobile ? '0.82rem' : '1.05rem', color: 'var(--text)', lineHeight: 1 }}>{value}</div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: mobile ? 8 : 10, color: 'var(--text-3)', marginTop: 2 }}>{label}</div>
      </div>
    </motion.div>
  )
}

export default function Hero() {
  const mouse = useRef({ x: 0, y: 0 })
  const [mobile, setMobile] = useState(false)
  useEffect(() => {
    const fn = () => setMobile(window.innerWidth < 900)
    fn(); window.addEventListener('resize', fn)
    
    // Programmatic resize triggers to force Three.js Canvas to align correctly on mount
    const t1 = setTimeout(() => window.dispatchEvent(new Event('resize')), 150)
    const t2 = setTimeout(() => window.dispatchEvent(new Event('resize')), 800)

    return () => {
      window.removeEventListener('resize', fn)
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [])

  const onMove = e => {
    mouse.current = {
      x: (e.clientX / window.innerWidth) * 2 - 1,
      y: -((e.clientY / window.innerHeight) * 2 - 1),
    }
  }

  return (
    <section id="hero" onMouseMove={onMove}
      style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden', paddingTop: 64 }}
    >
      {/* Background aurora */}
      <div className="aurora a-violet" style={{ width: 700, height: 700, top: '-15%', right: '-10%', opacity: 0.7 }} />
      <div className="aurora a-blue" style={{ width: 500, height: 500, bottom: '-5%', left: '-8%', opacity: 0.5, animationDelay: '3s' }} />

      <div className="container" style={{ position: 'relative', zIndex: 2, width: '100%' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: mobile ? '1fr' : '1fr 1fr',
          gap: 40, alignItems: 'center',
          minHeight: 'calc(100vh - 64px)',
          padding: '32px 0 60px',
        }}>

          {/* ── Left: Content ── */}
          <div>
            {/* Available pill */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
              style={{ marginBottom: 24 }}>
              <span className="status-pill">
                <span className="pulse-dot" />
                Open to Internship &amp; Entry-Level Roles
              </span>
            </motion.div>

            {/* Hi label */}
            <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
              style={{
                fontFamily: 'var(--font-script)',
                fontSize: '2.5rem',
                color: 'var(--text)',
                marginBottom: 4,
                display: 'block'
              }}>Hi, I'm</motion.p>

            {/* Name */}
            <motion.h1 initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: 'Georgia, serif',
                fontStyle: 'italic',
                fontWeight: 700,
                fontSize: 'clamp(2.4rem, 6.5vw, 4.4rem)',
                lineHeight: 1.15, letterSpacing: 'normal', marginBottom: 16,
                whiteSpace: 'nowrap'
              }}
            >
              <span className="gradient-text">Deepak Kumar</span>
            </motion.h1>

            {/* Mobile-only profile photo directly under the name */}
            {mobile && (
              <div style={{ display: 'flex', justifyContent: 'center', margin: '34px 0 44px', position: 'relative', height: 250, width: '100%' }}>
                <div style={{ position: 'absolute', width: 220, height: 220, zIndex: 2, pointerEvents: 'none' }}>
                  <motion.div style={{ width: '100%', height: '100%', borderRadius: '50%', background: 'var(--grad)', padding: 3, boxShadow: '0 0 60px rgba(124,58,237,0.35)', animation: 'floatY 4.5s ease-in-out infinite', pointerEvents: 'auto' }}>
                    <div style={{ width: '100%', height: '100%', borderRadius: '50%', background: 'linear-gradient(135deg, #ede9fe 0%, #dbeafe 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                      <img src={new URL('../assets/profile.jpeg', import.meta.url).href} alt="Deepak Kumar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                  </motion.div>
                  {/* Floating badges relative to this container */}
                  <Badge emoji="🏆" value="Elite" label="NPTEL 81%" top="-8%" right="-26%" delay={0.2} mobile={mobile} />
                  <Badge emoji="☁️" value="AWS" label="Certified" bottom="16%" right="-32%" delay={0.4} mobile={mobile} />
                  <Badge emoji="🚀" value="4+" label=" Real World Projects" bottom="-8%" left="-22%" delay={0.6} mobile={mobile} />
                </div>
              </div>
            )}

            {/* Role chip */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.75 }}
              style={{ marginBottom: 18 }}>
              <span style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.88rem',
                color: 'var(--accent)', background: 'var(--grad-soft)',
                border: '1px solid var(--grad-border)',
                padding: '5px 14px', borderRadius: 7, display: 'inline-block',
              }}>{'</>'} Software  Developer</span>
            </motion.div>

            {/* Typewriter */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}
              style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 22, flexWrap: 'wrap' }}>
              <span style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(1rem, 2vw, 1.25rem)',
                color: 'var(--text-2)',
                fontWeight: 500
              }}>
              I build
              </span>
              <TypeAnimation
                sequence={[
                  'Web Applications', 2000,
                  'Android Apps', 2000,
                  'AI Powered Applications', 2000,
                  'Scalable Systems', 2000,
                ]}
                wrapper="span" speed={55} repeat={Infinity}
                style={{
                  fontFamily: 'var(--font-script)',
                  fontSize: 'clamp(1.5rem, 3.5vw, 1.9rem)',
                  color: 'var(--accent)',
                  fontWeight: 'bold',
                  display: 'inline-block'
                }}
              />
            </motion.div>

            {/* Desc */}
            <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.05 }}
              style={{ color: 'var(--text-2)', lineHeight: 1.8, maxWidth: 500, marginBottom: 32 }}>
              3rd-year B.Tech Computer Science Engineering student at SISTec Bhopal — building production-grade web platforms
              &amp; applied AI systems. <strong style={{ color: 'var(--text)' }}>Cisco, AWS &amp; Hackathon certified.</strong> Always shipping.
            </motion.p>

            {/* CTAs */}
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.18 }}
              style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center', marginBottom: 32 }}>
              <motion.a href="#projects"
                onClick={e => { e.preventDefault(); document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }) }}
                className="btn-grad" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
                <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <polygon points="5 3 19 12 5 21" />
                </svg>
                View My Work
              </motion.a>
              <motion.a href="#contact"
                onClick={e => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }) }}
                className="btn-ghost" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
                <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
                Hire Me
              </motion.a>
              <motion.a href="https://github.com/deepakkumar7388" target="_blank" rel="noreferrer"
                className="icon-btn" style={{ width: 42, height: 42 }}
                whileHover={{ scale: 1.12, y: -2 }}>
                <svg width="17" height="17" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
              </motion.a>
              <motion.a href="https://linkedin.com/in/deepak-kumar-84599b308" target="_blank" rel="noreferrer"
                className="icon-btn" style={{ width: 42, height: 42 }}
                whileHover={{ scale: 1.12, y: -2 }}>
                <svg width="17" height="17" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </motion.a>
            </motion.div>

            {/* Stats row */}
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.3 }}
              style={{
                display: 'flex', gap: 28, flexWrap: 'wrap', paddingTop: 24,
                borderTop: '1px solid var(--border)',
              }}>
              {[['4+', 'Projects Built'], ['6+', 'Certifications'], ['81%', 'NPTEL Score'], ['3rd', 'Year B.Tech']].map(([v, l]) => (
                <div key={l}>
                  <div style={{
                    fontFamily: 'var(--font-head)', fontWeight: 800, fontSize: '1.5rem',
                    background: 'var(--grad)',
                    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                    lineHeight: 1,
                  }}>{v}</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-3)', marginTop: 4 }}>{l}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── Right: 3D Scene / Profile Photo ── */}
          {!mobile && (
            <motion.div
              initial={{ opacity: 0, scale: 0.88 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              style={{
                position: 'relative',
                height: 540,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
              }}
            >
              {/* Three.js canvas (rendered only on desktop to save battery/resources on mobile) */}
              <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
                <Canvas camera={{ position: [0, 0, 5], fov: 55 }} gl={{ alpha: true, antialias: true }}>
                  <ambientLight intensity={0.5} />
                  <pointLight position={[7, 7, 7]} intensity={1.6} color="#a78bfa" />
                  <pointLight position={[-6, -5, -5]} intensity={0.9} color="#38bdf8" />
                  <pointLight position={[0, -8, 4]} intensity={0.5} color="#34d399" />
                  <Orb mouse={mouse} />
                  <Particles />
                </Canvas>
              </div>

               {/* Circular photo frame centered on top */}
               <div style={{
                 position: 'absolute',
                 width: 310,
                 height: 310,
                 top: '50%', left: '50%',
                 transform: 'translate(-50%, -50%)',
                 zIndex: 2,
                 pointerEvents: 'none'
               }}>
                 <motion.div
                   style={{
                     width: '100%', height: '100%', borderRadius: '50%',
                     background: 'var(--grad)', padding: 3,
                     boxShadow: '0 0 60px rgba(124,58,237,0.35)',
                     animation: 'floatY 4.5s ease-in-out infinite',
                     pointerEvents: 'auto'
                   }}
                 >
                   <div style={{
                     width: '100%', height: '100%', borderRadius: '50%',
                     background: 'linear-gradient(135deg, #ede9fe 0%, #dbeafe 100%)',
                     display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden',
                   }}>
                     <img
                       src={new URL('../assets/profile.jpeg', import.meta.url).href}
                       alt="Deepak Kumar"
                       style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                     />
                   </div>
                 </motion.div>

                 {/* Floating badges relative to this container */}
                 <Badge emoji="🏆" value="Elite" label="NPTEL 81%" top="-5%" right="-18%" delay={1.7} mobile={mobile} />
                 <Badge emoji="☁️" value="AWS" label="Certified" bottom="18%" right="-22%" delay={1.9} mobile={mobile} />
                 <Badge emoji="🚀" value="4+" label="Projects" bottom="-5%" left="-15%" delay={2.1} mobile={mobile} />
               </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.4 }}
        style={{
          position: 'absolute', bottom: 24, left: '50%', transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5, zIndex: 3,
        }}
      >
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--text-3)', letterSpacing: '0.22em', textTransform: 'uppercase' }}>Scroll</span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.4, repeat: Infinity }}>
          <svg width="16" height="16" fill="none" stroke="var(--text-3)" strokeWidth="2" viewBox="0 0 24 24">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  )
}
