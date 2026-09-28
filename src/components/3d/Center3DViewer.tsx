'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { RotateCw, ZoomIn, Eye, Sparkles, Loader2 } from 'lucide-react';
import { useUniformStore } from '@/store/useUniformStore';

// Dynamic import do Canvas R3F com ssr: false para evitar hydration mismatch no Next.js
const CanvasViewer = dynamic(() => import('./CanvasViewer'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex flex-col items-center justify-center bg-slate-950/50">
      <Loader2 className="w-10 h-10 text-amber-500 animate-spin mb-3" />
      <p className="text-sm font-semibold text-slate-300">Inicializando Motor 3D...</p>
    </div>
  ),
});

export default function Center3DViewer() {
  const { colors, collar, sleeve } = useUniformStore();

  return (
    <main className="flex-1 flex flex-col relative bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 overflow-hidden min-h-[500px]">
      {/* Top Bar da visualização */}
      <div className="absolute top-4 left-6 right-6 flex items-center justify-between z-10 pointer-events-none">
        <div className="bg-slate-900/80 backdrop-blur-md px-4 py-2 rounded-full border border-slate-800 text-xs font-semibold text-slate-300 flex items-center space-x-2 pointer-events-auto shadow-lg">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>Modelo 3D Interativo Ativo</span>
        </div>

        <div className="bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-800 text-[11px] text-slate-400 pointer-events-auto shadow-lg flex items-center space-x-2">
          <span>Arraste para girar 360°</span>
        </div>
      </div>

      {/* ÁREA DO CANVAS 3D INTERATIVO */}
      <div className="flex-1 w-full h-full relative">
        <CanvasViewer />
      </div>

      {/* Barra de Status Inferior com Cores Ativas */}
      <div className="bg-slate-950/90 backdrop-blur-md border-t border-slate-800/80 px-6 py-2.5 flex items-center justify-between z-10">
        <div className="flex items-center space-x-4 text-xs">
          <div className="flex items-center space-x-2">
            <span className="text-slate-400">Predominante:</span>
            <span
              className="w-4 h-4 rounded-full border border-white/20 inline-block shadow-sm"
              style={{ backgroundColor: colors.primary }}
              title={colors.primary}
            ></span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-slate-400">Secundária (Gola):</span>
            <span
              className="w-4 h-4 rounded-full border border-white/20 inline-block shadow-sm"
              style={{ backgroundColor: colors.secondary }}
              title={colors.secondary}
            ></span>
          </div>
        </div>

        <div className="text-[11px] text-slate-500 hidden sm:block">
          Use o botão esquerdo para girar • Scroll para aproximar
        </div>
      </div>
    </main>
  );
}
