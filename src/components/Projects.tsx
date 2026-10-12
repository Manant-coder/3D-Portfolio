import { ExternalLink, Github } from 'lucide-react'
import { projects } from '../data/projects'
import ActionButton from './ActionButton'
import DevHint from './DevHint'
import GlassPanel from './GlassPanel'
import ProjectPreview from './ProjectPreview'
import { RevealGroup } from './Reveal'
import SectionHeading from './SectionHeading'

export default function Projects() {
  const missingLinks = projects.some((project) => !project.primary.url || !project.github.url)

  return (
    <section id="projects" className="section" aria-labelledby="projects-title">
      <div className="container">
        <SectionHeading
          id="projects-title"
          title="Projects"
          text="A few things I have built and experimented with."
        />

        <RevealGroup className="project-grid">
          {projects.map((project, index) => {
            const glow = index % 2 === 0 ? 'cyan' : 'violet'
            return (
              <GlassPanel key={project.id} reveal tilt glow={glow} className="project-card">
                <ProjectPreview kind={project.preview} />
                <div className="project-body">
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <ul className="tech-list" aria-label={`${project.title} technologies`}>
                    {project.tech.map((tech) => (
                      <li key={tech}>{tech}</li>
                    ))}
                  </ul>
                  <div className="project-actions">
                    <ActionButton
                      label={project.primary.label}
                      href={project.primary.url || undefined}
                      variant="primary"
                      size="sm"
                      external
                      icon={<ExternalLink size={16} aria-hidden="true" />}
                      disabledReason={`${project.title}: link coming soon`}
                    />
                    <ActionButton
                      label={project.github.label}
                      href={project.github.url || undefined}
                      variant="glass"
                      size="sm"
                      external
                      icon={<Github size={16} aria-hidden="true" />}
                      disabledReason={`${project.title}: repository link coming soon`}
                    />
                  </div>
                </div>
              </GlassPanel>
            )
          })}
        </RevealGroup>

        {missingLinks ? (
          <DevHint>
            some project buttons are disabled because their url is empty. Add the links in
            src/data/projects.ts.
          </DevHint>
        ) : null}
      </div>
    </section>
  )
}
