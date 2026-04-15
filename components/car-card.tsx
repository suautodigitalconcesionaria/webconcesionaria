import Image from 'next/image';
import Link from 'next/link';
import { Car, currency, installments, whatsappLink } from '@/lib/data';

export function CarCard({ car }: { car: Car }) {
  return (
    <article className="car-card">
      <div className="img-wrap">
        <span className="tag">{car.tag}</span>
        <Image src={car.image} alt={`${car.brand} ${car.model}`} width={800} height={450} />
      </div>
      <div className="car-body">
        <h3>{car.brand} {car.model}</h3>
        <p className="muted">{car.year} · {car.km.toLocaleString('es-AR')} km · {car.fuel}</p>
        <p className="price">{currency(car.price)}</p>
        <p className="accent">o 48 cuotas de {currency(installments(car.price))}</p>
        <div className="car-actions">
          <a className="outline-btn" href={whatsappLink(`Hola! me interesa el ${car.brand} ${car.model} ${car.year}`)} target="_blank">
            Consultar por WhatsApp
          </a>
          <Link className="text-link" href={`/stock/${car.slug}`}>Ver detalle →</Link>
        </div>
      </div>
    </article>
  );
}
