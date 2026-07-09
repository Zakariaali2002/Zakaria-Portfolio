import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Text, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";

const techs = [
  { name: "React", color: "#61dafb", size: 0.5, pos: [-3, 1.5, -2] as [number, number, number] },
  { name: "Next.js", color: "#ffffff", size: 0.45, pos: [3.2, -0.5, -1.5] as [number, number, number] },
  { name: "Node.js", color: "#339933", size: 0.45, pos: [-2.5, -2, -1] as [number, number, number] },
  { name: "MongoDB", color: "#47A248", size: 0.4, pos: [2.8, 2, -2.5] as [number, number, number] },
  { name: "TypeScript", color: "#3178C6", size: 0.45, pos: [0, 2.8, -3] as [number, number, number] },
  { name: "Tailwind", color: "#06B6D4", size: 0.4, pos: [-3.5, -1.8, 0] as [number, number, number] },
];

interface TechCubeProps {
  name: string;
  color: string;
  size: number;
  position: [number, number, number];
  speed: number;
}

function TechCube({ name, color, size, position, speed }: TechCubeProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = clock.getElapsedTime() * speed * 0.3;
      meshRef.current.rotation.y = clock.getElapsedTime() * speed * 0.5;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      <Float speed={1.5 * speed} rotationIntensity={0.2} floatIntensity={0.8}>
        <mesh ref={meshRef}>
          <boxGeometry args={[size, size, size]} />
          <meshPhysicalMaterial
            color={color}
            metalness={0.3}
            roughness={0.2}
            transparent
            opacity={0.85}
            emissive={color}
            emissiveIntensity={0.15}
          />
          <mesh scale={1.02}>
            <boxGeometry args={[size, size, size]} />
            <meshBasicMaterial color={color} transparent opacity={0.1} wireframe />
          </mesh>
        </mesh>
        <Text
          position={[0, -size * 1.2, 0]}
          fontSize={size * 0.6}
          color={color}
          anchorX="center"
          anchorY="middle"
          font="/fonts/SpaceGrotesk-Bold.woff"
        >
          {name}
        </Text>
      </Float>
    </group>
  );
}

function TechScene() {
  const cubes = useMemo(
    () =>
      techs.map((t, i) => ({
        ...t,
        speed: 0.6 + Math.random() * 0.6,
        key: i,
      })),
    []
  );

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 6]} fov={45} />
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} />
      <directionalLight position={[-5, -3, -5]} intensity={0.3} />
      <pointLight position={[0, 0, 5]} intensity={0.5} color="#8b5cf6" />
      {cubes.map((t) => (
        <TechCube key={t.key} name={t.name} color={t.color} size={t.size} position={t.pos} speed={t.speed} />
      ))}
    </>
  );
}

export default function TechIcons3D() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0">
      <Canvas dpr={[1, 1.5]} gl={{ antialias: true, alpha: true }}>
        <TechScene />
      </Canvas>
    </div>
  );
}