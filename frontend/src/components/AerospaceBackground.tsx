"use client"

import React, { useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Trail, Float } from "@react-three/drei"
import { MathUtils } from "three"
import type * as THREE from "three"

// Aircraft that follows a path with a trail
function Aircraft({ position, speed, color }: { position: [number, number, number]; speed: number; color: string }) {
  const ref = useRef<THREE.Mesh>(null!)
  const pathRef = useRef<THREE.Mesh>(null!)
  const time = useRef(Math.random() * 100)

  useFrame((state) => {
    time.current += state.clock.elapsedTime * 0.05 * speed

    // Create a figure-8 flight path
    const x = Math.sin(time.current) * 3
    const y = Math.sin(time.current * 0.5) * 1.5
    const z = Math.cos(time.current) * 3

    ref.current.position.set(x, y, z)

    // Rotate to face direction of movement
    const nextX = Math.sin(time.current + 0.01) * 3
    const nextY = Math.sin((time.current + 0.01) * 0.5) * 1.5
    const nextZ = Math.cos(time.current + 0.01) * 3

    ref.current.lookAt(nextX, nextY, nextZ)
  })

  return (
    <group position={position}>
      <Trail width={0.05} length={8} color={color} attenuation={(t) => t * t}>
        <mesh ref={ref}>
          <coneGeometry args={[0.1, 0.4, 4]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} />
        </mesh>
      </Trail>
    </group>
  )
}

// Satellite in orbit
function Satellite({ radius, speed, color }: { radius: number; speed: number; color: string }) {
  const ref = useRef<THREE.Mesh>(null!)
  const time = useRef(Math.random() * 100)

  useFrame((state) => {
    time.current += state.clock.elapsedTime * 0.05 * speed

    // Elliptical orbit
    const x = Math.sin(time.current) * radius
    const y = Math.sin(time.current * 0.4) * radius * 0.3
    const z = Math.cos(time.current) * radius

    ref.current.position.set(x, y, z)
    ref.current.lookAt(0, 0, 0)
  })

  return (
    <group>
      <Trail width={0.02} length={10} color={color} attenuation={(t) => t * t}>
        <mesh ref={ref}>
          <boxGeometry args={[0.2, 0.2, 0.2]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.8} />
        </mesh>
      </Trail>
    </group>
  )
}

// Grid representing airspace or orbital plane
function Grid() {
  return (
    <group rotation={[Math.PI / 2, 0, 0]}>
      <gridHelper args={[30, 30, "#1a3c6e", "#1a3c6e"]} position={[0, 0, -10]} />
      <gridHelper args={[30, 30, "#1a3c6e", "#1a3c6e"]} position={[0, 0, 10]} />
    </group>
  )
}

// Technical blueprint elements
function BlueprintElements() {
  const groupRef = useRef<THREE.Group>(null!)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.05
    }
  })

  return (
    <group ref={groupRef}>
      {/* Circular elements */}
      {[...Array(3)].map((_, i) => (
        <mesh key={i} position={[0, 0, 0]} rotation={[Math.random(), Math.random(), Math.random()]}>
          <ringGeometry args={[5 + i * 2, 5.1 + i * 2, 64]} />
          <meshBasicMaterial color="#4a88d8" transparent opacity={0.2} wireframe />
        </mesh>
      ))}

      {/* Measurement lines */}
      {[...Array(8)].map((_, i) => {
        const angle = (i / 8) * Math.PI * 2
        return (
          <mesh key={`line-${i}`} position={[Math.sin(angle) * 10, 0, Math.cos(angle) * 10]}>
            <boxGeometry args={[0.05, 10, 0.05]} />
            <meshBasicMaterial color="#4a88d8" transparent opacity={0.2} />
          </mesh>
        )
      })}
    </group>
  )
}

// Main scene component
function AerospaceScene() {
  const sceneRef = useRef<THREE.Group>(null!)

  useFrame((state) => {
    if (sceneRef.current) {
      // Subtle overall rotation
      sceneRef.current.rotation.y = state.clock.elapsedTime * 0.03
    }
  })

  return (
    <group ref={sceneRef}>
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={0.5} />

      {/* Grid system */}
      <Grid />

      {/* Aircraft with trails */}
      {/* <Aircraft position={[0, 0, 0]} speed={0.001} color="#ff4a4a" />
      <Aircraft position={[2, 1, 0]} speed={0.001} color="#4aff4a" />
      <Aircraft position={[-2, -1, 0]} speed={0.001} color="#4a4aff" /> */}

      {/* Satellites */}
       {/* <Satellite radius={8} speed={0.001} color="#ffaa44" />
      <Satellite radius={12} speed={0.005} color="#44aaff" />
      <Satellite radius={15} speed={0.009} color="#aa44ff" />  */}

      {/* Technical elements */}
      <BlueprintElements />

      {/* Floating data points */}
      {[...Array(30)].map((_, i) => (
        <Float key={i} speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
          <mesh
            position={[MathUtils.randFloatSpread(20), MathUtils.randFloatSpread(20), MathUtils.randFloatSpread(20)]}
          >
            <sphereGeometry args={[0.1, 8, 8]} />
            <meshStandardMaterial color="#ffffff" emissive="#88ccff" emissiveIntensity={2} transparent opacity={0.7} />
          </mesh>
        </Float>
      ))}
    </group>
  )
}

const AerospaceBackground: React.FC = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full z-[-1]">
      <Canvas camera={{ position: [0, 0, 20], fov: 60 }}>
        <color attach="background" args={["#050a18"]} />
        <fog attach="fog" args={["#050a18", 20, 40]} />
        <AerospaceScene />
        <OrbitControls enableZoom={false} enablePan={false} enableRotate={true} />
      </Canvas>
    </div>
  )
}

export default AerospaceBackground
