import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FaInstagram, FaWhatsapp, FaFacebookF, FaLinkedinIn } from 'react-icons/fa';
import teamImage from '../../../assets/New/image-1.jpeg';
import './ElitePawsFooter.scss';
import ElitePawsContactModal from '../ContactModal/ElitePawsContactModal';

// Start from the end color of ElitePawsWhyChooseSection to avoid a visible jump.
const WHYCHOICE_END_BG = '#e0497a';
const FOOTER_BG = '#dd8fb3';

export default function ElitePawsFooter() {
  const footerRef = useRef(null);
  const [showBg, setShowBg] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalClosing, setIsModalClosing] = useState(false);

  const { scrollYProgress: bgScrollYProgress } = useScroll({
    target: footerRef,
    offset: ['start end', 'start start'],
  });

  const backgroundColor = useTransform(
    bgScrollYProgress,
    [0, 0.6, 1],
    [WHYCHOICE_END_BG, FOOTER_BG, FOOTER_BG]
  );

  useEffect(() => {
    const el = footerRef.current;
    if (!el) return;

    let raf = null;
    const check = () => {
      const rect = el.getBoundingClientRect();
      const inView = rect.top < window.innerHeight && rect.bottom > 0;
      setShowBg(inView);
    };

    const onScroll = () => {
      if (raf != null) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        check();
        raf = null;
      });
    };

    check();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      if (raf != null) cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  const openModal = () => {
    setIsModalVisible(true);
    setIsModalClosing(false);
  };

  const closeModal = () => {
    setIsModalClosing(true);
    window.setTimeout(() => {
      setIsModalVisible(false);
      setIsModalClosing(false);
    }, 560);
  };

  return (
    <footer ref={footerRef} className="elite-paws-footer">
      {showBg && (
        <motion.div
          className="elite-paws-footer-bg"
          style={{ backgroundColor }}
          aria-hidden="true"
        />
      )}
      <div className="elite-paws-footer-cards">
        <article className="elite-paws-footer-photo-card">
          <img src={teamImage} alt="Elite Paws team" />
        </article>

        <article className="elite-paws-footer-cta-card">
          <p className="elite-paws-footer-cta-kicker">Contact</p>
          <h3>Tell us about it.</h3>
          <p className="elite-paws-footer-cta-copy">
            A few questions, less than a minute. We receive your answers and get back to you quickly.
          </p>
          <button type="button" className="elite-paws-footer-cta-btn" onClick={openModal}>
            Start now
          </button>
        </article>
      </div>

      <h2 className="elite-paws-footer-wordmark" aria-hidden="true">Elite Paws</h2>

      <div className="elite-paws-footer-meta">
        <div className="elite-paws-footer-social">
          <a href="#" aria-label="Instagram"><FaInstagram /></a>
          <a href="#" aria-label="WhatsApp"><FaWhatsapp /></a>
          <a href="#" aria-label="Facebook"><FaFacebookF /></a>
          <a href="#" aria-label="LinkedIn"><FaLinkedinIn /></a>
        </div>

        <div className="elite-paws-footer-links">
          <a href="/privacy-policy">Confidentiality</a>
          <a href="/legal-notice">Legal Notice</a>
          <a href="/sitemap">Site by Elite Paws</a>
        </div>
      </div>

      {isModalVisible && (
        <ElitePawsContactModal isClosing={isModalClosing} onClose={closeModal} />
      )}
    </footer>
  );
}
