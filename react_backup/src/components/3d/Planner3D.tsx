import { useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { RoundedBox, Environment, Float, ContactShadows } from '@react-three/drei'
import * as THREE from 'three'

function Tablet(props: any) {
    const group = useRef<THREE.Group>(null)

    // Floating animation handled by Float component, but we can add more specific movement here if needed

    return (
        <group ref={group} {...props} dispose={null}>
            {/* Device Body */}
            <RoundedBox args={[8, 11, 0.4]} radius={0.3} smoothness={4}>
                <meshStandardMaterial color="#2a2a2a" roughness={0.4} metalness={0.6} />
            </RoundedBox>

            {/* Screen / Planner Interface */}
            <RoundedBox args={[7.5, 10.5, 0.05]} radius={0.1} smoothness={4} position={[0, 0, 0.2]}>
                <meshStandardMaterial color="#f7f4ec" roughness={0.2} metalness={0.1} />
            </RoundedBox>

            {/* Placeholder content lines to simulated a planner page */}
            <group position={[0, 0, 0.23]}>
                {/* Header */}
                <mesh position={[0, 4, 0]}>
                    <planeGeometry args={[6, 1]} />
                    <meshBasicMaterial color="#e0d2b0" />
                </mesh>

                {/* Lines */}
                {Array.from({ length: 12 }).map((_, i) => (
                    <mesh key={i} position={[0, 2.5 - i * 0.6, 0]}>
                        <planeGeometry args={[6, 0.02]} />
                        <meshBasicMaterial color="#d1ba8d" />
                    </mesh>
                ))}
            </group>
        </group>
    )
}

export default function Planner3D() {
    return (
        <div className="h-[600px] w-full">
            <Canvas camera={{ position: [0, 0, 15], fov: 45 }}>
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
                <Environment preset="city" />

                <Float
                    speed={2}
                    rotationIntensity={0.5}
                    floatIntensity={0.5}
                >
                    <Tablet rotation={[0.1, -0.2, 0]} />
                </Float>

                <ContactShadows position={[0, -6, 0]} opacity={0.4} scale={20} blur={2.5} far={4} color="#674d36" />
            </Canvas>
        </div>
    )
}
