import { useEffect, useRef, useMemo, type ReactNode } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Edges, Environment, Float, Lightformer, RoundedBox } from '@react-three/drei'
import * as THREE from 'three'
import { useCanvasTexture, type Drawer } from './useCanvasTexture'
import {
  drawAngularBadge,
  drawBackendCard,
  drawCyanGlow,
  drawFrontendCard,
  drawLaravelBadge,
  drawProfileCard,
  drawReactBadge,
  drawThreeBadge,
  drawTypeScriptBadge,
  drawVioletGlow,
} from './cards'

type Vec3 = [number, number, number]

interface SceneProps {
  reducedMotion: boolean
  isMobile: boolean
}

/* ------------------------------------------------------------------ */
/* Rig: gentle pointer-based parallax for the whole scene + camera     */
/* ------------------------------------------------------------------ */

function Rig({ children, reducedMotion }: { children: ReactNode; reducedMotion: boolean }) {
  const group = useRef<THREE.Group>(null)
  const pointer = useRef({ x: 0, y: 0 })
  const viewportWidth = useThree((state) => state.viewport.width)

  // Scale the composition so it always fits the canvas width.
  const scale = THREE.MathUtils.clamp(viewportWidth / 6.9, 0.5, 1.15)

  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      pointer.current.x = (event.clientX / window.innerWidth) * 2 - 1
      pointer.current.y = (event.clientY / window.innerHeight) * 2 - 1
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [])

  useFrame((state, delta) => {
    const target = group.current
    if (!target || reducedMotion) return
    const { x, y } = pointer.current
    target.rotation.y = THREE.MathUtils.damp(target.rotation.y, x * 0.26, 3, delta)
    target.rotation.x = THREE.MathUtils.damp(target.rotation.x, y * 0.14, 3, delta)

    state.camera.position.x = THREE.MathUtils.damp(state.camera.position.x, x * 0.35, 2, delta)
    state.camera.position.y = THREE.MathUtils.damp(state.camera.position.y, -y * 0.2, 2, delta)
    state.camera.lookAt(0, 0, 0)
  })

  return (
    <group ref={group} scale={scale}>
      {children}
    </group>
  )
}

/* ------------------------------------------------------------------ */
/* Glass card: translucent slab + painted texture plane                */
/* ------------------------------------------------------------------ */

interface GlassCardProps {
  position: Vec3
  size: [number, number]
  draw: Drawer
  textureSize: [number, number]
  tint?: string
  rotation?: Vec3
  floatSpeed?: number
  floatIntensity?: number
  reducedMotion: boolean
}

function GlassCard({
  position,
  size,
  draw,
  textureSize,
  tint = '#9FEFFF',
  rotation = [0, 0, 0],
  floatSpeed = 1.1,
  floatIntensity = 0.8,
  reducedMotion,
}: GlassCardProps) {
  const [w, h] = size
  const texture = useCanvasTexture(textureSize[0], textureSize[1], draw)

  return (
    <Float
      position={position}
      rotation={rotation}
      speed={reducedMotion ? 0 : floatSpeed}
      rotationIntensity={0.18}
      floatIntensity={floatIntensity}
      floatingRange={[-0.08, 0.08]}
    >
      <RoundedBox args={[w, h, 0.1]} radius={0.12} smoothness={4}>
        <meshPhysicalMaterial
          color={tint}
          transparent
          opacity={0.17}
          roughness={0.12}
          metalness={0.1}
          clearcoat={1}
          clearcoatRoughness={0.1}
          envMapIntensity={1.2}
          depthWrite={false}
        />
      </RoundedBox>
      <mesh position={[0, 0, 0.056]}>
        <planeGeometry args={[w, h]} />
        <meshBasicMaterial map={texture} transparent toneMapped={false} depthWrite={false} />
      </mesh>
    </Float>
  )
}

/* ------------------------------------------------------------------ */
/* Glowing technology badge                                            */
/* ------------------------------------------------------------------ */

function TechBadge({
  position,
  draw,
  speed = 1.4,
  reducedMotion,
}: {
  position: Vec3
  draw: Drawer
  speed?: number
  reducedMotion: boolean
}) {
  const texture = useCanvasTexture(288, 112, draw)
  return (
    <Float
      position={position}
      speed={reducedMotion ? 0 : speed}
      rotationIntensity={0.3}
      floatIntensity={1.1}
      floatingRange={[-0.1, 0.1]}
    >
      <mesh>
        <planeGeometry args={[0.96, 0.373]} />
        <meshBasicMaterial map={texture} transparent toneMapped={false} depthWrite={false} />
      </mesh>
    </Float>
  )
}

/* ------------------------------------------------------------------ */
/* Geometric glass objects                                             */
/* ------------------------------------------------------------------ */

type ShapeKind = 'ico' | 'octa' | 'torus'

function GlassShape({
  kind,
  position,
  color,
  scale = 1,
  spin = [0.18, 0.26],
  reducedMotion,
}: {
  kind: ShapeKind
  position: Vec3
  color: string
  scale?: number
  spin?: [number, number]
  reducedMotion: boolean
}) {
  const mesh = useRef<THREE.Mesh>(null)

  useFrame((_, delta) => {
    if (reducedMotion || !mesh.current) return
    mesh.current.rotation.x += delta * spin[0]
    mesh.current.rotation.y += delta * spin[1]
  })

  return (
    <Float
      position={position}
      speed={reducedMotion ? 0 : 1.3}
      rotationIntensity={0.2}
      floatIntensity={1.2}
      floatingRange={[-0.12, 0.12]}
    >
      <mesh ref={mesh} scale={scale}>
        {kind === 'ico' ? <icosahedronGeometry args={[0.6, 0]} /> : null}
        {kind === 'octa' ? <octahedronGeometry args={[0.55, 0]} /> : null}
        {kind === 'torus' ? <torusGeometry args={[0.42, 0.13, 16, 48]} /> : null}
        <meshPhysicalMaterial
          color={color}
          transparent
          opacity={0.5}
          roughness={0.08}
          metalness={0.25}
          clearcoat={1}
          emissive={color}
          emissiveIntensity={0.3}
          envMapIntensity={1.4}
        />
        <Edges color={color} />
      </mesh>
    </Float>
  )
}

/* ------------------------------------------------------------------ */
/* Particles and glow                                                  */
/* ------------------------------------------------------------------ */

function Particles({
  count,
  color,
  size,
  reducedMotion,
}: {
  count: number
  color: string
  size: number
  reducedMotion: boolean
}) {
  const points = useRef<THREE.Points>(null)

  const positions = useMemo(() => {
    const array = new Float32Array(count * 3)
    for (let i = 0; i < count; i += 1) {
      array[i * 3] = (Math.random() - 0.5) * 14
      array[i * 3 + 1] = (Math.random() - 0.5) * 9
      array[i * 3 + 2] = (Math.random() - 0.5) * 8 - 1
    }
    return array
  }, [count])

  useFrame((_, delta) => {
    if (reducedMotion || !points.current) return
    points.current.rotation.y += delta * 0.02
    points.current.rotation.x += delta * 0.008
  })

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={size}
        color={color}
        transparent
        opacity={0.75}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  )
}

function Glow({ position, size, draw }: { position: Vec3; size: number; draw: Drawer }) {
  const texture = useCanvasTexture(256, 256, draw)
  return (
    <mesh position={position}>
      <planeGeometry args={[size, size]} />
      <meshBasicMaterial
        map={texture}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        toneMapped={false}
      />
    </mesh>
  )
}

/* ------------------------------------------------------------------ */
/* Scene                                                               */
/* ------------------------------------------------------------------ */

export default function SceneContents({ reducedMotion, isMobile }: SceneProps) {
  const invalidate = useThree((state) => state.invalidate)

  // In reduced-motion mode the canvas only renders on demand, so ask for a
  // couple of frames after mount to let the environment map finish.
  useEffect(() => {
    if (!reducedMotion) return
    const timers = [100, 400, 900].map((ms) => window.setTimeout(() => invalidate(), ms))
    return () => timers.forEach((id) => window.clearTimeout(id))
  }, [reducedMotion, invalidate])

  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[-4, 3, 4]} intensity={45} color="#00E5FF" distance={16} />
      <pointLight position={[4, -3, 3]} intensity={45} color="#8B5CF6" distance={16} />
      <pointLight position={[0, 0, -4]} intensity={20} color="#ffffff" distance={12} />

      <Environment resolution={isMobile ? 32 : 64} frames={1}>
        <Lightformer form="rect" intensity={2.2} color="#00E5FF" position={[-5, 2, -2]} scale={[6, 3, 1]} />
        <Lightformer form="rect" intensity={2.2} color="#8B5CF6" position={[5, -2, -2]} scale={[6, 3, 1]} />
        <Lightformer form="ring" intensity={1.6} color="#ffffff" position={[0, 5, 2]} scale={4} />
      </Environment>

      <Rig reducedMotion={reducedMotion}>
        <Glow position={[-0.8, 0.6, -1.4]} size={6.5} draw={drawCyanGlow} />
        <Glow position={[1.2, -0.8, -1.8]} size={6} draw={drawVioletGlow} />

        {/* Main profile card */}
        <GlassCard
          position={[0, 0.05, 0]}
          size={[3, 3.75]}
          textureSize={[768, 960]}
          draw={drawProfileCard}
          floatSpeed={0.9}
          floatIntensity={0.5}
          reducedMotion={reducedMotion}
        />

        {/* Floating skill cards */}
        <GlassCard
          position={[2.05, 1.5, 0.9]}
          rotation={[0, -0.18, 0.03]}
          size={[2.2, 1]}
          textureSize={[704, 320]}
          draw={drawFrontendCard}
          floatSpeed={1.3}
          reducedMotion={reducedMotion}
        />
        <GlassCard
          position={[-2.05, -1.45, 1]}
          rotation={[0, 0.18, -0.03]}
          size={[2.2, 1]}
          textureSize={[704, 320]}
          draw={drawBackendCard}
          tint="#C4B5FD"
          floatSpeed={1.15}
          reducedMotion={reducedMotion}
        />

        {/* Geometric glass objects */}
        <GlassShape kind="ico" position={[-2.7, 2.3, -0.4]} color="#00E5FF" scale={0.9} reducedMotion={reducedMotion} />
        <GlassShape kind="octa" position={[2.8, -1.9, 0.1]} color="#8B5CF6" scale={0.9} reducedMotion={reducedMotion} />

        {!isMobile ? (
          <>
            <GlassShape
              kind="torus"
              position={[-0.9, -2.5, -0.6]}
              color="#8B5CF6"
              scale={0.85}
              spin={[0.25, 0.15]}
              reducedMotion={reducedMotion}
            />

            {/* Glowing technology badges */}
            <TechBadge position={[-2, 1.75, 0.7]} draw={drawReactBadge} reducedMotion={reducedMotion} />
            <TechBadge position={[-2.45, 0.55, 0.4]} draw={drawLaravelBadge} speed={1.2} reducedMotion={reducedMotion} />
            <TechBadge position={[2.35, -0.25, 0.6]} draw={drawAngularBadge} speed={1.6} reducedMotion={reducedMotion} />
            <TechBadge position={[1.35, -2.15, 0.8]} draw={drawThreeBadge} speed={1.3} reducedMotion={reducedMotion} />
            <TechBadge position={[-0.55, 2.45, 0.5]} draw={drawTypeScriptBadge} speed={1.5} reducedMotion={reducedMotion} />
          </>
        ) : null}
      </Rig>

      <Particles count={isMobile ? 160 : 420} color="#9BE9FF" size={0.035} reducedMotion={reducedMotion} />
      <Particles count={isMobile ? 60 : 160} color="#B79CFF" size={0.045} reducedMotion={reducedMotion} />
    </>
  )
}
