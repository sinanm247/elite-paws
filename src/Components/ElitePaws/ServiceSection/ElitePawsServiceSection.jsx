import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
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

const PRICING_BG = '#b7d6a0';
const SERVICE_BG = '#212920';

function getSlotPosition(index, activeIndex, total) {
  const diff = ((index - activeIndex) % total + total) % total;
  if (diff === 0) return 'center';
  if (diff === 1) return 'right';
  return 'left';
}

export default function ElitePawsServiceSection() {
  const sectionRef = useRef(null);
  const [activeService, setActiveService] = useState(services[0]?.id ?? null);
  const [expandedService, setExpandedService] = useState(services[0]?.id ?? null);

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

  const totalServices = services.length;

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const idx = Math.min(totalServices - 1, Math.floor(v * totalServices));
    const newId = services[idx]?.id;
    if (newId != null) setActiveService(newId);
  });

  useEffect(() => {
    if (activeService != null) setExpandedService(activeService);
  }, [activeService]);

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

  return (
    <section ref={sectionRef} className="elite-paws-services">
      <motion.div
        className="elite-paws-services-bg"
        style={{ backgroundColor, opacity: showBg ? 1 : 0 }}
        aria-hidden="true"
      />

      <div className="elite-paws-services-sticky">
        <div className="elite-paws-services-inner">
          <div className="elite-paws-services-left">
          <h2 className="elite-paws-services-heading">
            Dedicated
            <br />
            to Better:
            <br />
            Pet Care.
          </h2>
          <p className="elite-paws-services-desc">
            Specialized grooming treatments designed for comfort, coat health, and stress-free care.
          </p>
          {/* <a href="#services" className="elite-paws-services-link">
            Explore All Services
          </a> */}
        </div>

        <div className="elite-paws-services-center">
          <div className="elite-paws-services-slider">
            {services.map((service, index) => {
              const slot = getSlotPosition(index, activeIndex, services.length);

              const slotStyles = {
                center: { zIndex: 3, transform: 'rotate(2deg) scale(1) translateX(0)', opacity: 1 },
                left:   { zIndex: 1, transform: 'rotate(-5deg) scale(0.9) translateX(-20%)', opacity: 0.35 },
                right:  { zIndex: 1, transform: 'rotate(5deg) scale(0.9) translateX(20%)', opacity: 0.35 },
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
          {services.map((service) => {
            const isActive = activeService === service.id;
            const isExpanded = expandedService === service.id;

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
                  <div className="elite-paws-services-item-meta">
                    {service.price ? <span className="elite-paws-services-item-price">{service.price}</span> : null}
                    {service.duration ? <span className="elite-paws-services-item-duration">{service.duration}</span> : null}
                  </div>

                  {service.description ? (
                    <p className={`elite-paws-services-item-desc ${isExpanded ? 'is-expanded' : ''}`}>
                      {service.description}
                    </p>
                  ) : null}

                  <button
                    type="button"
                    className="elite-paws-services-item-more"
                    onClick={(e) => {
                      e.stopPropagation();
                      setExpandedService((prev) => (prev === service.id ? null : service.id));
                    }}
                  >
                    {isExpanded ? 'See less' : 'See more'}
                  </button>
                </div>

                {/*
                {tags.length > 0 && (
                  <div className="elite-paws-services-tags">
                    {tags.map((tag) => (
                      <span key={tag} className="elite-paws-services-tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                */}
              </div>
            );
          })}
          </div>
        </div>
      </div>
    </section>
  );
}
