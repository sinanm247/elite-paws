import { Fragment } from 'react';
import Helmet from '../General/Helmet';
import ElitePawsPortfolioSection from '../Components/ElitePaws/PortfolioSection/ElitePawsPortfolioSection';

export default function PortfolioPage() {
  return (
    <Fragment>
      <Helmet title="Elite Paws - Portfolio">
        <ElitePawsPortfolioSection />
      </Helmet>
    </Fragment>
  );
}
