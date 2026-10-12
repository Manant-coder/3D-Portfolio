import type { PreviewKind } from '../data/projects'

/** Pure CSS mock-ups used as project preview images. */
export default function ProjectPreview({ kind }: { kind: PreviewKind }) {
  if (kind === 'crm') {
    return (
      <div className="pv pv-crm" aria-hidden="true">
        <div className="pv-bar">
          <span />
          <span />
          <span />
        </div>
        <div className="pv-body">
          <div className="pv-side">
            <span />
            <span />
            <span />
            <span />
          </div>
          <div className="pv-main">
            <div className="pv-stats">
              <span />
              <span />
              <span />
            </div>
            <div className="pv-rows">
              <span />
              <span />
              <span />
              <span />
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (kind === 'ai') {
    return (
      <div className="pv pv-ai" aria-hidden="true">
        <div className="pv-bar">
          <span />
          <span />
          <span />
        </div>
        <div className="pv-chat">
          <div className="pv-msg pv-msg-user">
            <span />
            <span />
          </div>
          <div className="pv-msg pv-msg-ai">
            <span />
            <span />
            <span />
          </div>
          <div className="pv-model">Local model</div>
          <div className="pv-input" />
        </div>
      </div>
    )
  }

  return (
    <div className="pv pv-portfolio" aria-hidden="true">
      <span className="pv-orb pv-orb-1" />
      <span className="pv-orb pv-orb-2" />
      <div className="pv-panel pv-panel-a">
        <span />
        <span />
      </div>
      <div className="pv-panel pv-panel-b">
        <span />
        <span />
        <span />
      </div>
      <div className="pv-panel pv-panel-c" />
    </div>
  )
}
