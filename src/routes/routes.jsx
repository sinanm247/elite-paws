import PageNotFound from "../Components/PageNotFound/PageNotFound.jsx";
import Thankyou from "../Components/ThankYouPage/Thankyou.jsx";
import UnAuthorized from "../Components/UnAuthorized/UnAuthorixed.jsx";
import ElitePawsHome from "../Pages/ElitePawsHome.jsx";
import PortfolioPage from "../Pages/PortfolioPage.jsx";

const routes = [
  {
    path: "/",
    element: <ElitePawsHome/>,
    isProtected: false,
  },
  {
    path: "/portfolio",
    element: <PortfolioPage/>,
    isProtected: false,
  },
  {
    path: "*",
    element: <PageNotFound/>,
    isProtected: false,
  },
  {
    path: "/thank-you",
    element: <Thankyou/>,
    isProtected: false,
  },
  {
    path: "/un-authorized",
    element: <UnAuthorized/>,
    isProtected: false,
  },
];

export default routes;




