/**
 * Central place for personal information.
 * Edit the values below and the whole site updates.
 */

export interface Profile {
  name: string
  initials: string
  role: string
  location: string
  email: string
  github: string
  linkedin: string
  /**
   * Path or URL of your resume PDF.
   * 1. Put the file in the `public` folder, e.g. public/resume.pdf
   * 2. Set resumeUrl to '/resume.pdf'
   * While this is empty, the "Download Resume" button is shown as disabled.
   */
  resumeUrl: string
  heroLead: string
  about: string
  education: {
    label: string
    /** Optional. Leave empty to hide. e.g. your college name */
    institution: string
    /** Optional. Leave empty to hide. e.g. '2023 - 2026' */
    period: string
  }
  experience: {
    label: string
    /** Optional. Leave empty to hide. */
    summary: string
  }
}

export const profile: Profile = {
  name: 'Manant Prajapati',
  initials: 'MP',
  role: 'Full-Stack Developer',
  location: 'Patan, Gujarat',
  email: 'manantp025@gmail.com',
  github: 'https://github.com/Manant-coder',
  linkedin: 'https://www.linkedin.com/in/manant-prajapati-08a33341b/',
  resumeUrl: '',
  heroLead:
    'I build modern web applications, interactive experiences, and intelligent digital solutions with clean code and thoughtful design.',
  about:
    "I'm a developer from Patan, Gujarat, focused on building responsive web applications and useful digital products. I enjoy learning new technologies, solving problems, and turning ideas into working software.",
  education: {
    label: 'BCA / BSc IT',
    institution: '',
    period: '',
  },
  experience: {
    label: 'Fresher',
    summary: 'Looking for opportunities to grow as a developer and work on real projects.',
  },
}
