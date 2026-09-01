'use client';

import { useConfiguratorStore, BowlSize, BowlColor, PRICES } from '@/store/useConfiguratorStore';

const COLORS: { id: BowlColor; hex: string; label: string }[] = [
  { id: 'crema', hex: '#F4F1EA', label: 'CREMA' },
  { id: 'oliva', hex: '#6B705C', label: 'OLIVA' },
  { id: 'negro', hex: '#1E1E1E', label: 'NEGRO' },
  { id: 'rosado', hex: '#E5989B', label: 'ROSADO' },
  { id: 'lila', hex: '#D4C4D7', label: 'LILA' },
];

function SwatchRow({ value, onChange }: { value: BowlColor; onChange: (c: BowlColor) => void }) {
  return (
    <div className="flex flex-wrap gap-4">
      {COLORS.map((c) => (
        <button
          key={c.id}
          onClick={() => onChange(c.id)}
          aria-pressed={value === c.id}
          aria-label={`Color ${c.label}`}
          className="flex flex-col items-center gap-2 group"
        >
          <div
            className={`w-11 h-11 rounded-full border-2 transition-all ${
              value === c.id
                ? 'border-ink scale-110 shadow-md'
                : 'border-ink/10 group-hover:scale-105'
            }`}
            style={{ backgroundColor: c.hex }}
          />
          <span className={`text-[9px] font-bold tracking-widest ${value === c.id ? 'text-ink' : 'text-ink/40'}`}>
            {c.label}
          </span>
        </button>
      ))}
    </div>
  );
}

export default function FormControls() {
  const store = useConfiguratorStore();
  const isDuo = store.size === 'duo-s';

  const SIZES: { id: BowlSize; label: string; desc: string; price: number }[] = [
    { id: 'single-s', label: 'Single S', desc: '1 Pedestal + 1 Inserto Inox', price: PRICES['single-s'] },
    { id: 'duo-s', label: 'Set Dúo S', desc: '2 Pedestales + 2 Insertos Inox', price: PRICES['duo-s'] },
  ];

  const formatPrice = (price: number) =>
    new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(price);

  const duoSavings = SIZES[0].price * 2 - SIZES[1].price;
  const charsLeft = 10 - store.customName.length;

  return (
    <div className="flex flex-col gap-10">
      <div>
        <h3 className="font-display font-bold text-lg tracking-tight mb-4">1. Formato</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {SIZES.map((s) => (
            <button
              key={s.id}
              onClick={() => store.setSize(s.id)}
              aria-pressed={store.size === s.id}
              className={`p-4 rounded-2xl border-2 text-left transition-all ${
                store.size === s.id
                  ? 'border-ink bg-white shadow-md'
                  : 'border-ink/10 hover:border-ink/30'
              }`}
            >
              <div className="flex items-baseline justify-between gap-2">
                <div className="font-bold text-sm">{s.label}</div>
                <div className="font-display font-bold text-base tabular-nums">{formatPrice(s.price)}</div>
              </div>
              <div className="text-[11px] text-ink/50 mt-1">{s.desc}</div>
              {s.id === 'duo-s' && (
                <div className="text-[10px] font-bold text-oliva-dark mt-2 bg-oliva/10 w-fit px-2 py-0.5 rounded-full">
                  Ahorra {formatPrice(duoSavings)}
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-display font-bold text-lg tracking-tight mb-1">
          2. Paleta Mate Arquitectónica
        </h3>
        {isDuo && (
          <p className="text-[11px] text-ink/40 mb-4">
            Comida y agua no tienen por qué ser del mismo color.
          </p>
        )}

        {isDuo ? (
          <div className="flex flex-col gap-6 mt-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-ink/40 block mb-2">Plato 1</span>
              <SwatchRow value={store.color} onChange={store.setColor} />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-ink/40 block mb-2">Plato 2</span>
              <SwatchRow value={store.colorSecondary} onChange={store.setColorSecondary} />
            </div>
          </div>
        ) : (
          <div className="mt-4">
            <SwatchRow value={store.color} onChange={store.setColor} />
          </div>
        )}
      </div>

      <div>
        <div className="flex items-baseline justify-between mb-4">
          <h3 className="font-display font-bold text-lg tracking-tight">3. Personalización en vivo</h3>
          <span className={`text-[11px] font-medium tabular-nums ${charsLeft <= 2 ? 'text-oliva-dark' : 'text-ink/40'}`}>
            {charsLeft} car.
          </span>
        </div>
        <input
          type="text"
          maxLength={10}
          value={store.customName}
          onChange={(e) => store.setCustomName(e.target.value)}
          placeholder="NOMBRE DE TU MASCOTA"
          className="w-full p-4 rounded-2xl border-2 border-ink/10 focus:border-ink focus:ring-0 transition-colors uppercase font-bold text-sm placeholder:font-normal placeholder:text-ink/30 outline-none"
        />
        <p className="text-[11px] text-ink/40 mt-2 leading-relaxed">
          {isDuo
            ? 'Se graba igual en los dos platos. Confirmamos la ortografía por WhatsApp antes de producir.'
            : 'Confirmamos la ortografía exacta por WhatsApp antes de pasar a producción.'}
        </p>
      </div>
    </div>
  );
}
