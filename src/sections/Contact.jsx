import React, { useState } from 'react'
import { motion } from 'framer-motion'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] },
})

function FloatingInput({ label, name, type = 'text', placeholder, value, onChange }) {
  const [focused, setFocused] = useState(false)
  return (
    <div style={{ marginBottom: 18 }}>
      <label style={{
        display: 'block', fontSize: 11.5, fontWeight: 600, color: 'var(--text-3)',
        fontFamily: 'var(--font-mono)', marginBottom: 7, textTransform: 'uppercase', letterSpacing: '0.08em',
      }}>{label}</label>
      <input
        type={type} name={name} placeholder={placeholder} value={value} onChange={onChange}
        onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
        style={{
          width: '100%', padding: '13px 16px', borderRadius: 13,
          background: 'var(--bg-alt)', color: 'var(--text)',
          fontFamily: 'var(--font-body)', fontSize: 14, outline: 'none',
          border: `1.5px solid ${focused ? 'var(--accent)' : 'var(--border)'}`,
          boxShadow: focused ? '0 0 0 3px rgba(240,160,80,0.1)' : 'none',
          transition: 'all 0.25s',
        }}
      />
    </div>
  )
}

function FloatingTextarea({ label, name, placeholder, rows = 5, value, onChange }) {
  const [focused, setFocused] = useState(false)
  return (
    <div style={{ marginBottom: 18 }}>
      <label style={{
        display: 'block', fontSize: 11.5, fontWeight: 600, color: 'var(--text-3)',
        fontFamily: 'var(--font-mono)', marginBottom: 7, textTransform: 'uppercase', letterSpacing: '0.08em',
      }}>{label}</label>
      <textarea
        name={name} placeholder={placeholder} rows={rows} value={value} onChange={onChange}
        onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
        style={{
          width: '100%', padding: '13px 16px', borderRadius: 13,
          background: 'var(--bg-alt)', color: 'var(--text)',
          fontFamily: 'var(--font-body)', fontSize: 14, outline: 'none', resize: 'vertical', minHeight: 120,
          border: `1.5px solid ${focused ? 'var(--accent)' : 'var(--border)'}`,
          boxShadow: focused ? '0 0 0 3px rgba(240,160,80,0.1)' : 'none',
          transition: 'all 0.25s',
        }}
      />
    </div>
  )
}

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState('idle')

  const onChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const onSubmit = async e => {
    e.preventDefault()
    setStatus('sending')
    try {
      const formData = new FormData()
      formData.append('form-name', 'contact')
      formData.append('name', form.name)
      formData.append('email', form.email)
      formData.append('subject', form.subject)
      formData.append('message', form.message)

      await fetch('/', {
        method: 'POST',
        headers: { 'Accept': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData).toString()
      })
      setStatus('sent')
      setTimeout(() => { setStatus('idle'); setForm({ name: '', email: '', subject: '', message: '' }) }, 4000)
    } catch (error) {
      console.error(error)
      setStatus('idle')
      alert("Oops! Something went wrong. Please try again.")
    }
  }

  return (
    <section id="contact" className="section" style={{ background: 'var(--bg)', position: 'relative', overflow: 'hidden' }}>
      <div className="gradient-mesh" style={{ position: 'absolute', inset: 0, zIndex: 0 }} />
      <div className="aurora a-violet" style={{ width: 500, height: 500, bottom: '-10%', left: '-8%', opacity: 0.4 }} />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>

        {/* Cinematic headline */}
        <motion.div {...fadeUp(0)} style={{ marginBottom: 56 }}>
          <p className="kicker">05 / Contact</p>
          <h2 style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontStyle: 'italic', fontWeight: 700,
            fontSize: 'clamp(2.2rem, 5.5vw, 4rem)',
            lineHeight: 1.1, letterSpacing: '-0.02em',
            marginBottom: 18,
          }}>
            Let's Build Something{' '}
            <span className="gradient-text">Together.</span>
          </h2>
          <p className="section-lead" style={{ maxWidth: 520 }}>
            Open for internships, collaborations, and freelance opportunities. Reach out — I respond fast.
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 48, alignItems: 'start' }}>

          {/* Left — Info */}
          <motion.div {...fadeUp(0.1)}>
            {/* Status */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              padding: '13px 20px', borderRadius: 16, marginBottom: 36,
              background: 'rgba(16,185,129,0.07)', border: '1px solid rgba(16,185,129,0.18)',
            }}>
              <div style={{ width: 9, height: 9, borderRadius: '50%', background: '#10b981', animation: 'pulseDot 2s infinite' }} />
              <span style={{ fontFamily: 'var(--font-head)', fontWeight: 600, fontSize: 13.5, color: '#10b981' }}>
                Open to Work — Actively looking
              </span>
            </div>

            {/* Contact details */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              {[
                { icon: '✉️', label: 'Email', value: 'dk21230621@gmail.com', href: 'mailto:dk21230621@gmail.com' },
                { icon: '📞', label: 'Phone', value: '+91-7992054663', href: 'tel:+917992054663' },
                { icon: '📍', label: 'Location', value: 'Bhopal, Madhya Pradesh, India' },
                { icon: '🎓', label: 'College', value: 'SISTec Bhopal — B.Tech CSE' },
              ].map(({ icon, label, value, href }) => (
                <div key={label} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: 13, flexShrink: 0, fontSize: 19,
                    background: 'var(--grad-soft)', border: '1px solid var(--grad-border)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>{icon}</div>
                  <div>
                    <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 3 }}>{label}</p>
                    {href
                      ? <a href={href} style={{ color: 'var(--accent)', fontWeight: 600, fontSize: '0.88rem' }}
                          onMouseEnter={e => e.currentTarget.style.textDecoration = 'underline'}
                          onMouseLeave={e => e.currentTarget.style.textDecoration = 'none'}>{value}</a>
                      : <p style={{ color: 'var(--text-2)', fontSize: '0.88rem', fontWeight: 500 }}>{value}</p>}
                  </div>
                </div>
              ))}
            </div>

            {/* Social links */}
            <div style={{ display: 'flex', gap: 10, marginTop: 32, paddingTop: 24, borderTop: '1px solid var(--border)' }}>
              {[
                { href: 'https://github.com/deepakkumar7388', title: 'GitHub', d: 'M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z' },
                { href: 'https://linkedin.com/in/deepak-kumar-84599b308', title: 'LinkedIn', d: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' },
              ].map(s => (
                <motion.a key={s.title} href={s.href} target="_blank" rel="noreferrer"
                  title={s.title} className="icon-btn" style={{ width: 44, height: 44 }}
                  whileHover={{ scale: 1.12, y: -2 }}>
                  <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d={s.d} /></svg>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Right — Glassmorphic Form */}
          <motion.div {...fadeUp(0.2)}
            style={{
              background: 'var(--bg-card)', border: '1px solid var(--border)',
              borderRadius: 24, padding: '36px 30px', boxShadow: 'var(--shadow-lg)',
              backdropFilter: 'blur(20px)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 24 }}>
              <div style={{
                width: 8, height: 8, borderRadius: '50%', background: 'var(--accent)',
                boxShadow: '0 0 8px rgba(240,160,80,0.4)',
              }} />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 600, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Send a message</span>
            </div>

            <form onSubmit={onSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 14px' }}>
                <FloatingInput label="Your Name" name="name" value={form.name} onChange={onChange} />
                <FloatingInput label="Email" name="email" type="email" value={form.email} onChange={onChange} />
              </div>
              <FloatingInput label="Subject" name="subject" value={form.subject} onChange={onChange} />
              <FloatingTextarea label="Message" name="message" value={form.message} onChange={onChange} />

              <motion.button type="submit" disabled={status !== 'idle'}
                whileHover={status === 'idle' ? { scale: 1.02 } : {}}
                whileTap={status === 'idle' ? { scale: 0.98 } : {}}
                style={{
                  width: '100%', padding: '14px', borderRadius: 14,
                  border: 'none', cursor: status !== 'idle' ? 'not-allowed' : 'pointer',
                  background: status === 'sent' ? '#10b981' : 'var(--grad)',
                  color: '#fff', fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: 15,
                  boxShadow: status === 'sent' ? '0 6px 20px rgba(16,185,129,0.3)' : '0 6px 24px rgba(192,112,40,0.28)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  marginTop: 4, transition: 'background 0.3s',
                }}
              >
                {status === 'sent' ? '✓ Message Sent!' : status === 'sending' ? 'Sending...' : (
                  <>
                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
                    Send Message
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
