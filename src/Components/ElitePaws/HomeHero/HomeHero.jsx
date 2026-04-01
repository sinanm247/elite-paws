import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring, useMotionValueEvent } from 'framer-motion';
import { FaPlay, FaPause } from 'react-icons/fa';
import { FaVolumeHigh, FaVolumeXmark } from 'react-icons/fa6';
import './HomeHero.scss';
import imgLeft from '../../../assets/Gallery/Image-1.jpeg';
import imgCenter from '../../../assets/Gallery/Image-24.jpeg';
import imgRight from '../../../assets/Gallery/Image-29.jpeg';
import videoLeft from '../../../assets/Videos/Video-1.mp4';
import arrowIcon from '../../../assets/Icons/arrow-1.png';
import section2RightImage from '../../../assets/Images/Image-1.png';
import element1 from '../../../assets/Elements/Element-1.png';

const HOVER_MOVE = 18;
const HOVER_ROTATE = 6;

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
  const [hoveredCard, setHoveredCard] = useState(null);

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
  const leftSlotX = useTransform(
    scrollYProgress,
    [0.08, slideInEnd, leftToCenterStart, leftToCenterEnd],
    [0, 220, 220, 320]
  );
  const leftSlotScale = useTransform(
    scrollYProgress,
    [leftToCenterStart, leftToCenterEnd],
    [1, 1.3]
  );
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
  // Section 3: right image slides from behind to center; left fades out
  
  const rightSlotX = useTransform(
    scrollYProgress,
    [0.08, slideInEnd, rightToCenterStart, rightToCenterEnd],
    [0, -220, -220, -320]
  );
  const rightSlotScale = useTransform(
    scrollYProgress,
    [rightToCenterStart, rightToCenterEnd],
    [1, 1.3]
  );
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
    ['#fcf2e0', '#fcf2e0', '#b7d6a0', '#b7d6a0', '#07211e', '#07211e']
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
          <div className="elite-hero-sticky-cards">
            <div className="elite-hero-cards-wrap">
              <motion.div
                className="elite-hero-card-slot elite-hero-card-left"
                style={{
                  opacity: leftSlotOpacity,
                  x: leftSlotX,
                  y: '-50%',
                  scale: leftSlotScale,
                  zIndex: leftSlotZIndex,
                }}
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
                  x: '-50%',
                  y: '-50%',
                  zIndex: hoveredCard === 'center' ? 5 : 3,
                  opacity: centerOpacity,
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
                className="elite-hero-card-slot elite-hero-card-right"
                style={{
                  opacity: rightSlotOpacity,
                  x: rightSlotX,
                  y: '-50%',
                  scale: rightSlotScale,
                  zIndex: rightSlotZIndex,
                }}
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
            </div>
          </div>
        </>
      )}

      {/* Section texts: between bg and cards (z-order); overlap stickies so section 1 + cards show together */}
      <div className="elite-hero-bg-stack">
        <div className="elite-hero-bg-section elite-hero-bg-section-1">
          <div className="elite-hero-bg-text">ELITE PAWS</div>
          <div className="elite-hero-copy elite-hero-bg-copy">
            <p className="elite-hero-copy-label">Pet Grooming & Care</p>
            <h2 className="elite-hero-copy-title">Keeping Your Pets Healthy, Happy & Groomed</h2>
          </div>
        </div>
        <div className="elite-hero-bg-section elite-hero-bg-section-2">
          <div className="elite-hero-bg-section-2-left">
            <p className="elite-hero-s2-line">We are the</p>
            <p className="elite-hero-s2-line elite-hero-s2-accent">care your pet deserves.</p>
          </div>
          <div className="elite-hero-bg-section-2-right">
            <img
              className="elite-hero-s2-right-image"
              src={section2RightImage}
              alt=""
              aria-hidden="true"
              loading="lazy"
            />
            <p className="elite-hero-s2-line">You are</p>
            <p className="elite-hero-s2-line elite-hero-s2-accent">family.</p>
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
            <p className="elite-hero-s3-headline">We care for</p>
            <p className="elite-hero-s3-headline elite-hero-s2-accent">your pets.</p>
          </div>
          <div className="elite-hero-bg-section-3-right">
            <div className="elite-hero-s3-para">
              <span>At Elite Paws, we believe that pet care is not just about grooming or a quick check-up.<br/></span>
              It&apos;s a relationship to build, trust to earn, and wellness to maintain. Our mission: to make every visit a moment of care and comfort, with your pet&apos;s health and happiness at the heart of everything we do.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
