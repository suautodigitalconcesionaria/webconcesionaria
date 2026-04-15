'use client';

import { useMemo, useState } from 'react';
import { Car } from '@/lib/data';
import { CarCard } from '@/components/car-card';

export function StockPageClient({ cars }: { cars: Car[] }) {
  const [selectedBrand, setSelectedBrand] = useState('Todas');
  const [selectedType, setSelectedType] = useState('Todos');
  const [maxPrice, setMaxPrice] = useState(50000000);

  const filteredCars = useMemo(() => {
    return cars.filter((car) => {
      const byBrand = selectedBrand === 'Todas' || car.brand === selectedBrand;
      const byType = selectedType === 'Todos' || car.type === selectedType;
      const byPrice = car.price <= maxPrice;
      return byBrand && byType && byPrice;
    });
  }, [selectedBrand, selectedType, maxPrice, cars]);

  return (
    <section className="section">
      <div className="container stock-layout">
        <aside className="filters-panel">
          <h3>Filtros</h3>
          <label>Marca
            <select value={selectedBrand} onChange={(e) => setSelectedBrand(e.target.value)}>
              {['Todas', 'Toyota', 'Volkswagen', 'Ford', 'Chevrolet', 'Renault', 'Peugeot'].map((item) => <option key={item}>{item}</option>)}
            </select>
          </label>

          <label>Tipo
            <select value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
              {['Todos', 'Sedán', 'SUV', 'Pick-up', 'Hatchback', 'Utilitario'].map((item) => <option key={item}>{item}</option>)}
            </select>
          </label>

          <label>Precio máximo: ${maxPrice.toLocaleString('es-AR')}
            <input type="range" min={10000000} max={50000000} step={1000000} value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} />
          </label>

          <button className="outline-btn" onClick={() => {
            setSelectedBrand('Todas');
            setSelectedType('Todos');
            setMaxPrice(50000000);
          }}>
            Limpiar filtros
          </button>
        </aside>

        <div>
          <p className="results-label">{filteredCars.length} autos encontrados</p>
          <div className="cars-grid">
            {filteredCars.map((car) => <CarCard key={car.slug} car={car} />)}
          </div>
        </div>
      </div>
    </section>
  );
}
