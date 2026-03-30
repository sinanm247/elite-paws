import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import { FaWhatsapp } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';
import logoDark from '../../../assets/Logo/elite-paws-logo-dark.png';
import logoIcon from '../../../assets/Logo/logo-icon.png';
import qrCode from '../../../assets/Common/qr-code.svg';
import instagramIcon from '../../../assets/Icons/instagram-icon.png';
import tiktokIcon from '../../../assets/Icons/tiktok-icon.png';
import pinterestIcon from '../../../assets/Icons/pinterest-icon.png';
import linkedinIcon from '../../../assets/Icons/linkedin-icon.png';
import './ElitePawsNavbar.scss';

const WHATSAPP_LINK = 'https://wa.me/'; // Add number after slash e.g. 1234567890

export default function ElitePawsNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [whatsappOpen, setWhatsappOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <header className={`elite-paws-navbar ${scrolled ? 'elite-paws-navbar-scrolled' : ''}`}>
        <div className="elite-paws-navbar-inner">
          <button
            type="button"
            className="elite-paws-navbar-btn elite-paws-navbar-btn-menu"
            onClick={() => {
              setWhatsappOpen(false);
              setMenuOpen(true);
            }}
            aria-label="Menu"
          >
            <FaBars />
          </button>

          <Link to="/elite-paws-home" className="elite-paws-navbar-logo-wrap">
            <img src={logoDark} alt="Elite Paws" className="elite-paws-navbar-logo" />
          </Link>

          <button
            type="button"
            className={`elite-paws-navbar-btn elite-paws-navbar-btn-whatsapp ${whatsappOpen ? 'is-open' : ''}`}
            onClick={() => {
              setMenuOpen(false);
              setWhatsappOpen((v) => !v);
            }}
            aria-label={whatsappOpen ? 'Close WhatsApp panel' : 'Open WhatsApp panel'}
          >
            {whatsappOpen ? <IoClose /> : <FaWhatsapp />}
          </button>
        </div>
      </header>

      <div className={`elite-paws-whatsapp-modal ${whatsappOpen ? 'is-open' : ''}`} aria-hidden={!whatsappOpen}>
        <button
          type="button"
          className="elite-paws-whatsapp-overlay"
          onClick={() => setWhatsappOpen(false)}
          aria-label="Close WhatsApp panel"
        />
        <section className="elite-paws-whatsapp-card" role="dialog" aria-modal="true">
          <img src={qrCode} alt="WhatsApp QR" className="elite-paws-whatsapp-qr" />
          <h3>Shall we connect on WhatsApp?</h3>
          <p>
            Because we prefer genuine, quick, and straightforward exchanges. Scan the QR code,
            send your message, and we will reply quickly.
          </p>
          <a href={`${WHATSAPP_LINK}`} target="_blank" rel="noopener noreferrer">Chat with us</a>
        </section>
      </div>

      <div className={`elite-paws-menu-modal ${menuOpen ? 'is-open' : ''}`} aria-hidden={!menuOpen}>
        <div className="elite-paws-menu-modal-layer elite-paws-menu-modal-left">
          <button
            type="button"
            className="elite-paws-navbar-btn elite-paws-menu-close-btn"
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
          >
            <IoClose />
          </button>

          <nav className="elite-paws-menu-links">
            <a href="/">Home</a>
            <a href="/about-us">Agency</a>
            <a href="/gallery">Projects</a>
            <a href="/services">Expertise</a>
            <a href="/faqs">FAQ</a>
            <a href="/contact-us">Contact</a>
          </nav>

          <img className="elite-paws-menu-join-logo" src={logoIcon} alt="Elite Paws" />

          <div className="elite-paws-menu-social">
            <a href="#" aria-label="Instagram"><img src={instagramIcon} alt="" /></a>
            <a href="#" aria-label="TikTok"><img src={tiktokIcon} alt="" /></a>
            <a href="#" aria-label="Pinterest"><img src={pinterestIcon} alt="" /></a>
            <a href="#" aria-label="LinkedIn"><img src={linkedinIcon} alt="" /></a>
          </div>
        </div>

        <div className="elite-paws-menu-modal-layer elite-paws-menu-modal-right">
          <div className="elite-paws-menu-connect">
            <img src={qrCode} alt="WhatsApp QR" className="elite-paws-menu-qr" />
            <h3>Shall we connect on WhatsApp?</h3>
            <p>
              Because we prefer genuine, quick and straightforward exchanges. Send your message and
              we will reply quickly.
            </p>
            <a href={`${WHATSAPP_LINK}`} target="_blank" rel="noopener noreferrer">Chat with us</a>
          </div>
        </div>
      </div>
    </>
  );
}
