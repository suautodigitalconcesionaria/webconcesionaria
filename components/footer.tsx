import Link from 'next/link';
import { whatsappLink } from '@/lib/data';

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <p className="logo">AUTOBA</p>
          <p>La concesionaria de confianza en Buenos Aires.</p>
          <p className="socials">Instagram · Facebook · WhatsApp</p>
        </div>

        <div>
          <h4>Links</h4>
          <ul>
            <li><Link href="/">Inicio</Link></li>
            <li><Link href="/stock">Stock</Link></li>
            <li><Link href="/financiacion">Financiación</Link></li>
            <li><Link href="/contacto">Contacto</Link></li>
          </ul>
        </div>

        <div>
          <h4>Contacto</h4>
          <p>📍 Av. Corrientes 1234, CABA</p>
          <p>📞 <a href="tel:+541143210000">+54 11 4321-0000</a></p>
          <p>💬 <a href={whatsappLink('Hola! Quiero hablar con ventas.')} target="_blank">WhatsApp</a></p>
          <p>🕐 Lun-Sáb 9 a 18hs</p>
        </div>
      </div>
      <div className="container footer-bottom">
        <p>© 2026 AUTOBA. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}
