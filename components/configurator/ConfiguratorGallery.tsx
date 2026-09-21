'use client';

import Image from 'next/image';
import { useConfiguratorStore, BowlColor } from '@/store/useConfiguratorStore';
import { asset } from '@/lib/media';

const COLORS: { id: BowlColor; hex: string; label: string; render: string }[] = [
  { id: 'crema', hex: '#F4F1EA', label: 'Crema', render: '/renders/crema.png' },
  { id: 'oliva', hex: '#6B705C', label: 'Oliva', render: '/renders/oliva.png' },
  { id: 'negro', hex: '#1E1E1E', label: 'Negro', render: '/renders/negro.png' },
  { id: 'rosado', hex: '#E5989B', label: 'Rosado', render: '/renders/rosado.png' },
  { id: 'lila', hex: '#D4C4D7', label: 'Lila', render: '/renders/lila.png' },
];

const PROOF: { image: string; alt: string }[] = [
  { image: '/galeria/galeria-1.jpg', alt: 'Gato comiendo de un comedero WUF con el nombre de su dueño grabado' },
  { image: '/galeria/galeria-2.jpg', alt: 'Dos comederos WUF de colores distintos, cada uno con un nombre grabado' },
  { image: '/galeria/galeria-3.jpg', alt: 'Perro comiendo de cerca de un comedero WUF con el nombre de su dueño grabado' },
];

export default function ConfiguratorGallery() {
  const { color, setColor } = useConfiguratorStore();

  const scrollToConfigurator = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="w-full mt-24">
      {/* Prueba de personalización — refuerza la decisión de compra justo antes
          de elegir color, mostrando el grabado real sobre piezas entregadas. */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-4 pb-16">
        <h3 className="font-display font-bold text-2xl md:text-3xl tracking-tight mb-8 max-w-xl">
          Así se ve el nombre de tu mascota…
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {PROOF.map((p) => (
            <div key={p.image} className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-gray-200 group">
              <Image
                src={asset(p.image)}
                alt={p.alt}
                fill
                sizes="(min-width: 768px) 33vw, 100vw"
                className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Tira de colores — clicable, cambia el color seleccionado arriba */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pb-16">
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
              <div className="relative w-full aspect-square bg-white p-4">
                <Image
                  src={asset(c.render)}
                  alt={`Comedero WUF color ${c.label}`}
                  fill
                  sizes="(min-width: 768px) 20vw, 50vw"
                  className="object-contain"
                />
              </div>
              <div className="flex items-center justify-between px-3 py-2 bg-white">
                <span className="text-xs font-bold">{c.label}</span>
                <span className="w-3 h-3 rounded-full border border-ink/10" style={{ backgroundColor: c.hex }} />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* CTA de cierre — devuelve al canvas/checkout ya con el color elegido */}
      <div className="w-full bg-ink text-paper py-16 md:py-20 px-6 md:px-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <div>
            <h3 className="font-display font-bold text-2xl md:text-3xl tracking-tight">
              ¿Listo con el color? Ponle el nombre.
            </h3>
            <p className="text-sm text-paper/60 font-light mt-2">
              Confirmamos ortografía y detalles por WhatsApp antes de pasar a manufactura.
            </p>
          </div>
          <button
            onClick={scrollToConfigurator}
            className="shrink-0 bg-oliva text-paper px-8 py-4 rounded-full text-sm font-bold hover:bg-oliva-dark transition-colors flex items-center justify-center gap-3 w-fit"
          >
            Terminar mi WUF
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
