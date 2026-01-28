import { Fragment, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import AppLoader from './Components/AppLoader/AppLoader';
import AppRouter from './Components/AppRouter/AppRouter';
import routes from './routes/routes';
import Navbar from './Components/Common/Navbar/Navbar';
import Footer from './Components/Common/Footer/Footer';


export default function App() {
  const location = useLocation();
  const [ pageLoading, setPageLoading ] = useState(true);

  useEffect(() => {
    setPageLoading(true);

    const timeout = setTimeout(() => {
      setPageLoading(false);
    }, 1500); // Adjust loader duration

    return () => clearTimeout(timeout);
  }, [location.pathname]);

  return (
    <>
      <AppLoader isVisible={pageLoading} />
        {!pageLoading && (
          <Fragment>
            <Navbar />
            <AppRouter routes={routes} />
            <Footer />
          </Fragment>
        )}
    </>
  );
}