import type { ReactNode } from 'react'
import { motion } from 'framer-motion'

interface ActionButtonProps {
  label: string
  /** When empty or missing the button is rendered as disabled. */
  href?: string
  variant?: 'primary' | 'glass' | 'ghost'
  size?: 'md' | 'sm'
  icon?: ReactNode
  external?: boolean
  download?: boolean
  disabledReason?: string
}

export default function ActionButton({
  label,
  href,
  variant = 'glass',
  size = 'md',
  icon,
  external = false,
  download = false,
  disabledReason = 'This link has not been added yet',
}: ActionButtonProps) {
  const className = `btn btn-${variant}${size === 'sm' ? ' btn-sm' : ''}`

  if (!href) {
    return (
      <button type="button" className={className} disabled aria-disabled="true" title={disabledReason}>
        {icon}
        <span>{label}</span>
      </button>
    )
  }

  return (
    <motion.a
      className={className}
      href={href}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      {...(download ? { download: true } : {})}
    >
      {icon}
      <span>{label}</span>
    </motion.a>
  )
}
