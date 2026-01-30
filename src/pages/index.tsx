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
import React, { Suspense,useMemo } from 'react';
import * as THREE from 'three';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  // Detect if on mobile (client-side only)
  const [isMobile, setIsMobile] = React.useState(false);
  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Camera props with explicit tuple typing
  const cameraProps = isMobile
    ? { position: [0, 0, 32] as [number, number, number], fov: 70 }
    : { position: [0, 0, 20] as [number, number, number], fov: 60 };

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
      description="Description will go into a meta tag in <head />">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
