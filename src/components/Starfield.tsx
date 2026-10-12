import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'

interface Star {
  x: number
  y: number
  r: number
  alpha: number
  phase: number
  speed: number
  rgb: string
}

/** Lightweight 2D canvas star field that sits behind the whole page. */
export default function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const prefersReduced = useReducedMotion() ?? false

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    let width = 0
    let height = 0
    let stars: Star[] = []
    let frame = 0

    const build = () => {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      const count = Math.round(Math.min(140, (width * height) / 14000))
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 1.1 + 0.3,
        alpha: Math.random() * 0.55 + 0.2,
        phase: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.5 + 0.15,
        rgb: Math.random() < 0.22 ? '167, 139, 250' : '186, 240, 255',
      }))
    }

    const draw = (time: number) => {
      ctx.clearRect(0, 0, width, height)
      for (const star of stars) {
        const twinkle = prefersReduced ? 1 : 0.65 + 0.35 * Math.sin(time * 0.0012 * star.speed + star.phase)
        ctx.fillStyle = `rgba(${star.rgb}, ${(star.alpha * twinkle).toFixed(3)})`
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2)
        ctx.fill()

        if (!prefersReduced) {
          star.y -= star.speed * 0.04
          if (star.y < -2) {
            star.y = height + 2
            star.x = Math.random() * width
          }
        }
      }
      if (!prefersReduced) frame = requestAnimationFrame(draw)
    }

    let lastWidth = window.innerWidth
    const onResize = () => {
      // Mobile browsers fire resize when the address bar hides; ignore small height changes.
      if (window.innerWidth === lastWidth && Math.abs(window.innerHeight - height) < 160) return
      lastWidth = window.innerWidth
      build()
      if (prefersReduced) frame = requestAnimationFrame(draw)
    }

    build()
    frame = requestAnimationFrame(draw)
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', onResize)
    }
  }, [prefersReduced])

  return <canvas ref={canvasRef} className="starfield" aria-hidden="true" />
}
