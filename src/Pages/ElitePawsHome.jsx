import { Fragment } from 'react';
import Helmet from '../General/Helmet';
import HomeHero from '../Components/ElitePaws/HomeHero-copy/HomeHero';
import ElitePawsGroomingMenuSection from '../Components/ElitePaws/PricingSection/ElitePawsGroomingMenuSection';
import ElitePawsServiceSection from '../Components/ElitePaws/ServiceSection/ElitePawsServiceSection';
import ElitePawsWhyChooseSection from '../Components/ElitePaws/WhyChooseSection/ElitePawsWhyChooseSection';

export default function ElitePawsHome() {
  return (
    <Fragment>
      <Helmet title="Elite Paws - Home">
        <section id="home">
          <HomeHero />
        </section>
        <section id="plans">
          <ElitePawsGroomingMenuSection />
        </section>
        <section id="services">
          <ElitePawsServiceSection />
        </section>
        <section id="why-choose">
          <ElitePawsWhyChooseSection />
        </section>
      </Helmet>
    </Fragment>
  );
}
