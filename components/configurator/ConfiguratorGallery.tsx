'use client';

import { useConfiguratorStore, BowlColor } from '@/store/useConfiguratorStore';

const COLORS: { id: BowlColor; hex: string; label: string; render: string }[] = [
  { id: 'crema', hex: '#F4F1EA', label: 'Crema', render: '/renders/crema.png' },
  { id: 'oliva', hex: '#6B705C', label: 'Oliva', render: '/renders/oliva.png' },
  { id: 'negro', hex: '#1E1E1E', label: 'Negro', render: '/renders/negro.png' },
  { id: 'rosado', hex: '#E5989B', label: 'Rosado', render: '/renders/rosado.png' },
  { id: 'lila', hex: '#D4C4D7', label: 'Lila', render: '/renders/lila.png' },
];

export default function ConfiguratorGallery() {
  const { color, setColor } = useConfiguratorStore();

  return (
    <section className="w-full mt-24">
      {/* Banner — fotografía exclusiva de esta sección, distinta a la del landing */}
      <div
        className="w-full aspect-[16/9] md:aspect-[21/9] bg-gray-200 bg-cover bg-center"
        style={{ backgroundImage: "url('/galeria/inicio2.jpg')" }}
        role="img"
        aria-label="Los tres pedestales WUF en crema, negro y oliva sobre concreto"
      />

      {/* Tira de colores — clicable, cambia el color seleccionado arriba */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        <h3 className="font-display font-bold text-2xl md:text-3xl tracking-tight mb-8">
          Míralo en cada color
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {COLORS.map((c) => (
            <button
              key={c.id}
              onClick={() => setColor(c.id)}
              aria-pressed={color === c.id}
              className={`group relative rounded-2xl overflow-hidden border-2 transition-colors ${
                color === c.id ? 'border-ink' : 'border-ink/10 hover:border-ink/30'
              }`}
            >
              <div
                className="w-full aspect-square bg-white bg-contain bg-center bg-no-repeat p-4"
                style={{ backgroundImage: `url('${c.render}')` }}
              />
              <div className="flex items-center justify-between px-3 py-2 bg-white">
                <span className="text-xs font-bold">{c.label}</span>
                <span className="w-3 h-3 rounded-full border border-ink/10" style={{ backgroundColor: c.hex }} />
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
