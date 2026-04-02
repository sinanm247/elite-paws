import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

// Logo Images
import logoTertiary from '../../../assets/Logo/LOGO-FOREST.png';
import logoIcon from '../../../assets/Logo/LOGO-ICON-BUTTER.png';
import logoPrimary from '../../../assets/Logo/LOGO-BUTTER.png';

// Icons
import menuIconDark from '../../../assets/Icons/menu-dark.png';
import menuIconLight from '../../../assets/Icons/menu-light.png';

import closeIconDark from '../../../assets/Icons/close-dark.png';

// WhatsApp Icons
import whatsappIconDark from '../../../assets/Icons/Social-Icons/whatsapp-dark.png';
import whatsappIconLight from '../../../assets/Icons/Social-Icons/whatsapp-light.png';

import qrCode from '../../../assets/Common/qr-code.png';

// Social Icons
import instagramIcon from '../../../assets/Icons/Social-Icons/instagram-light.png';
import tiktokIcon from '../../../assets/Icons/Social-Icons/tiktok-light.png';
// import pinterestIcon from '../../../assets/Icons/Social-Icons/pinterest-light.png';
import linkedinIcon from '../../../assets/Icons/Social-Icons/linkedin-light.png';
import youtubeIcon from '../../../assets/Icons/Social-Icons/youtube-light.png';
import facebookIcon from '../../../assets/Icons/Social-Icons/facebook-light.png';


import './ElitePawsNavbar.scss';

const WHATSAPP_LINK = 'https://wa.me/'; // Add number after slash e.g. 1234567890

export default function ElitePawsNavbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [whatsappOpen, setWhatsappOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDarkBg, setIsDarkBg] = useState(false);
  const [activeMenuLink, setActiveMenuLink] = useState('home');

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    const y = window.scrollY + el.getBoundingClientRect().top - 96;
    window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' });
  };

  const handleMenuSectionClick = (key, id) => (e) => {
    e.preventDefault();
    setActiveMenuLink(key);
    setMenuOpen(false);
    setWhatsappOpen(false);

    if (location.pathname !== '/') {
      navigate('/');
      window.setTimeout(() => scrollToSection(id), 120);
      return;
    }
    scrollToSection(id);
  };

  const parseRgb = (value) => {
    if (!value || value === 'transparent') return null;
    const match = value.match(/rgba?\(([^)]+)\)/i);
    if (!match) return null;
    const parts = match[1].split(',').map((p) => Number.parseFloat(p.trim()));
    if (parts.length < 3) return null;
    return {
      r: parts[0] ?? 0,
      g: parts[1] ?? 0,
      b: parts[2] ?? 0,
      a: Number.isFinite(parts[3]) ? parts[3] : 1,
    };
  };

  const luminance = ({ r, g, b }) => {
    const normalize = (c) => {
      const n = c / 255;
      return n <= 0.03928 ? n / 12.92 : ((n + 0.055) / 1.055) ** 2.4;
    };
    return 0.2126 * normalize(r) + 0.7152 * normalize(g) + 0.0722 * normalize(b);
  };

  const getBackgroundAtPoint = (x, y) => {
    let node = document.elementFromPoint(x, y);
    while (node) {
      const style = window.getComputedStyle(node);
      const rgb = parseRgb(style.backgroundColor);
      if (rgb && rgb.a > 0.1) return rgb;
      node = node.parentElement;
    }
    return null;
  };

  const getKnownSectionBackground = () => {
    const candidates = [
      document.querySelector('.elite-hero-bg-color'),
      document.querySelector('.elite-paws-services-bg'),
      document.querySelector('.elite-paws-why-choose-bg'),
      document.querySelector('.elite-paws-footer-bg'),
    ];

    let best = null;
    let bestOpacity = 0;

    for (const el of candidates) {
      if (!el) continue;
      const rect = el.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > window.innerHeight) continue;

      const style = window.getComputedStyle(el);
      const rgb = parseRgb(style.backgroundColor);
      const opacity = Number.parseFloat(style.opacity ?? '1');

      if (!rgb || !(Number.isFinite(opacity) ? opacity > 0.05 : true)) continue;
      if (opacity > bestOpacity) {
        bestOpacity = opacity;
        best = rgb;
      }
    }

    return best;
  };

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);

      // Prefer reading the actual section background layers.
      // Fallback to pixel sampling if those nodes aren't available yet.
      const bg = getKnownSectionBackground()
        ?? getBackgroundAtPoint(
          Math.floor(window.innerWidth / 2),
          Math.min(120, Math.floor(window.innerHeight * 0.25))
        );
      if (!bg) return;
      const lum = luminance(bg);
      // Hysteresis to avoid quick flip-flopping while section colors blend.
      // Light threshold is higher, dark threshold is lower.
      const darkThreshold = 0.2;
      const lightThreshold = 0.26;
      setIsDarkBg((prev) => {
        if (!prev && lum < darkThreshold) return true;
        if (prev && lum > lightThreshold) return false;
        return prev;
      });
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <>
      <header
        className={`elite-paws-navbar ${scrolled ? 'elite-paws-navbar-scrolled' : ''} ${
          isDarkBg ? 'is-dark-bg' : ''
        }`}
      >
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
            <img
              src={menuIconDark}
              alt=""
              aria-hidden="true"
              className="elite-paws-navbar-icon elite-paws-navbar-icon--dark"
            />
            <img
              src={menuIconLight}
              alt=""
              aria-hidden="true"
              className="elite-paws-navbar-icon elite-paws-navbar-icon--light"
            />
          </button>

          <Link to="/" className="elite-paws-navbar-logo-wrap">
            <img src={logoPrimary} alt="Elite Paws" className="elite-paws-navbar-logo elite-paws-navbar-logo--primary" />
            <img src={logoTertiary} alt="Elite Paws" className="elite-paws-navbar-logo elite-paws-navbar-logo--tertiary" />
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
            {whatsappOpen ? (
              <img src={closeIconDark} alt="" aria-hidden="true" />
            ) : (
              <>
                <img
                  src={whatsappIconDark}
                  alt=""
                  aria-hidden="true"
                  className="elite-paws-navbar-icon elite-paws-navbar-icon--dark"
                />
                <img
                  src={whatsappIconLight}
                  alt=""
                  aria-hidden="true"
                  className="elite-paws-navbar-icon elite-paws-navbar-icon--light"
                />
              </>
            )}
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
            <img src={closeIconDark} alt="" aria-hidden="true" />
          </button>

          <nav className="elite-paws-menu-links">
            <a
              href="#home"
              className={activeMenuLink === 'home' ? 'is-active' : ''}
              onClick={handleMenuSectionClick('home', 'home')}
            >
              Home
            </a>
            <a
              href="#plans"
              className={activeMenuLink === 'plans' ? 'is-active' : ''}
              onClick={handleMenuSectionClick('plans', 'plans')}
            >
              Elite Paws<br/> Plans
            </a>
            <a
              href="#services"
              className={activeMenuLink === 'services' ? 'is-active' : ''}
              onClick={handleMenuSectionClick('services', 'services')}
            >
              Services
            </a>
            {/* <a
              href="#why-choose"
              className={activeMenuLink === 'why-choose' ? 'is-active' : ''}
              onClick={handleMenuSectionClick('why-choose', 'why-choose')}
            >
              Why Choose Us
            </a> */}
            {/* <Link
              to="/portfolio"
              className={activeMenuLink === 'portfolio' ? 'is-active' : ''}
              onClick={() => {
                setActiveMenuLink('portfolio');
                setMenuOpen(false);
                setWhatsappOpen(false);
              }}
            >
              Portfolio
            </Link> */}
            <a
              href="#contact"
              className={activeMenuLink === 'contact' ? 'is-active' : ''}
              onClick={handleMenuSectionClick('contact', 'contact')}
            >
              Contact
            </a>
          </nav>

          <img className="elite-paws-menu-join-logo" src={logoIcon} alt="Elite Paws" />

          <div className="elite-paws-menu-social-navbar">
            <a href="#" aria-label="Instagram"><img src={instagramIcon} alt="" /></a>
            <a href="#" aria-label="TikTok"><img src={tiktokIcon} alt="" /></a>
            {/* <a href="#" aria-label="Pinterest"><img src={pinterestIcon} alt="" /></a> */}
            <a href="#" aria-label="LinkedIn"><img src={linkedinIcon} alt="" /></a>
            <a href="#" aria-label="YouTube"><img src={youtubeIcon} alt="" /></a>
            <a href="#" aria-label="Facebook"><img src={facebookIcon} alt="" /></a>
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
