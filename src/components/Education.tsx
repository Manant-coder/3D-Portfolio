import { Briefcase, GraduationCap } from 'lucide-react'
import { profile } from '../data/profile'
import GlassPanel from './GlassPanel'
import { RevealGroup } from './Reveal'
import SectionHeading from './SectionHeading'

export default function Education() {
  const { education, experience } = profile

  return (
    <section id="education" className="section" aria-labelledby="education-title">
      <div className="container">
        <SectionHeading
          id="education-title"
          title="Education and Experience"
          text="Where I am on my journey so far."
        />

        <RevealGroup className="edu-grid">
          <GlassPanel reveal glow="cyan" className="edu-card">
            <span className="icon-tile icon-cyan">
              <GraduationCap size={24} aria-hidden="true" />
            </span>
            <div>
              <h3>Education</h3>
              <p className="edu-value">{education.label}</p>
              {education.institution ? <p className="edu-detail">{education.institution}</p> : null}
              {education.period ? <p className="edu-detail">{education.period}</p> : null}
            </div>
          </GlassPanel>

          <GlassPanel reveal glow="violet" className="edu-card">
            <span className="icon-tile icon-violet">
              <Briefcase size={24} aria-hidden="true" />
            </span>
            <div>
              <h3>Experience</h3>
              <p className="edu-value">{experience.label}</p>
              {experience.summary ? <p className="edu-detail">{experience.summary}</p> : null}
            </div>
          </GlassPanel>
        </RevealGroup>
      </div>
    </section>
  )
}
