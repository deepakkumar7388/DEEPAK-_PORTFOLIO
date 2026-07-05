import React, { useState, useEffect, useCallback, lazy, Suspense } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Preloader from './components/Preloader'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Hero from './sections/Hero'

const About = lazy(() => import('./sections/About'))
const Skills = lazy(() => import('./sections/Skills'))
const Projects = lazy(() => import('./sections/Projects'))
const Awards = lazy(() => import('./sections/Awards'))
const Certifications = lazy(() => import('./sections/Certifications'))
const Contact = lazy(() => import('./sections/Contact'))

import './index.css'

import BubbleBackground from './components/BubbleBackground'
import { TransitionProvider } from './components/TransitionProvider'
import CustomCursor from './components/CustomCursor'

export default function App() {
  const [ready, setReady] = useState(false)
  const [dark, setDark] = useState(() => {
    const saved = localStorage.getItem('theme')
    if (saved) return saved === 'dark'
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })
  const onReady = useCallback(() => setReady(true), [])

  useEffect(() => {
    document.body.style.overflow = ready ? '' : 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [ready])

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light')
    localStorage.setItem('theme', dark ? 'dark' : 'light')
  }, [dark])

  return (
    <div className="app-root">
      <CustomCursor />
      <Preloader onComplete={onReady} dark={dark} />
      <BubbleBackground />
      <TransitionProvider>
        <AnimatePresence>
          {ready && (
            <motion.div
              key="main"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.55 }}
            >
              <Navbar dark={dark} setDark={setDark} />
              <main style={{ position: 'relative', zIndex: 2 }}>
                <Hero dark={dark} />
                <Suspense fallback={null}>
                  <About dark={dark} />
                  <Skills dark={dark} />
                  <Projects dark={dark} />
                  <Awards dark={dark} />
                  <Certifications dark={dark} />
                  <Contact dark={dark} />
                </Suspense>
              </main>
              <Footer dark={dark} />
            </motion.div>
          )}
        </AnimatePresence>
      </TransitionProvider>
    </div>
  )
}
