export type CollarType = 'round' | 'v-neck' | 'polo';
export type SleeveType = 'short' | 'long';
export type LogoPlacement = 'chest-left' | 'chest-center' | 'chest-right' | 'sleeve-left' | 'sleeve-right' | 'back-top';

export interface UniformColors {
  primary: string;     // Cor predominante
  secondary: string;   // Cor secundária
  accent: string;      // Cor alternativa / detalhes
  brand: string;       // Cor da logomarca/fornecedor
  number: string;      // Cor do número dorsal
}

export interface UniformLogo {
  id: string;
  name: string;
  url: string;
  placement: LogoPlacement;
}

export interface KitItems {
  shirt: boolean;
  shorts: boolean;
  socks: boolean;
}

export interface PackageTier {
  id: string;
  name: string;
  subtitle: string;
  minQuantity: number;
  pricePerUnit: number;
  features: string[];
  isPopular?: boolean;
}
