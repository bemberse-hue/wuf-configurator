const SPECS = [
  { value: '16.0', unit: 'CM', label: 'Diámetro de base' },
  { value: '400', unit: 'ML', label: 'Capacidad del inserto' },
  { value: 'INOX', unit: '', label: 'Acero inoxidable, no poroso' },
  { value: '48–72', unit: 'H', label: 'Fabricación bajo pedido' },
];

export default function SpecStrip() {
  return (
    <div className="w-full bg-ink text-paper">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-white/15">
        {SPECS.map((spec) => (
          <div key={spec.label} className="px-6 py-8 md:py-10 flex flex-col justify-between min-h-[140px]">
            <span className="font-display font-extrabold text-4xl md:text-5xl leading-none tracking-tight">
              {spec.value}
              {spec.unit && <span className="text-lg md:text-xl align-top ml-1 text-oliva">{spec.unit}</span>}
            </span>
            <span className="text-[11px] font-medium uppercase tracking-wide text-white/50 mt-4">
              {spec.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
