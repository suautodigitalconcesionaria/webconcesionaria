import { StockPageClient } from '@/components/stock-page-client';
import { getCars } from '@/lib/airtable';

export default async function StockPage() {
  const cars = await getCars();

  return (
    <>
      <section className="subhero">
        <div className="container">
          <p className="muted-light">Inicio &gt; Stock</p>
          <h1>Nuestro stock</h1>
        </div>
      </section>

      <StockPageClient cars={cars} />
    </>
  );
}
