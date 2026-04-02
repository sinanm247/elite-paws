import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import imageMain from '../../../assets/Gallery/Image-24.jpeg';
import imageTall from '../../../assets/Gallery/Image-13.jpeg';
import imageWide from '../../../assets/Gallery/Image-19.jpeg';
import imageBottom from '../../../assets/Gallery/Image-30.jpeg';
import './ElitePawsPortfolioSection.scss';

export default function ElitePawsPortfolioSection() {
  const sectionRef = useRef(null);
  const [showBg, setShowBg] = useState(false);

  const { scrollYProgress: bgScrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const backgroundColor = useTransform(
    bgScrollYProgress,
    [0, 0.78, 1],
    ['#07211e', '#07211e', '#07211e']
  );

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    let raf = null;
    const check = () => {
      const rect = el.getBoundingClientRect();
      setShowBg(rect.top < window.innerHeight && rect.bottom > 0);
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

  return (
    <section ref={sectionRef} className="elite-paws-portfolio">
      {showBg && (
        <motion.div
          className="elite-paws-portfolio-bg"
          style={{ backgroundColor }}
          aria-hidden="true"
        />
      )}
      <div className="elite-paws-portfolio-inner">
        <aside className="elite-paws-portfolio-left">
          <div className="elite-paws-portfolio-tags">
            <span>Before &amp; After</span>
            <span>Happy Clients</span>
            <span>Dubai Home Visits</span>
          </div>
          <h1 className="elite-paws-portfolio-title">Elite Paws Gallery</h1>
          <p className="elite-paws-portfolio-subtitle">Real grooming moments, real happy tails.</p>
          <a href="/" className="elite-paws-portfolio-back">Back to Projects</a>
        </aside>

        <div className="elite-paws-portfolio-right">
          <div className="elite-paws-portfolio-column elite-paws-portfolio-column-left">
            <article className="elite-paws-portfolio-card elite-paws-portfolio-card-image elite-paws-portfolio-card-main">
              <img src={imageMain} alt="Portfolio main" />
            </article>

            <article className="elite-paws-portfolio-card elite-paws-portfolio-card-metric elite-paws-portfolio-card-metric-a">
              <h3>Pets groomed this month</h3>
              <p>120+</p>
            </article>

            <article className="elite-paws-portfolio-card elite-paws-portfolio-card-image elite-paws-portfolio-card-tall">
              <img src={imageTall} alt="Portfolio detail" />
            </article>
          </div>

          <div className="elite-paws-portfolio-column elite-paws-portfolio-column-right">
            <article className="elite-paws-portfolio-card elite-paws-portfolio-card-text">
              <p>
                Explore our grooming portfolio featuring fresh makeovers, healthy coats, and
                stress-free sessions at your doorstep across Dubai.
              </p>
              <p>
                From mini refresh visits to full spa care, each gallery highlight reflects our
                gentle handling, premium products, and detail-focused finishing.
              </p>
            </article>

            <article className="elite-paws-portfolio-card elite-paws-portfolio-card-image elite-paws-portfolio-card-wide">
              <img src={imageWide} alt="Portfolio wide" />
            </article>

            <article className="elite-paws-portfolio-card elite-paws-portfolio-card-metric elite-paws-portfolio-card-metric-b">
              <h3>Happy parent feedback</h3>
              <p>98%</p>
            </article>

            <article className="elite-paws-portfolio-card elite-paws-portfolio-card-image elite-paws-portfolio-card-bottom">
              <img src={imageBottom} alt="Portfolio bottom" />
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
