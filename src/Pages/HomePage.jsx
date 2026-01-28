import { Fragment } from "react";
import Helmet from "../General/Helmet";
import HomeHero from "../Components/HomePage/HomeHero/HomeHero";
import AboutUs from "../Components/HomePage/AboutUs/AboutUs";
import TrustUs from "../Components/HomePage/TrustUs/TrustUs";
import FeaturesSlide from "../Components/HomePage/FeaturesSlide/FeaturesSlide";
import Services from "../Components/HomePage/Services/Services";
import PricingPlans from "../Components/HomePage/PricingPlans/PricingPlans";
import CTASection from "../Components/HomePage/CTASection/CTASection";
import Testimonials from "../Components/HomePage/Testimonials/Testimonials";

export default function HomePage() {
    return (
        <Fragment>
            <Helmet title="Elite Paws - Home">
                <HomeHero />
                <AboutUs />
                <TrustUs />
                <FeaturesSlide />
                <Services />
                <CTASection />
                <PricingPlans />
                <Testimonials />
            </Helmet>
        </Fragment>
    )
}