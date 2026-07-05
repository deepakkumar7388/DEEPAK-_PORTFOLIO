import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('three') || id.includes('@react-three')) {
              return 'vendor-three'
            }
            if (id.includes('framer-motion') || id.includes('gsap') || id.includes('lenis')) {
              return 'vendor-animation'
            }
            return 'vendor'
          }
        }
      }
    }
  }
})
