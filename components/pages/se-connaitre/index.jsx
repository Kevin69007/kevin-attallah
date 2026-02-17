"use client"
import SEO from "@/components/data/seo";
import HeaderOne from "@/components/layout/headers/header/header-one";
import BreadCrumb from "../common/breadcrumb";
import ScrollToTop from "../common/scroll/scroll-to-top";
import FooterThree from "@/components/layout/footers/footer-three";
import Testimonial from "../home/testimonial";
import Link from "next/link";

const SeConnaitre = () => {
    return (
        <>
            <SEO pageTitle="Se Connaître - Trouve ta voie" />
            <HeaderOne />
            <BreadCrumb title="Se Connaître" innerTitle="Se Connaître" />

            {/* Section principale */}
            <div className="about__two section-padding">
                <div className="container">
                    <div className="row align-items-center gy-4">
                        <div className="col-xl-10 col-lg-10 mx-auto">
                            <div className="about__two-content">
                                <span className="subtitle-one">Pilier 1</span>
                                <h2>Trouve ta voie</h2>
                                <p className="text-start">
                                    Avant de créer un business ou de changer de vie, il faut savoir pourquoi tu le fais.
                                    Je t'aide à trouver ce qui a du sens pour toi, sans blabla ni perte de temps.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Les 3 offres */}
            <div className="services__one section-padding pt-0">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-xl-4 col-lg-4 col-md-6 mb-30">
                            <div className="single-service text-center">
                                <div className="services__one-single-service-icon">
                                    <i className="flaticon-idea"></i>
                                </div>
                                <div className="services__one-single-service-content">
                                    <h4>Coaching Ikigai</h4>
                                    <p>Découvre ce qui te fait vibrer, ce en quoi tu es doué, ce dont le monde a besoin et ce pour quoi on peut te payer. L'Ikigai est la boussole qui t'aide à aligner passion, talents, mission et vocation.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-4 col-lg-4 col-md-6 mb-30">
                            <div className="single-service text-center">
                                <div className="services__one-single-service-icon">
                                    <i className="flaticon-web-research"></i>
                                </div>
                                <div className="services__one-single-service-content">
                                    <h4>Bilan de compétences</h4>
                                    <p>Fais le point sur tes talents, tes aspirations et tes possibilités. Un accompagnement structuré pour te repositionner avec clarté. Éligible au financement CPF.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-4 col-lg-4 col-md-6 mb-30">
                            <div className="single-service text-center">
                                <div className="services__one-single-service-icon">
                                    <i className="flaticon-global-network"></i>
                                </div>
                                <div className="services__one-single-service-content">
                                    <h4>Accompagnement cadre de vie</h4>
                                    <p>Questionne ton environnement idéal pour t'épanouir vraiment. J'ai moi-même vécu cette réflexion en m'expatriant en Égypte — je t'aide à te poser les bonnes questions.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row justify-content-center mt-50">
                        <div className="col-xl-6 text-center">
                            <Link href="https://meet.brevo.com/kevin-a2ta2l/faites-le-point-sur-votre-avenir-professionnel-avec-un-bilan-de-competences-" target="_blank" className="btn-two">
                                Prendre RDV<i className="fas fa-arrow-right"></i>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <Testimonial />
            <FooterThree />
            <ScrollToTop />
        </>
    );
};

export default SeConnaitre;
