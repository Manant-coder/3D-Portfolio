import { Component, type ReactNode } from 'react'

interface Props {
  fallback: ReactNode
  children: ReactNode
}

interface State {
  hasError: boolean
}

/** Shows the CSS fallback if the 3D scene throws (for example when WebGL fails late). */
export default class SceneBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  componentDidCatch(error: unknown) {
    console.warn('3D scene could not start, showing the CSS fallback instead.', error)
  }

  render() {
    return this.state.hasError ? this.props.fallback : this.props.children
  }
}
