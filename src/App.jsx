import { Fragment, useEffect, useLayoutEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { APP_LOADER_DURATION_MS } from './constants/appLoader';
import { AppLoaderContext } from './context/AppLoaderContext';
import AppLoader from './Components/AppLoader/AppLoader';
import AppRouter from './Components/AppRouter/AppRouter';
import routes from './routes/routes';
import ElitePawsNavbar from './Components/ElitePaws/Navbar/ElitePawsNavbar';
// import Footer from './Components/Common/Footer/Footer';
import ElitePawsFooter from './Components/ElitePaws/Footer/ElitePawsFooter';


export default function App() {
  const location = useLocation();
  const [ pageLoading, setPageLoading ] = useState(true);

  /** SPA route changes do not reset scroll — new pages inherit prior scrollY (e.g. long home → portfolio looks “stuck” at bottom). */
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    setPageLoading(true);

    const timeout = setTimeout(() => {
      setPageLoading(false);
    }, APP_LOADER_DURATION_MS);

    return () => clearTimeout(timeout);
  }, [location.pathname]);

  return (
    <AppLoaderContext.Provider
      value={{ isPageLoading: pageLoading, loaderDurationMs: APP_LOADER_DURATION_MS }}
    >
      <AppLoader isVisible={pageLoading} />
      <div className={`app-shell ${!pageLoading ? 'is-ready' : ''}`}>
        <Fragment>
          <ElitePawsNavbar />
          <AppRouter routes={routes} />
          <ElitePawsFooter />
        </Fragment>
      </div>
    </AppLoaderContext.Provider>
  );
}