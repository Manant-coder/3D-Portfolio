import { useEffect, useMemo } from 'react'
import { useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { FONT_BODY, FONT_DISPLAY, type Ctx } from './drawing'

export type Drawer = (ctx: Ctx, width: number, height: number) => void

/**
 * Paints `draw` onto an offscreen canvas and exposes it as a three.js texture.
 * The drawing is repeated once the web fonts are ready so the text uses them.
 * `draw` must be a stable function (declare it at module level).
 */
export function useCanvasTexture(width: number, height: number, draw: Drawer): THREE.CanvasTexture {
  const invalidate = useThree((state) => state.invalidate)

  const texture = useMemo(() => {
    const canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height
    const ctx = canvas.getContext('2d')
    if (ctx) draw(ctx, width, height)
    const created = new THREE.CanvasTexture(canvas)
    created.colorSpace = THREE.SRGBColorSpace
    created.anisotropy = 4
    return created
  }, [width, height, draw])

  useEffect(() => {
    let cancelled = false
    const redraw = () => {
      if (cancelled) return
      const canvas = texture.image as HTMLCanvasElement
      const ctx = canvas.getContext('2d')
      if (!ctx) return
      ctx.clearRect(0, 0, width, height)
      draw(ctx, width, height)
      texture.needsUpdate = true
      invalidate()
    }

    if (document.fonts && typeof document.fonts.load === 'function') {
      Promise.all([
        document.fonts.load(`700 32px ${FONT_DISPLAY}`),
        document.fonts.load(`600 24px ${FONT_BODY}`),
      ])
        .catch(() => undefined)
        .then(redraw)
    }

    return () => {
      cancelled = true
    }
  }, [texture, width, height, draw, invalidate])

  useEffect(() => () => texture.dispose(), [texture])

  return texture
}
