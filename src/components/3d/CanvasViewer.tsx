'use client';

import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, ContactShadows, Environment, Float, Loader } from '@react-three/drei';
import JerseyModel from './JerseyModel';
import { Loader2 } from 'lucide-react';

function CanvasLoader() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950/80 z-20">
      <Loader2 className="w-10 h-10 text-amber-500 animate-spin mb-3" />
      <p className="text-sm font-semibold text-slate-300">Carregando Modelo 3D...</p>
      <p className="text-xs text-slate-500">Renderizando geometrias e texturas PBR</p>
    </div>
  );
}

export default function CanvasViewer() {
  return (
    <div className="w-full h-full relative">
      <Suspense fallback={<CanvasLoader />}>
        <Canvas
          shadows
          camera={{ position: [0, 0, 4.5], fov: 45 }}
          className="w-full h-full cursor-grab active:cursor-grabbing"
          gl={{ antialias: true, alpha: true, preserveDrawingBuffer: true }}
        >
          {/* Iluminação de Estúdio Esportivo */}
          <ambientLight intensity={0.7} />
          <directionalLight
            position={[5, 8, 5]}
            intensity={1.2}
            castShadow
            shadow-mapSize={1024}
            shadow-bias={-0.0001}
          />
          <directionalLight position={[-5, 5, -5]} intensity={0.6} />
          <directionalLight position={[0, -5, 2]} intensity={0.3} />

          {/* Ambiente HDR sutil para reflexos realistas */}
          <Environment preset="city" />

          {/* Modelo da Camisa com flutuação sutil de estúdio */}
          <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
            <JerseyModel />
          </Float>

          {/* Sombra de Contato Suave no chão */}
          <ContactShadows
            position={[0, -1.8, 0]}
            opacity={0.6}
            scale={6}
            blur={2}
            far={4}
          />

          {/* Controles de Câmera 360° */}
          <OrbitControls
            enablePan={false}
            minDistance={2.5}
            maxDistance={7}
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={Math.PI / 1.8}
            makeDefault
          />
        </Canvas>
      </Suspense>
    </div>
  );
}
