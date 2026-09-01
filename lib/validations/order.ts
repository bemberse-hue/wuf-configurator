import { z } from 'zod';

export const orderSchema = z.object({
  config: z.object({
    size: z.enum(['S', 'M']),
    color: z.enum(['crema', 'oliva', 'negro', 'rosado']),
    customName: z
      .string()
      .max(10, 'El nombre no puede exceder los 10 caracteres')
      .regex(/^[A-Z0-9 ]*$/, 'Solo letras, números y espacios permitidos'),
    addons: z.array(
      z.object({
        id: z.enum(['extra-inox', 'silicone-mat']),
        name: z.string(),
        price: z.number().min(0),
        active: z.boolean(),
      })
    ),
    basePrice: z.number().min(0),
    totalPrice: z.number().min(0),
  }),
  customerNotes: z.string().optional(),
});

export type OrderPayloadSchema = z.infer<typeof orderSchema>;