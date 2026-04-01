import { Fragment } from 'react';
import Helmet from '../General/Helmet';
import HomeHero from '../Components/ElitePaws/HomeHero/HomeHero';
import ElitePawsGroomingMenuSection from '../Components/ElitePaws/PricingSection/ElitePawsGroomingMenuSection';
import ElitePawsServiceSection from '../Components/ElitePaws/ServiceSection/ElitePawsServiceSection';
import ElitePawsWhyChooseSection from '../Components/ElitePaws/WhyChooseSection/ElitePawsWhyChooseSection';

export default function ElitePawsHome() {
  return (
    <Fragment>
      <Helmet title="Elite Paws - Home">
        <HomeHero />
        <ElitePawsGroomingMenuSection />
        <ElitePawsServiceSection />
        <ElitePawsWhyChooseSection />
      </Helmet>
    </Fragment>
  );
}
