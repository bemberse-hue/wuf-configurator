/**
 * Los archivos en /public/galeria y /public/renders se sirven con
 * Cache-Control: immutable (ver next.config.ts) para que carguen rápido.
 * Como el nombre de archivo no cambia cuando se reemplaza una foto, el
 * navegador seguiría mostrando la versión vieja para siempre si no
 * cambiamos la URL. Por eso cada imagen pasa por asset(), que le agrega
 * ?v=ASSET_VERSION. Sube ASSET_VERSION cada vez que reemplaces un archivo
 * existente por otro con el mismo nombre.
 */
export const ASSET_VERSION = '2';

export function asset(path: string): string {
  return `${path}?v=${ASSET_VERSION}`;
}
