'use client';

export default function ProductInfo() {
  return (
    <div className="mt-10 pt-8 border-t border-ink/10 space-y-2">

      {/* BARRA DE CONFIANZA — visible sin clic, es lo que más pesa en la decisión de compra */}
      <div className="grid grid-cols-2 gap-3 mb-8">
        <div className="flex items-start gap-2.5 p-3 rounded-xl bg-oliva/[0.06]">
          <svg className="w-4 h-4 mt-0.5 shrink-0 text-oliva-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-[11px] font-medium leading-snug text-ink/70">Acero inoxidable</span>
        </div>
        <div className="flex items-start gap-2.5 p-3 rounded-xl bg-oliva/[0.06]">
          <svg className="w-4 h-4 mt-0.5 shrink-0 text-oliva-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="text-[11px] font-medium leading-snug text-ink/70">Fabricado bajo pedido, total personalización</span>
        </div>
        <div className="flex items-start gap-2.5 p-3 rounded-xl bg-oliva/[0.06]">
          <svg className="w-4 h-4 mt-0.5 shrink-0 text-oliva-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75M3.75 4.5h16.5v15H3.75v-15z" />
          </svg>
          <span className="text-[11px] font-medium leading-snug text-ink/70">Ergonomíá que beneficia a tu mascota</span>
        </div>
        <div className="flex items-start gap-2.5 p-3 rounded-xl bg-oliva/[0.06]">
          <svg className="w-4 h-4 mt-0.5 shrink-0 text-oliva-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-[11px] font-medium leading-snug text-ink/70">2 meses de garantía de fabricación</span>
        </div>
      </div>

      {/* ESPECIFICACIONES TÉCNICAS */}
      <details className="group [&_summary::-webkit-details-marker]:hidden">
        <summary className="flex cursor-pointer items-center justify-between py-4 border-b border-ink/10 text-xs font-black tracking-widest uppercase text-ink hover:text-ink/60 transition-colors">
          <span>Especificaciones Técnicas</span>
          <span className="transition-transform group-open:rotate-180">
            <svg fill="none" height="20" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" width="20"><path d="M6 9l6 6 6-6"></path></svg>
          </span>
        </summary>
        <div className="py-4 text-sm font-light text-ink/60 leading-relaxed">
          <ul className="space-y-3">
            <li className="grid grid-cols-3 gap-4 border-b border-ink/5 pb-2"><strong className="col-span-1 font-bold text-xs uppercase text-ink/90">Dimensiones</strong><span className="col-span-2">Diámetro base: 16.0 cm | Altura total: 12.0 cm</span></li>
            <li className="grid grid-cols-3 gap-4 border-b border-ink/5 pb-2"><strong className="col-span-1 font-bold text-xs uppercase text-ink/90">Inserto</strong><span className="col-span-2">Acero Inox. Ø 16.0 cm ext. (Profundidad: 4.5 cm)</span></li>
            <li className="grid grid-cols-3 gap-4 border-b border-ink/5 pb-2"><strong className="col-span-1 font-bold text-xs uppercase text-ink/90">Capacidad</strong><span className="col-span-2">400 ml (Equivalente a 1.5 tazas de concentrado o agua fresca)</span></li>
            <li className="grid grid-cols-3 gap-4 border-b border-ink/5 pb-2"><strong className="col-span-1 font-bold text-xs uppercase text-ink/90">Estructura</strong><span className="col-span-2">Polímero técnico PLA  de origen vegetal de alta densidad</span></li>
            <li className="grid grid-cols-3 gap-4 border-b border-ink/5 pb-2"><strong className="col-span-1 font-bold text-xs uppercase text-ink/90">Peso en seco</strong><span className="col-span-2">~320g (Centro de gravedad bajo para evitar vuelcos)</span></li>
            <li className="grid grid-cols-3 gap-4"><strong className="col-span-1 font-bold text-xs uppercase text-ink/90">Fijación</strong><span className="col-span-2">4 Pads de silicona industrial antideslizantes de 3 mm</span></li>
          </ul>
        </div>
      </details>

      {/* ERGONOMÍA */}
      <details className="group [&_summary::-webkit-details-marker]:hidden">
        <summary className="flex cursor-pointer items-center justify-between py-4 border-b border-ink/10 text-xs font-black tracking-widest uppercase text-ink hover:text-ink/60 transition-colors">
          <span>Diseñado para su anatomía, no para el piso</span>
          <span className="transition-transform group-open:rotate-180">
            <svg fill="none" height="20" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" width="20"><path d="M6 9l6 6 6-6"></path></svg>
          </span>
        </summary>
        <div className="py-4 text-sm font-light text-ink/60 leading-relaxed space-y-4">
          <p>
            Los comederos a nivel de suelo fuerzan a los animales a inclinar el cuello en un ángulo antinatural de 70°, comprimiendo el esófago y aumentando la ingesta de aire. La elevación de 12 cm de WUF alinea la columna cervical con el estómago, facilitando el tránsito digestivo y reduciendo el reflujo.
          </p>
          <div>
            <strong className="block font-bold text-xs uppercase text-ink/90 mb-1">Compatibilidad (Talla S)</strong>
            <p className="mb-2"><strong>Gatos:</strong> Persa, Siamés, Maine Coon, Bengala, Ragdoll, Doméstico común. La altura evita la fatiga de bigotes (whisker fatigue) y protege las articulaciones en felinos mayores.</p>
            <p><strong>Perros Pequeños/Medianos-Bajos (Hasta 12 kg):</strong> French Bulldog, Dachshund (Salchicha), Pug, Schnauzer Miniatura, Shih Tzu, Boston Terrier, Pomerania, Yorkshire Terrier, Jack Russell, Maltés, Beagle cachorro y mestizos pequeños.</p>
          </div>
        </div>
      </details>

      {/* CUIDADO E HIGIENE */}
      <details className="group [&_summary::-webkit-details-marker]:hidden">
        <summary className="flex cursor-pointer items-center justify-between py-4 border-b border-ink/10 text-xs font-black tracking-widest uppercase text-ink hover:text-ink/60 transition-colors">
          <span>Higiene sin fricción</span>
          <span className="transition-transform group-open:rotate-180">
            <svg fill="none" height="20" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" width="20"><path d="M6 9l6 6 6-6"></path></svg>
          </span>
        </summary>
        <div className="py-4 text-sm font-light text-ink/60 leading-relaxed space-y-4">
          <div>
            <strong className="block font-bold text-xs uppercase text-ink/90 mb-1">El Inserto de Acero Inoxidable</strong>
            <ul className="list-disc pl-4 space-y-1">
              <li>100% Apto para lavavajillas y lavado con agua hirviendo.</li>
              <li>Material no poroso: previene colonias bacterianas que causan acné (puntos negros en barbilla) y alergias.</li>
              <li>No absorbe olores ni transfiere sabores metálicos.</li>
            </ul>
          </div>
          <div>
            <strong className="block font-bold text-xs uppercase text-ink/90 mb-1">El Pedestal Escultórico (Base)</strong>
            <ul className="list-disc pl-4 space-y-1">
              <li>Limpiar exclusivamente con un paño suave ligeramente humedecido con agua y jabón neutro.</li>
              <li>No introducir en lavavajillas ni exponer a fuentes de calor superiores a 50°C.</li>
              <li>Secar con una toalla suave para mantener el acabado mate uniforme.</li>
            </ul>
          </div>
        </div>
      </details>

      {/* FAQ */}
      <details className="group [&_summary::-webkit-details-marker]:hidden">
        <summary className="flex cursor-pointer items-center justify-between py-4 border-b border-ink/10 text-xs font-black tracking-widest uppercase text-ink hover:text-ink/60 transition-colors">
          <span>Preguntas Frecuentes</span>
          <span className="transition-transform group-open:rotate-180">
            <svg fill="none" height="20" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" width="20"><path d="M6 9l6 6 6-6"></path></svg>
          </span>
        </summary>
        <div className="py-4 text-sm font-light text-ink/60 leading-relaxed space-y-4">
          <div>
            <strong className="block font-bold text-xs uppercase text-ink/90">¿Cuánto tiempo tarda la fabricación?</strong>
            <p>Al ser manufactura digital bajo demanda, toma entre 48 y 72 horas hábiles en nuestro taller antes de ser despachado.</p>
          </div>
          <div>
            <strong className="block font-bold text-xs uppercase text-ink/90">¿Cómo funciona el envío y costo?</strong>
            <p>Despachamos a toda Colombia. El envío se calcula según la ciudad ($15.000 a $30.000 COP promedio).</p>
          </div>
          <div>
            <strong className="block font-bold text-xs uppercase text-ink/90">¿Qué pasa si me equivoco en el nombre?</strong>
            <p>Nuestro equipo confirma contigo la ortografía exacta por WhatsApp antes de enviar el archivo a producción.</p>
          </div>
          <div>
            <strong className="block font-bold text-xs uppercase text-ink/90">¿Qué pasa si deseo dos nombres diferentes?</strong>
            <p>Por WhatsApp nos conformas los nombres antes de enviar el archivo a producción.</p>
          </div>
          <div>
            <strong className="block font-bold text-xs uppercase text-ink/90">¿La base se corre cuando comen?</strong>
            <p>No. Incluye 4 topes de silicona de alto agarre que fijan el plato a porcelanatos y maderas evitando desplazamientos.</p>
          </div>
          <div>
            <strong className="block font-bold text-xs uppercase text-ink/90">¿Tienen garantía?</strong>
            <p>Ofrecemos 2 meses de garantía directa por defectos de fabricación estructurales en la base. 1 año de garantía en el plato de acero. </p>
          </div>
        </div>
      </details>

    </div>
  );
}