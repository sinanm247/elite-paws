import { Fragment, useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import image1 from '../../../assets/New-Gallery/Image-1.jpeg';
import image2 from '../../../assets/New-Gallery/Image-2.jpeg';
import image3 from '../../../assets/New-Gallery/Image-3.jpeg';
import image4 from '../../../assets/New-Gallery/Image-4.jpeg';
import image5 from '../../../assets/New-Gallery/Image-11.jpeg';
import image6 from '../../../assets/New-Gallery/Image-6.jpeg';
import image7 from '../../../assets/New-Gallery/Image-7.jpeg';
import image8 from '../../../assets/New-Gallery/Image-8.jpg';
import image9 from '../../../assets/New-Gallery/Image-9.jpeg';
import image10 from '../../../assets/New-Gallery/Image-10.jpeg';
import './ElitePawsPortfolioSection.scss';

const GALLERY_IMAGES = [
  image1,
  image2,
  image3,
  image4,
  image5,
  image6,
  image7,
  image8,
  image9,
  image10,
];

/** Interleaved blocks: images + copy + stats — left / right columns */
const LEFT_COLUMN = [
  { kind: 'image', index: 0 },
  {
    kind: 'text',
    title: 'What’s in a grooming plan',
    body: [
      'Every visit lists bath, blow-dry, brush-out, nails, ears, and breed-appropriate trim so you know exactly what you are booking. Pick a tier that fits coat length, shedding level, and how often your pet needs a refresh.',
    ],
  },
  { kind: 'image', index: 1 },
  {
    kind: 'metric',
    label: 'Pets groomed monthly',
    value: '120+',
  },
  { kind: 'image', index: 2 },
  {
    kind: 'text',
    title: 'Add-on services',
    body: [
      'Teeth, de-shedding, skin-soothing treatments, and paw-pad care can be layered onto your core appointment—scheduled in one go so timing and pricing stay transparent.',
    ],
  },
  { kind: 'image', index: 3 },
  {
    kind: 'text',
    title: 'From pet parents in Dubai',
    body: [
      '“We book the same plan each month—the team remembers our dog’s sensitivities and never rushes the dry or the finish.”',
    ],
  },
  { kind: 'image', index: 4 },
];

const RIGHT_COLUMN = [
  {
    kind: 'text',
    title: 'Mobile grooming, full menu',
    body: [
      'We bring the same salon-grade tubs, dryers, and safe handling to your building or villa—no crate queues, no noisy waiting room. Ideal for anxious pets and busy schedules.',
    ],
  },
  { kind: 'image', index: 5 },
  {
    kind: 'metric',
    label: 'Would recommend us',
    value: '98%',
  },
  { kind: 'image', index: 6 },
  {
    kind: 'text',
    title: 'Coat & skin first',
    body: [
      'Products are chosen for your pet’s coat type and any allergies we discuss at booking. We note what worked last time so the next visit stays consistent.',
    ],
  },
  { kind: 'image', index: 7 },
  {
    kind: 'text',
    title: 'Repeat bookings',
    body: [
      'Most families choose a standing slot every 4–6 weeks. Same groomer when possible, same checklist—fewer surprises for your pet and for you.',
    ],
  },
  { kind: 'image', index: 8 },
  {
    kind: 'text',
    title: 'Numbers we track',
    body: [
      'Average first-response under 2 hours on WhatsApp. Hundreds of completed home visits across Dubai communities we already serve weekly.',
    ],
  },
  { kind: 'image', index: 9 },
];

function TextCard({ title, body }) {
  return (
    <article className="elite-paws-portfolio-card elite-paws-portfolio-card-text">
      {title ? <h2 className="elite-paws-portfolio-card-text-title">{title}</h2> : null}
      {body.map((paragraph, i) => (
        <p key={i}>{paragraph}</p>
      ))}
    </article>
  );
}

function MetricCard({ label, value }) {
  return (
    <article className="elite-paws-portfolio-card elite-paws-portfolio-card-metric">
      <h3>{label}</h3>
      <p>{value}</p>
    </article>
  );
}

function renderBlock(block, sideKey) {
  if (block.kind === 'text') {
    return <TextCard key={`${sideKey}-text-${block.title}`} title={block.title} body={block.body} />;
  }
  if (block.kind === 'metric') {
    return (
      <MetricCard key={`${sideKey}-metric-${block.label}`} label={block.label} value={block.value} />
    );
  }
  const idx = block.index;
  const src = GALLERY_IMAGES[idx];
  return (
    <article
      key={`${sideKey}-img-${idx}`}
      className="elite-paws-portfolio-card elite-paws-portfolio-card-image"
    >
      <img src={src} alt={`Elite Paws grooming — gallery ${idx + 1}`} />
    </article>
  );
}

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
            <span>Grooming menu</span>
            <span>Care plans</span>
            <span>Happy clients</span>
            {/* <span>Mobile Dubai</span> */}
          </div>
          <h1 className="elite-paws-portfolio-title">Plans &amp; grooming</h1>
          <p className="elite-paws-portfolio-subtitle">
            Services, stats, and real feedback—woven through every step of your pet&apos;s care.
          </p>
        </aside>

        <div className="elite-paws-portfolio-right">
          <div className="elite-paws-portfolio-column elite-paws-portfolio-column-left">
            {LEFT_COLUMN.map((block, i) => (
              <Fragment key={`left-${i}`}>{renderBlock(block, 'left')}</Fragment>
            ))}
          </div>

          <div className="elite-paws-portfolio-column elite-paws-portfolio-column-right">
            {RIGHT_COLUMN.map((block, i) => (
              <Fragment key={`right-${i}`}>{renderBlock(block, 'right')}</Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
