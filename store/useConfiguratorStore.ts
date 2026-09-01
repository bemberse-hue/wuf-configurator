import { create } from 'zustand';

export type BowlSize = 'single-s' | 'duo-s';
export type BowlColor = 'crema' | 'oliva' | 'negro' | 'rosado' | 'lila';

// Única fuente de verdad para los precios — FormControls y el sticky bar
// leen de aquí, así nunca quedan desincronizados entre sí.
export const PRICES: Record<BowlSize, number> = {
  'single-s': 120000,
  'duo-s': 180000,
};

interface ConfiguratorState {
  size: BowlSize;
  color: BowlColor;           // Color del plato único (Single S) o del Plato 1 (Set Dúo)
  colorSecondary: BowlColor;  // Color del Plato 2 — solo aplica si size === 'duo-s'
  customName: string;         // Mismo nombre para ambos platos (es la misma mascota: comida + agua)
  basePrice: number;
  totalPrice: number;
  setSize: (size: BowlSize) => void;
  setColor: (color: BowlColor) => void;
  setColorSecondary: (color: BowlColor) => void;
  setCustomName: (name: string) => void;
  calculateTotal: () => void;
}

export const useConfiguratorStore = create<ConfiguratorState>((set, get) => ({
  size: 'single-s',
  color: 'crema',
  colorSecondary: 'oliva',
  customName: '',
  basePrice: PRICES['single-s'],
  totalPrice: PRICES['single-s'],

  setSize: (size) => {
    set({ size, basePrice: PRICES[size] });
    get().calculateTotal();
  },

  setColor: (color) => set({ color }),

  setColorSecondary: (colorSecondary) => set({ colorSecondary }),

  setCustomName: (customName) => {
    set({ customName: customName.toUpperCase() });
  },

  calculateTotal: () => {
    const { basePrice } = get();
    set({ totalPrice: basePrice });
  },
}));
