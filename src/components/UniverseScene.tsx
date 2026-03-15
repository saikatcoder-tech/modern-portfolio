import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars, Float, MeshDistortMaterial, Sphere, Icosahedron } from "@react-three/drei";
import { EffectComposer, Bloom, ChromaticAberration } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import * as THREE from "three";

function OrbitingPlanet({ radius, speed, color, size, offset = 0 }: { radius: number, speed: number, color: string, size: number, offset?: number }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    const t = state.clock.elapsedTime * speed + offset;
    if (ref.current) {
      ref.current.position.x = Math.cos(t) * radius;
      ref.current.position.z = Math.sin(t) * radius - 5;
      ref.current.position.y = Math.sin(t * 0.5) * (radius * 0.2);
      ref.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[size, 16, 16]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} />
      <pointLight distance={5} intensity={2} color={color} />
    </mesh>
  );
}

function Particles() {
  const count = 700;
  const mesh = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const t = Math.random() * 100;
      const factor = 20 + Math.random() * 100;
      const speed = 0.01 + Math.random() / 200;
      const xFactor = -50 + Math.random() * 100;
      const yFactor = -50 + Math.random() * 100;
      const zFactor = -50 + Math.random() * 100;
      temp.push({ t, factor, speed, xFactor, yFactor, zFactor, mx: 0, my: 0 });
    }
    return temp;
  }, [count]);

  useFrame(() => {
    particles.forEach((particle, i) => {
      let { t, factor, speed, xFactor, yFactor, zFactor } = particle;
      t = particle.t += speed / 2;
      const a = Math.cos(t) + Math.sin(t * 1) / 10;
      const b = Math.sin(t) + Math.cos(t * 2) / 10;
      const s = Math.cos(t);
      
      dummy.position.set(
        (particle.mx / 10) * a + xFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 1) * factor) / 10,
        (particle.my / 10) * b + yFactor + Math.sin((t / 10) * factor) + (Math.sin(t * 2) * factor) / 10,
        (particle.my / 10) * b + zFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 3) * factor) / 10
      );
      dummy.scale.set(s, s, s);
      dummy.rotation.set(s * 5, s * 5, s * 5);
      dummy.updateMatrix();
      if (mesh.current) {
        mesh.current.setMatrixAt(i, dummy.matrix);
      }
    });
    if (mesh.current) mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <dodecahedronGeometry args={[0.05, 0]} />
      <meshBasicMaterial color="#bc13fe" transparent opacity={0.5} />
    </instancedMesh>
  );
}

function SceneContent() {
  const meshRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null)
  const [scrollOffset, setScrollOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const winScroll = window.scrollY;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = height > 0 ? winScroll / height : 0;
      setScrollOffset(scrolled);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.002;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    
      
    }
    if (ringRef.current) {
      ringRef.current.rotation.z -= 0.001;
      ringRef.current.rotation.x = Math.PI / 2.2 + Math.sin(state.clock.elapsedTime * 0.2) * 0.05;
    }
    if (groupRef.current) {
  groupRef.current.position.z = -10 + scrollOffset * 10;
  groupRef.current.position.y = -scrollOffset * 5;
}
    
    // Camera parallax + scroll
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, state.pointer.x * 1.5, 0.1);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, (state.pointer.y * 1.5) - (scrollOffset * 4), 0.1);
    state.camera.lookAt(0, 0, -5);
  });

  return (
    <>
      <group ref={groupRef} position={[0, 0, -5]}>
        <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>

          <Icosahedron ref={meshRef} args={[2, 3]} position={[0, 0, 0]}>
            <MeshDistortMaterial
              color="#00f3ff"
              emissive="#00f3ff"
              emissiveIntensity={0.7}
              wireframe
              distort={0.2}
              speed={3}
            />
          </Icosahedron> 
          
           <Sphere args={[1.5, 32, 32]}>
            <meshBasicMaterial color="#002244" transparent opacity={0.8} />
          </Sphere>

          

          <mesh ref={ringRef}>
            <torusGeometry args={[3.5, 0.02, 16, 100]} />
            <meshBasicMaterial color="#bc13fe" transparent opacity={0.6} />
          </mesh>
        </Float>

        <OrbitingPlanet radius={8} speed={0.4} color="#00f3ff" size={0.2} />
        <OrbitingPlanet radius={12} speed={0.25} color="#bc13fe" size={0.3} offset={Math.PI} />
        <OrbitingPlanet radius={15} speed={0.15} color="#ff0055" size={0.15} offset={Math.PI / 2} />
      </group>
      <Particles />
    </>
  );
}

export function UniverseScene() {
  return (
    <div className="fixed inset-0 -z-10 bg-[#050510]">
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }} dpr={[1, 1.5]}>
        <color attach="background" args={["#050510"]} />
        <fog attach="fog" args={["#050510", 10, 50]} />
        
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={2} color="#00f3ff" />
        
        <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} fade speed={2} />
        
        <SceneContent />

        <EffectComposer>
          <Bloom luminanceThreshold={0.7} mipmapBlur intensity={0.3} />
          <ChromaticAberration 
            blendFunction={BlendFunction.NORMAL} 
            offset={new THREE.Vector2(0.001, 0.001)}
            radialModulation={false}
            modulationOffset={0}
          />
          {/* <Noise opacity={0.03} /> */}
        </EffectComposer>
      </Canvas>
    </div>
  );
}
