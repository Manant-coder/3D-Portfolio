import { profile } from '../data/profile'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <p>
          &copy; {new Date().getFullYear()} {profile.name}
        </p>
        <p className="footer-note">Built with React, TypeScript and Three.js</p>
      </div>
    </footer>
  )
}
