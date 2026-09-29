'use client';

import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, ContactShadows, Environment } from '@react-three/drei';
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
          camera={{ position: [0, 0, 3.8], fov: 42 }}
          className="w-full h-full cursor-grab active:cursor-grabbing"
          gl={{ antialias: true, alpha: true, preserveDrawingBuffer: true }}
        >
          {/* Iluminação de Estúdio Esportivo */}
          <ambientLight intensity={0.8} />
          <directionalLight
            position={[4, 6, 4]}
            intensity={1.4}
            castShadow
            shadow-mapSize={1024}
            shadow-bias={-0.0001}
          />
          <directionalLight position={[-4, 4, -4]} intensity={0.7} />
          <directionalLight position={[0, -4, 2]} intensity={0.4} />

          {/* Ambiente HDR sutil para reflexos realistas */}
          <Environment preset="city" />

          {/* Modelo da Camiseta perfeitamente centralizado */}
          <JerseyModel />

          {/* Sombra de Contato Suave no chão */}
          <ContactShadows
            position={[0, -1.3, 0]}
            opacity={0.65}
            scale={5}
            blur={1.8}
            far={3}
          />

          {/* Controles de Câmera 360° com mira no centro exato [0, 0, 0] */}
          <OrbitControls
            target={[0, 0, 0]}
            enablePan={false}
            minDistance={2.0}
            maxDistance={6.0}
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={Math.PI / 1.8}
            makeDefault
          />
        </Canvas>
      </Suspense>
    </div>
  );
}
