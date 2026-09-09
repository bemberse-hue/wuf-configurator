'use client';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-ink text-paper border-t border-white/10 mt-auto">
      {/* 1. FRANJA DE CONFIANZA Y GARANTÍAS */}
      <div className="border-b border-white/10 py-12 md:py-16 px-6 md:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Badge 1: Envíos */}
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 text-oliva">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.25V3.75m0 3.75a2.25 2.25 0 01-2.25 2.25h-6.75a2.25 2.25 0 01-2.25-2.25V3.75m11.25 0H5.25" />
              </svg>
            </div>
            <div>
              <h4 className="font-display font-bold text-base tracking-wide uppercase text-white">Envíos a toda Colombia</h4>
              <p className="text-xs text-white/60 leading-relaxed mt-1">
                Despachos seguros y coordinados a las principales ciudades y municipios del país.
              </p>
            </div>
          </div>

          {/* Badge 2: Pago Seguro */}
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 text-oliva">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
              </svg>
            </div>
            <div>
              <h4 className="font-display font-bold text-base tracking-wide uppercase text-white">Pago 100% Seguro</h4>
              <p className="text-xs text-white/60 leading-relaxed mt-1">
                Transfiere por Bre-B, Bancolombia o paga con tarjeta a través de Link Bold certificado.
              </p>
            </div>
          </div>

          {/* Badge 3: Garantía Directa */}
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 text-oliva">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
              </svg>
            </div>
            <div>
              <h4 className="font-display font-bold text-base tracking-wide uppercase text-white">Garantía WUF</h4>
              <p className="text-xs text-white/60 leading-relaxed mt-1">
                2 meses de garantía estructural en pedestal y 1 año en el plato de acero inoxidable.
              </p>
            </div>
          </div>

          {/* Badge 4: Verificación Humana */}
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 text-oliva">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a.75.75 0 01-.974-.974c.264-.996.347-1.847.25-2.566A8.04 8.04 0 013 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
              </svg>
            </div>
            <div>
              <h4 className="font-display font-bold text-base tracking-wide uppercase text-white">Atención Personalizada</h4>
              <p className="text-xs text-white/60 leading-relaxed mt-1">
                Confirmamos ortografía, tonos y requerimientos por WhatsApp antes de pasar a manufactura.
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* 2. BLOQUE PRINCIPAL DE CONTACTO Y REDES */}
      <div className="py-14 md:py-20 px-6 md:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
          
          {/* Columna Izquierda: Filosofía & Marca */}
          <div className="md:col-span-5 space-y-4">
            <span className="font-display font-extrabold text-3xl md:text-4xl tracking-tight text-white block">
              WUF.
            </span>
            <p className="text-sm text-white/70 font-light leading-relaxed max-w-sm">
              Comederos elevados de diseño arquitectónico y manufactura bajo pedido. Elevamos la postura de perros y gatos pequeños combinando geometría minimalista y acero inoxidable de grado alimenticio.
            </p>
            <div className="pt-2">
              <span className="inline-flex items-center gap-2 text-xs font-semibold text-oliva bg-oliva/10 border border-oliva/20 px-3 py-1.5 rounded-full">
                <span className="w-2 h-2 rounded-full bg-oliva animate-pulse" />
                Manufacturado artesanalmente en Colombia
              </span>
            </div>
          </div>

          {/* Columna Centro: Canales de Contacto */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white/50">Contacto Directo</h4>
            <div className="space-y-3">
              {/* WhatsApp Oficial */}
              <a
                href="https://wa.me/573219036533?text=Hola%20WUF!%20🐾%20Quisiera%20más%20información%20sobre%20los%20comederos."
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between p-3.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.46 1.32 4.96L2.05 22l5.25-1.38a9.9 9.9 0 004.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.87 9.87 0 0012.04 2zm0 18.13h-.01a8.2 8.2 0 01-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.22 8.22 0 01-1.26-4.36c0-4.54 3.7-8.24 8.25-8.24 2.2 0 4.27.86 5.83 2.42a8.18 8.18 0 012.42 5.83c0 4.55-3.7 8.21-8.25 8.21z" />
                    </svg>
                  </div>
                  <div>
                    <span className="text-[11px] text-white/50 block font-medium">Línea de WhatsApp</span>
                    <span className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors">
                      +57 321 903 6533
                    </span>
                  </div>
                </div>
                <svg className="w-4 h-4 text-white/40 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>

              {/* Horario y soporte */}
              <div className="text-xs text-white/50 px-1">
                Lunes a Sábado · 8:00 AM – 7:00 PM (Hora Colombia)
              </div>
            </div>
          </div>

          {/* Columna Derecha: Redes Sociales */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white/50">Síguenos</h4>
            <div className="flex flex-col gap-2.5">
              
              {/* Instagram */}
              <a
                href="https://instagram.com/wuf_gadgets"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 p-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all"
              >
                <div className="w-8 h-8 rounded-xl bg-pink-500/20 text-pink-400 flex items-center justify-center">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </div>
                <div>
                  <span className="text-[10px] text-white/50 uppercase tracking-widest font-semibold block">Instagram</span>
                  <span className="text-xs font-bold text-white group-hover:text-pink-400 transition-colors">
                    @wuf_gadgets
                  </span>
                </div>
              </a>

              {/* TikTok */}
              <a
                href="https://tiktok.com/@wuf_gadgets"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 p-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all"
              >
                <div className="w-8 h-8 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.97v7.55c.02 2.01-.58 4.07-1.87 5.61-1.47 1.78-3.77 2.8-6.11 2.8-2.6 0-5.06-1.25-6.52-3.34-1.66-2.34-1.84-5.5-.47-8.03 1.25-2.32 3.69-3.84 6.32-3.95.27-.01.55 0 .82.02v4.06c-.36-.06-.73-.08-1.1-.05-1.28.09-2.48.8-3.08 1.93-.66 1.21-.6 2.75.16 3.9.72 1.1 2.03 1.74 3.37 1.61 1.25-.11 2.37-.96 2.78-2.14.24-.7.31-1.45.3-2.19V.02z" />
                  </svg>
                </div>
                <div>
                  <span className="text-[10px] text-white/50 uppercase tracking-widest font-semibold block">TikTok</span>
                  <span className="text-xs font-bold text-white group-hover:text-cyan-400 transition-colors">
                    @wuf_gadgets
                  </span>
                </div>
              </a>

            </div>
          </div>

        </div>
      </div>

      {/* 3. BARRA INFERIOR DE DERECHOS Y CRÉDITOS */}
      <div className="border-t border-white/10 py-6 px-6 md:px-12 bg-black/30">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <p className="text-[11px] text-white/50">
            © {currentYear} WUF. Marca registrada. Comederos esculturales y ergonómicos para mascotas.
          </p>
          <div className="flex items-center gap-6 text-[11px] text-white/40">
            <span>Envíos Colombia</span>
            <span>·</span>
            <span>Garantía de Satisfacción</span>
            <span>·</span>
            <span>Personalización en 3D</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

