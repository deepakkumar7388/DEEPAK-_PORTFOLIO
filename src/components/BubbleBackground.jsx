import React, { useEffect, useRef } from 'react'

export default function BubbleBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId
    let bubbles = []

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    class Bubble {
      constructor() {
        this.reset()
      }

      reset() {
        this.x = Math.random() * canvas.width
        this.y = canvas.height + Math.random() * 100
        this.radius = Math.random() * 3 + 1
        this.speed = Math.random() * 0.8 + 0.3
        this.opacity = Math.random() * 0.4 + 0.1
        // Horizontal oscillation
        this.wobble = Math.random() * 2 * Math.PI
        this.wobbleSpeed = Math.random() * 0.02 + 0.005
        this.wobbleRadius = Math.random() * 1.5 + 0.5
      }

      update() {
        this.y -= this.speed
        this.wobble += this.wobbleSpeed
        this.x += Math.sin(this.wobble) * this.wobbleRadius

        if (this.y < -20) {
          this.reset()
        }
      }

      draw() {
        // Adjust color dynamically according to theme color variables
        const theme = document.documentElement.getAttribute('data-theme')
        const color = theme === 'dark' ? '167, 139, 250' : '124, 58, 237'
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${color}, ${this.opacity})`
        ctx.fill()
      }
    }

    const init = () => {
      resizeCanvas()
      bubbles = []
      const bubbleCount = Math.min(60, Math.floor(window.innerWidth / 20))
      for (let i = 0; i < bubbleCount; i++) {
        const bubble = new Bubble()
        // Distribute bubbles initially along height
        bubble.y = Math.random() * canvas.height
        bubbles.push(bubble)
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      bubbles.forEach((bubble) => {
        bubble.update()
        bubble.draw()
      })
      animationFrameId = requestAnimationFrame(animate)
    }

    window.addEventListener('resize', resizeCanvas)
    init()
    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1,
        opacity: 0.85,
      }}
    />
  )
}
