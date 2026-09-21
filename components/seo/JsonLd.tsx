import { asset } from '@/lib/media';
import { PRICES } from '@/store/useConfiguratorStore';

export default function JsonLd() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://wuf.com.co';

  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'WUF - Comedero Elevado Ergonómico para Mascotas',
    image: [
      `${baseUrl}${asset('/galeria/inicio1.jpg')}`,
      `${baseUrl}${asset('/renders/crema.png')}`,
      `${baseUrl}${asset('/renders/oliva.png')}`,
      `${baseUrl}${asset('/renders/negro.png')}`,
    ],
    description:
      'Comedero elevado de 10 cm de diseño arquitectónico con plato de acero inoxidable de 400 ml. Fabricado en polímero técnico PLA vegetal y personalizado bajo pedido en bajo relieve con el nombre de tu mascota. Alivia la columna cervical, previene reflujo y acné en barbilla.',
    sku: 'WUF-S-001',
    brand: {
      '@type': 'Brand',
      name: 'WUF',
    },
    category: 'Pet Supplies > Pet Bowls & Feeders',
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'COP',
      lowPrice: PRICES['single-s'],
      highPrice: PRICES['duo-s'],
      offerCount: 2,
      offers: [
        {
          '@type': 'Offer',
          name: 'WUF Sencillo S',
          price: PRICES['single-s'],
          priceCurrency: 'COP',
          availability: 'https://schema.org/InStock',
          itemCondition: 'https://schema.org/NewCondition',
          url: baseUrl,
          description: '1 Pedestal arquitectónico + 1 Plato de Acero Inox con grabado de nombre personalizado',
        },
        {
          '@type': 'Offer',
          name: 'WUF Doble S',
          price: PRICES['duo-s'],
          priceCurrency: 'COP',
          availability: 'https://schema.org/InStock',
          itemCondition: 'https://schema.org/NewCondition',
          url: baseUrl,
          description: '2 Pedestales arquitectónicos + 2 Platos de Acero Inox con grabado de nombre personalizado',
        },
      ],
    },
    additionalProperty: [
      { '@type': 'PropertyValue', name: 'Altura total', value: '10 cm' },
      { '@type': 'PropertyValue', name: 'Diámetro de base', value: '16.0 cm' },
      { '@type': 'PropertyValue', name: 'Capacidad del plato', value: '400 ml' },
      { '@type': 'PropertyValue', name: 'Material del plato', value: 'Acero Inoxidable Grado Alimenticio' },
      { '@type': 'PropertyValue', name: 'Material de base', value: 'Polímero técnico PLA de origen vegetal' },
      { '@type': 'PropertyValue', name: 'País de fabricación', value: 'Colombia' },
    ],
  };

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'WUF',
    alternateName: 'WUF Architectural Pet Living',
    url: baseUrl,
    logo: `${baseUrl}${asset('/renders/crema.png')}`,
    sameAs: [
      'https://instagram.com/wuf_gadgets',
      'https://tiktok.com/@wuf_gadgets',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+57 321 903 6533',
      contactType: 'customer service',
      areaServed: 'CO',
      availableLanguage: ['Spanish'],
    },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: '¿Por qué la altura de 10 cm beneficia a mi mascota?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'A ras de piso el cuello se dobla 70° comprimiendo el esófago. La elevación de 10 cm de WUF alinea la columna cervical con el estómago, disminuyendo la ingesta de aire, el reflujo y facilitando el tránsito digestivo en gatos y perros pequeños hasta 12 kg.',
        },
      },
      {
        '@type': 'Question',
        name: '¿Por qué se usa un plato de acero inoxidable y no de plástico?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'El acero inoxidable no es poroso, no acumula bacterias causantes de acné felino o canino en la barbilla, es 100% apto para lavavajillas y no absorbe grasa ni olores.',
        },
      },
      {
        '@type': 'Question',
        name: '¿Cuánto tiempo tarda la fabricación y cómo son los envíos en Colombia?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Al ser manufactura digital y personalizada bajo pedido, toma entre 48 y 72 horas hábiles en taller antes de ser despachado. Realizamos despachos con cobertura a toda Colombia.',
        },
      },
      {
        '@type': 'Question',
        name: '¿Cómo confirman la ortografía del nombre grabado?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Nuestro equipo humano confirma contigo la ortografía exacta y detalles del pedido por WhatsApp antes de pasar a manufactura.',
        },
      },
      {
        '@type': 'Question',
        name: '¿Qué garantía tienen los productos WUF?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Ofrecemos 2 meses de garantía directa por defectos estructurales de manufactura en la base y 1 año de garantía en el plato de acero inoxidable.',
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}

