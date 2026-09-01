interface Advantage {
  image: string;
  alt: string;
  kicker: string;
  title: string;
  body: string;
  reverse?: boolean;
}

const ADVANTAGES: Advantage[] = [
  {
    image: '/galeria/foto2.jpg',
    alt: 'Perro sentado junto a comedero WUF oliva en sala de estar',
    kicker: 'Postura',
    title: 'La altura correcta cambia cómo comen.',
    body: 'A ras de piso, el cuello se dobla 70° y comprime el esófago. Los 12 cm de WUF alinean columna y estómago: menos aire tragado, menos regurgitación, mejor tránsito digestivo. Pensado para gatos y perros pequeños hasta 12 kg.',
  },
  {
    image: '/galeria/foto3.jpg',
    alt: 'Detalle macro del grabado del nombre en el pedestal WUF',
    kicker: 'Higiene',
    title: 'El acero no negocia con las bacterias.',
    body: 'El inserto es de acero inoxidable de alta densidad: no poroso, no absorbe olores ni sabores, apto para lavavajillas y agua hirviendo. Nada de plástico rayado acumulando acné en la barbilla.',
    reverse: true,
  },
  {
    image: '/galeria/foto1.jpg',
    alt: 'Tres pedestales WUF en distintos colores mate sobre concreto',
    kicker: 'Manufactura',
    title: 'Cada pieza se hace cuando la pides.',
    body: 'Nada de bodegas ni stock excedente: imprimimos bajo pedido en Colombia, en polímero técnico PLA mate de origen vegetal, con el nombre de tu mascota grabado antes de despachar. 48 a 72 horas de taller.',
  },
];

export default function Advantages() {
  return (
    <section className="w-full flex flex-col">
      {ADVANTAGES.map((item) => (
        <div
          key={item.title}
          className={`w-full flex flex-col ${item.reverse ? 'md:flex-row-reverse' : 'md:flex-row'}`}
        >
          <div
            className="w-full md:w-3/5 aspect-[4/3] md:aspect-auto md:min-h-[560px] bg-gray-200 bg-cover bg-center"
            style={{ backgroundImage: `url('${item.image}')` }}
            role="img"
            aria-label={item.alt}
          />
          <div className="w-full md:w-2/5 flex items-center px-6 py-14 md:px-16 md:py-0">
            <div className="max-w-md">
              <span className="text-[11px] font-bold uppercase tracking-wide text-oliva">
                {item.kicker}
              </span>
              <h3 className="font-display font-bold text-3xl md:text-[2.75rem] leading-[1.05] tracking-tight mt-3 mb-5">
                {item.title}
              </h3>
              <p className="text-[15px] md:text-base font-light text-ink/70 leading-relaxed max-w-[38ch]">
                {item.body}
              </p>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
