"use client"
import SEO from "@/components/data/seo";
import HeaderOne from "@/components/layout/headers/header/header-one";
import ScrollToTop from "../common/scroll/scroll-to-top";
import FooterThree from "@/components/layout/footers/footer-three";
import Tab1 from "../home/tab1/tab1";
import Link from "next/link";
import image1 from "../../../public/assets/img/about/about-three.png";
import image2 from "../../../public/assets/img/about/about-two-2.png";
import image3 from "../../../public/assets/img/about/about-two-3.webp";
import whyChooseImg1 from "../../../public/assets/img/why-choose-us/why-choose-2.png";
import whyChooseImg2 from "../../../public/assets/img/why-choose-us/why-choose.png";

const SeLancer = () => {
    return (
        <>
            <SEO pageTitle="Se Lancer - Crée ton entreprise" />
            <HeaderOne />
            <Tab1 />

            {/* Section bonus : formation offerte (pattern formation-creation.jsx) */}
            <div className="about__two section-padding">
                <div className="container">
                    <div className="row align-items-center gy-4">
                        <div className="col-xl-6 col-lg-6">
                            <div className="about__two-left">
                                <div className="row align-items-center">
                                    <div className="col-xl-6 col-lg-7 col-md-6 col-6">
                                        <div className="about__two-left-image-left-side">
                                            <img src={image1.src} alt="formation" />
                                        </div>
                                    </div>
                                    <div className="col-xl-6 col-lg-5 col-md-5 col-6">
                                        <div className="about__two-left-right-image">
                                            <img src={image2.src} alt="formation" />
                                        </div>
                                        <div className="about__two-left-progressbar">
                                            <img src={image3.src} alt="formation" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-6 col-lg-6">
                            <div className="about__two-content">
                                <span className="subtitle-one">Bonus inclus</span>
                                <h2>Une formation offerte avec ton accompagnement</h2>
                                <p className="text-start">
                                    Pour te donner le maximum de chances de réussir, chaque accompagnement inclut une formation offerte
                                    de notre catalogue. Langues, bureautique, marketing digital, soft skills... à toi de choisir
                                    celle qui va booster ton projet.
                                </p>
                                <div className="about__two-content-service">
                                    <div className="service">
                                        <i className="far fa-check-circle"></i>
                                        <span>+20 formations disponibles</span>
                                    </div>
                                    <div className="service">
                                        <i className="far fa-check-circle"></i>
                                        <span>100% en ligne, à ton rythme</span>
                                    </div>
                                    <div className="service">
                                        <i className="far fa-check-circle"></i>
                                        <span>Offerte avec l'accompagnement</span>
                                    </div>
                                </div>
                                <Link href="/formations" className="btn-one">
                                    Voir le catalogue<i className="fas fa-arrow-right"></i>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bandeau IA (pattern choose-us.jsx) */}
            <div className="why-choose-us__three section-padding">
                <div className="container">
                    <div className="row gy-4">
                        <div className="col-xl-6 col-lg-6 col-md-10">
                            <div className="why-choose-us__three-left">
                                <div className="why-choose-us__three-title">
                                    <span className="subtitle-one">IA incluse</span>
                                    <h2>Ton projet sera pensé pour le monde d'aujourd'hui</h2>
                                    <p>
                                        En 2026, lancer un business sans intégrer l'IA, c'est partir avec un handicap.
                                        Je m'assure que ton projet est moderne, compétitif et prêt pour le monde de demain.
                                    </p>
                                </div>
                                <Link href="/se-developper" className="btn-two mt-20">
                                    Décoller avec l'IA<i className="fas fa-arrow-right"></i>
                                </Link>
                            </div>
                        </div>
                        <div className="col-xl-5 offset-xl-1 col-lg-6 col-md-10">
                            <div className="why-choose-us__three-image">
                                <img src={whyChooseImg1.src} alt="IA" className="why-choose-us__three-floating-image animate-y-axis-slider" />
                                <img src={whyChooseImg2.src} alt="IA" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <FooterThree />
            <ScrollToTop />
        </>
    );
};

export default SeLancer;
