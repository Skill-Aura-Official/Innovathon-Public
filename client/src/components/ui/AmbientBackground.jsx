import { useMemo, useRef } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { THEMES } from '../../config/themes';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function GlobalParticles({ count, colors, speed }) {
  const mesh = useRef();
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const particles = useMemo(() => {
    const temp = [];
    const colorObj = new THREE.Color();
    for (let i = 0; i < count; i++) {
      const t = Math.random() * 100;
      const factor = 40 + Math.random() * 200; // wide spread
      const scale = 0.3 + Math.random() * 0.8;
      const xFactor = -150 + Math.random() * 300;
      const yFactor = -150 + Math.random() * 300;
      const zFactor = -150 + Math.random() * 300;
      
      const col = colors[i % colors.length];
      colorObj.set(col);
      
      temp.push({ 
        t, factor, speed: speed * 0.003, scale, 
        xFactor, yFactor, zFactor, 
        r: colorObj.r, g: colorObj.g, b: colorObj.b 
      });
    }
    return temp;
  }, [count, colors, speed]);

  const colorArray = useMemo(() => new Float32Array(count * 3), [count]);

  useMemo(() => {
    particles.forEach((p, i) => {
      colorArray[i * 3] = p.r;
      colorArray[i * 3 + 1] = p.g;
      colorArray[i * 3 + 2] = p.b;
    });
  }, [particles, colorArray]);

  useFrame(() => {
    if (!mesh.current) return;
    particles.forEach((particle, i) => {
      const { factor, speed, xFactor, yFactor, zFactor, scale } = particle;
      particle.t += speed;
      const t = particle.t;
      const a = Math.cos(t) + Math.sin(t * 1) / 10;
      const b = Math.sin(t) + Math.cos(t * 2) / 10;
      const s = Math.cos(t);
      
      dummy.position.set(
        (xFactor / 10) + a * (factor / 10),
        (yFactor / 10) + b * (factor / 10),
        (zFactor / 10) + s * (factor / 10)
      );
      dummy.scale.set(scale, scale, scale);
      dummy.updateMatrix();
      mesh.current.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[null, null, count]}>
      <sphereGeometry args={[0.08, 8, 8]} />
      <instancedBufferAttribute attach="attributes-color" args={[colorArray, 3]} />
      <meshBasicMaterial vertexColors toneMapped={false} transparent opacity={0.6} />
    </instancedMesh>
  );
}

export default function AmbientBackground() {
  const { themeConfig } = useAuth();
  
  // Provide fallback colors in case themeConfig is still loading
  const colors = useMemo(
    () => themeConfig?.colors || ['var(--theme-c1)', 'var(--theme-c2)', '#f472b6'],
    [themeConfig]
  );
  const pCount = Math.min(themeConfig?.particleCount || 1000, 1500); // cap at 1500 for global perf
  const pSpeed = themeConfig?.speed || 1;

  useMemo(() => {
    if (typeof document !== 'undefined') {
      const root = document.documentElement.style;
      
      // Colors
      root.setProperty('--theme-c1', colors[0]);
      root.setProperty('--theme-c2', colors[1]);
      root.setProperty('--theme-c3', colors[2] || colors[0]);
      
      // UI Structural Tokens
      const ui = themeConfig?.ui || THEMES['ai'].ui;
      root.setProperty('--theme-radius', ui.radius);
      root.setProperty('--theme-radius-btn', ui.radiusBtn);
      root.setProperty('--theme-glass-bg', ui.glassBg);
      root.setProperty('--theme-glass-blur', ui.glassBlur);
      root.setProperty('--theme-border', ui.border);
      root.setProperty('--theme-font-body', ui.fontBody);
      root.setProperty('--theme-font-display', ui.fontDisplay);
      root.setProperty('--theme-shadow', ui.shadow);
    }
  }, [colors, themeConfig]);

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: -1, pointerEvents: 'none', background: '#0f0a1e' }}>
      <div className="ambient-glow ambient-glow-1" style={{ background: colors[0] }} />
      <div className="ambient-glow ambient-glow-2" style={{ background: colors[1] }} />
      <div className="ambient-glow ambient-glow-3" style={{ background: colors[2] || colors[0] }} />
      
      <div style={{ width: '100%', height: '100%', position: 'absolute', inset: 0, opacity: 0.8 }}>
        <Canvas camera={{ position: [0, 0, 15], fov: 60 }} gl={{ alpha: true }}>
          <GlobalParticles key={themeConfig?.id || 'default'} count={pCount} colors={colors} speed={pSpeed} />
        </Canvas>
      </div>
    </div>
  );
}
