import { useRef, useState, type ChangeEvent, type FocusEvent, type FormEvent } from 'react'
import { Github, Linkedin, Mail, Send } from 'lucide-react'
import { profile } from '../data/profile'
import GlassPanel from './GlassPanel'
import SectionHeading from './SectionHeading'

interface FormValues {
  name: string
  email: string
  subject: string
  message: string
}

type FieldName = keyof FormValues
type Errors = Partial<Record<FieldName, string>>

const emptyValues: FormValues = { name: '', email: '', subject: '', message: '' }
const fieldOrder: FieldName[] = ['name', 'email', 'subject', 'message']
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

function validateField(field: FieldName, value: string): string | undefined {
  const text = value.trim()
  switch (field) {
    case 'name':
      if (text.length < 2) return 'Enter your name (at least 2 characters).'
      return undefined
    case 'email':
      if (!text) return 'Enter your email address.'
      if (!emailPattern.test(text)) return 'Enter a valid email address, like name@example.com.'
      return undefined
    case 'subject':
      if (text.length < 3) return 'Add a short subject (at least 3 characters).'
      return undefined
    case 'message':
      if (text.length < 10) return 'Write a message of at least 10 characters.'
      if (text.length > 2000) return 'Keep the message under 2000 characters.'
      return undefined
  }
}

function validateAll(values: FormValues): Errors {
  const errors: Errors = {}
  fieldOrder.forEach((field) => {
    const message = validateField(field, values[field])
    if (message) errors[field] = message
  })
  return errors
}

function buildMailto(values: FormValues): string {
  const body = `${values.message.trim()}\n\nFrom: ${values.name.trim()} (${values.email.trim()})`
  return `mailto:${profile.email}?subject=${encodeURIComponent(values.subject.trim())}&body=${encodeURIComponent(body)}`
}

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null)
  const [values, setValues] = useState<FormValues>(emptyValues)
  const [errors, setErrors] = useState<Errors>({})
  const [mailtoHref, setMailtoHref] = useState<string>('')

  const onChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const field = event.target.name as FieldName
    const value = event.target.value
    setValues((current) => ({ ...current, [field]: value }))
    // Re-check a field as soon as the person starts fixing it.
    if (errors[field]) {
      setErrors((current) => ({ ...current, [field]: validateField(field, value) }))
    }
  }

  const onBlur = (event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const field = event.target.name as FieldName
    setErrors((current) => ({ ...current, [field]: validateField(field, event.target.value) }))
  }

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const found = validateAll(values)
    setErrors(found)

    const firstInvalid = fieldOrder.find((field) => found[field])
    if (firstInvalid) {
      setMailtoHref('')
      formRef.current?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus()
      return
    }

    const href = buildMailto(values)
    setMailtoHref(href)
    // Opens the visitor's own email app. Nothing is sent or stored by this site.
    window.location.href = href
  }

  const fieldProps = (field: FieldName) => ({
    id: `contact-${field}`,
    name: field,
    value: values[field],
    onChange,
    onBlur,
    'aria-invalid': errors[field] ? (true as const) : undefined,
    'aria-describedby': errors[field] ? `contact-${field}-error` : undefined,
  })

  const errorText = (field: FieldName) =>
    errors[field] ? (
      <span className="field-error" id={`contact-${field}-error`}>
        {errors[field]}
      </span>
    ) : null

  return (
    <section id="contact" className="section" aria-labelledby="contact-title">
      <div className="container contact-grid">
        <div className="contact-copy">
          <SectionHeading
            id="contact-title"
            title="Let's Build Something Great"
            text="Have an idea or opportunity? I'd be happy to connect."
          />

          <ul className="contact-list">
            <li>
              <a className="contact-link" href={`mailto:${profile.email}`}>
                <span className="icon-tile icon-cyan">
                  <Mail size={20} aria-hidden="true" />
                </span>
                <span className="contact-text">
                  <small>Email</small>
                  <span>{profile.email}</span>
                </span>
              </a>
            </li>
            <li>
              <a className="contact-link" href={profile.github} target="_blank" rel="noopener noreferrer">
                <span className="icon-tile icon-violet">
                  <Github size={20} aria-hidden="true" />
                </span>
                <span className="contact-text">
                  <small>GitHub</small>
                  <span>{profile.github}</span>
                </span>
              </a>
            </li>
            <li>
              <a className="contact-link" href={profile.linkedin} target="_blank" rel="noopener noreferrer">
                <span className="icon-tile icon-cyan">
                  <Linkedin size={20} aria-hidden="true" />
                </span>
                <span className="contact-text">
                  <small>LinkedIn</small>
                  <span>{profile.linkedin}</span>
                </span>
              </a>
            </li>
          </ul>
        </div>

        <GlassPanel glow="violet" lift={false} className="contact-form-panel">
          <form ref={formRef} onSubmit={onSubmit} noValidate aria-label="Contact form">
            <div className="field-row">
              <div className="field">
                <label htmlFor="contact-name">Name</label>
                <input type="text" autoComplete="name" {...fieldProps('name')} />
                {errorText('name')}
              </div>
              <div className="field">
                <label htmlFor="contact-email">Email</label>
                <input type="email" autoComplete="email" {...fieldProps('email')} />
                {errorText('email')}
              </div>
            </div>

            <div className="field">
              <label htmlFor="contact-subject">Subject</label>
              <input type="text" {...fieldProps('subject')} />
              {errorText('subject')}
            </div>

            <div className="field">
              <label htmlFor="contact-message">Message</label>
              <textarea rows={6} {...fieldProps('message')} />
              {errorText('message')}
            </div>

            <button type="submit" className="btn btn-primary btn-block">
              <Send size={18} aria-hidden="true" />
              <span>Open in my email app</span>
            </button>

            <p className="form-note">
              This site has no server, so nothing is sent or stored here. The button opens your email
              app with this message filled in, and you send it from there.
            </p>

            <div role="status" aria-live="polite" className="form-status">
              {mailtoHref ? (
                <p>
                  Your email app should be opening now. If nothing happened,{' '}
                  <a href={mailtoHref}>open the draft again</a> or write to{' '}
                  <a href={`mailto:${profile.email}`}>{profile.email}</a>.
                </p>
              ) : null}
            </div>
          </form>
        </GlassPanel>
      </div>
    </section>
  )
}
