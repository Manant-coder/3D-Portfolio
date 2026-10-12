/**
 * Project data lives here.
 *
 * Add your real URLs in the `url` fields. While a url is an empty string
 * the matching button is shown as disabled, so no fake links are ever used.
 */

export interface ProjectLink {
  label: string
  url: string
}

export type PreviewKind = 'crm' | 'ai' | 'portfolio'

export interface Project {
  id: string
  title: string
  description: string
  tech: string[]
  preview: PreviewKind
  primary: ProjectLink
  github: ProjectLink
}

export const projects: Project[] = [
  {
    id: 'edu-crm',
    title: 'EDU-Crm',
    description:
      'An education CRM concept for organizing student information and education-related workflows.',
    tech: ['Angular', 'TypeScript', 'Firebase'],
    preview: 'crm',
    primary: { label: 'View Project', url: '' },
    github: { label: 'GitHub', url: '' },
  },
  {
    id: 'edu-central-ai',
    title: 'Edu Central AI',
    description:
      'An AI-powered education CRM project combining Laravel with a locally running Ollama language model.',
    tech: ['Laravel', 'PHP', 'Ollama'],
    preview: 'ai',
    primary: { label: 'View Project', url: '' },
    github: { label: 'GitHub', url: '' },
  },
  {
    id: '3d-portfolio',
    title: '3D Developer Portfolio',
    description:
      'A personal portfolio featuring floating glass panels, immersive 3D visuals, and responsive modern design.',
    tech: ['React', 'TypeScript', 'Three.js'],
    preview: 'portfolio',
    primary: { label: 'Live Preview', url: '' },
    github: { label: 'GitHub', url: '' },
  },
]
