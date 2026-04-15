'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { whatsappLink } from '@/lib/data';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="container navbar-inner">
        <Link href="/" className="logo">AUTOBA</Link>

        <nav className="desktop-nav">
          <Link href="/stock">Stock</Link>
          <Link href="/financiacion">Financiación</Link>
          <Link href="/">Nosotros</Link>
          <Link href="/contacto">Contacto</Link>
        </nav>

        <a className="wa-button desktop-only" href={whatsappLink('Hola! Vi su web y quiero consultar por los autos disponibles.')} target="_blank">
          Consultar por WhatsApp
        </a>

        <button className="menu-btn" onClick={() => setOpen((v) => !v)} aria-label="Abrir menú" aria-expanded={open}>
          ☰
        </button>
      </div>

      {open && (
        <div className="mobile-menu">
          <Link href="/stock" onClick={() => setOpen(false)}>Stock</Link>
          <Link href="/financiacion" onClick={() => setOpen(false)}>Financiación</Link>
          <Link href="/" onClick={() => setOpen(false)}>Nosotros</Link>
          <Link href="/contacto" onClick={() => setOpen(false)}>Contacto</Link>
          <a className="wa-button" href={whatsappLink('Hola! Quiero asesoramiento para comprar un auto.')} target="_blank">WhatsApp ahora</a>
        </div>
      )}
    </header>
  );
}
