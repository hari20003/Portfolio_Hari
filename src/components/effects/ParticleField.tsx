import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const COUNT = 900

function Particles() {
  const ref = useRef<THREE.Points>(null)
  const mouse = useRef({ x: 0, y: 0 })

  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(COUNT * 3)
    const colors = new Float32Array(COUNT * 3)
    const palette = [new THREE.Color('#8b5cf6'), new THREE.Color('#3b82f6'), new THREE.Color('#22d3ee')]
    for (let i = 0; i < COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 22
      positions[i * 3 + 1] = (Math.random() - 0.5) * 13
      positions[i * 3 + 2] = (Math.random() - 0.5) * 9
      const c = palette[Math.floor(Math.random() * palette.length)]
      colors[i * 3] = c.r
      colors[i * 3 + 1] = c.g
      colors[i * 3 + 2] = c.b
    }
    return { positions, colors }
  }, [])

  useFrame((state, delta) => {
    const pts = ref.current
    if (!pts) return
    pts.rotation.y += delta * 0.02
    pts.rotation.x += delta * 0.004
    // gentle parallax toward pointer
    mouse.current.x += (state.pointer.x * 0.35 - mouse.current.x) * 0.03
    mouse.current.y += (state.pointer.y * 0.25 - mouse.current.y) * 0.03
    pts.position.x = mouse.current.x
    pts.position.y = mouse.current.y
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        vertexColors
        transparent
        opacity={0.55}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

/** Three.js floating particle field — lazily mounted behind the hero. */
export default function ParticleField() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        dpr={[1, 1.6]}
        gl={{ antialias: false, powerPreference: 'low-power', alpha: true }}
      >
        <Particles />
      </Canvas>
    </div>
  )
}
