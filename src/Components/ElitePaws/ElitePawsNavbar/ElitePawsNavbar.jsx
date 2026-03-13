import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import { FaWhatsapp } from 'react-icons/fa';
import logoDark from '../../../assets/Logo/elite-paws-logo-dark.png';
import './ElitePawsNavbar.scss';

const WHATSAPP_LINK = 'https://wa.me/'; // Add number after slash e.g. 1234567890

export default function ElitePawsNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`elite-paws-navbar ${scrolled ? 'elite-paws-navbar-scrolled' : ''}`}>
      <div className="elite-paws-navbar-inner">
        <button
          type="button"
          className="elite-paws-navbar-btn elite-paws-navbar-btn-menu"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Menu"
        >
          <FaBars />
        </button>

        <Link to="/elite-paws-home" className="elite-paws-navbar-logo-wrap">
          <img src={logoDark} alt="Elite Paws" className="elite-paws-navbar-logo" />
        </Link>

        <a
          href={`${WHATSAPP_LINK}`}
          target="_blank"
          rel="noopener noreferrer"
          className="elite-paws-navbar-btn elite-paws-navbar-btn-whatsapp"
          aria-label="WhatsApp"
        >
          <FaWhatsapp />
        </a>
      </div>
    </header>
  );
}
