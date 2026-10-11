import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, Float, Stars } from '@react-three/drei'
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing'
import Heart3D from './Heart3D'
import Particles from './Particles'

export default function Scene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 50 }}
      style={{ background: '#0a0a1a' }}
      gl={{ antialias: true, alpha: false }}
    >
      {/* Nền sao */}
      <Stars
        radius={50}
        depth={50}
        count={2000}
        factor={4}
        saturation={0.5}
        fade
        speed={1}
      />

      {/* Ánh sáng */}
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={1} color="#ff6b9d" />
      <pointLight position={[-5, -5, 5]} intensity={0.5} color="#4a90d9" />
      <pointLight position={[0, 5, -5]} intensity={0.5} color="#ff9d6b" />
      <spotLight
        position={[0, 10, 0]}
        angle={0.3}
        penumbra={1}
        intensity={2}
        color="#ffffff"
        castShadow
      />

      {/* Trái tim với hiệu ứng float */}
      <Float
        speed={2}
        rotationIntensity={0}
        floatIntensity={0.5}
        floatingRange={[-0.1, 0.1]}
      >
        <Heart3D
          color="#e74c3c"
          scale={0.8}
          rotationSpeed={0.008}
        />
      </Float>

      {/* Hạt lấp lánh */}
      <Particles count={100} color="#ff6b9d" />

      {/* Environment map cho reflections */}
      <Environment preset="sunset" />

      {/* Controls - kéo chuột để xoay 360° */}
      <OrbitControls
        enableZoom={true}
        enablePan={false}
        minDistance={3}
        maxDistance={10}
        autoRotate={false}
        enableDamping
        dampingFactor={0.05}
      />

      {/* Post-processing effects */}
      <EffectComposer>
        <Bloom
          intensity={1.5}
          luminanceThreshold={0.2}
          luminanceSmoothing={0.9}
          mipmapBlur
        />
        <Vignette eskil={false} offset={0.1} darkness={1.1} />
      </EffectComposer>
    </Canvas>
  )
}
