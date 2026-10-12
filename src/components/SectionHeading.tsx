interface SectionHeadingProps {
  id: string
  title: string
  text?: string
}

export default function SectionHeading({ id, title, text }: SectionHeadingProps) {
  return (
    <div className="section-head">
      <h2 id={id}>{title}</h2>
      {text ? <p>{text}</p> : null}
    </div>
  )
}
