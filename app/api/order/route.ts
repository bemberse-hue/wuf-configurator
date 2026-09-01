import { NextResponse } from 'next/server';
import { orderSchema } from '@/lib/validations/order';
import crypto from 'crypto';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Validación estricta con Zod
    const result = orderSchema.safeParse(body);
    
    if (!result.success) {
      return NextResponse.json({ error: 'Payload inválido', details: result.error }, { status: 400 });
    }

    const orderData = result.data;
    
    // Generación de ID único quirúrgico
    const shortHash = crypto.randomBytes(3).toString('hex').toUpperCase();
    const orderId = `WUF-2026-${shortHash}`;

    /* 
     * Aquí se inyectaría la llamada real al Webhook (Airtable/Discord)
     * Optimizamos envolviéndolo en un try-catch que no bloquea la respuesta principal
     */
    const webhookUrl = process.env.WEBHOOK_URL;
    if (webhookUrl) {
      fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ event: 'new_wuf_order', orderId, ...orderData }),
      }).catch((e) => console.error('Webhook failed silently', e));
    }

    return NextResponse.json({ success: true, orderId, data: orderData }, { status: 201 });

  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}