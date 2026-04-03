import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import teamImage from '../../../assets/New-Gallery/Image-5.png';
import './ElitePawsFooter.scss';
import ElitePawsContactModal from '../ContactModal/ElitePawsContactModal';

// Social Icons
import instagramIcon from '../../../assets/Icons/Social-Icons/instagram-dark.png';
import tiktokIcon from '../../../assets/Icons/Social-Icons/tiktok-dark.png';
// import pinterestIcon from '../../../assets/Icons/Social-Icons/pinterest-dark.png';
import linkedinIcon from '../../../assets/Icons/Social-Icons/linkedin-dark.png';
import youtubeIcon from '../../../assets/Icons/Social-Icons/youtube-dark.png';
import facebookIcon from '../../../assets/Icons/Social-Icons/facebook-dark.png';

const PREV_HOME_BG = '#fcf2e0';
const PREV_PORTFOLIO_BG = '#07211e';
const FOOTER_BG = '#6f7a43';

export default function ElitePawsFooter() {
  const location = useLocation();
  const footerRef = useRef(null);
  const [showBg, setShowBg] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalClosing, setIsModalClosing] = useState(false);
  const previousSectionBg = location.pathname === '/portfolio' ? PREV_PORTFOLIO_BG : PREV_HOME_BG;

  const { scrollYProgress: bgScrollYProgress } = useScroll({
    target: footerRef,
    offset: ['start end', 'start start'],
  });

  const backgroundColor = useTransform(
    bgScrollYProgress,
    [0, 0.6, 1],
    [previousSectionBg, FOOTER_BG, FOOTER_BG]
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
    <footer id="contact" ref={footerRef} className="elite-paws-footer">
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
          <p className="elite-paws-footer-cta-kicker">Contact Us</p>
          {/* <h3>Tell us about it.</h3> */}
          <h3>Great Grooms Start Here</h3>
          <p className="elite-paws-footer-cta-copy">
            {/* A few questions, less than a minute. We receive your answers and get back to you quickly. */}
            Tell us who they are, what they love, what they absolutely don't and we'll take it from there.
          </p>
          <button type="button" className="elite-paws-footer-cta-btn" onClick={openModal}>
            Start now
          </button>
        </article>
      </div>

      <h2 className="elite-paws-footer-wordmark" aria-hidden="true">Elite Paws</h2>

      <div className="elite-paws-footer-meta">
        <div className="elite-paws-menu-social-footer">
          <a href="https://www.instagram.com/elitepaws.ae?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" aria-label="Instagram"><img src={instagramIcon} alt="" /></a>
          <a href="#" aria-label="TikTok"><img src={tiktokIcon} alt="" /></a>
          {/* <a href="#" aria-label="Pinterest"><img src={pinterestIcon} alt="" /></a> */}
          <a href="#" aria-label="LinkedIn"><img src={linkedinIcon} alt="" /></a>
          <a href="#" aria-label="YouTube"><img src={youtubeIcon} alt="" /></a>
          <a href="#" aria-label="Facebook"><img src={facebookIcon} alt="" /></a>
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
