import React, { useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { groomingMenu } from '../../../Datasets/groomingMenu';
// import { LuPlus } from 'react-icons/lu';
import { FaHeart } from 'react-icons/fa';
import { ImEnlarge } from "react-icons/im";
import { IoChevronBack, IoChevronForward } from 'react-icons/io5';

import image1 from '../../../assets/New/image-2.jpeg';
import image2 from '../../../assets/New/image-1.jpeg';
import './ElitePawsGroomingMenuSection.scss';


const PLAN_IMAGES = [image1, image2];
const PRICING_BG_COLOR = '#b7d6a0';
const HERO_END_BG = '#07211e';
const CARD_WIDTH = 425;
const CARD_GAP = 20;
const CARD_HEIGHT = 650;

function getPlanImage(index, plan) {
  return plan?.image || PLAN_IMAGES[index % PLAN_IMAGES.length];
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

function PriceText({ price }) {
  const raw = String(price ?? '').trim();
  if (!raw) return null;

  // Expected examples:
  // - "65 AED"
  // - "123 AED + VAT"
  // - "Starting from 321 AED + VAT"
  const match = raw.match(/^(.*?)(\d[\d,]*)\s*(AED)(.*)$/i);
  if (!match) {
    return <span className="elite-paws-price-rest">{raw}</span>;
  }

  const prefix = (match[1] ?? '').trim();
  const amount = (match[2] ?? '').trim();
  const currency = (match[3] ?? '').trim().toUpperCase();
  const suffix = (match[4] ?? '').trim();

  return (
    <>
      {prefix ? <span className="elite-paws-price-rest">{prefix}&nbsp;</span> : null}
      <span className="elite-paws-price-amount">{amount}</span>
      <span className="elite-paws-price-currency">&nbsp;{currency}</span>
      {suffix ? <span className="elite-paws-price-rest">&nbsp;{suffix}</span> : null}
    </>
  );
}

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

function PlanDetailsModal({ isVisible, isOpen, onClose, plan, img, anchorRect, startLeft, origin }) {
  const ITEMS_PER_PAGE = 4;
  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = next, -1 = prev

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) return;
    setPage(0);
  }, [isOpen, plan?.id]);

  if (!isVisible || !plan || !anchorRect) return null;

  const items = plan.includesDetailed || [];
  const totalPages = Math.max(1, Math.ceil(items.length / ITEMS_PER_PAGE));
  const currentPage = clamp(page, 0, totalPages - 1);
  const pageItems = items.slice(currentPage * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE + ITEMS_PER_PAGE);
  const pageKey = `${plan.id}-${currentPage}`;

  const modalWidth = CARD_WIDTH * 2 + CARD_GAP;
  const modalHeight = CARD_HEIGHT;
  const pad = 16;

  // Keep panel aligned with the card start position (x=0) as much as possible.
  // Only shift left if needed to keep the panel inside the viewport.
  const maxLeft = window.innerWidth - modalWidth - pad;
  const desiredLeft = typeof startLeft === 'number' ? startLeft : anchorRect.left;
  const left = clamp(Math.min(desiredLeft, maxLeft), pad, maxLeft);
  const top = clamp(anchorRect.top, pad, window.innerHeight - modalHeight - pad);

  const originStyle =
    origin && Number.isFinite(origin.x) && Number.isFinite(origin.y)
      ? { transformOrigin: `${origin.x}px ${origin.y}px` }
      : undefined;

  return (
    <div className={`elite-paws-grooming-modal ${isOpen ? 'is-open' : ''}`} role="dialog" aria-modal="true">
      <button
        type="button"
        className="elite-paws-grooming-modal-backdrop"
        onClick={onClose}
        aria-label="Close plan details"
      />
      <div
        className="elite-paws-grooming-modal-panel"
        style={{ top, left, width: modalWidth, height: modalHeight, ...originStyle }}
      >
        <div className="elite-paws-grooming-modal-left">
          <div className="elite-paws-grooming-modal-card">
            <div className="elite-paws-pricing-card-bg" style={{ backgroundImage: `url(${img})` }} />
            <div className="elite-paws-pricing-card-overlay" />

            <div className="elite-paws-pricing-card-name-wrap">
              <h3 className="elite-paws-pricing-card-name">{plan.name}</h3>
              {plan.subtitle ? <p className="elite-paws-pricing-card-subtitle">{plan.subtitle}</p> : null}
            </div>

            <div className="elite-paws-pricing-card-bottom elite-paws-grooming-modal-card-bottom">
              <div className="elite-paws-pricing-card-left-bottom">
                <p className="elite-paws-pricing-card-price">
                  <PriceText price={plan.price} />
                </p>
              </div>
              <div className="elite-paws-pricing-card-right-bottom">
                {[plan.duration, plan.time].filter(Boolean).map((label) => (
                  <span key={label} className="elite-paws-pricing-includes-tag">
                    {label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="elite-paws-grooming-modal-right">
          <div className="elite-paws-grooming-modal-head">
            <p className="elite-paws-grooming-modal-kicker">Includes</p>
            <div className="elite-paws-grooming-modal-actions">
              <button
                type="button"
                className="elite-paws-grooming-modal-nav"
                onClick={() => {
                  setDirection(-1);
                  setPage((p) => clamp(p - 1, 0, totalPages - 1));
                }}
                disabled={currentPage <= 0}
                aria-label="Previous"
              >
                <IoChevronBack />
              </button>
              <button
                type="button"
                className="elite-paws-grooming-modal-nav"
                onClick={() => {
                  setDirection(1);
                  setPage((p) => clamp(p + 1, 0, totalPages - 1));
                }}
                disabled={currentPage >= totalPages - 1}
                aria-label="Next"
              >
                <IoChevronForward />
              </button>
              <button type="button" className="elite-paws-grooming-modal-close" onClick={onClose} aria-label="Close">
                ✕
              </button>
            </div>
          </div>

          {plan.description ? <p className="elite-paws-grooming-modal-desc">{plan.description}</p> : null}

          <div className="elite-paws-grooming-modal-list" role="list">
            <AnimatePresence mode="wait" initial={false} custom={direction}>
              <motion.div
                key={pageKey}
                className="elite-paws-grooming-modal-pagewrap"
                custom={direction}
                initial="enter"
                animate="center"
                exit="exit"
                variants={{
                  enter: (dir) => ({
                    rotateY: dir > 0 ? -70 : 70,
                    x: dir > 0 ? 30 : -30,
                    opacity: 0,
                    filter: 'blur(2px)',
                    transformOrigin: dir > 0 ? 'right center' : 'left center',
                  }),
                  center: {
                    rotateY: 0,
                    x: 0,
                    opacity: 1,
                    filter: 'blur(0px)',
                    transformOrigin: 'center center',
                    transition: { duration: 0.45, ease: [0.6, 0.06, 0.22, 1] },
                  },
                  exit: (dir) => ({
                    rotateY: dir > 0 ? 70 : -70,
                    x: dir > 0 ? -30 : 30,
                    opacity: 0,
                    filter: 'blur(2px)',
                    transformOrigin: dir > 0 ? 'left center' : 'right center',
                    transition: { duration: 0.38, ease: [0.6, 0.06, 0.22, 1] },
                  }),
                }}
              >
                {pageItems.map((item) => (
                  <div key={`${item.title}-${item.time}`} className="elite-paws-grooming-modal-item" role="listitem">
                    <div className="elite-paws-grooming-modal-item-top">
                      <h4 className="elite-paws-grooming-modal-item-title">{item.title}</h4>
                      {item.time ? <span className="elite-paws-grooming-modal-item-time">{item.time}</span> : null}
                    </div>
                    {item.desc ? <p className="elite-paws-grooming-modal-item-desc">{item.desc}</p> : null}
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {totalPages > 1 ? (
            <p className="elite-paws-grooming-modal-page">
              {currentPage + 1} / {totalPages}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function StackingCard({ plan, index, isSelected, scrollYProgress, totalCards, onOpenDetails }) {
  const img = getPlanImage(index, plan);
  const rightBottomLabels = [plan.duration, plan.time].filter(Boolean);
  const [heartBursts, setHeartBursts] = useState([]);

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
      data-plan-index={index}
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
          <p className="elite-paws-pricing-card-price">
            <PriceText price={plan.price} />
          </p>
          <div className="elite-paws-pricing-card-icons">
            <button
              type="button"
              className="elite-paws-pricing-icon-btn"
              aria-label="View full details"
              onClick={(e) => {
                e.stopPropagation();
                onOpenDetails?.(index, plan, img, e.currentTarget);
              }}
            >
              <ImEnlarge />
            </button>
            <button
              type="button"
              className="elite-paws-pricing-icon-btn elite-paws-pricing-heart-btn"
              aria-label="Save"
              onClick={(e) => {
                e.stopPropagation();
                const now = Date.now();
                const count = 14;
                const burst = Array.from({ length: count }).map((_, i) => {
                  // Smooth burst: pop mostly upward, then fade while drifting left/right/top.
                  // Wider spread + a slight left bias (so it doesn't feel right-heavy).
                  let deg = Math.random() * 180 - 90; // [-90..90]
                  if (deg > 0 && Math.random() < 0.45) deg = -deg; // bias to left
                  const angle = deg * (Math.PI / 180);
                  const dist = 48 + Math.random() * 42; // more spacing between particles
                  const x = Math.cos(angle) * dist;
                  const y = -Math.sin(angle) * dist - (60 + Math.random() * 50); // stronger upward travel

                  const rotate = (Math.random() * 60 - 30);
                  const scale = 0.7 + Math.random() * 0.55;
                  const delay = Math.random() * 0.12;
                  const duration = 0.95 + Math.random() * 0.35;
                  return {
                    id: `${now}-${i}`,
                    x,
                    y,
                    rotate,
                    scale,
                    delay,
                    duration,
                  };
                });
                setHeartBursts((prev) => [...prev, ...burst]);
                window.setTimeout(() => {
                  setHeartBursts((prev) => prev.filter((p) => !String(p.id).startsWith(String(now))));
                }, 1400);
              }}
            >
              <FaHeart />
              <span className="elite-paws-heart-burst" aria-hidden="true">
                {heartBursts.map((p) => (
                  <span
                    key={p.id}
                    className="elite-paws-heart-particle"
                    style={{
                      '--x': `${p.x}px`,
                      '--y': `${p.y}px`,
                      '--r': `${p.rotate}deg`,
                      '--s': p.scale,
                      '--d': `${p.duration}s`,
                      '--delay': `${p.delay}s`,
                    }}
                  >
                    <FaHeart />
                  </span>
                ))}
              </span>
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

export default function ElitePawsGroomingMenuSection() {
  const sectionRef = useRef(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [detailsVisible, setDetailsVisible] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [detailsPlan, setDetailsPlan] = useState(null);
  const [detailsImg, setDetailsImg] = useState(null);
  const [anchorRect, setAnchorRect] = useState(null);
  const [startLeft, setStartLeft] = useState(null);
  const [detailsOrigin, setDetailsOrigin] = useState(null);
  const pendingOpenRef = useRef(null);
  const openRafRef = useRef(null);

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

  const totalCards = groomingMenu.length + 1;
  const step = CARD_WIDTH + CARD_GAP;
  const maxOffset = (totalCards - 1) * step;
  const openStart = 0.05;
  const openEnd = 0.9;

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const offset = ((v - 0.05) / (0.9 - 0.05)) * maxOffset;
    const clamped = Math.max(0, Math.min(maxOffset, offset));
    const next = clamped <= 0 ? 0 : Math.min(totalCards - 1, Math.ceil(clamped / step));
    setSelectedIndex(next);
  });

  useEffect(() => {
    const updateStartLeft = () => {
      const stack = sectionRef.current?.querySelector?.('.elite-paws-pricing-cards-stack');
      const rect = stack?.getBoundingClientRect?.();
      if (rect) setStartLeft(rect.left);
    };
    updateStartLeft();
    window.addEventListener('resize', updateStartLeft);
    return () => window.removeEventListener('resize', updateStartLeft);
  }, []);

  const scrollCardToFrontThenOpen = (idx, plan, img) => {
    const el = sectionRef.current;
    if (!el) return;

    // target progress where scrollOffset ~= naturalX (so this card reaches x=0)
    const naturalX = idx * step;
    const targetProgress = openStart + (naturalX / maxOffset) * (openEnd - openStart);

    const rect = el.getBoundingClientRect();
    const sectionTop = window.scrollY + rect.top;
    const scrollRange = Math.max(1, rect.height - window.innerHeight);
    const targetY = sectionTop + targetProgress * scrollRange;

    // Cancel any pending/open waiters so we don't open later during scrolling.
    pendingOpenRef.current = null;
    if (openRafRef.current != null) cancelAnimationFrame(openRafRef.current);

    setSelectedIndex(idx);
    window.scrollTo({ top: targetY, behavior: 'smooth' });

    const openNow = () => {
      requestAnimationFrame(() => {
        const stack = sectionRef.current?.querySelector?.('.elite-paws-pricing-cards-stack');
        const cardEl = stack?.querySelector?.(`.elite-paws-pricing-card[data-plan-index="${idx}"]`);
        const r = cardEl?.getBoundingClientRect?.();
        if (r) setAnchorRect(r);

        // Make the modal open from the enlarge button position (bottom-left of the card)
        const btn = cardEl?.querySelector?.('button[aria-label="View full details"]');
        const btnRect = btn?.getBoundingClientRect?.();
        if (r && btnRect) {
          const modalWidth = CARD_WIDTH * 2 + CARD_GAP;
          const modalHeight = CARD_HEIGHT;
          const pad = 16;
          const maxLeft = window.innerWidth - modalWidth - pad;
          const desiredLeft = typeof startLeft === 'number' ? startLeft : r.left;
          const left = clamp(Math.min(desiredLeft, maxLeft), pad, maxLeft);
          const top = clamp(r.top, pad, window.innerHeight - modalHeight - pad);

          const originX = btnRect.left - left + btnRect.width / 2;
          const originY = btnRect.top - top + btnRect.height / 2;
          setDetailsOrigin({ x: originX, y: originY });
        } else {
          setDetailsOrigin(null);
        }

        setDetailsPlan(plan);
        setDetailsImg(img);
        setDetailsVisible(true);
        requestAnimationFrame(() => setDetailsOpen(true));
      });
    };

    // If we're already at the right spot, open immediately.
    const current = scrollYProgress.get();
    if (Math.abs(current - targetProgress) <= 0.012) {
      openNow();
      return;
    }

    // Otherwise, wait until smooth scroll reaches target (or timeout), then open.
    const start = performance.now();
    const TIMEOUT_MS = 1200;
    const tick = () => {
      const v = scrollYProgress.get();
      if (Math.abs(v - targetProgress) <= 0.012 || performance.now() - start > TIMEOUT_MS) {
        openRafRef.current = null;
        openNow();
        return;
      }
      openRafRef.current = requestAnimationFrame(tick);
    };
    openRafRef.current = requestAnimationFrame(tick);
  };

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
            <h2 className="elite-paws-pricing-heading">Elite Paws Grooming Menu</h2>
            <p className="elite-paws-pricing-sub">Explore our grooming menu and pick what fits your pet best.</p>
          </div>

          <div className="elite-paws-pricing-cards-wrap">
            <div
              className="elite-paws-pricing-cards-stack"
              style={{ width: totalCards * CARD_WIDTH + (totalCards - 1) * CARD_GAP }}
            >
              {groomingMenu.map((plan, index) => (
                <StackingCard
                  key={plan.id}
                  plan={plan}
                  index={index}
                  isSelected={index === selectedIndex}
                  scrollYProgress={scrollYProgress}
                  totalCards={totalCards}
                  onOpenDetails={(idx, p, img, btnEl) => {
                    scrollCardToFrontThenOpen(idx, p, img);
                  }}
                />
              ))}
              <CTACard
                index={groomingMenu.length}
                scrollYProgress={scrollYProgress}
                totalCards={totalCards}
              />
            </div>
          </div>
        </div>
      </div>

      <PlanDetailsModal
        isVisible={detailsVisible}
        isOpen={detailsOpen}
        onClose={() => {
          setDetailsOpen(false);
          window.setTimeout(() => {
            setDetailsVisible(false);
            setDetailsPlan(null);
            setDetailsImg(null);
            setAnchorRect(null);
            setDetailsOrigin(null);
          }, 460);
        }}
        plan={detailsPlan}
        img={detailsImg}
        anchorRect={anchorRect}
        startLeft={startLeft}
        origin={detailsOrigin}
      />
    </section>
  );
}
