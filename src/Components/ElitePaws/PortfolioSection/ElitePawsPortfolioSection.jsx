import imageMain from '../../../assets/Gallery/Image-24.jpeg';
import imageTall from '../../../assets/Gallery/Image-13.jpeg';
import imageWide from '../../../assets/Gallery/Image-19.jpeg';
import imageBottom from '../../../assets/Gallery/Image-30.jpeg';
import './ElitePawsPortfolioSection.scss';

export default function ElitePawsPortfolioSection() {
  return (
    <section className="elite-paws-portfolio">
      <div className="elite-paws-portfolio-inner">
        <aside className="elite-paws-portfolio-left">
          <div className="elite-paws-portfolio-tags">
            <span>Content creation</span>
            <span>Community management</span>
            <span>Social media strategy</span>
          </div>
          <h1 className="elite-paws-portfolio-title">The Shepherd&rsquo;s Bag</h1>
          <p className="elite-paws-portfolio-subtitle">Tradition, material, character.</p>
          <a href="/" className="elite-paws-portfolio-back">Back to Projects</a>
        </aside>

        <div className="elite-paws-portfolio-right">
          <article className="elite-paws-portfolio-card elite-paws-portfolio-card-image elite-paws-portfolio-card-main">
            <img src={imageMain} alt="Portfolio main" />
          </article>

          <article className="elite-paws-portfolio-card elite-paws-portfolio-card-text">
            <p>
              Le Sac du Berger is a French artisan company based in Aveyron, designing durable
              bags, clothing, and accessories from natural materials.
            </p>
            <p>
              Each piece is handcrafted with meticulous attention to detail and authenticity. We
              supported their brand storytelling and content execution.
            </p>
          </article>

          <article className="elite-paws-portfolio-card elite-paws-portfolio-card-image elite-paws-portfolio-card-wide">
            <img src={imageWide} alt="Portfolio wide" />
          </article>

          <article className="elite-paws-portfolio-card elite-paws-portfolio-card-metric">
            <h3>Average engagement rate</h3>
            <p>8%</p>
          </article>

          <article className="elite-paws-portfolio-card elite-paws-portfolio-card-image elite-paws-portfolio-card-tall">
            <img src={imageTall} alt="Portfolio detail" />
          </article>

          <article className="elite-paws-portfolio-card elite-paws-portfolio-card-metric">
            <h3>Evolution of the community over one year</h3>
            <p>+20%</p>
          </article>

          <article className="elite-paws-portfolio-card elite-paws-portfolio-card-image elite-paws-portfolio-card-bottom">
            <img src={imageBottom} alt="Portfolio bottom" />
          </article>
        </div>
      </div>
    </section>
  );
}
