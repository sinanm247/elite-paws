import React, { useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { services } from '../../../Datasets/services';
import img1 from '../../../assets/New/image-1.jpeg';
import img2 from '../../../assets/New/image-2.jpeg';
import img3 from '../../../assets/New/image-3.jpg';
import './ElitePawsServiceSection.scss';

const SERVICE_IMAGES = {
  1: img1,
  2: img2,
  3: img3,
};

function getServiceTags(service) {
  const items = service?.includesDetailed || [];
  return items.slice(0, 4).map((x) => x.title);
}

const PRICING_BG = '#6f7a43';
const SERVICE_BG = '#07211e';

function getSlotPosition(index, activeIndex, total) {
  const diff = ((index - activeIndex) % total + total) % total;
  if (diff === 0) return 'center';
  if (diff === 1) return 'right';
  return 'left';
}

export default function ElitePawsServiceSection() {
  const sectionRef = useRef(null);
  const [activeService, setActiveService] = useState(services[0]?.id ?? null);
  const [isCompactService, setIsCompactService] = useState(
    () => typeof window !== 'undefined' && window.innerWidth <= 1024
  );
  const [slideDirection, setSlideDirection] = useState(1);
  const prevActiveIndexRef = useRef(0);

  const { scrollYProgress: bgScrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'start start'],
  });

  const backgroundColor = useTransform(
    bgScrollYProgress,
    [0, 0.25, 0.4],
    [PRICING_BG, SERVICE_BG, SERVICE_BG]
  );

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  const compactHeadingY = useTransform(scrollYProgress, [0, 0.22], [0, -120]);
  const compactHeadingOpacity = useTransform(scrollYProgress, [0, 0.16], [1, 0]);

  const totalServices = services.length;

  // Padded mapping: slower transitions, more scroll per service (esp. mobile with tall section).
  const SCROLL_PAD = 0.1;

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const usable = 1 - 2 * SCROLL_PAD;
    const t = Math.max(0, Math.min(1, (v - SCROLL_PAD) / usable));
    const idx = Math.min(totalServices - 1, Math.floor(t * totalServices));
    const newId = services[idx]?.id;
    if (newId != null) setActiveService(newId);
  });

  const [showBg, setShowBg] = useState(false);
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    let raf = null;
    const check = () => {
      const rect = el.getBoundingClientRect();
      const inView = rect.top < window.innerHeight && rect.bottom > 0;
      setShowBg(inView);
    };
    const onScroll = () => {
      if (raf != null) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => { check(); raf = null; });
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

  const activeIndex = services.findIndex((s) => s.id === activeService);
  const activeServiceData = activeIndex >= 0 ? services[activeIndex] : null;

  useEffect(() => {
    const onResize = () => setIsCompactService(window.innerWidth <= 1024);
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    if (activeIndex < 0) return;
    const prev = prevActiveIndexRef.current;
    if (activeIndex !== prev) {
      setSlideDirection(activeIndex > prev ? 1 : -1);
      prevActiveIndexRef.current = activeIndex;
    }
  }, [activeIndex]);

  return (
    <section ref={sectionRef} className="elite-paws-services">
      <motion.div
        className="elite-paws-services-bg"
        style={{ backgroundColor, opacity: showBg ? 1 : 0 }}
        aria-hidden="true"
      />

      <div className="elite-paws-services-sticky">
        <div className="elite-paws-services-inner">
        <motion.div
          className="elite-paws-services-left"
          style={isCompactService ? { y: compactHeadingY, opacity: compactHeadingOpacity } : undefined}
        >
          <h2 className="elite-paws-services-heading">
          THE SPECIALS
            {/* Dedicated
            <br />
            to Better:
            <br />
            Pet Care. */}
          </h2>
          <p className="elite-paws-services-desc">
            {/* Specialized grooming treatments designed for comfort, coat health, and stress-free care. */}
            Each one crafted for your baby with extra love.
          </p>
          {/* <a href="#services" className="elite-paws-services-link">
            Explore All Services
          </a> */}
        </motion.div>

        <div className="elite-paws-services-center">
          <div className="elite-paws-services-slider">
            {services.map((service, index) => {
              const slot = getSlotPosition(index, activeIndex, services.length);

              const slotStyles = {
                center: { zIndex: 3, transform: 'rotate(2deg) scale(1) translateX(0)', opacity: 1 },
                left:   { zIndex: 1, transform: 'rotate(-5deg) scale(0.8) translateX(-20%)', opacity: 0.35 },
                right:  { zIndex: 1, transform: 'rotate(5deg) scale(0.8) translateX(20%)', opacity: 0.35 },
              };

              return (
                <div
                  key={service.id}
                  className={`elite-paws-services-slide ${slot === 'center' ? 'is-active' : ''}`}
                  style={slotStyles[slot]}
                >
                  <img src={service.image} alt={service.title} />
                </div>
              );
            })}
          </div>
        </div>

        <div className="elite-paws-services-right">
          {!isCompactService && services.map((service) => {
            const isActive = activeService === service.id;

            return (
              <div
                key={service.id}
                className={`elite-paws-services-item ${isActive ? 'is-active' : ''}`}
                onClick={() => setActiveService(service.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && setActiveService(service.id)}
              >
                <h3 className="elite-paws-services-item-title">{service.title}</h3>

                {service.subtitle ? (
                  <p className="elite-paws-services-item-subtitle">{service.subtitle}</p>
                ) : null}

                <div className={`elite-paws-services-item-details ${isActive ? 'is-active' : ''}`}>
                  <div className="elite-paws-services-item-details-inner">
                  <div className="elite-paws-services-item-meta">
                    {service.price ? <span className="elite-paws-services-item-price">{service.price}</span> : null}
                    {service.duration ? <span className="elite-paws-services-item-duration">{service.duration}</span> : null}
                  </div>

                  {service.description ? (
                    <p className="elite-paws-services-item-desc">
                      {service.description}
                    </p>
                  ) : null}
                  </div>
                </div>
              </div>
            );
          })}

          {isCompactService && activeServiceData ? (
            <div className="elite-paws-services-right-compact">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={activeServiceData.id}
                  className="elite-paws-services-item elite-paws-services-item--compact is-active"
                  initial={{
                    x: slideDirection > 0 ? 84 : -84,
                    opacity: 0,
                    scale: 0.985,
                    filter: 'blur(2px)',
                  }}
                  animate={{
                    x: 0,
                    opacity: 1,
                    scale: 1,
                    filter: 'blur(0px)',
                  }}
                  exit={{
                    x: slideDirection > 0 ? -84 : 84,
                    opacity: 0,
                    scale: 0.985,
                    filter: 'blur(2px)',
                  }}
                  transition={{
                    x: { type: 'spring', stiffness: 360, damping: 34, mass: 0.8 },
                    opacity: { duration: 0.26, ease: 'easeOut' },
                    scale: { duration: 0.26, ease: 'easeOut' },
                    filter: { duration: 0.22, ease: 'easeOut' },
                  }}
                >
                  <h3 className="elite-paws-services-item-title">{activeServiceData.title}</h3>
                  {activeServiceData.subtitle ? (
                    <p className="elite-paws-services-item-subtitle">{activeServiceData.subtitle}</p>
                  ) : null}
                  <div className="elite-paws-services-item-details is-active">
                    <div className="elite-paws-services-item-details-inner">
                      <div className="elite-paws-services-item-meta">
                        {activeServiceData.price ? <span className="elite-paws-services-item-price">{activeServiceData.price}</span> : null}
                        {activeServiceData.duration ? <span className="elite-paws-services-item-duration">{activeServiceData.duration}</span> : null}
                      </div>
                      {activeServiceData.description ? (
                        <p className="elite-paws-services-item-desc">
                          {activeServiceData.description}
                        </p>
                      ) : null}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          ) : null}
        </div>
        </div>
      </div>
    </section>
  );
}
