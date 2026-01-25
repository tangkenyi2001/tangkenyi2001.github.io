---
title: Markdown page example
---

import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import MBSScene from '@site/src/components/ThreeJs/mbs';
import Loader from '@site/src/components/ThreeJs/Loader';
import React, { Suspense } from 'react';

import * as THREE from 'three';

<div style={{ height: '500px', width: '100%' }}>
  <Canvas
    gl={{
      outputColorSpace: THREE.SRGBColorSpace,
      toneMapping: THREE.ACESFilmicToneMapping,
    }}
    camera={{ position: [0, 0, 20], fov: 60 }}
  >
    <OrbitControls maxPolarAngle={Math.PI / 2} minDistance={8} maxDistance={32} />
    <Suspense fallback={<Loader />}>
      <MBSScene />
    </Suspense>
  </Canvas>
</div>