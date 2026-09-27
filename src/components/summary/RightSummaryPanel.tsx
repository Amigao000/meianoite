'use client';

import React, { useState } from 'react';
import { ShoppingBag, CheckCircle2, ShieldCheck, ArrowRight, Truck } from 'lucide-react';
import { useUniformStore } from '@/store/useUniformStore';

export default function RightSummaryPanel() {
  const { kitItems, toggleKitItem, quantity, setQuantity, selectedPackage } = useUniformStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddBudget = () => {
    setIsSubmitting(true);
    // Simulação do envio de orçamento (será integrado ao Supabase)
    setTimeout(() => {
      setIsSubmitting(false);
      alert('Orçamento solicitado com sucesso! Seus dados foram computados no estado.');
    }, 600);
  };

  return (
    <aside className="w-full lg:w-80 xl:w-96 bg-slate-900/90 backdrop-blur-md border-l border-slate-800 flex flex-col h-full overflow-y-auto p-5 space-y-6">
      <div className="pb-4 border-b border-slate-800">
        <span className="text-[11px] font-bold uppercase tracking-wider text-amber-500 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20 inline-block mb-2">
          Kit Profissional
        </span>
        <h1 className="text-xl font-black text-white">Uniforme Oficial Matchday</h1>
        <p className="text-xs text-slate-400 mt-1">
          Tecido Dry-Fit Pro com tecnologia anti-suor, proteção UV e costuras reforçadas para alta performance.
        </p>
      </div>

      {/* Seleção de Peças do Kit */}
      <section className="space-y-3">
        <label className="text-xs font-bold text-slate-200 uppercase tracking-wider block">
          Composição do Kit
        </label>
        
        <div className="space-y-2">
          {[
            { id: 'shirt', label: 'Camisa Oficial de Jogo', desc: 'Sublimação total de alta definição' },
            { id: 'shorts', label: 'Calção Esportivo', desc: 'Com cordão interno e forro respirável' },
            { id: 'socks', label: 'Meião Profissional', desc: 'Punho elástico com amortecimento' },
          ].map((item) => {
            const key = item.id as keyof typeof kitItems;
            const isChecked = kitItems[key];
            return (
              <label
                key={item.id}
                onClick={() => toggleKitItem(key)}
                className={`flex items-start space-x-3 p-3 rounded-xl border cursor-pointer transition-all ${
                  isChecked
                    ? 'bg-amber-500/10 border-amber-500/40 text-slate-100 shadow-sm'
                    : 'bg-slate-950/40 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="mt-0.5">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    readOnly
                    className="w-4 h-4 rounded text-amber-500 focus:ring-amber-500 bg-slate-900 border-slate-700 pointer-events-none"
                  />
                </div>
                <div className="flex-1">
                  <span className="text-xs font-semibold block">{item.label}</span>
                  <span className="text-[11px] text-slate-400">{item.desc}</span>
                </div>
              </label>
            );
          })}
        </div>
      </section>

      {/* Quantidade Mínima de Uniformes */}
      <section className="space-y-2 bg-slate-950/60 p-4 rounded-xl border border-slate-800/80">
        <div className="flex justify-between items-center text-xs">
          <span className="font-semibold text-slate-300">Quantidade de Uniformes:</span>
          <span className="font-bold text-amber-400 text-sm">{quantity} unidades</span>
        </div>
        <input
          type="range"
          min="10"
          max="100"
          step="1"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="w-full accent-amber-500 cursor-pointer"
        />
        <div className="flex justify-between text-[11px] text-slate-500">
          <span>Min: 10 un</span>
          <span>Pacote: <strong className="text-slate-300 uppercase">{selectedPackage}</strong></span>
          <span>Max: 100+ un</span>
        </div>
      </section>

      {/* Benefícios Rápidos */}
      <div className="space-y-2 py-2">
        <div className="flex items-center space-x-2 text-[11px] text-slate-400">
          <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          <span>Garantia de 1 ano contra desbotamento</span>
        </div>
        <div className="flex items-center space-x-2 text-[11px] text-slate-400">
          <Truck className="w-4 h-4 text-blue-400 flex-shrink-0" />
          <span>Produção e entrega ágil para todo o Brasil</span>
        </div>
        <div className="flex items-center space-x-2 text-[11px] text-slate-400">
          <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0" />
          <span>Aprovação do layout 3D antes da confecção</span>
        </div>
      </div>

      {/* Botão de Checkout / Adicionar ao Orçamento */}
      <div className="pt-2">
        <button
          onClick={handleAddBudget}
          disabled={isSubmitting}
          className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-sm uppercase tracking-wider flex items-center justify-center space-x-2 shadow-lg shadow-amber-500/20 active:scale-[0.98] transition-all disabled:opacity-50"
        >
          <ShoppingBag className="w-5 h-5" />
          <span>{isSubmitting ? 'Processando...' : 'Adicionar ao Orçamento'}</span>
          <ArrowRight className="w-4 h-4 ml-1" />
        </button>
        <p className="text-[11px] text-slate-500 text-center mt-2">
          Nenhum pagamento é cobrado agora. Envie o modelo para receber a proposta final.
        </p>
      </div>
    </aside>
  );
}
