'use client';

import { FormEvent, useState } from 'react';
import { whatsappLink } from '@/lib/data';

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const nombre = formData.get('nombre');
    const telefono = formData.get('telefono');
    const interes = formData.get('interes');
    const mensaje = formData.get('mensaje');

    const text = `Hola! Soy ${nombre}. Mi teléfono es ${telefono}. Me interesa: ${interes}. Mensaje: ${mensaje}`;
    window.open(whatsappLink(text), '_blank');
    setSent(true);
    event.currentTarget.reset();
  };

  return (
    <section className="section">
      <div className="container contact-grid">
        <div>
          <h1>Visitanos</h1>
          <p>📍 Av. Corrientes 1234, CABA</p>
          <p>📞 <a href="tel:+541143210000">+54 11 4321-0000</a></p>
          <p>💬 <a href={whatsappLink('Hola! Quiero coordinar una visita a la concesionaria.')} target="_blank">WhatsApp</a></p>
          <p>📧 ventas@autoba.com.ar</p>
          <p>🕐 Lunes a sábado de 9:00 a 18:00 hs</p>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <h3>Dejanos tu mensaje</h3>
          <input name="nombre" placeholder="Nombre y apellido" required />
          <input name="telefono" placeholder="Teléfono / WhatsApp" required />
          <input name="email" type="email" placeholder="Email (opcional)" />
          <select name="interes">
            <option>Comprar un auto</option>
            <option>Financiación</option>
            <option>Vender mi auto</option>
            <option>Otro</option>
          </select>
          <textarea name="mensaje" rows={4} placeholder="Mensaje" />
          <button className="wa-button" type="submit">Enviar mensaje</button>
          {sent && <p className="success">¡Gracias! Te contactamos pronto.</p>}
        </form>
      </div>
    </section>
  );
}
