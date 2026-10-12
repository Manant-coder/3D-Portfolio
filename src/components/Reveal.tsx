import type { ReactNode } from 'react'
import { motion, type Variants } from 'framer-motion'

export const groupVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}

export const itemVariants: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
}

interface RevealProps {
  children: ReactNode
  className?: string
}

/** Container that reveals its `reveal` GlassPanels / RevealItems one after another. */
export function RevealGroup({ children, className }: RevealProps) {
  return (
    <motion.div
      className={className}
      variants={groupVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
    >
      {children}
    </motion.div>
  )
}

/** A single child of a RevealGroup. */
export function RevealItem({ children, className }: RevealProps) {
  return (
    <motion.div className={className} variants={itemVariants}>
      {children}
    </motion.div>
  )
}
