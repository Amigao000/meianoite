import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Configurador de Uniformes Esportivos 3D',
  description: 'Personalize seu kit completo de futebol em tempo real com renderização 3D de alta performance.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="bg-slate-950 text-slate-100 antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
