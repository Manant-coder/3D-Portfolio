import { profile } from '../data/profile'

/** CSS-only stand-in for the 3D scene (no WebGL, or while the 3D code loads). */
export default function HeroFallback() {
  return (
    <div className="fallback-scene" aria-hidden="true">
      <span className="fb-glow fb-glow-cyan" />
      <span className="fb-glow fb-glow-violet" />

      <div className="fb-card fb-main">
        <div className="fb-avatar">{profile.initials}</div>
        <h3>{profile.name}</h3>
        <p className="fb-role">{profile.role}</p>
        <p className="fb-location">{profile.location}</p>
        <ul className="fb-chips">
          <li>React</li>
          <li>Angular</li>
          <li>Laravel</li>
          <li>TypeScript</li>
        </ul>
      </div>

      <div className="fb-card fb-side fb-front">
        <strong>Frontend</strong>
        <span>Interfaces and interaction</span>
      </div>
      <div className="fb-card fb-side fb-back">
        <strong>Backend</strong>
        <span>Data and server logic</span>
      </div>

      <span className="fb-badge fb-badge-1">Three.js</span>
      <span className="fb-badge fb-badge-2">Laravel</span>
      <span className="fb-orb fb-orb-1" />
      <span className="fb-orb fb-orb-2" />
    </div>
  )
}
