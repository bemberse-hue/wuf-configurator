'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LiveDebossCanvas from '@/components/configurator/LiveDebossCanvas';
import FormControls from '@/components/configurator/FormControls';
import StickyCheckoutBar from '@/components/configurator/StickyCheckoutBar';
import ProductInfo from '@/components/configurator/ProductInfo';
import SpecStrip from '@/components/landing/SpecStrip';
import Advantages from '@/components/landing/Advantages';
import ConfiguratorGallery from '@/components/configurator/ConfiguratorGallery';
import { useConfiguratorStore, PRICES } from '@/store/useConfiguratorStore';

export default function AppFlow() {
  const [isConfiguring, setIsConfiguring] = useState(false);
  const configSize = useConfiguratorStore((s) => s.size);
  const formControlsTitle = configSize === 'duo-s' ? 'Set Dúo S' : 'Single S';

  // El botón podía quedar clickeado a mitad de la landing (ej. desde el CTA
  // oscuro al final) y el configurador se abría con el scroll todavía abajo.
  // Subimos al inicio al abrir para que siempre arranque desde el canvas.
  const openConfigurator = () => {
    setIsConfiguring(true);
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  return (
    <main className="min-h-screen bg-paper text-ink selection:bg-ink selection:text-paper flex flex-col">
      
      {/* HEADER MINIMALISTA */}
      <header className="w-full py-8 px-6 md:px-12 flex items-center justify-center absolute top-0 z-50 pointer-events-none">
        <h1
          className={`font-display font-extrabold text-4xl md:text-5xl tracking-tight pointer-events-auto cursor-pointer transition-colors ${isConfiguring ? 'text-ink' : 'text-white'}`}
          onClick={() => setIsConfiguring(false)}
        >
          WUF.
        </h1>
      </header>

      <div className="flex-grow">
        <AnimatePresence mode="wait">
          {!isConfiguring ? (
            /* =========================================
               FASE 1: LANDING PAGE
               ========================================= */
            <motion.section
              key="landing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="w-full flex flex-col"
            >
              {/* HERO A SANGRE COMPLETA */}
              <div className="relative w-full h-[92vh] min-h-[560px] bg-gray-300 overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: "url('/galeria/inicio1.jpg')" }}
                  role="img"
                  aria-label="Perro Shih Tzu comiendo de un comedero WUF oliva junto a otros dos pedestales"
                />
                {/* Scrim para legibilidad del texto, no decorativo */}
                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/5 to-transparent" />

                <div className="absolute inset-x-0 bottom-0 px-6 md:px-12 pb-10 md:pb-16">
                  <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end md:justify-between gap-8">
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wide text-white/70">
                        Diseñado y fabricado en Colombia
                      </span>
                      <h2 className="font-display font-extrabold text-white uppercase tracking-tight leading-[0.95] text-[13vw] sm:text-6xl md:text-7xl lg:text-8xl mt-2">
                        Comederos<br className="hidden sm:block" /> esculturales
                      </h2>
                    </div>

                    <button
                      onClick={openConfigurator}
                      className="shrink-0 bg-paper text-ink px-8 py-4 md:px-9 md:py-5 rounded-full text-base font-bold hover:bg-white transition-colors shadow-2xl flex items-center justify-center gap-3 w-fit"
                    >
                      Diseñar el mío
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              {/* FRANJA DE ESPECIFICACIONES */}
              <SpecStrip />

              {/* INTRO EDITORIAL */}
              <div className="w-full max-w-7xl mx-auto px-6 md:px-12 py-20 md:py-28">
                <p className="font-display font-medium text-2xl md:text-4xl lg:text-[2.75rem] leading-[1.2] tracking-tight max-w-4xl">
                  Un comedero a ras de piso obliga al cuello a doblarse. WUF eleva a tu mascota 12 centímetros y trata su postura con el mismo rigor que un mueble de arquitecto.
                </p>
              </div>

              {/* VENTAJAS ALTERNADAS A SANGRE COMPLETA */}
              <Advantages />

              {/* CTA FINAL OSCURO */}
              <div className="w-full bg-ink text-paper py-24 md:py-32 px-6 md:px-12">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end md:justify-between gap-10">
                  <h3 className="font-display font-extrabold uppercase tracking-tight leading-[0.95] text-5xl md:text-7xl lg:text-8xl max-w-3xl">
                    Grábale su nombre.
                  </h3>
                  <button
                    onClick={openConfigurator}
                    className="shrink-0 bg-oliva text-paper px-9 py-5 rounded-full text-base font-bold hover:bg-oliva-dark transition-colors flex items-center justify-center gap-3 w-fit"
                  >
                    Diseñar mi WUF
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </div>
              </div>
            </motion.section>

          ) : (
            /* =========================================
               FASE 2: CONFIGURADOR SPA
               ========================================= */
            <motion.section 
              key="configurator"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="w-full min-h-screen pt-28 pb-12 px-4 md:px-8 max-w-7xl mx-auto"
            >
              <div className="flex items-center justify-between mb-8">
                <button
                  onClick={() => setIsConfiguring(false)}
                  className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-ink/50 hover:text-ink transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Volver
                </button>
                <span className="text-xs font-medium text-ink/40">Desde {new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(PRICES['single-s'])}</span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
                
                <div className="lg:col-span-7 relative lg:sticky lg:top-32 z-10 mb-8 lg:mb-0">
                  <LiveDebossCanvas />
                </div>

                <div className="lg:col-span-5 flex flex-col h-full relative">
                  <h2 className="font-display font-bold text-3xl tracking-tight mb-1">
                    WUF {formControlsTitle}
                  </h2>
                  <p className="text-sm text-ink/50 font-light mb-8">El comedero elevado de diseño arquitectónico.</p>
                  <FormControls />
                  <ProductInfo />
                  <div className="mt-auto pt-8">
                    <StickyCheckoutBar />
                  </div>
                </div>

              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </div>

      {/* =========================================
          GALERÍA DE COLORES (Solo visible en Configurador)
          Usa fotografía distinta a la del landing, y deja explorar
          los 5 colores con un clic sin tener que volver a subir al form.
          ========================================= */}
      {isConfiguring && (
        <ConfiguratorGallery />
      )}

      {/* FOOTER MANIFIESTO */}
      <footer className="w-full border-t border-ink/10 py-12 px-6 bg-white mt-auto">
        <div className="max-w-3xl mx-auto text-center flex flex-col items-center gap-4">
          <h4 className="font-display font-bold text-lg tracking-tight uppercase">WUF / Architectural Pet Living</h4>
          <p className="text-sm font-light text-gray-500 leading-relaxed">
            Creemos que los objetos para nuestras mascotas merecen el mismo rigor formal, material y estético que el resto de los muebles de nuestra casa. Sin plásticos ruidosos, sin gráficos infantiles. Solo geometría, función y respeto por el espacio.
          </p>
          <div className="text-[9px] font-bold text-gray-300 uppercase tracking-widest mt-6">
            © {new Date().getFullYear()} WUF. Todos los derechos reservados.
          </div>
        </div>
      </footer>

    </main>
  );
}