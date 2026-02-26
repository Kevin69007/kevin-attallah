"use client";
import SEO from "@/components/data/seo";
import ScrollToTop from "../common/scroll/scroll-to-top";
import HeaderOne from "@/components/layout/headers/header/header-one";
import BannerOne from "./banner";
import ChooseUs from "./choose-us";
import Portfolio from "./portfolio";
import Blog from "./blog";
import Testimonial from "./testimonial";
import Video from "./video";
import FooterThree from "@/components/layout/footers/footer-three";

import ScrollAnimationBackground from "@/components/ScrollAnimationBackground";
import LienReseau from "./liens-reseaux";
import Pillars from "./pillars";

const HomeOne = () => {
    return (
        <div>
            <div>
                <ScrollAnimationBackground />
            </div>
            <div id="contentAccueil">
            <SEO pageTitle='Kevin Attallah - Crée la vie qui te ressemble' />
            <HeaderOne />
            <BannerOne />
            <LienReseau />
            <Pillars />
            <ChooseUs />
            <Portfolio />
            <Testimonial />
            <Blog />
            <Video />
            <FooterThree />
            <ScrollToTop />
            </div>
        </div>
    );
};

export default HomeOne;
