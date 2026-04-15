'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { CarCard } from './car-card';
import { cars, faqs, testimonials, whatsappLink } from '@/lib/data';

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.5, ease: 'easeOut' }
};

const brands = ['Todas', 'Toyota', 'Volkswagen', 'Ford', 'Chevrolet', 'Renault', 'Peugeot'];

export function HomePage() {
  const [brand, setBrand] = useState('Todas');
  const [openFaq, setOpenFaq] = useState(0);

  const featuredCars = useMemo(() => {
    if (brand === 'Todas') return cars.slice(0, 3);
    return cars.filter((car) => car.brand === brand).slice(0, 3);
  }, [brand]);

  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <motion.p className="badge" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
              Concesionaria Oficial · Buenos Aires
            </motion.p>
            <motion.div className="red-line" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.6, delay: 0.4 }} />
            <h1>Tu próximo auto,<br />sin vueltas.</h1>
            <p className="hero-sub">Más de 200 autos en stock. Financiación en cuotas. Atención inmediata por WhatsApp.</p>
            <div className="cta-row">
              <a className="wa-button" href={whatsappLink('Hola! Vi su web y quiero consultar por autos disponibles.')} target="_blank">Consultar por WhatsApp →</a>
              <Link className="outline-light" href="/stock">Ver stock →</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="stats">
        <div className="container stats-grid">
          {[['+500', 'Autos vendidos'], ['+200', 'Autos en stock'], ['15', 'Años de experiencia'], ['4.9★', 'Puntuación Google']].map((item) => (
            <div key={item[1]}><strong>{item[0]}</strong><span>{item[1]}</span></div>
          ))}
        </div>
      </section>

      <motion.section className="section" {...fadeInUp}>
        <div className="container">
          <h2>Encontrá tu auto ideal</h2>
          <p className="muted center">Filtrá por lo que necesitás y te mostramos los más destacados.</p>
          <div className="search-row">
            <select value={brand} onChange={(e) => setBrand(e.target.value)}>
              {brands.map((item) => <option key={item}>{item}</option>)}
            </select>
            <Link className="wa-button" href="/stock">Buscar →</Link>
          </div>
        </div>
      </motion.section>

      <motion.section className="section" {...fadeInUp}>
        <div className="container">
          <div className="title-row">
            <h2>Autos destacados</h2>
            <Link className="text-link" href="/stock">Ver todo el stock →</Link>
          </div>
          <p className="muted center">Revisados, con documentación al día</p>
          <div className="cars-grid">
            {featuredCars.map((car) => <CarCard key={car.slug} car={car} />)}
          </div>
        </div>
      </motion.section>

      <motion.section className="section gray" {...fadeInUp}>
        <div className="container">
          <h2>Por qué miles de familias nos eligen</h2>
          <div className="benefits-grid">
            {[
              ['Stock revisado y garantizado', 'Todos nuestros autos pasan por inspección técnica previa.'],
              ['Financiación en cuotas', 'Trabajamos con bancos y financieras de todo el país.'],
              ['Respuesta inmediata', 'Te respondemos en menos de 10 minutos por WhatsApp.'],
              ['Transferencia incluida', 'Nos encargamos de toda la gestión de papeles.'],
              ['Aceptamos tu auto', 'Tomamos tu usado como parte de pago sin vueltas.'],
              ['4.9 en Google', 'Más de 300 reseñas de clientes reales.']
            ].map((benefit) => (
              <article key={benefit[0]} className="benefit-card"><h3>{benefit[0]}</h3><p className="muted">{benefit[1]}</p></article>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section className="section black" {...fadeInUp}>
        <div className="container finance-preview">
          <div>
            <h2>Llevate tu auto hoy</h2>
            <p className="muted-light">Financiamos hasta el 100%. Cuotas fijas en pesos.</p>
            <ul>
              <li>✓ Cuotas fijas en pesos</li>
              <li>✓ Sin necesidad de garante</li>
              <li>✓ Aprobación en el día</li>
              <li>✓ Todos los bancos y financieras</li>
            </ul>
            <Link className="outline-light" href="/financiacion">Ver opciones de financiación →</Link>
          </div>
        </div>
      </motion.section>

      <motion.section className="section" {...fadeInUp}>
        <div className="container">
          <h2>Lo que dicen nuestros clientes</h2>
          <p className="muted center">Reseñas reales de Google Maps · ★★★★★ 4.9</p>
          <div className="testimonials-grid">
            {testimonials.map((item) => (
              <article className="testimonial" key={item.name}>
                <p>“{item.text}”</p>
                <strong>{item.name}</strong>
                <span>{item.date}</span>
              </article>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section className="section" {...fadeInUp}>
        <div className="container faq-wrap">
          <h2>Preguntas frecuentes</h2>
          {faqs.map((item, index) => {
            const isOpen = index === openFaq;
            return (
              <article className="faq-item" key={item.q}>
                <button className={`faq-btn ${isOpen ? 'active' : ''}`} onClick={() => setOpenFaq(isOpen ? -1 : index)}>
                  {item.q}
                  <span>{isOpen ? '−' : '+'}</span>
                </button>
                {isOpen && <p>{item.a}</p>}
              </article>
            );
          })}
        </div>
      </motion.section>

      <section className="final-cta">
        <div className="container center">
          <h2>¿Listo para encontrar tu auto?</h2>
          <p>Hablá con nosotros ahora. Sin vueltas, sin formularios largos.</p>
          <a className="wa-button large" href={whatsappLink('Hola! Quiero que me asesoren para elegir un auto.')} target="_blank">Escribinos por WhatsApp →</a>
        </div>
      </section>
    </>
  );
}
