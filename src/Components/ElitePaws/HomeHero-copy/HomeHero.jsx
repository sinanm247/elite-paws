import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  useMotionValueEvent,
  useReducedMotion,
} from 'framer-motion';
import { FaPlay, FaPause } from 'react-icons/fa';
import { FaVolumeHigh, FaVolumeXmark } from 'react-icons/fa6';
import './HomeHero.scss';

import imgLeft from '../../../assets/New-Gallery/Image-3.jpeg';
import imgCenter from '../../../assets/New-Gallery/Image-10.webp';
import imgRight from '../../../assets/New-Gallery/Image-7.jpeg';

import videoLeft from '../../../assets/Videos/Video-1.mp4';
import arrowIcon from '../../../assets/Icons/arrow-1.png';
import section2RightImage from '../../../assets/Images/Image-1.png';
import element1 from '../../../assets/Elements/Element-1.png';
import element2 from '../../../assets/Elements/Element-2.png';
import { useAppLoader } from '../../../context/AppLoaderContext';
import { HERO_POST_LOADER_DELAY_MS } from '../../../constants/appLoader';

const HOVER_MOVE = 18;
const HOVER_ROTATE = 6;

/** Whole stack rises, then sides spread — no idle frame between (rise complete → spread immediately) */
const CARD_STACK_RISE_S = 0.88;
/** Horizontal spread duration — keep in sync with spread → done timeout below */
const CARD_SPREAD_S = 1.02;
const CARD_RISE_EASE = [0.22, 1, 0.42, 1];
const CARD_SPREAD_EASE = [0.2, 0.82, 0.28, 1];

/** Section 1: left/right smaller than center; sections 2–3: ramp to 1.0 to match center (no extra zoom past center) */
const HERO_SIDE_CARD_SCALE = 0.82;
/** Horizontal nudge at side stack (px), matches sect 1 slide-in — sects 2–3 ease from here to centered (-50%) */
const HERO_SIDE_STACK_X = 220;
/** Pre–translateX(-50%) focus offset (px); tuned to card width ≈ min(425px, 100vw − 48px) */
const HERO_FOCUS_X_PX = -212;

/** Cards strip width / card width — mirrors SCSS `.elite-hero-cards-wrap` and slot width */
function getHeroCardsLayout(vw) {
  const wrap = Math.min(vw * 0.9, 1000);
  const cardW = Math.min(425, Math.max(0, vw - 48));
  return { wrap, cardW };
}

function smoothStep01(t) {
  const x = Math.min(1, Math.max(0, t));
  return x * x * (3 - 2 * x);
}

/** Hero intro timeline (seconds) — runs after AppLoader dismisses */
const HERO_TITLE = 'ELITE PAWS';

function getHeroIntroTiming(prefersReducedMotion) {
  if (prefersReducedMotion) {
    return {
      skip: true,
      letterDelayStepS: 0,
      letterDurationS: 0.01,
      copyDelayS: 0,
      copyDurationS: 0.01,
    };
  }
  /** Slightly slower title/copy than baseline so letters read clearly */
  const textT = 1.32;

  return {
    skip: false,
    letterDelayStepS: 0.035 * textT,
    letterDurationS: 0.48 * textT,
    copyDelayS: 0.45 * textT,
    copyDurationS: 0.52 * textT,
  };
}

function ImageCard({ src, alt, className, style, onHoverStart, onHoverEnd, baseRotate = 0 }) {
  const cardRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  const xSpring = useSpring(x, { stiffness: 300, damping: 16, mass: 0.7 });
  const ySpring = useSpring(y, { stiffness: 300, damping: 16, mass: 0.7 });
  const rotateXSpring = useSpring(rotateX, { stiffness: 300, damping: 18, mass: 0.7 });
  const rotateYSpring = useSpring(rotateY, { stiffness: 300, damping: 18, mass: 0.7 });

  const handleMouseEnter = () => onHoverStart?.();
  const handleMouseLeave = () => {
    onHoverEnd?.();
  };

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width - 0.5;
    const relY = (e.clientY - rect.top) / rect.height - 0.5;

    const targetX = relX * HOVER_MOVE;
    const targetY = relY * HOVER_MOVE;
    xSpring.set(targetX);
    ySpring.set(targetY);
    rotateYSpring.set(-relX * HOVER_ROTATE);
    rotateXSpring.set(relY * HOVER_ROTATE);
  };

  return (
    <motion.div
      ref={cardRef}
      className={`elite-hero-image-card ${className || ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        handleMouseLeave();
        xSpring.set(0);
        ySpring.set(0);
        rotateXSpring.set(0);
        rotateYSpring.set(0);
      }}
      style={{
        ...style,
        rotate: baseRotate,
        x: xSpring,
        y: ySpring,
        rotateX: rotateXSpring,
        rotateY: rotateYSpring,
      }}
    >
      <img src={src} alt={alt} />
    </motion.div>
  );
}

function LeftVideoCard({
  imgSrc,
  videoSrc,
  alt,
  className,
  style,
  onHoverStart,
  onHoverEnd,
  baseRotate = 0,
  isSection2Active,
}) {
  const cardRef = useRef(null);
  const videoRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  const xSpring = useSpring(x, { stiffness: 300, damping: 16, mass: 0.7 });
  const ySpring = useSpring(y, { stiffness: 300, damping: 16, mass: 0.7 });
  const rotateXSpring = useSpring(rotateX, { stiffness: 300, damping: 18, mass: 0.7 });
  const rotateYSpring = useSpring(rotateY, { stiffness: 300, damping: 18, mass: 0.7 });

  const [isHovered, setIsHovered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const handleMouseEnter = () => {
    setIsHovered(true);
    onHoverStart?.();
    if (isSection2Active && videoRef.current) {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    onHoverEnd?.();
    if (videoRef.current) {
      videoRef.current.pause();
    }
    setIsPlaying(false);
  };

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width - 0.5;
    const relY = (e.clientY - rect.top) / rect.height - 0.5;

    const targetX = relX * HOVER_MOVE;
    const targetY = relY * HOVER_MOVE;
    xSpring.set(targetX);
    ySpring.set(targetY);
    rotateYSpring.set(-relX * HOVER_ROTATE);
    rotateXSpring.set(relY * HOVER_ROTATE);
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    setIsMuted((prev) => !prev);
  };

  const showVideoLayer = isSection2Active && isHovered;

  return (
    <motion.div
      ref={cardRef}
      className={`elite-hero-image-card ${className || ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        handleMouseLeave();
        xSpring.set(0);
        ySpring.set(0);
        rotateXSpring.set(0);
        rotateYSpring.set(0);
      }}
      style={{
        ...style,
        rotate: baseRotate,
        x: xSpring,
        y: ySpring,
        rotateX: rotateXSpring,
        rotateY: rotateYSpring,
      }}
    >
      <div className="elite-hero-image-inner">
        <img src={imgSrc} alt={alt} />
        {videoSrc && (
          <div className={`elite-hero-video-layer ${showVideoLayer ? 'is-active' : ''}`}>
            <video
              ref={videoRef}
              src={videoSrc}
              muted={isMuted}
              loop
              playsInline
              className="elite-hero-video"
            />
            <div className="elite-hero-video-controls">
              <button type="button" onClick={togglePlay} className="elite-hero-video-btn play-pause" aria-label={isPlaying ? 'Pause' : 'Play'}>
                {isPlaying ? <FaPause /> : <FaPlay />}
              </button>
              <button type="button" onClick={toggleMute} className="elite-hero-video-btn" aria-label={isMuted ? 'Unmute' : 'Mute'}>
                {isMuted ? <FaVolumeXmark /> : <FaVolumeHigh />}
              </button>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default function HomeHero() {
  const containerRef = useRef(null);
  const vwRef = useRef(typeof window !== 'undefined' ? window.innerWidth : 1024);
  const [hoveredCard, setHoveredCard] = useState(null);
  const prefersReducedMotion = useReducedMotion();
  const { isPageLoading } = useAppLoader();
  const [introTiming] = useState(() => getHeroIntroTiming(false));
  const [introPlay, setIntroPlay] = useState(false);
  const skipMotion = prefersReducedMotion || introTiming.skip;
  const [heroIntroDone, setHeroIntroDone] = useState(false);
  const [titleCharsSettled, setTitleCharsSettled] = useState(false);
  const [copyRevealSettled, setCopyRevealSettled] = useState(false);
  /** True after HERO_TITLE fade-out completes — gates card stack (brand not behind cards) */
  const [heroTextExited, setHeroTextExited] = useState(false);
  /** idle → rising → spread (sides out) → done (scroll-driven) */
  const [cardsPhase, setCardsPhase] = useState('idle');

  useEffect(() => {
    if (isPageLoading) {
      setIntroPlay(false);
      return undefined;
    }
    const t = window.setTimeout(() => setIntroPlay(true), HERO_POST_LOADER_DELAY_MS);
    return () => window.clearTimeout(t);
  }, [isPageLoading]);

  useEffect(() => {
    const onResize = () => {
      vwRef.current = window.innerWidth;
    };
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    if (!introPlay) {
      setTitleCharsSettled(false);
      setCopyRevealSettled(false);
      setHeroTextExited(false);
      return;
    }
    if (skipMotion) {
      setTitleCharsSettled(true);
      setCopyRevealSettled(true);
      setHeroTextExited(true);
      return;
    }
    const lastI = HERO_TITLE.length - 1;
    const titleEndMs =
      (introTiming.letterDelayStepS * lastI + introTiming.letterDurationS) * 1000 + 120;
    const copyEndMs =
      (introTiming.copyDelayS + introTiming.copyDurationS) * 1000 + 120;
    const tTitle = window.setTimeout(() => setTitleCharsSettled(true), titleEndMs);
    const tCopy = window.setTimeout(() => setCopyRevealSettled(true), copyEndMs);
    return () => {
      window.clearTimeout(tTitle);
      window.clearTimeout(tCopy);
    };
  }, [introPlay, skipMotion, introTiming]);

  /** Letters done → exit title + start card rise in one layout pass (sync with title motion) */
  useLayoutEffect(() => {
    if (!titleCharsSettled || skipMotion) return;
    setHeroTextExited(true);
    if (introPlay && !skipMotion) {
      setCardsPhase((p) => (p === 'idle' ? 'rising' : p));
    }
  }, [titleCharsSettled, skipMotion, introPlay]);

  useEffect(() => {
    if (skipMotion && heroTextExited) {
      setCardsPhase('done');
    }
  }, [skipMotion, heroTextExited]);

  useEffect(() => {
    if (isPageLoading) {
      setCardsPhase('idle');
    }
  }, [isPageLoading]);

  useEffect(() => {
    if (cardsPhase !== 'spread') return undefined;
    const t = window.setTimeout(() => setCardsPhase('done'), CARD_SPREAD_S * 1000 + 50);
    return () => window.clearTimeout(t);
  }, [cardsPhase]);

  useEffect(() => {
    if (isPageLoading) {
      setHeroIntroDone(false);
      return;
    }
    if (prefersReducedMotion && heroTextExited) {
      setHeroIntroDone(true);
      return;
    }
    setHeroIntroDone(cardsPhase === 'done');
  }, [isPageLoading, prefersReducedMotion, heroTextExited, cardsPhase]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Section 1: left & right slide fully inwards behind center (only center visible at end)
  const slideInEnd = 0.28;

  // Section 2: left image slides from behind to center, stays at center for full section 2
  const leftToCenterStart = 0.32;
  const leftToCenterEnd = 0.45;
  // Section 3: right image comes only when third section has reached the bottom (fully in view)
  const rightToCenterStart = 0.72;
  const rightToCenterEnd = 0.88;
  /** Sect 1: 2% + HERO_SIDE_STACK_X. Hidden: same (beside center card). Sect 2: lerp to 50% + -50% (smooth, no wide swing). */
  const leftSlotLeft = useTransform(scrollYProgress, (v) => {
    if (v < slideInEnd) return '2%';
    if (v < leftToCenterStart) return '2%';
    if (v < leftToCenterEnd) {
      const t = smoothStep01((v - leftToCenterStart) / (leftToCenterEnd - leftToCenterStart));
      return `${2 + 48 * t}%`;
    }
    return '50%';
  });
  const leftSlotX = useTransform(scrollYProgress, (v) => {
    if (v < 0.08) return 0;
    if (v < slideInEnd) {
      const t = (v - 0.08) / (slideInEnd - 0.08);
      return HERO_SIDE_STACK_X * t;
    }
    if (v < leftToCenterStart) return HERO_SIDE_STACK_X;
    if (v < leftToCenterEnd) {
      const t = smoothStep01((v - leftToCenterStart) / (leftToCenterEnd - leftToCenterStart));
      return HERO_SIDE_STACK_X * (1 - t) + HERO_FOCUS_X_PX * t;
    }
    return '-50%';
  });
  const leftSlotScale = useTransform(scrollYProgress, (v) => {
    if (v < leftToCenterStart) return HERO_SIDE_CARD_SCALE;
    if (v < leftToCenterEnd) {
      const t = (v - leftToCenterStart) / (leftToCenterEnd - leftToCenterStart);
      return HERO_SIDE_CARD_SCALE + (1 - HERO_SIDE_CARD_SCALE) * t;
    }
    return 1;
  });
  const leftSlotZIndex = useTransform(
    scrollYProgress,
    [leftToCenterStart, leftToCenterEnd],
    [2, 10]
  );
  const leftSlotRotate = useTransform(
    scrollYProgress,
    [0, leftToCenterStart, leftToCenterEnd],
    [-4, -4, 0]
  );
  const leftSlotOpacity = useTransform(
    scrollYProgress,
    [
      0,
      0.08,
      slideInEnd,
      leftToCenterStart,
      leftToCenterEnd,
      rightToCenterStart - 0.02,
      rightToCenterStart,
      rightToCenterEnd,
    ],
    // 1) Fully visible in section 1
    // 2) Hidden when it slides behind center
    // 3) Fades in during section 2 and stays fully visible
    // 4) Only fades out gently once section 3 animation runs
    [1, 1, 0, 0.25, 1, 1, 1, 0]
  );
  // Section 3: same end geometry as left. Don't animate `right` to 50% — that plus x:'-50%' is NOT centered
  // (unlike left:50% + x:'-50%'). From rightToCenterStart: switch to left:50% + x lerp with no layout snap.

  const rightSlotLeft = useTransform(scrollYProgress, (v) => {
    if (v < rightToCenterStart) return 'auto';
    return '50%';
  });
  const rightSlotRight = useTransform(scrollYProgress, (v) => {
    if (v < slideInEnd) return '2%';
    if (v < rightToCenterStart) return '2%';
    return 'auto';
  });
  const rightSlotX = useTransform(scrollYProgress, (v) => {
    if (v < 0.08) return 0;
    if (v < slideInEnd) {
      const t = (v - 0.08) / (slideInEnd - 0.08);
      return -HERO_SIDE_STACK_X * t;
    }
    if (v < rightToCenterStart) return -HERO_SIDE_STACK_X;
    if (v < rightToCenterEnd) {
      const t = smoothStep01((v - rightToCenterStart) / (rightToCenterEnd - rightToCenterStart));
      const { wrap, cardW } = getHeroCardsLayout(vwRef.current);
      const xWhenLeft50 =
        0.48 * wrap - cardW - HERO_SIDE_STACK_X;
      return xWhenLeft50 * (1 - t) + HERO_FOCUS_X_PX * t;
    }
    return '-50%';
  });
  const rightSlotScale = useTransform(scrollYProgress, (v) => {
    if (v < rightToCenterStart) return HERO_SIDE_CARD_SCALE;
    if (v < rightToCenterEnd) {
      const t = (v - rightToCenterStart) / (rightToCenterEnd - rightToCenterStart);
      return HERO_SIDE_CARD_SCALE + (1 - HERO_SIDE_CARD_SCALE) * t;
    }
    return 1;
  });
  const rightSlotZIndex = useTransform(
    scrollYProgress,
    [rightToCenterStart, rightToCenterEnd],
    [2, 10]
  );
  const rightSlotRotate = useTransform(
    scrollYProgress,
    [0, rightToCenterStart, rightToCenterEnd],
    [4, 4, 0]
  );
  const rightSlotOpacity = useTransform(
    scrollYProgress,
    [0, 0.08, slideInEnd, rightToCenterStart - 0.002, rightToCenterStart, rightToCenterEnd],
    [1, 1, 0, 0, 0.25, 1]
  );
  const centerOpacity = useTransform(
    scrollYProgress,
    [leftToCenterStart, leftToCenterEnd, rightToCenterStart],
    [1, 0, 0]
  );

  const [isSection2Active, setIsSection2Active] = useState(false);
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    setIsSection2Active(v >= leftToCenterStart && v < rightToCenterStart);
  });

  // Smooth bg color when each section reaches the top
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.25, 0.38, 0.58, 0.72, 1],
    ['#fcf2e0', '#fcf2e0', '#6f7a43', '#6f7a43', '#07211e', '#07211e']
  );

  // Hide sticky layers when hero has scrolled out (sticky doesn't unstick in this layout)
  const [showStickyLayers, setShowStickyLayers] = useState(true);
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let raf = null;
    const check = () => {
      const rect = el.getBoundingClientRect();
      setShowStickyLayers(rect.bottom > 0);
    };
    const onScrollOrResize = () => {
      if (raf != null) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        check();
        raf = null;
      });
    };

    check();
    window.addEventListener('scroll', onScrollOrResize, { passive: true });
    window.addEventListener('resize', onScrollOrResize);
    document.addEventListener('scroll', onScrollOrResize, { passive: true });
    return () => {
      if (raf != null) cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScrollOrResize);
      window.removeEventListener('resize', onScrollOrResize);
      document.removeEventListener('scroll', onScrollOrResize);
    };
  }, []);

  return (
    <div ref={containerRef} className="elite-hero">
      {/* Sticky bg + cards: only show while hero is in view; hide when past hero so footer is clear */}
      {showStickyLayers && (
        <>
          <div className="elite-hero-sticky-bg">
            <motion.div
              className="elite-hero-bg-color"
              style={{ backgroundColor }}
              aria-hidden="true"
            />
          </div>
          <div
            className={`elite-hero-sticky-cards${heroTextExited ? '' : ' elite-hero-sticky-cards--pre-rise'}`}
          >
            <div className="elite-hero-cards-wrap">
              <motion.div
                className="elite-hero-cards-riser"
                initial={false}
                animate={{
                  /* Must clear the full viewport height — min(72vh, 520px) capped at 520px and left cards peeking on tall screens */
                  y: heroTextExited ? 0 : '105vh',
                }}
                transition={{
                  duration: skipMotion ? 0.01 : CARD_STACK_RISE_S,
                  ease: CARD_RISE_EASE,
                }}
                onAnimationComplete={() => {
                  if (skipMotion) return;
                  setCardsPhase((p) => (p === 'rising' ? 'spread' : p));
                }}
              >
                <motion.div
                  key={cardsPhase === 'done' ? 'left-scroll' : 'left-intro'}
                  className="elite-hero-card-slot elite-hero-card-left"
                  initial={false}
                  {...(cardsPhase === 'done'
                    ? {
                        style: {
                          left: leftSlotLeft,
                          right: 'auto',
                          top: '50%',
                          opacity: leftSlotOpacity,
                          x: leftSlotX,
                          y: '-50%',
                          scale: leftSlotScale,
                          zIndex: leftSlotZIndex,
                        },
                      }
                    : {
                        animate: {
                          left: cardsPhase === 'spread' ? '2%' : '50%',
                          x: cardsPhase === 'spread' ? 0 : '-50%',
                          top: '50%',
                          y: '-50%',
                          scale: cardsPhase === 'spread' ? HERO_SIDE_CARD_SCALE : 1,
                          zIndex: cardsPhase === 'spread' ? 2 : 1,
                          opacity: 1,
                        },
                        transition: {
                          duration: CARD_SPREAD_S,
                          ease: CARD_SPREAD_EASE,
                        },
                      })}
                >
                  {isSection2Active && (
                    <div className="elite-hero-video-hint elite-hero-video-hint--outside" aria-hidden="true">
                      <img src={arrowIcon} alt="" className="elite-hero-video-hint-icon" />
                      <span className="elite-hero-video-hint-text">Click here to<br/> play video</span>
                    </div>
                  )}
                  <LeftVideoCard
                    imgSrc={imgLeft}
                    videoSrc={videoLeft}
                    alt="Elite Paws care"
                    className="card-left"
                    baseRotate={leftSlotRotate}
                    isSection2Active={isSection2Active}
                    onHoverStart={() => setHoveredCard('left')}
                    onHoverEnd={() => setHoveredCard(null)}
                  />
                </motion.div>
                <motion.div
                  className="elite-hero-card-slot elite-hero-card-center"
                  style={{
                    left: '50%',
                    top: '50%',
                    x: '-50%',
                    y: '-50%',
                    zIndex: hoveredCard === 'center' ? 5 : 3,
                    opacity: cardsPhase === 'done' ? centerOpacity : 1,
                  }}
                >
                  <ImageCard
                    src={imgCenter}
                    alt="Elite Paws grooming"
                    className="card-center"
                    baseRotate={0}
                    onHoverStart={() => setHoveredCard('center')}
                    onHoverEnd={() => setHoveredCard(null)}
                  />
                </motion.div>
                <motion.div
                  key={cardsPhase === 'done' ? 'right-scroll' : 'right-intro'}
                  className="elite-hero-card-slot elite-hero-card-right"
                  initial={false}
                  {...(cardsPhase === 'done'
                    ? {
                        style: {
                          left: rightSlotLeft,
                          right: rightSlotRight,
                          top: '50%',
                          opacity: rightSlotOpacity,
                          x: rightSlotX,
                          y: '-50%',
                          scale: rightSlotScale,
                          zIndex: rightSlotZIndex,
                        },
                      }
                    : {
                        animate: {
                          left: cardsPhase === 'spread' ? 'auto' : '50%',
                          right: cardsPhase === 'spread' ? '2%' : 'auto',
                          x: cardsPhase === 'spread' ? 0 : '-50%',
                          top: '50%',
                          y: '-50%',
                          scale: cardsPhase === 'spread' ? HERO_SIDE_CARD_SCALE : 1,
                          zIndex: cardsPhase === 'spread' ? 2 : 1,
                          opacity: 1,
                        },
                        transition: {
                          duration: CARD_SPREAD_S,
                          ease: CARD_SPREAD_EASE,
                        },
                      })}
                >
                  <ImageCard
                    src={imgRight}
                    alt="Elite Paws experience"
                    className="card-right"
                    baseRotate={rightSlotRotate}
                    onHoverStart={() => setHoveredCard('right')}
                    onHoverEnd={() => setHoveredCard(null)}
                  />
                </motion.div>
              </motion.div>
            </div>
          </div>
        </>
      )}

      {/* Section texts: between bg and cards (z-order); overlap stickies so section 1 + cards show together */}
      <div className="elite-hero-bg-stack">
        <div
          className={`elite-hero-bg-section elite-hero-bg-section-1${heroIntroDone ? ' elite-hero-bg-section-1--intro-done' : ''}`}
        >
          <motion.div
            className={`elite-hero-bg-section-1-title-wrap${heroTextExited ? ' elite-hero-bg-section-1-title-wrap--gone' : ''}`}
            initial={false}
            aria-hidden={heroTextExited}
            animate={{
              opacity: skipMotion ? 0 : titleCharsSettled ? 0 : 1,
              y: skipMotion ? 0 : titleCharsSettled ? '-100%' : 0,
            }}
            transition={{
              duration: skipMotion ? 0.01 : CARD_STACK_RISE_S,
              ease: CARD_RISE_EASE,
            }}
          >
            <div
              className={[
                'elite-hero-bg-text',
                introPlay ? 'elite-hero-bg-text--intro-active' : 'elite-hero-bg-text--intro-idle',
                titleCharsSettled ? 'elite-hero-bg-text--chars-settled' : '',
              ]
                .filter(Boolean)
                .join(' ')}
            >
              <span className="elite-hero-bg-text-sr">{HERO_TITLE}</span>
              {HERO_TITLE.split('').map((char, i) => (
                <span key={`${char}-${i}`} className="elite-hero-bg-text-char-wrap" aria-hidden="true">
                  <motion.span
                    className="elite-hero-bg-text-char-inner"
                    style={{ transformOrigin: 'bottom' }}
                    initial={false}
                    /* y only — block position is SCSS (.elite-hero-bg-text + section-1). Before: 100%, after: 0 */
                    animate={
                      skipMotion
                        ? { y: 0, opacity: 1 }
                        : introPlay
                          ? { y: 0, opacity: 1 }
                          : { y: '100%', opacity: 1 }
                    }
                    transition={{
                      delay: skipMotion || !introPlay ? 0 : introTiming.letterDelayStepS * i,
                      duration: skipMotion ? 0.01 : introTiming.letterDurationS,
                      ease: [0.2, 0.85, 0.22, 1],
                    }}
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </motion.span>
                </span>
              ))}
            </div>
          </motion.div>
          <div className="elite-hero-copy elite-hero-bg-copy">
            <div
              className={`elite-hero-bg-copy-mask${copyRevealSettled ? ' elite-hero-bg-copy-mask--settled' : ''}`}
            >
              <motion.div
                className="elite-hero-bg-copy-mask-inner"
                initial={false}
                animate={
                  skipMotion
                    ? { y: 0, opacity: 1 }
                    : introPlay
                      ? { y: 0, opacity: 1 }
                      : { y: '100%', opacity: 1 }
                }
                transition={{
                  delay: skipMotion || !introPlay ? 0 : introTiming.copyDelayS,
                  duration: skipMotion ? 0.01 : introTiming.copyDurationS,
                  ease: [0.2, 0.85, 0.22, 1],
                }}
              >
                <p className="elite-hero-copy-label">Pet Grooming & Care</p>
                <h2 className="elite-hero-copy-title">ONE PET<br/> AT A TIME GROOMING<br/> SERVICE AT YOUR DOOR</h2>
              </motion.div>
            </div>
          </div>
        </div>
        <div className="elite-hero-bg-section elite-hero-bg-section-2">
          <div className="elite-hero-bg-section-2-left">
            {/* <p className="elite-hero-s2-line">We are the</p> */}
            {/* <p className="elite-hero-s2-line elite-hero-s2-accent">care your pet deserves.</p> */}
            <p className="elite-hero-s2-line">ALL THE </p>
            <p className="elite-hero-s2-line elite-hero-s2-accent">ATTENTION</p>
            <div className="elite-hero-s2-left-sticky-wrap">
              <img
                className="elite-hero-s2-left-image"
                src={element2}
                alt=""
                aria-hidden="true"
                loading="lazy"
              />
              <p className="elite-hero-s2-sticky-text">None of the chaos</p>
            </div>
          </div>
          <div className="elite-hero-bg-section-2-right">
            <img
              className="elite-hero-s2-right-image"
              src={section2RightImage}
              alt=""
              aria-hidden="true"
              loading="lazy"
            />
            <div className="elite-hero-s2-para">
              <span>We pull up, we set up, and your pet becomes the main character.<br/></span>
              Ozone baths, tangle rescues, dreamy blowouts, paw balm, teeth brushing, gentle puppy first grooms, we’re bringing everything they need, nothing they don't. We only ever groom one pet at a time. With every treat, every soft word and every spritz of cologne, your furbaby gets the whole experience and the whole ❤ behind it!
            </div>
            {/* <p className="elite-hero-s2-line">You are</p> */}
            {/* <p className="elite-hero-s2-line elite-hero-s2-accent">family.</p> */}
            {/* <p className="elite-hero-s2-line">We treat them </p>
            <p className="elite-hero-s2-line elite-hero-s2-accent">family.</p> */}
          </div>
        </div>
        <div className="elite-hero-bg-section elite-hero-bg-section-3">
          <div className="elite-hero-bg-section-3-left">
          <img
              className="elite-hero-s3-left-image"
              src={element1}
              alt=""
              aria-hidden="true"
              loading="lazy"
            />
            {/* <p className="elite-hero-s3-headline">We care for</p> */}
            {/* <p className="elite-hero-s3-headline elite-hero-s2-accent">your pets.</p> */}
            <p className="elite-hero-s3-headline">All paws.</p>
            <p className="elite-hero-s3-headline elite-hero-s2-accent">All ears. All in.</p>
          </div>
          <div className="elite-hero-bg-section-3-right">
            <div className="elite-hero-s3-para">
              {/* <span>At Elite Paws, we believe that pet care is not just about grooming or a quick check-up.<br/></span>
              It&apos;s a relationship to build, trust to earn, and wellness to maintain. Our mission: to make every visit a moment of care and comfort, with your pet&apos;s health and happiness at the heart of everything we do. */}
              {/* <span>A full assessment dressed up as A VERY GOOD TIME.<br/></span>
              We come to your door, see one pet at a time, and check everything - skin, coat, ears, paws, nails. All of it. Every visit. A refreshing spa day coupled with a health checkup for your furbaby. */}
              <span>SHAKEN, FLUFFED & ADORED<br/></span>
              From the first coat assessment to the final spritz of cologne, every step is intentional, every product is chosen with care and every pet gets the kind of attention that simply can't be split.
              We get to work with ozone baths that cleanse deep down to the skin, expert brushing, nail filing, paw balm, teeth brushing, blowouts and trims done with full, unhurried attention. Just one groomer, one pet and a mobile setup stocked with everything it takes to send your furbaby home looking, and feeling, like a million dirhams. That’s what ALL IN looks like at Elite Paws.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
