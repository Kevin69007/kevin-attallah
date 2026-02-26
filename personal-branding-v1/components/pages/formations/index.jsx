"use client"
import SEO from "@/components/data/seo";
import HeaderOne from "@/components/layout/headers/header/header-one";
import BreadCrumb from "../common/breadcrumb";
import ScrollToTop from "../common/scroll/scroll-to-top";
import FooterThree from "@/components/layout/footers/footer-three";
import CategoriesMain from "../categorie-formations/categories";
import Testimonial from "../home/testimonial";

const FormationsPage = () => {
    return (
        <>
            <SEO pageTitle="Catalogue de formations" />
            <HeaderOne />
            <BreadCrumb title="Catalogue de formations" innerTitle="Formations" />
            <CategoriesMain />
            <Testimonial />
            <FooterThree />
            <ScrollToTop />
        </>
    );
};

export default FormationsPage;
