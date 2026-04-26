import { Canvas, useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import { useTheme } from '../../themes/ThemeProvider';

export default function ThemeBackground() {
  const { theme } = useTheme();

  return (
    <div className="fixed inset-0 -z-10 bg-[var(--bg)] transition-colors duration-500">
      <Canvas
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        camera={{ position: [0, 0, 50], fov: 75 }}
      >
        <ambientLight intensity={0.5} />
        <Particles themeId={theme.id} accentColor={theme.tokens['--accent']} />
      </Canvas>
    </div>
  );
}

function Particles({ themeId, accentColor }) {
  const meshRef = useRef();
  const particleCount = themeId === 'ai' || themeId === 'sci-fi' ? 2000 : 1000;

  const positions = useMemo(() => {
    const nextPositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      nextPositions[i * 3] = (Math.random() - 0.5) * 100;
      nextPositions[i * 3 + 1] = (Math.random() - 0.5) * 100;
      nextPositions[i * 3 + 2] = (Math.random() - 0.5) * 50;
    }
    return nextPositions;
  }, [particleCount]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();
    
    // Simple animations based on theme
    if (themeId === 'windy' || themeId === 'ice-storm') {
      meshRef.current.position.x = Math.sin(time * 0.2) * 5;
      meshRef.current.position.y = Math.cos(time * 0.2) * 5;
      meshRef.current.rotation.z = time * 0.05;
    } else if (themeId === 'thunderstorm' || themeId === 'hellish-fire') {
      meshRef.current.position.y = (time * 15) % 50; // falling effect
    } else if (themeId === 'sci-fi' || themeId === 'ai') {
      meshRef.current.rotation.x = time * 0.1;
      meshRef.current.rotation.y = time * 0.1;
    } else { // anime
      meshRef.current.position.y = Math.sin(time * 0.5) * 2;
      meshRef.current.rotation.y = time * 0.02;
    }
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={themeId === 'sci-fi' || themeId === 'ai' ? 0.2 : 0.6}
        color={accentColor || '#a855f7'}
        transparent
        opacity={0.7}
      />
    </points>
  );
}
