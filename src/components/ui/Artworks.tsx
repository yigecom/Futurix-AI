import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, OrbitControls, Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

// --------------------------------------------------------
// 骇客帝国风格的 01 数字瀑布流背景 (若隐若现)
// --------------------------------------------------------
const MatrixRain = () => {
  const pointsRef = useRef<THREE.Points>(null);
  const particleCount = 1400;
  
  // 生成粒子位置
  const positions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 5 - 2;
    }
    return pos;
  }, []);

  useFrame(() => {
    if (pointsRef.current) {
      const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        positions[i * 3 + 1] -= 0.008 + (i % 5) * 0.003;
        if (positions[i * 3 + 1] < -5) {
          positions[i * 3 + 1] = 5;
          positions[i * 3] = (Math.random() - 0.5) * 10;
        }
      }
      pointsRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <Points ref={pointsRef} positions={positions}>
      <PointMaterial 
        transparent 
        color="#b6cce3" 
        size={0.011}
        sizeAttenuation={true} 
        depthWrite={false}
        opacity={0.08}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
};

const DroneSwarm = ({ radius = 1.55, count = 10 }: { radius?: number; count?: number }) => {
  const swarmRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (swarmRef.current) {
      swarmRef.current.rotation.y = -state.clock.elapsedTime * 0.35;
    }
  });

  return (
    <group ref={swarmRef}>
      {Array.from({ length: count }).map((_, i) => {
        const angle = (i / count) * Math.PI * 2;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        const y = Math.sin(angle * 2.3) * 0.22;
        return (
          <group key={`drone-${i}`} position={[x, y, z]} rotation={[0, -angle, 0]}>
            <mesh>
              <capsuleGeometry args={[0.018, 0.09, 2, 8]} />
              <meshStandardMaterial color="#dbe6f1" emissive="#afc5da" emissiveIntensity={0.35} />
            </mesh>
            <mesh position={[0.06, 0, 0]}>
              <boxGeometry args={[0.08, 0.008, 0.024]} />
              <meshStandardMaterial color="#b8cbde" metalness={0.5} roughness={0.35} />
            </mesh>
            <mesh position={[-0.06, 0, 0]}>
              <boxGeometry args={[0.08, 0.008, 0.024]} />
              <meshStandardMaterial color="#b8cbde" metalness={0.5} roughness={0.35} />
            </mesh>
          </group>
        );
      })}
    </group>
  );
};

const CityCore = ({ scale = 1 }: { scale?: number }) => {
  const groupRef = useRef<THREE.Group>(null);
  const streetRef = useRef<THREE.LineSegments>(null);

  const streetGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const positions: number[] = [];
    for (let i = 0; i < 100; i++) {
      const radius = (0.1 + Math.random() * 0.5) * scale;
      const angleA = Math.random() * Math.PI * 2;
      const angleB = angleA + (Math.random() * 0.4 + 0.1);
      const yA = (Math.random() - 0.5) * 0.4 * scale;
      const yB = (Math.random() - 0.5) * 0.4 * scale;
      positions.push(
        Math.cos(angleA) * radius,
        yA,
        Math.sin(angleA) * radius,
        Math.cos(angleB) * radius,
        yB,
        Math.sin(angleB) * radius
      );
    }
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    return geometry;
  }, [scale]);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.06;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.15) * 0.08;
    }
    if (streetRef.current) {
      streetRef.current.rotation.y = -state.clock.elapsedTime * 0.04;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh>
        <sphereGeometry args={[0.5 * scale, 48, 48]} />
        <meshPhysicalMaterial color="#c3d6e8" transmission={0.5} transparent opacity={0.3} roughness={0.2} metalness={0.15} />
      </mesh>

      <lineSegments ref={streetRef} geometry={streetGeometry}>
        <lineBasicMaterial color="#dce8f2" transparent opacity={0.3} />
      </lineSegments>

      {Array.from({ length: 25 }).map((_, i) => {
        const angle = (i / 25) * Math.PI * 2;
        const ring = i % 3;
        const radius = (0.18 + ring * 0.07) * scale;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        const y = ((i % 5) - 2) * 0.04 * scale;
        const h = (0.05 + (i % 6) * 0.015) * scale;
        return (
          <mesh key={`mini-${i}`} position={[x, y, z]}>
            <cylinderGeometry args={[0.009 * scale, 0.011 * scale, h, 8]} />
            <meshPhysicalMaterial color={ring === 2 ? '#e7b89f' : '#bfd3e6'} transmission={0.75} transparent opacity={0.7} roughness={0.15} metalness={0.3} />
          </mesh>
        );
      })}
    </group>
  );
};

const WireOrbitShell = ({ radius = 1.95, detail = 3, opacity = 0.15 }: { radius?: number; detail?: number; opacity?: number }) => (
  <mesh>
    <icosahedronGeometry args={[radius, detail]} />
    <meshStandardMaterial color="#9db7cd" wireframe emissive="#91a9bf" emissiveIntensity={0.35} transparent opacity={opacity} />
  </mesh>
);

// --------------------------------------------------------
// 1. 首页 Hero 区域：脑状未来城市核心
// --------------------------------------------------------
const BrainCityMesh = () => {
  const rootRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (rootRef.current) {
      rootRef.current.rotation.y = state.clock.elapsedTime * 0.06;
      rootRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.14) * 0.08;
    }
  });

  return (
    <group ref={rootRef}>
      <Float speed={0.9} rotationIntensity={0.12} floatIntensity={0.4}>
        <CityCore scale={0.6} />
        <WireOrbitShell radius={1.3} detail={3} opacity={0.18} />
      </Float>
      <DroneSwarm radius={1.0} count={10} />
    </group>
  );
};

export const HeroArt = () => {
  return (
    <div className="w-full h-full min-h-[400px] flex items-center justify-center relative overflow-hidden bg-transparent">
      <Canvas camera={{ position: [0, 0, 5.2], fov: 34 }}>
        <ambientLight intensity={0.55} />
        <pointLight position={[3.5, 4, 4]} intensity={0.85} color="#cfe2f5" />
        <pointLight position={[-3.5, -3.5, -2]} intensity={0.62} color="#f2b89e" />
        <pointLight position={[0, 0.2, 2.5]} intensity={0.5} color="#ffffff" />
        <MatrixRain />
        <BrainCityMesh />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.2} />
      </Canvas>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_35%_32%,rgba(180,207,229,0.12),transparent_50%),radial-gradient(circle_at_72%_64%,rgba(240,178,147,0.08),transparent_50%)] pointer-events-none" />
    </div>
  );
};

// --------------------------------------------------------
// 2. About 区域：组织架构与多智能体协同星链 (小巧、玄彩)
// --------------------------------------------------------
const TeamNetworkMesh = () => {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * -0.15;
      groupRef.current.rotation.z = Math.cos(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={1.3} rotationIntensity={0.2} floatIntensity={0.5}>
        <CityCore scale={0.5} />
        <WireOrbitShell radius={1.2} detail={3} opacity={0.16} />
      </Float>
      <DroneSwarm radius={0.9} count={8} />
    </group>
  );
};

export const AboutArt = () => {
  return (
    <div className="w-full h-full min-h-[400px] flex items-center justify-center relative overflow-hidden bg-transparent">
      <Canvas camera={{ position: [0, 0, 5], fov: 34 }}>
        <ambientLight intensity={0.55} />
        <MatrixRain />
        <TeamNetworkMesh />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.24} />
      </Canvas>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(171,198,222,0.1),transparent_55%)] pointer-events-none" />
    </div>
  );
};

// --------------------------------------------------------
// 3. Contact 区域：无限可能的莫比乌斯数字通道 (小巧、玄彩)
// --------------------------------------------------------
const InfinityMesh = () => {
  const meshRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.08;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.12;
    }
  });

  return (
      <Float speed={1.2} rotationIntensity={0.25} floatIntensity={0.5}>
        <group ref={meshRef}>
          <CityCore scale={0.45} />
          <WireOrbitShell radius={1.1} detail={3} opacity={0.14} />
        </group>
        <DroneSwarm radius={0.85} count={7} />
      </Float>
  );
};

export const ContactArt = () => {
  return (
    <div className="w-full h-full min-h-[300px] flex items-center justify-center relative overflow-hidden bg-transparent">
      <Canvas camera={{ position: [0, 0, 4.7], fov: 36 }}>
        <ambientLight intensity={0.65} />
        <MatrixRain />
        <InfinityMesh />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.22} />
      </Canvas>
    </div>
  );
};