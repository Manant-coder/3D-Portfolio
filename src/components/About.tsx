import { BookOpen, MapPin, Monitor, PenTool, Server } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { profile } from '../data/profile'
import GlassPanel from './GlassPanel'
import { RevealGroup, RevealItem } from './Reveal'
import SectionHeading from './SectionHeading'

interface Highlight {
  title: string
  text: string
  icon: LucideIcon
  glow: 'cyan' | 'violet'
}

const highlights: Highlight[] = [
  {
    title: 'Frontend Development',
    text: 'Responsive interfaces built with React, Angular, TypeScript and modern CSS.',
    icon: Monitor,
    glow: 'cyan',
  },
  {
    title: 'Backend Development',
    text: 'Server-side work with PHP and Laravel, backed by MySQL, MongoDB, Firebase and Supabase.',
    icon: Server,
    glow: 'violet',
  },
  {
    title: 'UI/UX Implementation',
    text: 'Turning designs, often sketched in Figma, into clean and accessible screens.',
    icon: PenTool,
    glow: 'violet',
  },
  {
    title: 'Continuous Learning',
    text: 'Exploring new tools along the way, from Three.js to local language models with Ollama.',
    icon: BookOpen,
    glow: 'cyan',
  },
]

export default function About() {
  return (
    <section id="about" className="section" aria-labelledby="about-title">
      <div className="container about-grid">
        <div className="about-copy">
          <SectionHeading id="about-title" title="About Me" text={profile.about} />
          <p className="location-chip">
            <MapPin size={16} aria-hidden="true" />
            {profile.location}
          </p>
        </div>

        <RevealGroup className="about-cards">
          {highlights.map(({ title, text, icon: Icon, glow }) => (
            <GlassPanel key={title} reveal glow={glow} className="about-card">
              <span className={`icon-tile icon-${glow}`}>
                <Icon size={22} aria-hidden="true" />
              </span>
              <h3>{title}</h3>
              <p>{text}</p>
            </GlassPanel>
          ))}
        </RevealGroup>
      </div>
    </section>
  )
}
