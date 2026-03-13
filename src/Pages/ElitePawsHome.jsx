import { Fragment } from 'react';
import Helmet from '../General/Helmet';
import HomeHero from '../Components/ElitePaws/HomeHero/HomeHero';
import ElitePawsPricingSection from '../Components/ElitePaws/PricingSection/ElitePawsPricingSection';
import ElitePawsServiceSection from '../Components/ElitePaws/ServiceSection/ElitePawsServiceSection';

export default function ElitePawsHome() {
  return (
    <Fragment>
      <Helmet title="Elite Paws - Home">
        <HomeHero />
        <ElitePawsPricingSection />
        <ElitePawsServiceSection />
      </Helmet>
    </Fragment>
  );
}
