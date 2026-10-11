import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// Tạo hình trái tim 3D bằng ExtrudeGeometry
export default function Heart3D({ color = '#e74c3c', scale = 1, rotationSpeed = 0.005 }) {
  const meshRef = useRef()
  const glowRef = useRef()

  // Tạo shape trái tim 2D
  const heartShape = useMemo(() => {
    const shape = new THREE.Shape()

    // Vẽ hình trái tim bằng bezier curves
    shape.moveTo(0, 0)
    shape.bezierCurveTo(0, -0.3, -0.5, -0.7, -1, -0.7)
    shape.bezierCurveTo(-1.7, -0.7, -1.7, 0.3, -1.7, 0.3)
    shape.bezierCurveTo(-1.7, 0.8, -1.2, 1.4, 0, 2.2)
    shape.bezierCurveTo(1.2, 1.4, 1.7, 0.8, 1.7, 0.3)
    shape.bezierCurveTo(1.7, 0.3, 1.7, -0.7, 1, -0.7)
    shape.bezierCurveTo(0.5, -0.7, 0, -0.3, 0, 0)

    return shape
  }, [])

  // Extrude settings để tạo 3D
  const extrudeSettings = useMemo(() => ({
    depth: 0.5,
    bevelEnabled: true,
    bevelSegments: 12,
    steps: 2,
    bevelSize: 0.15,
    bevelThickness: 0.15,
  }), [])

  // Animation loop
  useFrame((state) => {
    if (meshRef.current) {
      // Xoay liên tục quanh trục Y
      meshRef.current.rotation.y += rotationSpeed

      // Nhẹ nhàng "đập" như tim đập
      const heartbeat = Math.sin(state.clock.elapsedTime * 2) * 0.03 + 1
      meshRef.current.scale.set(
        scale * heartbeat,
        scale * heartbeat,
        scale * heartbeat
      )
    }

    if (glowRef.current) {
      glowRef.current.rotation.y += rotationSpeed
      const heartbeat = Math.sin(state.clock.elapsedTime * 2) * 0.03 + 1
      glowRef.current.scale.set(
        scale * heartbeat * 1.02,
        scale * heartbeat * 1.02,
        scale * heartbeat * 1.02
      )
    }
  })

  return (
    <group rotation={[Math.PI, 0, 0]} position={[0, -0.5, 0]}>
      {/* Tim chính */}
      <mesh ref={meshRef} scale={scale}>
        <extrudeGeometry args={[heartShape, extrudeSettings]} />
        <meshPhysicalMaterial
          color={color}
          metalness={0.3}
          roughness={0.2}
          clearcoat={1}
          clearcoatRoughness={0.1}
          envMapIntensity={1.5}
          emissive={color}
          emissiveIntensity={0.15}
        />
      </mesh>

      {/* Lớp glow ngoài */}
      <mesh ref={glowRef} scale={scale * 1.02}>
        <extrudeGeometry args={[heartShape, extrudeSettings]} />
        <meshPhysicalMaterial
          color={color}
          transparent
          opacity={0.15}
          metalness={0}
          roughness={1}
          emissive={color}
          emissiveIntensity={0.5}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  )
}
