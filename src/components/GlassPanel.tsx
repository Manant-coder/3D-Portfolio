import type { PointerEvent, ReactNode } from 'react'
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'framer-motion'
import { itemVariants } from './Reveal'

interface GlassPanelProps {
  children: ReactNode
  className?: string
  /** Glow colour used on hover. */
  glow?: 'cyan' | 'violet'
  /** Pointer-based 3D tilt (mouse only, disabled for reduced motion). */
  tilt?: boolean
  /** Take part in the stagger of a parent RevealGroup. */
  reveal?: boolean
  /** Lift slightly on hover. */
  lift?: boolean
}

export default function GlassPanel({
  children,
  className = '',
  glow = 'cyan',
  tilt = false,
  reveal = false,
  lift = true,
}: GlassPanelProps) {
  const reducedMotion = useReducedMotion()
  const px = useMotionValue(0)
  const py = useMotionValue(0)
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [5, -5]), { stiffness: 180, damping: 20 })
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-7, 7]), { stiffness: 180, damping: 20 })

  const tiltEnabled = tilt && !reducedMotion

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!tiltEnabled || event.pointerType !== 'mouse') return
    const rect = event.currentTarget.getBoundingClientRect()
    px.set((event.clientX - rect.left) / rect.width - 0.5)
    py.set((event.clientY - rect.top) / rect.height - 0.5)
  }

  const onPointerLeave = () => {
    px.set(0)
    py.set(0)
  }

  return (
    <motion.div
      className={`glass glass-${glow} ${className}`.trim()}
      variants={reveal ? itemVariants : undefined}
      whileHover={lift ? { y: -4 } : undefined}
      transition={{ type: 'spring', stiffness: 260, damping: 24 }}
      style={tiltEnabled ? { rotateX, rotateY, transformPerspective: 900 } : undefined}
      onPointerMove={tiltEnabled ? onPointerMove : undefined}
      onPointerLeave={tiltEnabled ? onPointerLeave : undefined}
    >
      {children}
    </motion.div>
  )
}
