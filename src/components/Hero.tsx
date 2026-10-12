import { lazy, Suspense, useMemo } from 'react'
import { motion, useReducedMotion, type Variants } from 'framer-motion'
import { Download, Github, Linkedin, Mail } from 'lucide-react'
import { profile } from '../data/profile'
import { isWebGLAvailable } from '../utils/webgl'
import { useMediaQuery } from '../hooks/useMediaQuery'
import ActionButton from './ActionButton'
import DevHint from './DevHint'
import HeroFallback from './HeroFallback'
import SceneBoundary from './SceneBoundary'

// three.js and react-three-fiber are only downloaded when the hero needs them.
const HeroScene = lazy(() => import('./HeroScene'))

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
}

const item: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

export default function Hero() {
  const reducedMotion = useReducedMotion() ?? false
  const isMobile = useMediaQuery('(max-width: 768px)')
  const webgl = useMemo(() => isWebGLAvailable(), [])

  return (
    <section id="home" className="hero" aria-labelledby="hero-title">
      <div className="container hero-grid">
        <motion.div className="hero-copy" variants={container} initial="hidden" animate="show">
          <motion.span variants={item} className="badge">
            <span className="badge-dot" aria-hidden="true" />
            AVAILABLE FOR OPPORTUNITIES
          </motion.span>

          <motion.h1 variants={item} id="hero-title">
            Hi, I'm {profile.name}
          </motion.h1>

          <motion.p variants={item} className="hero-role">
            {profile.role}
          </motion.p>

          <motion.p variants={item} className="hero-lead">
            {profile.heroLead}
          </motion.p>

          <motion.div variants={item} className="hero-actions">
            <ActionButton label="Explore My Work" href="#projects" variant="primary" />
            <ActionButton
              label="Download Resume"
              href={profile.resumeUrl || undefined}
              variant="glass"
              icon={<Download size={18} aria-hidden="true" />}
              download
              disabledReason="Resume coming soon"
            />
            <ActionButton
              label="Contact Me"
              href="#contact"
              variant="ghost"
              icon={<Mail size={18} aria-hidden="true" />}
            />
          </motion.div>

          {!profile.resumeUrl ? (
            <DevHint>
              the resume button is disabled. Put your PDF in public/resume.pdf and set resumeUrl to
              '/resume.pdf' in src/data/profile.ts.
            </DevHint>
          ) : null}

          <motion.ul variants={item} className="socials" aria-label="Social links">
            <li>
              <a
                className="social"
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub profile (opens in a new tab)"
              >
                <Github size={20} aria-hidden="true" />
              </a>
            </li>
            <li>
              <a
                className="social"
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn profile (opens in a new tab)"
              >
                <Linkedin size={20} aria-hidden="true" />
              </a>
            </li>
          </motion.ul>
        </motion.div>

        <div
          className="hero-visual"
          role="img"
          aria-label="Floating glass panels showing a profile card, skills and technology badges"
        >
          {webgl ? (
            <SceneBoundary fallback={<HeroFallback />}>
              <Suspense fallback={<HeroFallback />}>
                <HeroScene reducedMotion={reducedMotion} isMobile={isMobile} />
              </Suspense>
            </SceneBoundary>
          ) : (
            <HeroFallback />
          )}
        </div>
      </div>
    </section>
  )
}
