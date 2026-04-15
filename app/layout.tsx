import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { whatsappLink } from '@/lib/data';
import { ScrollProgress } from '@/components/scroll-progress';

export const metadata: Metadata = {
  title: 'AUTOBA | Concesionaria en Buenos Aires',
  description: 'Comprá tu auto en Buenos Aires. Stock de vehículos revisados, financiación y atención inmediata por WhatsApp.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-AR">
      <body>
        <ScrollProgress />
        <Navbar />
        <main>{children}</main>
        <a className="floating-wa" href={whatsappLink('Hola! Vi la web y quiero consultar por autos disponibles.')} target="_blank" aria-label="WhatsApp">
          💬
        </a>
        <Footer />
      </body>
    </html>
  );
}
