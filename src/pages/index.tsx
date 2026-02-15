import type { ReactNode } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';
import styles from './index.module.css';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import MBSScene from '@site/src/components/ThreeJs/mbs';
import Loader from '@site/src/components/ThreeJs/Loader';
import React, { Suspense, useMemo } from 'react';
import * as THREE from 'three';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  // Detect if on mobile (client-side only)
  const [isMobile, setIsMobile] = React.useState(false);
  const [webglSupported, setWebglSupported] = React.useState(true);

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    // WebGL support check
    function isWebGLAvailable() {
      try {
        const canvas = document.createElement('canvas');
        return !!(
          window.WebGLRenderingContext &&
          (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
        );
      } catch (e) {
        return false;
      }
    }
    setWebglSupported(isWebGLAvailable());
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Camera props with explicit tuple typing
  const cameraProps = isMobile
    ? { position: [0, 0, 32] as [number, number, number], fov: 70 }
    : { position: [0, 0, 20] as [number, number, number], fov: 60 };

  // if (!webglSupported) {
  //   return (
  //     <div style={{ height: '500px', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#222', color: '#fff', borderRadius: 12, textAlign: 'center', flexDirection: 'column' }}>
  //       <h2 style={{ marginBottom: 16 }}>Welcome to my world!</h2>
  //       <p style={{ maxWidth: 400 }}>
  //         This experience requires WebGL and hardware acceleration.
  //         Please enable them in your browser settings to view the 3D animation.
  //       </p>

  //     </div>
  //   );
  // }
  if (!webglSupported) {
  return (
    <div style={{ 
      height: '500px', 
      width: '100%', 
      borderRadius: 12,
      overflow: 'hidden',
      position: 'relative'
    }}>
      <img 
        src="/img/threejs-fallback.png" 
        alt="3D Scene Preview" 
        style={{ 
          width: '100%', 
          height: '100%', 
          objectFit: 'cover'
        }} 
      />
      <div style={{
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
        background: 'rgba(0, 0, 0, 0.8)',
        padding: '16px',
        borderRadius: 8,
        color: '#fff',
        textAlign: 'center'
      }}>
        <p style={{ margin: 0, fontSize: '14px' }}>
          Enable WebGL to view the interactive 3D animation
        </p>
      </div>
    </div>
  );
}

  return (
    <div style={{ height: '500px', width: '100%' }}>
      <Canvas
        gl={{
          outputColorSpace: THREE.SRGBColorSpace,
          toneMapping: THREE.ACESFilmicToneMapping,
        }}
        camera={cameraProps}
      >
        <OrbitControls maxPolarAngle={Math.PI / 2} minDistance={8} maxDistance={32} />
        <Suspense fallback={<Loader />}>
          <MBSScene />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      >
      <HomepageHeader />
      {/* <main>
        <HomepageFeatures />
      </main> */}
    </Layout>
  );
}
