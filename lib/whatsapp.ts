export interface WufConfigState {
  size: string;
  color: string;
  colorSecondary?: string;
  customName: string;
  addons: string[];
  basePrice: number;
  totalPrice: number;
}

export const generateWhatsAppLink = (orderId: string, config: WufConfigState): string => {
  const phoneNumber = "573219036533";

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const sizeLabel = config.size === 'single-s' ? 'Single S' : 'Set Dúo S';
  const isDuo = config.size === 'duo-s' && config.colorSecondary;

  const colorLine = isDuo
    ? `▪️ Plato 1: ${config.color.toUpperCase()}\n▪️ Plato 2: ${config.colorSecondary!.toUpperCase()}\n`
    : `▪️ Color: ${config.color.toUpperCase()}\n`;

  const addonsText = config.addons.length > 0
    ? `\n➕ Add-ons: ${config.addons.join(', ')}`
    : '';

  const message = `Hola WUF! 🐾 Quiero confirmar mi pedido.\n\n`
    + `*DETALLES DE LA ORDEN (${orderId})*\n`
    + `▪️ Formato: ${sizeLabel}\n`
    + colorLine
    + `▪️ Nombre mascota: ${config.customName || 'SIN NOMBRE'}${addonsText}\n\n`
    + `*TOTAL: ${formatPrice(config.totalPrice)}*\n\n`
    + `Quedo atento(a) para coordinar el pago y envío. ¡Gracias!`;

  return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
};
