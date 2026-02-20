"use client"
import SEO from "@/components/data/seo";
import HeaderOne from "@/components/layout/headers/header/header-one";
import BreadCrumb from "../common/breadcrumb";
import ScrollToTop from "../common/scroll/scroll-to-top";
import FooterThree from "@/components/layout/footers/footer-three";
import Testimonial from "../home/testimonial";
import Link from "next/link";
import ikigaiImg from "../../../public/assets/img/about/ikigai_white.png";
import aboutImg1 from "../../../public/assets/img/about/about-1.png";
import aboutImg2 from "../../../public/assets/img/about/about-21.png";

const SeConnaitre = () => {
    return (
        <>
            <SEO pageTitle="Trouver ton idée - Trouve ta voie" />
            <HeaderOne />
            <BreadCrumb title="Trouver ton idée" innerTitle="Trouver ton idée" />

            {/* Hero section avec image Ikigai */}
            <div className="about__two section-padding">
                <div className="container">
                    <div className="row align-items-center gy-4">
                        <div className="col-xl-6 col-lg-6">
                            <div className="about__two-left">
                                <div className="row align-items-center justify-content-center">
                                    <div className="col-xl-8 col-lg-8 col-md-8">
                                        <div className="about__two-left-image-left-side animate-y-axis-slider">
                                            <img src={ikigaiImg.src} alt="Ikigai" style={{borderRadius: '20px'}} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-6 col-lg-6">
                            <div className="about__two-content">
                                <span className="subtitle-one">Pilier 1</span>
                                <h2>Stop aux fausses bonnes idées. Trouve celle qui va VRAIMENT marcher</h2>
                                <p className="text-start">
                                    Avant de créer un business ou de changer de vie, il faut savoir pourquoi tu le fais.
                                    Je t'aide à trouver ce qui a du sens pour toi, sans blabla ni perte de temps.
                                </p>
                                <div className="about__two-content-service">
                                    <div className="service">
                                        <i className="far fa-check-circle"></i>
                                        <span>Coaching basé sur l'Ikigai</span>
                                    </div>
                                    <div className="service">
                                        <i className="far fa-check-circle"></i>
                                        <span>Bilan de compétences (éligible CPF)</span>
                                    </div>
                                    <div className="service">
                                        <i className="far fa-check-circle"></i>
                                        <span>Réflexion sur ton cadre de vie idéal</span>
                                    </div>
                                </div>
                                <Link href="https://meet.brevo.com/kevin-a2ta2l/faites-le-point-sur-votre-avenir-professionnel-avec-un-bilan-de-competences-" target="_blank" className="btn-two">Prendre RDV<i className="fas fa-arrow-right"></i></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Section 3 offres avec image centrale (pattern features.jsx) */}
            <div className="services__one section-padding" style={{backgroundColor: 'var(--color-1)'}}>
                <div className="container">
                    <div className="row justify-content-center text-center mb-50">
                        <div className="col-xl-8">
                            <span className="subtitle-one" style={{color: 'var(--primary-color-1)'}}>Mes offres</span>
                            <h2 style={{color: '#1a1a2e'}}>Comment je t'<span className="highlighted">accompagne</span></h2>
                        </div>
                    </div>
                    <div className="row align-items-center justify-content-center">
                        <div className="col-xl-4 col-lg-4 col-md-6">
                            <div className="single-service" style={{borderLeft: '4px solid var(--primary-color-1)'}}>
                                <div className="services__one-single-service-icon">
                                    <i className="flaticon-idea"></i>
                                </div>
                                <div className="services__one-single-service-content">
                                    <h4>Coaching Ikigai</h4>
                                    <p>Ton billet pour ne pas te planter dans 6 mois</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-4 col-lg-4 col-md-6">
                            <div className="single-service" style={{borderLeft: '4px solid var(--primary-color-1)'}}>
                                <div className="services__one-single-service-icon">
                                    <i className="flaticon-web-research"></i>
                                </div>
                                <div className="services__one-single-service-content">
                                    <h4>Bilan de compétences</h4>
                                    <p>Tes vrais super-pouvoirs sont cachés. On va les déterrer. Éligible au financement CPF.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-4 col-lg-4 col-md-6">
                            <div className="single-service" style={{borderLeft: '4px solid var(--primary-color-1)'}}>
                                <div className="services__one-single-service-icon">
                                    <i className="flaticon-global-network"></i>
                                </div>
                                <div className="services__one-single-service-content">
                                    <h4>Cadre de vie</h4>
                                    <p>Questionne ton environnement idéal. J'ai moi-même vécu cette réflexion en m'expatriant en Égypte — je t'aide à te poser les bonnes questions.</p>
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
