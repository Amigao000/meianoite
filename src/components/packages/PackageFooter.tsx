'use client';

import React from 'react';
import { Award, Zap, Shield, Crown, Check } from 'lucide-react';
import { useUniformStore } from '@/store/useUniformStore';

export default function PackageFooter() {
  const { selectedPackage, setSelectedPackage } = useUniformStore();

  const packages = [
    {
      id: 'prata',
      name: 'Plano Prata',
      subtitle: 'Ideal para equipes amadoras e festivais',
      price: 'R$ 79,90',
      icon: Shield,
      features: [
        'Camisa sublimada Dry Fit Standard',
        'Numeração e escudo padrão',
        'Mínimo de 12 peças',
        'Prazo médio: 15 dias',
      ],
      tag: null,
    },
    {
      id: 'ouro',
      name: 'Plano Ouro',
      subtitle: 'Mais escolhido por clubes de várzea e copas',
      price: 'R$ 109,90',
      icon: Award,
      features: [
        'Kit Camisa + Calção Dry Fit Pro',
        'Até 4 patrocinadores inclusos',
        'Escudo em patch termoaplicado',
        'Prazo médio: 12 dias',
      ],
      tag: 'Mais Popular',
    },
    {
      id: 'champions',
      name: 'Plano Champions',
      subtitle: 'Para ligas competitivas e semi-profissionais',
      price: 'R$ 149,90',
      icon: Zap,
      features: [
        'Kit Completo: Camisa + Calção + Meião',
        'Tecido antibacteriano com microfuros',
        'Escudo bordado ou 3D siliconado',
        'Prazo prioritário: 10 dias',
      ],
      tag: 'Alta Performance',
    },
    {
      id: 'platinum',
      name: 'Plano Platinum VIP',
      subtitle: 'Qualidade idêntica aos grandes clubes da Série A',
      price: 'R$ 189,90',
      icon: Crown,
      features: [
        'Kit Completo + Faixa de Capitão personalizada',
        'Tecido ultra-leve Jacquard / Spandex',
        'Acabamentos a laser e etiquetas termocolantes',
        'Atendimento VIP com amostra física prévia',
      ],
      tag: 'Qualidade Série A',
    },
  ];

  return (
    <footer className="w-full bg-slate-950 border-t border-slate-800/80 px-6 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-6">
          <h2 className="text-xl font-extrabold text-white tracking-tight">
            Tabela Comparativa de Pacotes & Benefícios
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Selecione o plano ideal para as necessidades e o orçamento do seu time
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {packages.map((pkg) => {
            const Icon = pkg.icon;
            const isSelected = selectedPackage === pkg.id;

            return (
              <div
                key={pkg.id}
                onClick={() => setSelectedPackage(pkg.id)}
                className={`relative rounded-2xl p-5 border cursor-pointer transition-all duration-200 flex flex-col justify-between ${
                  isSelected
                    ? 'bg-slate-900 border-amber-500 shadow-xl shadow-amber-500/10 ring-1 ring-amber-500'
                    : 'bg-slate-900/50 border-slate-800 hover:border-slate-700 hover:bg-slate-900/80'
                }`}
              >
                {pkg.tag && (
                  <span className="absolute -top-2.5 right-4 bg-amber-500 text-slate-950 text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full shadow-md">
                    {pkg.tag}
                  </span>
                )}

                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <div className={`p-2 rounded-lg ${isSelected ? 'bg-amber-500/20 text-amber-400' : 'bg-slate-800 text-slate-400'}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white">{pkg.name}</h3>
                      <span className="text-[11px] text-slate-400 block">{pkg.subtitle}</span>
                    </div>
                  </div>

                  <div className="my-3 pb-3 border-b border-slate-800">
                    <span className="text-xs text-slate-400">a partir de</span>
                    <div className="flex items-baseline space-x-1">
                      <span className="text-xl font-extrabold text-amber-400">{pkg.price}</span>
                      <span className="text-[11px] text-slate-400">/ kit</span>
                    </div>
                  </div>

                  <ul className="space-y-2 mb-4">
                    {pkg.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start space-x-2 text-[11px] text-slate-300">
                        <Check className="w-3.5 h-3.5 text-amber-500 flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  type="button"
                  className={`w-full py-2 rounded-lg text-xs font-bold transition-all ${
                    isSelected
                      ? 'bg-amber-500 text-slate-950 shadow-md'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                  }`}
                >
                  {isSelected ? 'Pacote Selecionado' : 'Escolher este Pacote'}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </footer>
  );
}
