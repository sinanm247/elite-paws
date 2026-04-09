import { Fragment, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { APP_LOADER_DURATION_MS } from './constants/appLoader';
import { AppLoaderContext } from './context/AppLoaderContext';
import AppLoader from './Components/AppLoader/AppLoader';
import AppRouter from './Components/AppRouter/AppRouter';
import routes from './routes/routes';
import ElitePawsNavbar from './Components/ElitePaws/Navbar/ElitePawsNavbar';
// import Footer from './Components/Common/Footer/Footer';
import ElitePawsFooter from './Components/ElitePaws/Footer/ElitePawsFooter';

const IMAGE_LOADER_DURATION_MS = 1200;

export default function App() {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [pendingLocation, setPendingLocation] = useState(null);
  const [ pageLoading, setPageLoading ] = useState(true);
  const [loaderDurationMs, setLoaderDurationMs] = useState(APP_LOADER_DURATION_MS);
  const [showLoaderVideo, setShowLoaderVideo] = useState(true);
  const hasShownInitialLoaderRef = useRef(false);

  /** SPA route changes do not reset scroll — new pages inherit prior scrollY (e.g. long home → portfolio looks “stuck” at bottom). */
  useLayoutEffect(() => {
    if (location.pathname !== displayLocation.pathname) {
      setPendingLocation(location);
    }
    window.scrollTo(0, 0);
    const shouldPlayVideo = !hasShownInitialLoaderRef.current;
    const nextDuration = shouldPlayVideo ? APP_LOADER_DURATION_MS : IMAGE_LOADER_DURATION_MS;
    setShowLoaderVideo(shouldPlayVideo);
    setLoaderDurationMs(nextDuration);
    setPageLoading(true);
  }, [location.pathname, displayLocation.pathname, location]);

  useEffect(() => {
    if (!pageLoading) return undefined;

    const timeout = setTimeout(() => {
      setPageLoading(false);
      if (pendingLocation) {
        setDisplayLocation(pendingLocation);
        setPendingLocation(null);
      }
      hasShownInitialLoaderRef.current = true;
    }, loaderDurationMs);

    return () => clearTimeout(timeout);
  }, [pageLoading, loaderDurationMs, pendingLocation]);

  return (
    <AppLoaderContext.Provider
      value={{ isPageLoading: pageLoading, loaderDurationMs }}
    >
      <AppLoader isVisible={pageLoading} showVideo={showLoaderVideo} />
      <div className={`app-shell ${!pageLoading ? 'is-ready' : ''}`}>
        <Fragment>
          <ElitePawsNavbar />
          <AppRouter routes={routes} location={displayLocation} />
          <ElitePawsFooter />
        </Fragment>
      </div>
    </AppLoaderContext.Provider>
  );
}