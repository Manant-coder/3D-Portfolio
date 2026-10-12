import { skillGroups } from '../data/skills'
import GlassPanel from './GlassPanel'
import { RevealGroup } from './Reveal'
import SectionHeading from './SectionHeading'

export default function Skills() {
  return (
    <section id="skills" className="section" aria-labelledby="skills-title">
      <div className="container">
        <SectionHeading
          id="skills-title"
          title="Skills"
          text="The languages, frameworks and tools I work with."
        />

        <div className="skill-groups">
          {skillGroups.map((group) => (
            <section
              key={group.id}
              className={`skill-group accent-${group.accent}`}
              aria-labelledby={`skills-${group.id}`}
            >
              <div className="skill-group-head">
                <h3 id={`skills-${group.id}`}>{group.title}</h3>
                <p>{group.description}</p>
              </div>

              <RevealGroup className="skill-grid">
                {group.skills.map((skill) => (
                  <GlassPanel key={skill.name} reveal className="skill-card">
                    <span className="skill-tile" aria-hidden="true">
                      {skill.abbr}
                    </span>
                    <span className="skill-text">
                      <strong>{skill.name}</strong>
                      <span>{skill.kind}</span>
                    </span>
                  </GlassPanel>
                ))}
              </RevealGroup>
            </section>
          ))}
        </div>
      </div>
    </section>
  )
}
