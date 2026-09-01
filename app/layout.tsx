import type { Metadata, Viewport } from "next";
import { Roboto, Big_Shoulders } from "next/font/google";
import "./globals.css";

// Cuerpo de texto: funcional, técnico
const roboto = Roboto({
  weight: ['300', '400', '500', '700', '900'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
});

// Titulares: condensada e industrial — referencia directa a la señalética
// de acero y a la forma acanalada del propio producto
const bigShoulders = Big_Shoulders({
  weight: ['600', '700', '800', '900'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-big-shoulders',
  adjustFontFallback: false,
  fallback: ['Arial Narrow', 'Arial', 'sans-serif'],
});

export const metadata: Metadata = {
  title: 'WUF | Comederos Esculturales para Mascotas',
  description: 'Comederos elevados de diseño arquitectónico, personalizados y fabricados bajo pedido en Colombia.',
};

// Declarado explícito: al agregar un <head> manual para la fuente del grabado
// (ver más abajo) Next.js puede omitir el viewport por defecto, y eso es lo
// que causaba que la página cargara "alejada" y hubiera que hacer zoom out
// en el celular.
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        {/*
          Respaldo tipográfico del grabado en vivo (ver LiveDebossCanvas).
          Arial Rounded MT Bold es la fuente real del molde/troquel físico,
          pero solo viene preinstalada en macOS/iOS. Cargamos Fredoka con
          su nombre de familia literal para poder referenciarla directo
          desde el <canvas> cuando el sistema del visitante no la tenga.
        */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Fredoka:wght@700&display=swap" rel="stylesheet" />
      </head>
      <body className={`${roboto.variable} ${bigShoulders.variable} font-sans antialiased bg-paper text-ink overflow-x-hidden`}>
        {children}
      </body>
    </html>
  );
}
