import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// The 3D scene (three.js + react-three-fiber) is loaded lazily from Hero.tsx,
// so it is split into its own chunk automatically.
export default defineConfig({
  plugins: [react()],
  server: { open: true },
  build: { chunkSizeWarningLimit: 1500 },
})
