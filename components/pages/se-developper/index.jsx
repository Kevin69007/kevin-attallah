"use client"
import SEO from "@/components/data/seo";
import HeaderOne from "@/components/layout/headers/header/header-one";
import BreadCrumb from "../common/breadcrumb";
import ScrollToTop from "../common/scroll/scroll-to-top";
import FooterThree from "@/components/layout/footers/footer-three";
import Testimonial from "../home/testimonial";
import Link from "next/link";
import image1 from "../../../public/assets/img/about/about-three.png";
import image2 from "../../../public/assets/img/about/about-two-2.png";
import image3 from "../../../public/assets/img/about/about-two-3.webp";
import servicesImg from "../../../public/assets/img/service/services.png";

const SeDevelopper = () => {
    return (
        <>
            <SEO pageTitle="Décoller avec l'IA - Booste ton business" />
            <HeaderOne />
            <BreadCrumb title="Décoller avec l'IA" innerTitle="Décoller avec l'IA" />

            {/* Hero section avec images (pattern formation-creation.jsx) */}
            <div className="about__two section-padding">
                <div className="container">
                    <div className="row align-items-center gy-4">
                        <div className="col-xl-6 col-lg-6">
                            <div className="about__two-left">
                                <div className="row align-items-center">
                                    <div className="col-xl-6 col-lg-7 col-md-6 col-6">
                                        <div className="about__two-left-image-left-side">
                                            <img src={image1.src} alt="IA business" />
                                        </div>
                                    </div>
                                    <div className="col-xl-6 col-lg-5 col-md-5 col-6">
                                        <div className="about__two-left-right-image">
                                            <img src={image2.src} alt="IA business" />
                                        </div>
                                        <div className="about__two-left-progressbar">
                                            <img src={image3.src} alt="IA business" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-6 col-lg-6">
                            <div className="about__two-content">
                                <span className="subtitle-one">Pilier 3</span>
                                <h2>Décolle avec l'IA</h2>
                                <p className="text-start">
                                    Que tu lances ton activité ou que tu sois déjà entrepreneur, l'IA est ton meilleur allié
                                    pour gagner du temps, automatiser et te démarquer. Je t'accompagne pour intégrer l'IA
                                    concrètement dans ton quotidien d'entrepreneur.
                                </p>
                                <div className="about__two-content-service">
                                    <div className="service">
                                        <i className="far fa-check-circle"></i>
                                        <span>Formations IA pratiques</span>
                                    </div>
                                    <div className="service">
                                        <i className="far fa-check-circle"></i>
                                        <span>Audits personnalisés</span>
                                    </div>
                                    <div className="service">
                                        <i className="far fa-check-circle"></i>
                                        <span>Outils concrets pour entrepreneurs</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Section "Pour qui ?" avec fond coloré */}
            <div className="services__one section-padding" style={{backgroundColor: 'var(--color-1)'}}>
                <div className="container">
                    <div className="row justify-content-center text-center mb-50">
                        <div className="col-xl-8">
                            <span className="subtitle-one" style={{color: 'var(--primary-color-1)'}}>Pour qui ?</span>
                            <h2 style={{color: '#1a1a2e'}}>L'IA, c'est pour <span className="highlighted">toi</span></h2>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-xl-5 col-lg-6 col-md-6 mb-30">
                            <div className="single-service text-center" style={{borderLeft: '4px solid var(--primary-color-1)'}}>
                                <div className="services__one-single-service-icon">
                                    <i className="flaticon-global-network"></i>
                                </div>
                                <div className="services__one-single-service-content">
                                    <h4>Tu lances ton business</h4>
                                    <p>Intègre l'IA dès le départ pour un projet moderne et compétitif. Automatise, optimise et gagne un temps précieux dès le lancement.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-5 col-lg-6 col-md-6 mb-30">
                            <div className="single-service text-center" style={{borderLeft: '4px solid var(--primary-color-1)'}}>
                                <div className="services__one-single-service-icon">
                                    <i className="flaticon-data-scientist"></i>
                                </div>
                                <div className="services__one-single-service-content">
                                    <h4>Tu as déjà une entreprise</h4>
                                    <p>Passe au niveau supérieur avec l'IA. Optimise tes processus, automatise tes tâches répétitives et scale ton activité intelligemment.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Section "Nos solutions" avec image centrale (pattern features.jsx) */}
            <div className="services__one section-padding">
                <div className="container">
                    <div className="row justify-content-center text-center mb-50">
                        <div className="col-xl-8">
                            <span className="subtitle-one" style={{color: 'var(--primary-color-1)'}}>Nos solutions</span>
                            <h2 style={{color: '#1a1a2e'}}>Comment je t'accompagne</h2>
                        </div>
                    </div>
                    <div className="row align-items-center justify-content-center">
                        <div className="col-xl-3">
                            <div className="row">
                                <div className="col-xl-12 col-md-6">
                                    <div className="single-service">
                                        <div className="services__one-single-service-icon">
                                            <i className="flaticon-idea"></i>
                                        </div>
                                        <div className="services__one-single-service-content">
                                            <h4>Formations IA</h4>
                                            <p>Maîtrise les outils qui changent la donne : ChatGPT, automatisation, IA pour le marketing, la vente, la productivité.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-6 col-lg-7">
                            <div className="services-image-wrapper">
                                <img src={servicesImg.src} alt="solutions IA" />
                            </div>
                        </div>
                        <div className="col-xl-3">
                            <div className="row">
                                <div className="col-xl-12 col-md-6">
                                    <div className="single-service">
                                        <div className="services__one-single-service-icon">
                                            <i className="flaticon-web-research"></i>
                                        </div>
                                        <div className="services__one-single-service-content">
                                            <h4>Audit IA</h4>
                                            <p>On analyse ton business et on identifie les leviers IA qui vont te faire gagner du temps et de l'argent.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-12 col-md-6 xl-mb-30">
                                    <div className="single-service">
                                        <div className="services__one-single-service-icon">
                                            <i className="flaticon-it"></i>
                                        </div>
                                        <div className="services__one-single-service-content">
                                            <h4>Outils & Accompagnement</h4>
                                            <p>Des outils concrets et un accompagnement pour intégrer l'IA dans ton quotidien d'entrepreneur.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* CTA principal */}
                    <div className="row justify-content-center mt-50">
                        <div className="col-xl-6 text-center">
                            <Link href="https://meet.brevo.com/kevin-a2ta2l/presentation" target="_blank" className="btn-two">
                                Prendre RDV pour en parler<i className="fas fa-arrow-right"></i>
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

export default SeDevelopper;
