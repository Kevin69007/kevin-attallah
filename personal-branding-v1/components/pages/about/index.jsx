"use client"
import SEO from "@/components/data/seo";
import HeaderOne from "@/components/layout/headers/header/header-one";
import BreadCrumb from "../common/breadcrumb";
import ScrollToTop from "../common/scroll/scroll-to-top";
import FooterThree from "@/components/layout/footers/footer-three";
import About from "../home/about";
import LienReseau from "../home/liens-reseaux";
import Features from "../home/features";
import Testimonial from "../home/testimonial";
import ChooseFour from "../home/choose-us";
import WorkArea from "../home/work";
import ScrollAnimationBackground from "@/components/ScrollAnimationBackground";

const AboutUs = () => {
    return (
      <>
        {/* <div>
              <ScrollAnimationBackground />
          </div> */}
        <SEO pageTitle="À propos - Kevin Attallah" />
        <HeaderOne />
        <BreadCrumb title="À propos" innerTitle="À propos" />
        <LienReseau />
        <About />
        <Testimonial />
        <ChooseFour />
        <WorkArea/>
        <FooterThree />
        <ScrollToTop />
      </>
    );
};

export default AboutUs;