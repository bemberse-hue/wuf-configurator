'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import LiveDebossCanvas from '@/components/configurator/LiveDebossCanvas';
import FormControls from '@/components/configurator/FormControls';
import StickyCheckoutBar from '@/components/configurator/StickyCheckoutBar';
import ProductInfo from '@/components/configurator/ProductInfo';
import SpecStrip from '@/components/landing/SpecStrip';
import Advantages from '@/components/landing/Advantages';
import ConfiguratorGallery from '@/components/configurator/ConfiguratorGallery';
import Footer from '@/components/landing/Footer';
import { useConfiguratorStore, PRICES } from '@/store/useConfiguratorStore';
import { asset } from '@/lib/media';

export default function AppFlow() {
  const [isConfiguring, setIsConfiguring] = useState(false);
  const configSize = useConfiguratorStore((s) => s.size);
  const formControlsTitle = configSize === 'duo-s' ? 'Doble S' : 'Sencillo S';

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
        <span
          className={`hidden sm:inline-flex items-center gap-2 absolute right-6 md:right-12 text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full border transition-colors ${
            isConfiguring
              ? 'text-ink/70 border-ink/15 bg-ink/5'
              : 'text-white/90 border-white/20 bg-white/10 backdrop-blur-sm'
          }`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-oliva animate-pulse shrink-0" />
          Batch 01 · Unidades limitadas
        </span>
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
                <Image
                  src={asset('/galeria/inicio1.jpg')}
                  alt="Perro peludo comiendo de un comedero WUF oliva con la placa de su nombre, Daiky, colgando del collar"
                  fill
                  priority
                  sizes="100vw"
                  className="object-cover"
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
                  Un comedero a ras de piso obliga al cuello a doblarse. WUF eleva a tu mascota 10 centímetros y trata su postura con el mismo rigor que un mueble de arquitecto.
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
                  <div className="pt-8">
                    <StickyCheckoutBar />
                  </div>
                  <ProductInfo />
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

      {/* FOOTER MODERNO CON CONFIANZA Y CONTACTO */}
      <Footer />

    </main>
  );
}