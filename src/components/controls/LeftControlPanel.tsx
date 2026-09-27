'use client';

import React from 'react';
import { Palette, Shirt, Image as ImageIcon, Sparkles } from 'lucide-react';
import { useUniformStore } from '@/store/useUniformStore';
import { CollarType, SleeveType } from '@/lib/types';

export default function LeftControlPanel() {
  const { colors, setColor, collar, sleeve, setCollar, setSleeve } = useUniformStore();

  const colorFields: Array<{ key: keyof typeof colors; label: string; desc: string }> = [
    { key: 'primary', label: 'Predominante', desc: 'Cor do corpo principal' },
    { key: 'secondary', label: 'Secundária', desc: 'Faixas, golas e detalhes' },
    { key: 'accent', label: 'Alternativa', desc: 'Frisos e acabamento lateral' },
    { key: 'brand', label: 'Marca / Logo', desc: 'Cor do fornecedor esportivo' },
    { key: 'number', label: 'Número Dorsal', desc: 'Cor do número e nome' },
  ];

  return (
    <aside className="w-full lg:w-80 xl:w-96 bg-slate-900/90 backdrop-blur-md border-r border-slate-800 flex flex-col h-full overflow-y-auto p-5 space-y-6">
      <div className="flex items-center space-x-2 pb-4 border-b border-slate-800">
        <Sparkles className="w-5 h-5 text-amber-500" />
        <h2 className="text-lg font-bold tracking-wide uppercase text-white">Customização</h2>
      </div>

      {/* Seção 1: Cores do Uniforme */}
      <section className="space-y-4">
        <div className="flex items-center space-x-2 text-slate-300 font-semibold text-sm">
          <Palette className="w-4 h-4 text-emerald-400" />
          <span>Paleta de Cores</span>
        </div>

        <div className="space-y-3 bg-slate-950/60 p-4 rounded-xl border border-slate-800/80">
          {colorFields.map((field) => (
            <div key={field.key} className="flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-slate-200 block">{field.label}</span>
                <span className="text-[11px] text-slate-400">{field.desc}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-mono text-slate-400 uppercase">{colors[field.key]}</span>
                <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-slate-700 shadow-inner cursor-pointer hover:scale-105 transition-transform">
                  <input
                    type="color"
                    value={colors[field.key]}
                    onChange={(e) => setColor(field.key, e.target.value)}
                    className="absolute -top-2 -left-2 w-12 h-12 cursor-pointer bg-transparent border-0"
                    title={`Mudar cor ${field.label}`}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Seção 2: Modelagem */}
      <section className="space-y-4">
        <div className="flex items-center space-x-2 text-slate-300 font-semibold text-sm">
          <Shirt className="w-4 h-4 text-blue-400" />
          <span>Modelagem & Estilo</span>
        </div>

        <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800/80 space-y-4">
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-2">Tipo de Gola</label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'round', label: 'Careca' },
                { id: 'v-neck', label: 'Gola V' },
                { id: 'polo', label: 'Polo' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setCollar(item.id as CollarType)}
                  className={`py-2 text-xs font-medium rounded-lg border transition-all ${
                    collar === item.id
                      ? 'bg-amber-500/20 text-amber-400 border-amber-500/50 shadow-sm'
                      : 'bg-slate-900 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-slate-200'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-2">Comprimento da Manga</label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'short', label: 'Manga Curta' },
                { id: 'long', label: 'Manga Longa' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setSleeve(item.id as SleeveType)}
                  className={`py-2 text-xs font-medium rounded-lg border transition-all ${
                    sleeve === item.id
                      ? 'bg-amber-500/20 text-amber-400 border-amber-500/50 shadow-sm'
                      : 'bg-slate-900 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-slate-200'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Seção 3: Logos & Patrocínios */}
      <section className="space-y-4">
        <div className="flex items-center space-x-2 text-slate-300 font-semibold text-sm">
          <ImageIcon className="w-4 h-4 text-purple-400" />
          <span>Escudo & Patrocinadores</span>
        </div>

        <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800/80 space-y-3 text-center">
          <div className="border-2 border-dashed border-slate-700 hover:border-amber-500/60 transition-colors p-4 rounded-lg flex flex-col items-center justify-center space-y-2 cursor-pointer bg-slate-900/40">
            <ImageIcon className="w-8 h-8 text-slate-400" />
            <div>
              <p className="text-xs font-medium text-slate-200">Clique para enviar Escudo/Logo</p>
              <p className="text-[11px] text-slate-500">Formatos aceitos: PNG ou SVG transparente</p>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
            <span>Posições disponíveis:</span>
            <span className="text-slate-300 font-medium">Peito, Mangas, Costas</span>
          </div>
        </div>
      </section>
    </aside>
  );
}
