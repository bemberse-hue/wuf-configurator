import type { NextConfig } from "next";
import { ASSET_VERSION } from "./lib/media";

const nextConfig: NextConfig = {
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  images: {
    // next/image bloquea por defecto cualquier src local con query string.
    // Las fotos de /galeria y /renders llevan ?v=<ASSET_VERSION> a propósito
    // (ver lib/media.ts) para reventar el cache cuando se reemplaza un
    // archivo, así que autorizamos exactamente esa versión.
    localPatterns: [
      { pathname: '/galeria/**', search: `?v=${ASSET_VERSION}` },
      { pathname: '/renders/**', search: `?v=${ASSET_VERSION}` },
    ],
  },
  async headers() {
    return [
      {
        source: '/(renders|galeria)/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
