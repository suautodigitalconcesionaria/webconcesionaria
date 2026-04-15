'use client';

import { useMemo, useState } from 'react';
import { currency, whatsappLink } from '@/lib/data';

export default function FinanciacionPage() {
  const [valor, setValor] = useState(30000000);
  const [anticipo, setAnticipo] = useState(20);
  const [cuotas, setCuotas] = useState(48);

  const cuota = useMemo(() => {
    const saldo = valor * (1 - anticipo / 100);
    return Math.round((saldo * 1.65) / cuotas);
  }, [valor, anticipo, cuotas]);

  return (
    <>
      <section className="subhero">
        <div className="container">
          <h1>Financiación a tu medida</h1>
          <p className="muted-light">Cuotas fijas en pesos. Sin vueltas.</p>
        </div>
      </section>

      <section className="section">
        <div className="container finance-layout">
          <article className="finance-card">
            <h2>Calculá tu cuota</h2>

            <label>Valor del auto
              <input type="number" min={1000000} value={valor} onChange={(e) => setValor(Number(e.target.value || 0))} />
            </label>

            <label>Anticipo: {anticipo}% ({currency(Math.round(valor * anticipo / 100))})
              <input type="range" min={0} max={50} value={anticipo} onChange={(e) => setAnticipo(Number(e.target.value))} />
            </label>

            <div className="quota-options">
              {[12, 24, 36, 48, 60].map((c) => (
                <button key={c} className={cuotas === c ? 'active' : ''} onClick={() => setCuotas(c)}>{c}</button>
              ))}
            </div>

            <p className="price">Cuota estimada: {currency(cuota)} / mes</p>
            <small>*Valores orientativos. La cuota final depende del banco y del perfil crediticio.</small>

            <a className="wa-button" href={whatsappLink(`Hola! Quiero financiación para un auto de ${currency(valor)} con ${anticipo}% de anticipo en ${cuotas} cuotas.`)} target="_blank">
              Quiero que me contacten
            </a>
          </article>

          <article className="benefits-card">
            <h3>Requisitos</h3>
            <ul>
              <li>✓ DNI vigente</li>
              <li>✓ Comprobante de ingresos</li>
              <li>✓ Servicio a nombre del titular</li>
              <li>✓ Sin garante (según banco)</li>
            </ul>
          </article>
        </div>
      </section>
    </>
  );
}
