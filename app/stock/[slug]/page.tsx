import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CarCard } from '@/components/car-card';
import { getCarBySlug, getCars } from '@/lib/airtable';
import { currency, installments, whatsappLink } from '@/lib/data';

export default async function CarDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const car = await getCarBySlug(slug);

  if (!car) return notFound();

  const allCars = await getCars();
  const similar = allCars.filter((item) => item.slug !== car.slug && item.type === car.type).slice(0, 3);

  return (
    <>
      <section className="section">
        <div className="container detail-grid">
          <div>
            <Image src={car.image} alt={`${car.brand} ${car.model}`} width={1200} height={700} className="detail-image" priority />
          </div>
          <aside>
            <p className="status available">Disponible</p>
            <h1>{car.brand} {car.model}</h1>
            <p className="muted">{car.year} · {car.km.toLocaleString('es-AR')} km · {car.fuel} · {car.transmission}</p>
            <p className="price big">{currency(car.price)}</p>
            <p className="accent">o 48 cuotas de {currency(installments(car.price))}</p>
            <div className="detail-actions">
              <a className="wa-button" href={whatsappLink(`Hola! Quiero info del ${car.brand} ${car.model} ${car.year}`)} target="_blank">Consultar por WhatsApp</a>
              <a className="outline-btn" href="tel:+541143210000">Llamar ahora</a>
              <a className="text-link" href={whatsappLink(`Hola! Quiero agendar una visita para ver el ${car.brand} ${car.model}`)} target="_blank">Agendar visita →</a>
            </div>
            <div className="specs">
              <h3>Especificaciones</h3>
              <p>Motor: 2.0</p>
              <p>Tracción: 4x2</p>
              <p>Puertas: 4</p>
              <p>A/A: Sí</p>
              <p>Airbags: 6</p>
            </div>
          </aside>
        </div>
      </section>

      <section className="section gray">
        <div className="container">
          <div className="title-row">
            <h2>También te puede interesar</h2>
            <Link className="text-link" href="/stock">Volver al stock →</Link>
          </div>
          <div className="cars-grid">
            {similar.map((item) => <CarCard key={item.slug} car={item} />)}
          </div>
        </div>
      </section>
    </>
  );
}
