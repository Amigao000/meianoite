import LeftControlPanel from '@/components/controls/LeftControlPanel';
import Center3DViewer from '@/components/3d/Center3DViewer';
import RightSummaryPanel from '@/components/summary/RightSummaryPanel';
import PackageFooter from '@/components/packages/PackageFooter';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
      {/* Top Header */}
      <header className="h-14 border-b border-slate-800 bg-slate-900/60 backdrop-blur-md px-6 flex items-center justify-between z-20">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-amber-500 to-amber-300 flex items-center justify-center font-black text-slate-950 text-base shadow-lg shadow-amber-500/20">
            3D
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-sm tracking-wide text-white uppercase">Meia-Noite Sports</span>
            <span className="text-[10px] text-slate-400">Configurador 3D de Uniformes Esportivos</span>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <span className="text-xs bg-slate-800/80 text-slate-300 border border-slate-700/80 px-3 py-1 rounded-full hidden sm:inline-block">
            Modo Visualizador: Interativo
          </span>
        </div>
      </header>

      {/* Grid Principal: 3 Colunas (Controles, Canvas 3D, Checkout/Resumo) */}
      <div className="flex-1 flex flex-col lg:flex-row min-h-[calc(100vh-3.5rem)]">
        {/* Painel Esquerdo: Controles */}
        <LeftControlPanel />

        {/* Centro: Visualizador 3D */}
        <Center3DViewer />

        {/* Painel Direito: Resumo e Checkout */}
        <RightSummaryPanel />
      </div>

      {/* Rodapé: Tabela Comparativa de Pacotes */}
      <PackageFooter />
    </div>
  );
}
