'use client';

import React from 'react';
import { Box, RotateCw, ZoomIn, Eye, Sparkles } from 'lucide-react';
import { useUniformStore } from '@/store/useUniformStore';

export default function Center3DViewer() {
  const { colors, collar, sleeve } = useUniformStore();

  return (
    <main className="flex-1 flex flex-col relative bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 overflow-hidden">
      {/* Top Bar da visualização */}
      <div className="absolute top-4 left-6 right-6 flex items-center justify-between z-10 pointer-events-none">
        <div className="bg-slate-900/80 backdrop-blur-md px-4 py-2 rounded-full border border-slate-800 text-xs font-semibold text-slate-300 flex items-center space-x-2 pointer-events-auto shadow-lg">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>Pré-visualização 3D em Tempo Real</span>
        </div>

        <div className="flex items-center space-x-2 pointer-events-auto">
          <button 
            title="Girar visualização"
            className="p-2.5 rounded-full bg-slate-900/80 backdrop-blur-md border border-slate-800 text-slate-300 hover:text-white hover:border-slate-600 transition-all shadow-lg"
          >
            <RotateCw className="w-4 h-4" />
          </button>
          <button 
            title="Ajustar zoom"
            className="p-2.5 rounded-full bg-slate-900/80 backdrop-blur-md border border-slate-800 text-slate-300 hover:text-white hover:border-slate-600 transition-all shadow-lg"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button 
            title="Alternar visão"
            className="p-2.5 rounded-full bg-slate-900/80 backdrop-blur-md border border-slate-800 text-slate-300 hover:text-white hover:border-slate-600 transition-all shadow-lg"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* ÁREA DO CANVAS 3D (Placeholder estilizado aguardando modelo R3F) */}
      <div className="flex-1 flex items-center justify-center p-8 relative">
        {/* Efeito de iluminação de estúdio */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent pointer-events-none"></div>

        {/* Chão virtual de estúdio */}
        <div className="absolute bottom-10 w-[70%] max-w-xl h-24 bg-gradient-to-t from-slate-950 to-transparent rounded-full blur-2xl opacity-60 pointer-events-none"></div>

        {/* Bloco central indicativo */}
        <div className="relative z-10 flex flex-col items-center justify-center p-8 text-center max-w-md bg-slate-900/40 border border-slate-800/80 backdrop-blur-md rounded-2xl shadow-2xl">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-amber-500/20 to-amber-400/10 border border-amber-500/30 flex items-center justify-center mb-5 text-amber-400 animate-pulse">
            <Box className="w-10 h-10" />
          </div>

          <h3 className="text-xl font-bold text-white mb-2">Canvas 3D aqui</h3>
          <p className="text-sm text-slate-400 leading-relaxed mb-6">
            O motor Three.js / React Three Fiber será acoplado aqui renderizando o manequim com a camisa, calção e meião interativos com OrbitControls.
          </p>

          {/* Feedback dinâmico das cores selecionadas */}
          <div className="w-full bg-slate-950/70 p-3.5 rounded-xl border border-slate-800/80 text-left space-y-2">
            <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center space-x-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Cores ativas no estado:</span>
            </div>
            <div className="flex items-center space-x-3 text-xs">
              <div className="flex items-center space-x-1.5">
                <span className="w-3.5 h-3.5 rounded-full border border-white/20 shadow-sm" style={{ backgroundColor: colors.primary }}></span>
                <span className="text-slate-300">Corpo</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <span className="w-3.5 h-3.5 rounded-full border border-white/20 shadow-sm" style={{ backgroundColor: colors.secondary }}></span>
                <span className="text-slate-300">Secundária</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <span className="w-3.5 h-3.5 rounded-full border border-white/20 shadow-sm" style={{ backgroundColor: colors.accent }}></span>
                <span className="text-slate-300">Detalhe</span>
              </div>
            </div>
            <div className="text-[11px] text-slate-500 pt-1 border-t border-slate-800/80 flex justify-between">
              <span>Gola: <strong className="text-slate-300 capitalize">{collar}</strong></span>
              <span>Manga: <strong className="text-slate-300 capitalize">{sleeve === 'short' ? 'Curta' : 'Longa'}</strong></span>
            </div>
          </div>
        </div>
      </div>

      {/* Dica de interação na base */}
      <div className="text-center pb-4 text-xs text-slate-500 font-medium">
        Clique e arraste para girar em 360° • Scroll do mouse para zoom
      </div>
    </main>
  );
}
