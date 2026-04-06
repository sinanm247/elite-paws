import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import icon1 from '../../../assets/Icons/WhyChooseUs-Icons/Icon1-light.png';
import icon2 from '../../../assets/Icons/WhyChooseUs-Icons/Icon2-light.png';
import icon3 from '../../../assets/Icons/WhyChooseUs-Icons/Icon3-light.png';
import icon4 from '../../../assets/Icons/WhyChooseUs-Icons/Icon4-light.png';
import './ElitePawsWhyChooseSection.scss';

const SERVICE_END_BG = '#07211e';
const WHY_BG = '#fcf2e0';

const REASONS = [
  {
    id: 1,
    title: 'One pet at a Time',
    // text: 'Focused, one-on-one attention so your pet never feels rushed or overlooked.',
    text: "When your pet steps in, they have our groomer's complete, undivided attention. One animal, one professional and a session built entirely around them. The way it should be.",
    icon: icon1,
  },
  {
    id: 2,
    title: 'Doorstep Mobile grooming',
    // text: 'Professional grooming brought to your home—comfort for them, convenience for you.',
    text: "No car rides, or unfamiliar waiting rooms. Our fully equipped mobile grooming setup pulls up right outside your building. Easier for you. So much better for them.",
    icon: icon2,
  },
  {
    id: 3,
    title: 'No Waiting No Delay',
    // text: 'Scheduled slots that start on time, every time—no crowded lobbies or long waits.',
    text: "We book one pet per slot and we show up when we say we will, every single time. Say goodbye to crowded lobbies and sitting around wondering when it's your turn.",
    icon: icon3,
  },
  {
    id: 4,
    title: 'Stress-free grooming',
    // text: 'Calm handling and a gentle pace to keep even nervous pets relaxed.',
    text: "We move at your pet's pace. Not ours. Every session starts with a gentle assessment, and from there we handle, speak to and treat your pet in a way that keeps anxiety low and tail wags high. ",
    icon: icon4,
  },
];

const CARD_COUNT = REASONS.length;
const INTRO_END = 0.1;
const USABLE = 0.72;
const COMPACT_USABLE = 0.9;
const STEP = USABLE / CARD_COUNT;

const CARD_LAYOUT = [
  { rotate: -7, finalY: 96 },
  { rotate: 4, finalY: -92 },
  { rotate: -4, finalY: -74 },
  { rotate: 7, finalY: 90 },
];

const ROTATE_TILTS = [-7, 7, -6, 6];
const COMPACT_FINAL_Y = [84, -74, -62, 78];

function WhyChooseCard({ item, index, scrollYProgress, isCompact }) {
  const activeStep = isCompact ? COMPACT_USABLE / CARD_COUNT : STEP;
  const start = INTRO_END + index * activeStep;
  const riseEnd = start + activeStep * (isCompact ? 0.9 : 0.72);
  const desktopLayout = CARD_LAYOUT[index] ?? CARD_LAYOUT[0];
  const rotate = isCompact ? ROTATE_TILTS[index % ROTATE_TILTS.length] : desktopLayout.rotate;
  const finalY = isCompact ? COMPACT_FINAL_Y[index] ?? 0 : desktopLayout.finalY;

  const yRaw = useTransform(
    scrollYProgress,
    [start, riseEnd],
    [isCompact ? '235vh' : '170vh', `${finalY}px`]
  );
  const opacity = useTransform(
    scrollYProgress,
    [start, start + activeStep * (isCompact ? 0.3 : 0.12)],
    [0, 1]
  );
  const ySpring = useSpring(
    yRaw,
    isCompact
      ? { stiffness: 120, damping: 24, mass: 0.78 }
      : { stiffness: 200, damping: 18, mass: 0.55 }
  );

  return (
    <motion.article
      className="elite-paws-why-choose-card"
      style={{
        y: ySpring,
        opacity,
        zIndex: index + 2,
        rotate,
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
  const [isCompact, setIsCompact] = useState(
    () => typeof window !== 'undefined' && window.innerWidth <= 1024
  );

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
    const onResize = () => setIsCompact(window.innerWidth <= 1024);
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

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
              isCompact={isCompact}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
