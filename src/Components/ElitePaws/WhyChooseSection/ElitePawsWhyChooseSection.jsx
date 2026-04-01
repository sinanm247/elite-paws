import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import icon1 from '../../../assets/Icons/whychoose-icon-1.avif';
import icon2 from '../../../assets/Icons/whychoose-icon-2.avif';
import icon3 from '../../../assets/Icons/whychoose-icon-3.avif';
import icon4 from '../../../assets/Icons/whychoose-icon-4.avif';
import './ElitePawsWhyChooseSection.scss';

const SERVICE_END_BG = '#212920';
const WHY_BG = '#fcf2e0';

const REASONS = [
  {
    id: 1,
    title: 'One pet at a Time',
    text: 'Focused, one-on-one attention so your pet never feels rushed or overlooked.',
    icon: icon1,
  },
  {
    id: 2,
    title: 'Doorstep Mobile grooming',
    text: 'Professional grooming brought to your home—comfort for them, convenience for you.',
    icon: icon2,
  },
  {
    id: 3,
    title: 'No Waiting No Hustle/Delay',
    text: 'Scheduled slots that start on time, every time—no crowded lobbies or long waits.',
    icon: icon3,
  },
  {
    id: 4,
    title: 'Stress free grooming',
    text: 'Calm handling and a gentle pace to keep even nervous pets relaxed.',
    icon: icon4,
  },
];

const CARD_COUNT = REASONS.length;
const INTRO_END = 0.1;
const USABLE = 0.88;
const STEP = USABLE / CARD_COUNT;

// Final layout: staggered Y + tilt like reference (L lower, ML higher, MR higher, R lower)
const CARD_LAYOUT = [
  { rotate: -7, finalY: 96 },
  { rotate: 4, finalY: -92 },
  { rotate: -4, finalY: -74 },
  { rotate: 7, finalY: 90 },
];

function WhyChooseCard({ item, index, scrollYProgress }) {
  const start = INTRO_END + index * STEP;
  const riseEnd = start + STEP * 0.99;
  const layout = CARD_LAYOUT[index] ?? CARD_LAYOUT[0];

  const yRaw = useTransform(
    scrollYProgress,
    [start, riseEnd],
    ['170vh', `${layout.finalY}px`]
  );
  const opacity = useTransform(scrollYProgress, [start, start + STEP * 0.12], [0, 1]);
  const ySpring = useSpring(yRaw, { stiffness: 145, damping: 22, mass: 0.6 });

  return (
    <motion.article
      className="elite-paws-why-choose-card"
      style={{
        y: ySpring,
        opacity,
        zIndex: index + 2,
        rotate: layout.rotate,
      }}
    >
      <img className="elite-paws-why-choose-card-icon" src={item.icon} alt="" />
      <h3 className="elite-paws-why-choose-card-title">{item.title}</h3>
      <p className="elite-paws-why-choose-card-text">{item.text}</p>
    </motion.article>
  );
}

export default function ElitePawsWhyChooseSection() {
  const sectionRef = useRef(null);
  const [showBg, setShowBg] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  const { scrollYProgress: bgScrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'start start'],
  });

  const backgroundColor = useTransform(
    bgScrollYProgress,
    [0, 0.25, 0.4],
    [SERVICE_END_BG, WHY_BG, WHY_BG]
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
    <section ref={sectionRef} className="elite-paws-why-choose">
      <motion.div
        className="elite-paws-why-choose-bg"
        style={{ backgroundColor, opacity: showBg ? 1 : 0 }}
        aria-hidden="true"
      />

      <div className="elite-paws-why-choose-sticky">
        <div className="elite-paws-why-choose-hero">
          <h2 className="elite-paws-why-choose-title">
            <span className="elite-paws-why-choose-title-line">Why</span>
            <span className="elite-paws-why-choose-title-line">Choose</span>
            <span className="elite-paws-why-choose-title-line elite-paws-why-choose-title-accent">
              Elite Paws
            </span>
          </h2>
        </div>

        <div className="elite-paws-why-choose-stack">
          {REASONS.map((item, index) => (
            <WhyChooseCard
              key={item.id}
              item={item}
              index={index}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
