import { create } from 'zustand';
import { UniformColors, CollarType, SleeveType, UniformLogo, KitItems } from '../lib/types';

interface UniformState {
  // Cores
  colors: UniformColors;
  setColor: (key: keyof UniformColors, value: string) => void;

  // Modelagem
  collar: CollarType;
  sleeve: SleeveType;
  setCollar: (collar: CollarType) => void;
  setSleeve: (sleeve: SleeveType) => void;

  // Escudo e Patrocínios
  logos: UniformLogo[];
  addLogo: (logo: UniformLogo) => void;
  removeLogo: (id: string) => void;

  // Itens do Kit
  kitItems: KitItems;
  toggleKitItem: (item: keyof KitItems) => void;

  // Pacote Selecionado
  selectedPackage: string;
  setSelectedPackage: (packageId: string) => void;

  // Quantidade estimada
  quantity: number;
  setQuantity: (qty: number) => void;

  // Reset
  resetUniform: () => void;
}

const initialColors: UniformColors = {
  primary: '#0a0a0a',     // Preto / Meia-noite elegante
  secondary: '#d97706',   // Dourado âmbar esportivo
  accent: '#ffffff',      // Branco
  brand: '#ffffff',       // Branco
  number: '#d97706',      // Dourado
};

const initialKit: KitItems = {
  shirt: true,
  shorts: true,
  socks: true,
};

export const useUniformStore = create<UniformState>((set) => ({
  colors: initialColors,
  setColor: (key, value) =>
    set((state) => ({
      colors: { ...state.colors, [key]: value },
    })),

  collar: 'round',
  sleeve: 'short',
  setCollar: (collar) => set({ collar }),
  setSleeve: (sleeve) => set({ sleeve }),

  logos: [],
  addLogo: (logo) =>
    set((state) => ({
      logos: [...state.logos, logo],
    })),
  removeLogo: (id) =>
    set((state) => ({
      logos: state.logos.filter((item) => item.id !== id),
    })),

  kitItems: initialKit,
  toggleKitItem: (item) =>
    set((state) => ({
      kitItems: {
        ...state.kitItems,
        [item]: !state.kitItems[item],
      },
    })),

  selectedPackage: 'ouro',
  setSelectedPackage: (selectedPackage) => set({ selectedPackage }),

  quantity: 15,
  setQuantity: (quantity) => set({ quantity }),

  resetUniform: () =>
    set({
      colors: initialColors,
      collar: 'round',
      sleeve: 'short',
      logos: [],
      kitItems: initialKit,
      selectedPackage: 'ouro',
      quantity: 15,
    }),
}));
