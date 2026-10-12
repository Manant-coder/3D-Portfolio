/**
 * Skills are listed by name only, with no percentages or expertise claims.
 */

export type Accent = 'cyan' | 'violet' | 'blend'

export interface Skill {
  name: string
  /** Short monogram shown on the card tile */
  abbr: string
  kind: string
}

export interface SkillGroup {
  id: string
  title: string
  description: string
  accent: Accent
  skills: Skill[]
}

export const skillGroups: SkillGroup[] = [
  {
    id: 'languages',
    title: 'Languages',
    description: 'The languages I build with.',
    accent: 'cyan',
    skills: [
      { name: 'HTML', abbr: 'H', kind: 'Markup' },
      { name: 'CSS', abbr: 'C', kind: 'Styling' },
      { name: 'JavaScript', abbr: 'JS', kind: 'Language' },
      { name: 'TypeScript', abbr: 'TS', kind: 'Language' },
      { name: 'C', abbr: 'C', kind: 'Language' },
      { name: 'PHP', abbr: 'PHP', kind: 'Language' },
    ],
  },
  {
    id: 'frameworks',
    title: 'Frameworks and technologies',
    description: 'Libraries and frameworks across front end and back end.',
    accent: 'violet',
    skills: [
      { name: 'React', abbr: 'Re', kind: 'Front end' },
      { name: 'Angular', abbr: 'Ng', kind: 'Front end' },
      { name: 'Laravel', abbr: 'La', kind: 'Back end' },
      { name: 'Tailwind CSS', abbr: 'Tw', kind: 'Styling' },
      { name: 'Three.js', abbr: '3D', kind: '3D graphics' },
    ],
  },
  {
    id: 'tools',
    title: 'Tools and databases',
    description: 'Everyday tooling and data storage.',
    accent: 'blend',
    skills: [
      { name: 'Git', abbr: 'Gi', kind: 'Version control' },
      { name: 'GitHub', abbr: 'GH', kind: 'Hosting' },
      { name: 'VS Code', abbr: 'VS', kind: 'Editor' },
      { name: 'Figma', abbr: 'Fi', kind: 'Design' },
      { name: 'Firebase', abbr: 'Fb', kind: 'Platform' },
      { name: 'Supabase', abbr: 'Sb', kind: 'Platform' },
      { name: 'MongoDB', abbr: 'Mo', kind: 'Database' },
      { name: 'MySQL', abbr: 'My', kind: 'Database' },
    ],
  },
]
