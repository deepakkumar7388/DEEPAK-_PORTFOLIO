import React, { useEffect, useState } from 'react'

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 })
  const [glow, setGlow] = useState({ x: -100, y: -100 })
  const [clicked, setClicked] = useState(false)
  const [hidden, setHidden] = useState(true)

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY })
      setHidden(false)
    }
    const handleMouseLeave = () => setHidden(true)
    const handleMouseDown = () => setClicked(true)
    const handleMouseUp = () => setClicked(false)

    window.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseleave', handleMouseLeave)
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [])

  // Smooth trailing interpolation
  useEffect(() => {
    let animFrame
    const updateGlow = () => {
      setGlow((prev) => {
        const dx = position.x - prev.x
        const dy = position.y - prev.y
        return {
          x: prev.x + dx * 0.15,
          y: prev.y + dy * 0.15,
        }
      })
      animFrame = requestAnimationFrame(updateGlow)
    }
    animFrame = requestAnimationFrame(updateGlow)
    return () => cancelAnimationFrame(animFrame)
  }, [position])

  if (hidden) return null

  return (
    <>
      {/* Central custom pointer dot */}
      <div style={{
        position: 'fixed',
        left: position.x,
        top: position.y,
        width: 6,
        height: 6,
        background: 'var(--accent)',
        borderRadius: '50%',
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none',
        zIndex: 99999
      }} />

      {/* Trailing neon glow ring */}
      <div style={{
        position: 'fixed',
        left: glow.x,
        top: glow.y,
        width: clicked ? 26 : 38,
        height: clicked ? 26 : 38,
        border: '1.5px solid var(--accent)',
        background: clicked ? 'rgba(99, 102, 241, 0.15)' : 'transparent',
        borderRadius: '50%',
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none',
        zIndex: 99998,
        transition: 'width 0.15s, height 0.15s, background-color 0.15s',
        boxShadow: '0 0 14px var(--accent)',
        opacity: 0.8
      }} />
    </>
  )
}
