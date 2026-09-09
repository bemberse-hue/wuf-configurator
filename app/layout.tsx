import type { Metadata, Viewport } from "next";
import { Roboto, Big_Shoulders } from "next/font/google";
import JsonLd from "@/components/seo/JsonLd";
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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://wuf.com.co';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'WUF | Comederos Elevados y Ergonómicos para Mascotas',
    template: '%s | WUF Architectural Pet Living',
  },
  description:
    'Comederos elevados de 10 cm con diseño arquitectónico y plato de acero inoxidable. Personalizados bajo pedido en Colombia para gatos y perros pequeños. Alivia la columna, previene reflujo y acné en barbilla.',
  keywords: [
    'comedero elevado',
    'comedero ergonomico perro',
    'comedero para gatos elevado',
    'plato acero inoxidable mascotas',
    'comedero personalizado perro',
    'diseño arquitectonico mascotas',
    'WUF',
    'wuf gadgets',
    'prevenir acne felino barbilla',
    'comederos perros colombia bogota medellin cali',
    'pedestal comedero mascota',
  ],
  authors: [{ name: 'WUF' }],
  creator: 'WUF',
  publisher: 'WUF',
  formatDetection: {
    telephone: true,
    email: false,
    address: false,
  },
  openGraph: {
    title: 'WUF | Comederos Elevados y Ergonómicos para Mascotas',
    description:
      'Eleva la postura de tu mascota 10 cm. Diseño arquitectónico en polímero vegetal y plato de acero inoxidable higiénico, personalizado con su nombre en Colombia.',
    url: siteUrl,
    siteName: 'WUF',
    images: [
      {
        url: '/galeria/inicio1.jpg',
        width: 1200,
        height: 630,
        alt: 'Comedero WUF Elevado y Ergonómico',
      },
    ],
    locale: 'es_CO',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'WUF | Comederos Elevados y Ergonómicos para Mascotas',
    description:
      'Comederos elevados de 10 cm con plato de acero inoxidable y nombre personalizado. Diseñado y fabricado en Colombia.',
    images: ['/galeria/inicio1.jpg'],
    creator: '@wuf_gadgets',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
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
        <JsonLd />
        {children}
      </body>
    </html>
  );
}
