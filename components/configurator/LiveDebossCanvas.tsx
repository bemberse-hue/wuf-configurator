'use client';

import { useEffect, useRef, useState } from 'react';
import { useConfiguratorStore } from '@/store/useConfiguratorStore';
import { BowlColor } from '@/store/useConfiguratorStore';

const COLOR_IMAGES: Record<BowlColor, string> = {
  'crema': '/renders/crema.png',
  'oliva': '/renders/oliva.png',
  'negro': '/renders/negro.png',
  'rosado': '/renders/rosado.png',
  'lila': '/renders/lila.png',
};

const TEXT_THEME: Record<BowlColor, { shadow: string, highlight: string, base: string }> = {
  'crema': { shadow: '#B7AF9E', highlight: '#FFFFFF', base: '#8A8272' },
  'oliva': { shadow: '#2E3226', highlight: '#D9E0C9', base: '#3F4336' },
  'negro': { shadow: '#000000', highlight: '#6B6B6B', base: '#000000' },
  'rosado': { shadow: '#9C4F52', highlight: '#FFE3E4', base: '#A85A5D' },
  'lila': { shadow: '#7C5C99', highlight: '#F5EBFC', base: '#8A6B9E' },
};

// Arial Rounded MT Bold es la fuente real del molde de grabado — se mantiene
// como primera opción por fidelidad a la pieza física. Solo viene preinstalada
// en macOS/iOS; en el resto de sistemas cae en Fredoka (cargada en layout.tsx
// con nombre de familia literal), que conserva el mismo carácter redondeado
// en vez de un sans-serif genérico silencioso.
const FONT_FAMILY_STACK = '"Arial Rounded MT Bold", "Arial Rounded MT", "Fredoka", sans-serif';
const SINGLE_MAX_FONT = 72;
const DUO_MAX_FONT = 34;
const MIN_FONT_SIZE = 20;

export default function LiveDebossCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { color, colorSecondary, customName, size } = useConfiguratorStore();
  const [imagesVersion, setImagesVersion] = useState(0);
  const [fontsReady, setFontsReady] = useState(false);
  const imageCache = useRef<Map<string, HTMLImageElement>>(new Map());
  const isDuo = size === 'duo-s';

  // Confirma que la fuente de respaldo esté realmente disponible antes de
  // grabar texto — evita el parpadeo de "sans-serif genérico -> fuente real"
  useEffect(() => {
    let cancelled = false;
    const fonts = typeof document !== 'undefined' ? document.fonts : null;
    const markReady = () => { if (!cancelled) setFontsReady(true); };

    if (!fonts) {
      queueMicrotask(markReady);
      return () => { cancelled = true; };
    }

    Promise.all([
      fonts.load(`700 60px "Fredoka"`),
      fonts.ready,
    ]).finally(markReady);

    return () => { cancelled = true; };
  }, []);

  // Carga (y cachea) las imágenes que hagan falta: una si es Single, dos si es Dúo
  useEffect(() => {
    const neededColors = isDuo ? [color, colorSecondary] : [color];
    let cancelled = false;

    neededColors.forEach((c) => {
      const src = COLOR_IMAGES[c];
      if (imageCache.current.has(src)) return;
      const img = new Image();
      img.src = src;
      img.onload = () => {
        imageCache.current.set(src, img);
        if (!cancelled) setImagesVersion((v) => v + 1);
      };
    });

    return () => { cancelled = true; };
  }, [color, colorSecondary, isDuo]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const getImg = (c: BowlColor) => imageCache.current.get(COLOR_IMAGES[c]) || null;

    const render = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, rect.width, rect.height);

      // Dibuja un plato (imagen + nombre grabado) centrado en centerX,
      // ocupando como máximo areaWidth de ancho. Se reutiliza para el
      // modo Single (un plato, ancho completo) y Dúo (dos platos, mitad c/u).
      const drawBowl = (centerX: number, areaWidth: number, colorKey: BowlColor, name: string, maxFont: number, verticalOffsetFactor: number) => {
        const img = getImg(colorKey);
        if (!img) return;

        const imgAspect = img.width / img.height;
        const areaAspect = areaWidth / rect.height;

        let drawWidth, drawHeight;
        if (areaAspect > imgAspect) {
          drawHeight = rect.height * 1.15;
          drawWidth = drawHeight * imgAspect;
        } else {
          drawWidth = areaWidth * 1.15;
          drawHeight = drawWidth / imgAspect;
        }

        const drawX = centerX - drawWidth / 2;
        const drawY = (rect.height - drawHeight) / 2;

        ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);

        if (!name) return;

        const theme = TEXT_THEME[colorKey];
        ctx.save();

        const textY = rect.height / 2 + (drawHeight * verticalOffsetFactor);
        ctx.translate(centerX, textY);
        ctx.scale(1, 0.82);
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        const maxTextWidth = drawWidth * 0.6;
        let fontSize = maxFont;
        ctx.font = `bold ${fontSize}px ${FONT_FAMILY_STACK}`;
        while (ctx.measureText(name).width > maxTextWidth && fontSize > MIN_FONT_SIZE) {
          fontSize -= 2;
          ctx.font = `bold ${fontSize}px ${FONT_FAMILY_STACK}`;
        }

        const depth = Math.max(1.5, fontSize * 0.035);

        // Hendidura: oscurece el material real debajo del trazo
        ctx.globalCompositeOperation = 'multiply';
        ctx.fillStyle = theme.shadow;
        ctx.fillText(name, depth * 0.5, depth);

        // Filo de luz en el borde opuesto del relieve
        ctx.globalCompositeOperation = 'screen';
        ctx.fillStyle = theme.highlight;
        ctx.fillText(name, -depth * 0.5, -depth * 0.6);

        // Cuerpo del trazo, semitransparente para que siga leyendo el material
        ctx.globalCompositeOperation = 'source-over';
        ctx.globalAlpha = 0.5;
        ctx.fillStyle = theme.base;
        ctx.fillText(name, 0, 0);
        ctx.globalAlpha = 1;

        ctx.restore();
      };

      if (isDuo) {
        drawBowl(rect.width * 0.27, rect.width * 0.46, color, customName, DUO_MAX_FONT, 0.04);
        drawBowl(rect.width * 0.73, rect.width * 0.46, colorSecondary, customName, DUO_MAX_FONT, 0.04);

        // Línea divisoria sutil — referencia al mismo lenguaje de "coursing" del landing
        ctx.save();
        ctx.strokeStyle = 'rgba(20,19,15,0.08)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(rect.width / 2, rect.height * 0.18);
        ctx.lineTo(rect.width / 2, rect.height * 0.82);
        ctx.stroke();
        ctx.restore();
      } else {
        drawBowl(rect.width / 2, rect.width, color, customName, SINGLE_MAX_FONT, 0.05);
      }
    };

    render();
    window.addEventListener('resize', render);
    return () => window.removeEventListener('resize', render);
  }, [color, colorSecondary, customName, isDuo, imagesVersion, fontsReady]);

  const ariaLabel = isDuo
    ? `Vista previa de dos comederos WUF, plato 1 color ${color} y plato 2 color ${colorSecondary}${customName ? `, ambos grabados con el nombre ${customName}` : ''}`
    : `Vista previa del comedero WUF color ${color}${customName ? `, grabado con el nombre ${customName}` : ''}`;

  return (
    <div className={`relative w-full ${isDuo ? 'aspect-[4/3] md:aspect-[16/9]' : 'aspect-square md:aspect-video'} bg-white rounded-3xl overflow-hidden border border-ink/10 shadow-[0_1px_2px_rgba(20,19,15,0.06)] flex items-center justify-center`}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full object-contain"
        role="img"
        aria-label={ariaLabel}
      />
      <div className="absolute top-4 left-4 md:top-5 md:left-5 flex items-center gap-2 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full border border-ink/10">
        <span className="w-1.5 h-1.5 rounded-full bg-oliva animate-pulse" />
        <span className="text-[10px] font-bold uppercase tracking-wide text-ink/60">Vista previa en vivo</span>
      </div>
    </div>
  );
}
