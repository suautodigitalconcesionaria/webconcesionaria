export const WHATSAPP_NUMBER = '5491123456789';

export type Car = {
  slug: string;
  brand: string;
  model: string;
  year: number;
  km: number;
  fuel: 'Nafta' | 'Diésel' | 'Híbrido' | 'GNC';
  transmission: 'Manual' | 'Automática';
  type: 'Sedán' | 'SUV' | 'Pick-up' | 'Hatchback' | 'Utilitario';
  price: number;
  tag: 'Financiado' | 'Permuta' | 'Nuevo';
  image: string;
};

export const cars: Car[] = [
  {
    slug: 'toyota-corolla-xei-2022',
    brand: 'Toyota',
    model: 'Corolla XEI',
    year: 2022,
    km: 34000,
    fuel: 'Nafta',
    transmission: 'Automática',
    type: 'Sedán',
    price: 28900000,
    tag: 'Financiado',
    image: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=1600&q=80'
  },
  {
    slug: 'volkswagen-tcross-highline-2023',
    brand: 'Volkswagen',
    model: 'T-Cross Highline',
    year: 2023,
    km: 18500,
    fuel: 'Nafta',
    transmission: 'Automática',
    type: 'SUV',
    price: 33400000,
    tag: 'Permuta',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1600&q=80'
  },
  {
    slug: 'ford-ranger-xlt-4x4-2021',
    brand: 'Ford',
    model: 'Ranger XLT 4x4',
    year: 2021,
    km: 63000,
    fuel: 'Diésel',
    transmission: 'Manual',
    type: 'Pick-up',
    price: 37800000,
    tag: 'Nuevo',
    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1600&q=80'
  },
  {
    slug: 'peugeot-208-allure-2024',
    brand: 'Peugeot',
    model: '208 Allure',
    year: 2024,
    km: 9000,
    fuel: 'Nafta',
    transmission: 'Automática',
    type: 'Hatchback',
    price: 26900000,
    tag: 'Financiado',
    image: 'https://images.unsplash.com/photo-1549924231-f129b911e442?auto=format&fit=crop&w=1600&q=80'
  },
  {
    slug: 'renault-kangoo-zen-2020',
    brand: 'Renault',
    model: 'Kangoo Zen',
    year: 2020,
    km: 71000,
    fuel: 'Nafta',
    transmission: 'Manual',
    type: 'Utilitario',
    price: 18800000,
    tag: 'Permuta',
    image: 'https://images.unsplash.com/photo-1617469767053-d3b523a0b982?auto=format&fit=crop&w=1600&q=80'
  },
  {
    slug: 'chevrolet-tracker-ltz-2022',
    brand: 'Chevrolet',
    model: 'Tracker LTZ',
    year: 2022,
    km: 28000,
    fuel: 'Nafta',
    transmission: 'Automática',
    type: 'SUV',
    price: 32100000,
    tag: 'Financiado',
    image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1600&q=80'
  }
];

export const faqs = [
  {
    q: '¿Los autos tienen alguna garantía?',
    a: 'Sí. Todos nuestros vehículos usados se entregan con revisión técnica completa y garantía mecánica por escrito.'
  },
  {
    q: '¿Aceptan autos en parte de pago?',
    a: 'Sí, tomamos tu auto como parte de pago. Te hacemos una cotización clara y sin compromiso en el momento.'
  },
  {
    q: '¿Cómo funciona la financiación?',
    a: 'Trabajamos con bancos y financieras. Evaluamos tu perfil y en muchos casos la aprobación sale en el día.'
  },
  {
    q: '¿Puedo hacer test drive?',
    a: 'Obvio. Coordinamos por WhatsApp y te esperamos de lunes a sábado de 9 a 18 hs.'
  }
];

export const testimonials = [
  {
    name: 'Martín R.',
    date: 'Febrero 2026',
    text: 'Excelente atención. Me explicaron todo claro y cerramos la operación en dos días.'
  },
  {
    name: 'Lucía P.',
    date: 'Enero 2026',
    text: 'La financiación fue súper rápida y transparente. Recomiendo 100%.'
  },
  {
    name: 'Carlos G.',
    date: 'Diciembre 2025',
    text: 'Tomaron mi usado a buen valor y me llevé una SUV impecable.'
  }
];

export function currency(value: number) {
  return `$${value.toLocaleString('es-AR')}`;
}

export function installments(value: number, months = 48) {
  return Math.round((value * 1.42) / months);
}

export function whatsappLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
