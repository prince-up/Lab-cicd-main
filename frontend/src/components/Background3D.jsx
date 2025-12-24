import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Float, Stars, Sparkles, TorusKnot, PerspectiveCamera } from '@react-three/drei';
import { random } from 'maath';
import * as THREE from 'three';

function ParticleField() {
    const ref = useRef();
    const sphere = useMemo(() => random.inSphere(new Float32Array(5000 * 3), { radius: 2.5 }), []);

    useFrame((state, delta) => {
        ref.current.rotation.x -= delta / 15;
        ref.current.rotation.y -= delta / 20;
    });

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
                <PointMaterial
                    transparent
                    color="#00aaff"
                    size={0.003}
                    sizeAttenuation={true}
                    depthWrite={false}
                    blending={THREE.AdditiveBlending}
                />
            </Points>
        </group>
    );
}

function FloatingTechObjects() {
    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <TorusKnot position={[1, 0, -2]} args={[0.4, 0.1, 128, 16]} >
                <meshStandardMaterial color="#64ffda" wireframe emissive="#64ffda" emissiveIntensity={2} />
            </TorusKnot>
            <TorusKnot position={[-2, 1, -3]} args={[0.3, 0.05, 128, 16]}>
                <meshStandardMaterial color="#bd34fe" wireframe emissive="#bd34fe" emissiveIntensity={2} />
            </TorusKnot>
        </Float>
    )
}

const Background3D = ({ darkMode }) => {
    return (
        <div className="fixed inset-0 z-0 bg-black">
            <Canvas>
                <PerspectiveCamera makeDefault position={[0, 0, 3]} />
                <ambientLight intensity={0.2} />
                <pointLight position={[10, 10, 10]} intensity={1} />

                <Stars radius={300} depth={50} count={5000} factor={4} saturation={0} fade speed={1.5} />
                <ParticleField />
                <Sparkles count={500} scale={5} size={2} speed={0.4} opacity={0.5} noise={0.2} color={darkMode ? "#ffffff" : "#0099ff"} />
                <FloatingTechObjects />

                <fog attach="fog" args={['#000000', 5, 20]} />
            </Canvas>
            <div className="absolute inset-0 bg-black/60 pointer-events-none z-[1]" />
        </div>
    );
};

export default Background3D;
