'use client';

import { useState, useEffect } from 'react';
import { useConfiguratorStore } from '@/store/useConfiguratorStore';
import { generateWhatsAppLink } from '@/lib/whatsapp';

export default function StickyCheckoutBar() {
  const store = useConfiguratorStore();
  const [isProcessing, setIsProcessing] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Asegurar que el precio cargue después del renderizado inicial para evitar bugs de Next.js
  useEffect(() => {
    queueMicrotask(() => setMounted(true));
  }, []);

  const handleCheckout = async () => {
    setIsProcessing(true);
    try {
      const waLink = generateWhatsAppLink(`WUF-${Date.now()}`, {
        size: store.size,
        color: store.color,
        colorSecondary: store.size === 'duo-s' ? store.colorSecondary : undefined,
        customName: store.customName,
        addons: [],
        basePrice: store.basePrice,
        totalPrice: store.totalPrice,
      });
      window.location.href = waLink;
    } catch (error) {
      console.error(error);
      alert('Hubo un problema. Por favor intenta de nuevo.');
    } finally {
      setIsProcessing(false);
    }
  };

  const formattedPrice = mounted
    ? new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(store.totalPrice)
    : '';

  return (
    <div className="w-full relative lg:sticky lg:bottom-6 z-50 mb-8 lg:mb-0">
      <div className="bg-ink text-paper p-5 md:p-6 rounded-3xl shadow-2xl flex flex-col md:flex-row items-stretch md:items-center justify-between gap-5 md:gap-6">

        <div className="flex flex-col justify-center">
          <span className="text-[10px] font-bold uppercase tracking-wide text-paper/40">Total</span>
          <span className="font-display font-extrabold text-2xl md:text-3xl tabular-nums leading-tight">
            {formattedPrice || '—'}
          </span>
          <p className="text-[10px] text-paper/40 font-medium leading-tight mt-1.5 max-w-[38ch]">
            Fabricado bajo pedido en Colombia · Pagos por transferencia Bre-B / Bancolombia o Link Bold
          </p>
        </div>

        <button
          onClick={handleCheckout}
          disabled={isProcessing}
          className="w-full md:w-auto bg-oliva text-paper px-8 py-4 rounded-2xl font-bold uppercase tracking-wide text-sm hover:bg-oliva-dark transition-colors active:scale-[0.98] flex items-center justify-center gap-2 shrink-0 disabled:opacity-60"
        >
          {isProcessing ? (
            <span>Procesando…</span>
          ) : (
            <>
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.46 1.32 4.96L2.05 22l5.25-1.38a9.9 9.9 0 004.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.87 9.87 0 0012.04 2zm0 18.13h-.01a8.2 8.2 0 01-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.22 8.22 0 01-1.26-4.36c0-4.54 3.7-8.24 8.25-8.24 2.2 0 4.27.86 5.83 2.42a8.18 8.18 0 012.42 5.83c0 4.55-3.7 8.21-8.25 8.21z" />
              </svg>
              Ordenar por WhatsApp
            </>
          )}
        </button>
      </div>
    </div>
  );
}
