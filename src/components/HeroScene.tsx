import { useEffect, useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import SceneContents from './scene/SceneContents'

interface HeroSceneProps {
  reducedMotion: boolean
  isMobile: boolean
}

/**
 * The react-three-fiber canvas for the hero. Rendering is paused while the
 * hero is off screen and switched to on-demand when reduced motion is on.
 */
export default function HeroScene({ reducedMotion, isMobile }: HeroSceneProps) {
  const wrapper = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const element = wrapper.current
    if (!element) return
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.02 },
    )
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  const frameloop = !visible ? 'never' : reducedMotion ? 'demand' : 'always'

  return (
    <div ref={wrapper} className="scene-canvas">
      <Canvas
        frameloop={frameloop}
        dpr={isMobile ? [1, 1.25] : [1, 1.75]}
        camera={{ position: [0, 0, 9], fov: 40 }}
        gl={{ antialias: !isMobile, alpha: true, powerPreference: 'high-performance' }}
      >
        <SceneContents reducedMotion={reducedMotion} isMobile={isMobile} />
      </Canvas>
    </div>
  )
}
