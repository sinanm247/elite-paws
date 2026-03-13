import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { pricingPlans } from '../../../Datasets/pricingPlans';
import { LuPlus } from 'react-icons/lu';
import { FaHeart } from 'react-icons/fa';
import image1 from '../../../assets/New/image-2.jpeg';
import image2 from '../../../assets/New/image-1.jpeg';
import './ElitePawsPricingSection.scss';


const PLAN_IMAGES = [image1, image2];
const PRICING_BG_COLOR = '#e8e6e3';
const HERO_END_BG = '#2d3e50';
const CARD_WIDTH = 425;
const CARD_GAP = 20;

function getPlanImage(index) {
  return PLAN_IMAGES[index % PLAN_IMAGES.length];
}

function CTACard({ index, scrollYProgress, totalCards }) {
  const naturalX = index * (CARD_WIDTH + CARD_GAP);
  const maxOffset = (totalCards - 1) * (CARD_WIDTH + CARD_GAP);

  const scrollOffset = useTransform(scrollYProgress, [0.05, 0.9], [0, maxOffset]);
  const cardX = useTransform(scrollOffset, (offset) => Math.max(0, naturalX - offset));

  return (
    <motion.div
      className="elite-paws-pricing-card elite-paws-pricing-cta-card"
      style={{
        x: cardX,
        zIndex: index + 1,
      }}
    >
      <div className="elite-paws-pricing-cta-content">
        <h3 className="elite-paws-pricing-cta-title">Need more details?</h3>
        <p className="elite-paws-pricing-cta-desc">
          Have questions about our plans or want a customized package for your furry friend? We&rsquo;d love to help.
        </p>
        <a
          href="https://wa.me/"
          target="_blank"
          rel="noopener noreferrer"
          className="elite-paws-pricing-cta-btn"
        >
          Contact Us
        </a>
      </div>
    </motion.div>
  );
}

function StackingCard({ plan, index, isSelected, scrollYProgress, totalCards }) {
  const img = getPlanImage(index);
  const hasIncludesGroups = plan.includesGroups && plan.includesGroups.length > 0;
  const hasIncludes = plan.includes && plan.includes.length > 0;
  const rightBottomLabels = hasIncludesGroups
    ? plan.includesGroups.map((g) => g.title)
    : hasIncludes
      ? ['Included']
      : [];

  const naturalX = index * (CARD_WIDTH + CARD_GAP);
  const maxOffset = (totalCards - 1) * (CARD_WIDTH + CARD_GAP);

  const scrollOffset = useTransform(scrollYProgress, [0.05, 0.9], [0, maxOffset]);
  const cardX = useTransform(scrollOffset, (offset) => Math.max(0, naturalX - offset));

  return (
    <motion.div
      className={`elite-paws-pricing-card ${isSelected ? 'is-selected' : ''}`}
      style={{
        x: cardX,
        zIndex: index + 1,
      }}
    >
      <div className="elite-paws-pricing-card-bg" style={{ backgroundImage: `url(${img})` }} />
      <div className="elite-paws-pricing-card-overlay" />

      <div className="elite-paws-pricing-card-name-wrap">
        <h3 className="elite-paws-pricing-card-name">{plan.name}</h3>
        {plan.subtitle && (
          <p className="elite-paws-pricing-card-subtitle">{plan.subtitle}</p>
        )}
      </div>

      <div className="elite-paws-pricing-card-bottom">
        <div className="elite-paws-pricing-card-left-bottom">
          <p className="elite-paws-pricing-card-price">{plan.price}</p>
          <div className="elite-paws-pricing-card-icons">
            <button type="button" className="elite-paws-pricing-icon-btn" aria-label="Add">
              <LuPlus />
            </button>
            <button type="button" className="elite-paws-pricing-icon-btn" aria-label="Save">
              <FaHeart />
            </button>
          </div>
        </div>
        {rightBottomLabels.length > 0 && (
          <div className="elite-paws-pricing-card-right-bottom">
            {rightBottomLabels.map((label) => (
              <span key={label} className="elite-paws-pricing-includes-tag">
                {label}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default function ElitePawsPricingSection() {
  const sectionRef = useRef(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const { scrollYProgress: bgScrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'start start'],
  });

  const backgroundColor = useTransform(
    bgScrollYProgress,
    [0, 0.5, 1],
    [HERO_END_BG, PRICING_BG_COLOR, PRICING_BG_COLOR]
  );

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  const totalCards = pricingPlans.length + 1;
  const step = CARD_WIDTH + CARD_GAP;
  const maxOffset = (totalCards - 1) * step;

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const offset = ((v - 0.05) / (0.9 - 0.05)) * maxOffset;
    const clamped = Math.max(0, Math.min(maxOffset, offset));
    const next = clamped <= 0 ? 0 : Math.min(totalCards - 1, Math.ceil(clamped / step));
    setSelectedIndex(next);
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

  return (
    <section ref={sectionRef} className="elite-paws-pricing">
      {showBg && (
        <motion.div
          className="elite-paws-pricing-bg"
          style={{ backgroundColor }}
          aria-hidden="true"
        />
      )}
      <div className="elite-paws-pricing-sticky">
        <div className="elite-paws-pricing-inner">
          <div className="elite-paws-pricing-left">
            <h2 className="elite-paws-pricing-heading">Elite Paws Plans</h2>
            <p className="elite-paws-pricing-sub">Choose the right care for your pet.</p>
          </div>

          <div className="elite-paws-pricing-cards-wrap">
            <div
              className="elite-paws-pricing-cards-stack"
              style={{ width: totalCards * CARD_WIDTH + (totalCards - 1) * CARD_GAP }}
            >
              {pricingPlans.map((plan, index) => (
                <StackingCard
                  key={plan.id}
                  plan={plan}
                  index={index}
                  isSelected={index === selectedIndex}
                  scrollYProgress={scrollYProgress}
                  totalCards={totalCards}
                />
              ))}
              <CTACard
                index={pricingPlans.length}
                scrollYProgress={scrollYProgress}
                totalCards={totalCards}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
