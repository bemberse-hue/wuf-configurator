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

const TEXT_THEME: Record<BowlColor, { shadow: string, highlight: string, base: string, baseAlpha?: number }> = {
  'crema': { shadow: '#B8AF9E', highlight: '#FFFFFF', base: '#998F7D', baseAlpha: 0.72 },
  'oliva': { shadow: '#20231A', highlight: '#DCE3CC', base: '#262A1F', baseAlpha: 0.82 },
  'negro': { shadow: '#000000', highlight: '#7A7A7A', base: '#000000', baseAlpha: 0.85 },
  'rosado': { shadow: '#7C3B3E', highlight: '#FFECEC', base: '#7A3F42', baseAlpha: 0.82 },
  'lila': { shadow: '#5F4478', highlight: '#F7EFFC', base: '#5E4471', baseAlpha: 0.82 },
};

const FONT_FAMILY_STACK = '"Arial Rounded MT Bold", "Arial Rounded MT", "Fredoka", sans-serif';
const FONT_RATIO_SINGLE = 0.17;
const FONT_RATIO_DUO = 0.085;
const MAX_FONT_ABSOLUTE_SINGLE = 84;
const MAX_FONT_ABSOLUTE_DUO = 44;
const MIN_FONT_SIZE = 16;

export default function LiveDebossCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { color, colorSecondary, customName, size } = useConfiguratorStore();
  const [imagesVersion, setImagesVersion] = useState(0);
  const [fontsReady, setFontsReady] = useState(false);
  const imageCache = useRef<Map<string, HTMLImageElement>>(new Map());
  const isDuo = size === 'duo-s';

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

      const drawBowl = (centerX: number, areaWidth: number, colorKey: BowlColor, name: string, fontRatio: number, maxFontAbsolute: number, verticalOffsetFactor: number) => {
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

        const maxTextWidth = drawWidth * 0.3;
        let fontSize = Math.min(drawWidth * fontRatio, maxFontAbsolute);
        ctx.font = `bold ${fontSize}px ${FONT_FAMILY_STACK}`;
        while (ctx.measureText(name).width > maxTextWidth && fontSize > MIN_FONT_SIZE) {
          fontSize -= 2;
          ctx.font = `bold ${fontSize}px ${FONT_FAMILY_STACK}`;
        }

        const depth = Math.max(0.8, fontSize * 0.018);

        const chars = Array.from(name);
        const charWidths = chars.map((c) => ctx.measureText(c).width);
        const totalTextWidth = charWidths.reduce((acc, w) => acc + w, 0);

        // Curvatura cilíndrica suave acompañando el anillo curvo del pedestal
        const halfWidth = totalTextWidth / 2;
        const sagitta = chars.length > 1 ? Math.min(5.5, Math.max(0.8, totalTextWidth * 0.026)) : 0;

        let currentX = -halfWidth;
        const charData = chars.map((char, i) => {
          const w = charWidths[i];
          const cx = currentX + w / 2;
          currentX += w;

          if (chars.length <= 1 || halfWidth === 0) {
            return { char, cx: 0, cy: 0, rot: 0 };
          }

          const normX = cx / halfWidth;
          const cy = -sagitta * (normX * normX - 0.5);
          const slope = (-2 * sagitta * cx) / (halfWidth * halfWidth);
          const rot = Math.atan(slope);

          return { char, cx, cy, rot };
        });

        // 1. Sombra bajo relieve (Multiply)
        ctx.globalCompositeOperation = 'multiply';
        ctx.filter = 'blur(0.4px)';
        ctx.fillStyle = theme.shadow;
        for (const item of charData) {
          ctx.save();
          ctx.translate(item.cx + depth * 0.55, item.cy + depth * 1.1);
          ctx.rotate(item.rot);
          ctx.fillText(item.char, 0, 0);
          ctx.restore();
        }

        // 2. Resalte superior biselado (Screen)
        ctx.globalCompositeOperation = 'screen';
        ctx.filter = 'none';
        ctx.fillStyle = theme.highlight;
        for (const item of charData) {
          ctx.save();
          ctx.translate(item.cx - depth * 0.55, item.cy - depth * 0.7);
          ctx.rotate(item.rot);
          ctx.fillText(item.char, 0, 0);
          ctx.restore();
        }

        // 3. Tono base grabado (Source-over)
        ctx.globalCompositeOperation = 'source-over';
        ctx.globalAlpha = theme.baseAlpha ?? 0.82;
        ctx.fillStyle = theme.base;
        for (const item of charData) {
          ctx.save();
          ctx.translate(item.cx, item.cy);
          ctx.rotate(item.rot);
          ctx.fillText(item.char, 0, 0);
          ctx.restore();
        }
        ctx.globalAlpha = 1;

        ctx.restore();
      };

      if (isDuo) {
        drawBowl(rect.width * 0.27, rect.width * 0.46, color, customName, FONT_RATIO_DUO, MAX_FONT_ABSOLUTE_DUO, 0.05);
        drawBowl(rect.width * 0.73, rect.width * 0.46, colorSecondary, customName, FONT_RATIO_DUO, MAX_FONT_ABSOLUTE_DUO, 0.05);

        ctx.save();
        ctx.strokeStyle = 'rgba(20,19,15,0.08)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(rect.width / 2, rect.height * 0.18);
        ctx.lineTo(rect.width / 2, rect.height * 0.82);
        ctx.stroke();
        ctx.restore();
      } else {
        drawBowl(rect.width / 2, rect.width, color, customName, FONT_RATIO_SINGLE, MAX_FONT_ABSOLUTE_SINGLE, 0.05);
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