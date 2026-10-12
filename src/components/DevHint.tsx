import type { ReactNode } from 'react'

/** Shown only while running `npm run dev`, never in the production build. */
export default function DevHint({ children }: { children: ReactNode }) {
  if (!import.meta.env.DEV) return null
  return <p className="dev-hint">Dev note: {children}</p>
}
