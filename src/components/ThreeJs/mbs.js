import React, { useEffect, useRef } from 'react';
import { useColorMode } from '@docusaurus/theme-common';
// Helper component for a simple 3D sun
function Sun({ position = [0, 100, -200], radius = 16 }) {
  return (
    <mesh position={position}>
      <sphereGeometry args={[radius, 32, 32]} />
      <meshStandardMaterial color={0xfff799} emissive={0xffe066} emissiveIntensity={1.2} />
    </mesh>
  );
}

import { Points, PointMaterial } from '@react-three/drei';

// Helper component for procedural starfield
function Starfield({ count = 5000, radius = 300 }) {
  const positions = React.useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = radius * (0.8 + 0.2 * Math.random());
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, [count, radius]);

  return (
    <Points positions={positions}>
      <PointMaterial transparent color="white" size={1.5} sizeAttenuation={true} depthWrite={false} />
    </Points>
  );
}

// Helper component for a simple 3D moon
function Moon({ position = [60, 60, -120], radius = 8 }) {
  return (
    <mesh position={position}>
      <sphereGeometry args={[radius, 32, 32]} />
      <meshStandardMaterial color={0xf0eada} emissive={0xf0eada} emissiveIntensity={0.7} />
    </mesh>
  );
}
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';
import { useLoader } from '@react-three/fiber';
import { Environment, Sky, useAnimations } from '@react-three/drei';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import * as THREE from 'three';

export default function MBSScene() {
  if (!ExecutionEnvironment.canUseDOM) {
    return null;
  }

  const gltf = useLoader(GLTFLoader, './mbs.glb', loader => {
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('/draco/');
    loader.setDRACOLoader(dracoLoader);
  });

  const { actions } = useAnimations(gltf.animations, gltf.scene);


  // Use Docusaurus color mode
  const { colorMode } = useColorMode();
  const isDarkMode = colorMode === 'dark';

  useEffect(() => {
    // Play all animations
    Object.values(actions).forEach(action => action.play());
    return () => {
      // Stop all animations on unmount
      Object.values(actions).forEach(action => action.stop());
    };
  }, [actions]);

  // Lighting and sky values based on mode
  let hemisphereColor, hemisphereIntensity, dirLightIntensity, envIntensity, skyProps;
  if (isDarkMode) {
    // Night mode: deep blue/purple sky, very low ambient, vibrant lights on figure
    hemisphereColor = new THREE.Color(0x0a0a23); // deep night blue
    hemisphereIntensity = 0.01;
    dirLightIntensity = 0.04;
    envIntensity = 0.01;
    skyProps = {
      distance: 450000,
      sunPosition: [0, 1, -10],
      turbidity: 15,
      rayleigh: 0.1,
      mieCoefficient: 0.02,
      mieDirectionalG: 0.99,
      inclination: 0.6, // lower sun for night
      azimuth: 0.25,
      exposure: 0.05,
    };
  } else {
    // Day mode
    hemisphereColor = new THREE.Color(0xffffff);
    hemisphereIntensity = 0.2;
    dirLightIntensity = 0.5;
    envIntensity = 0.2;
    skyProps = {
      distance: 450000,
      sunPosition: [0, 10, 0],
      turbidity: 8,
      rayleigh: 2,
      mieCoefficient: 0.005,
      mieDirectionalG: 0.8,
      inclination: 0.49,
      azimuth: 0.25,
      exposure: 0.7,
    };
  }

  return (
    <>
      <hemisphereLight groundColor={hemisphereColor} intensity={hemisphereIntensity} />
      <directionalLight
        position={isDarkMode ? [0, 2, -8] : [5, 5, 5]}
        intensity={dirLightIntensity}
        color={isDarkMode ? 0xffa070 : 0xffffff}
        castShadow
      />
      {isDarkMode ? (
        <>
          {/* Simplified and optimized lighting for dark mode */}
          <spotLight
            position={[0, 10, 5]}
            angle={0.5}
            penumbra={1}
            intensity={30}
            color={0x4a90e2}
            castShadow
          />
          <pointLight
            position={[-8, 2, 4]}
            intensity={25}
            color={0xff66cc}
          />
          <pointLight
            position={[8, 2, 4]}
            intensity={25}
            color={0x66e0ff}
          />
          <pointLight
            position={[0, 4, -8]}
            intensity={20}
            color={0x3366ff}
          />
          {/* Add a frontal light to illuminate the character */}
          <pointLight
            position={[0, 3, 8]}
            intensity={100}
            color={0xffffff}
          />
        </>
      ) : (
        <>
          <directionalLight position={[-5, 5, 5]} intensity={dirLightIntensity * 0.4} />
          <directionalLight position={[0, 5, -5]} intensity={dirLightIntensity * 0.2} />
        </>
      )}
      {/* Starfield and moon only in dark mode */}
      {isDarkMode && <Starfield />}
      {isDarkMode && <Moon position={[60, 60, -120]} radius={10} />}
      {/* Sun only in day mode */}
      {!isDarkMode && <Sun position={[0, 100, -200]} radius={16} />}
      <Sky {...skyProps} />
      <Environment preset={isDarkMode ? "night" : "city"} intensity={envIntensity} />
      <group position={[0, -4, 0]}>
        <primitive object={gltf.scene} scale={6} />
      </group>
    </>
  );
}

