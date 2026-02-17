"use client"
import SEO from "@/components/data/seo";
import HeaderOne from "@/components/layout/headers/header/header-one";
import BreadCrumb from "../common/breadcrumb";
import ScrollToTop from "../common/scroll/scroll-to-top";
import FooterThree from "@/components/layout/footers/footer-three";
import Testimonial from "../home/testimonial";
import Link from "next/link";

const SeDevelopper = () => {
    return (
        <>
            <SEO pageTitle="Se Développer - Booste ton business avec l'IA" />
            <HeaderOne />
            <BreadCrumb title="Se Développer" innerTitle="Se Développer" />

            {/* Hero section */}
            <div className="about__two section-padding">
                <div className="container">
                    <div className="row align-items-center gy-4">
                        <div className="col-xl-10 col-lg-10 mx-auto">
                            <div className="about__two-content">
                                <span className="subtitle-one">Pilier 3</span>
                                <h2>Développe ton business avec l'IA</h2>
                                <p className="text-start">
                                    Que tu lances ton activité ou que tu sois déjà entrepreneur, l'IA est ton meilleur allié
                                    pour gagner du temps, automatiser et te démarquer. Je t'accompagne pour intégrer l'IA
                                    concrètement dans ton quotidien d'entrepreneur.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Section "Pour qui ?" */}
            <div className="services__one section-padding pt-0">
                <div className="container">
                    <div className="row justify-content-center text-center mb-50">
                        <div className="col-xl-8">
                            <span className="subtitle-one">Pour qui ?</span>
                            <h2>L'IA, c'est pour toi</h2>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-xl-5 col-lg-6 col-md-6 mb-30">
                            <div className="single-service text-center">
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
                            <div className="single-service text-center">
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

            {/* Section "Nos solutions" */}
            <div className="about__one section-padding">
                <div className="container">
                    <div className="row justify-content-center text-center mb-50">
                        <div className="col-xl-8">
                            <span className="subtitle-one">Nos solutions</span>
                            <h2>Comment je t'accompagne</h2>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-xl-4 col-lg-4 col-md-6 mb-30">
                            <div className="single-service text-center">
                                <div className="services__one-single-service-icon">
                                    <i className="flaticon-idea"></i>
                                </div>
                                <div className="services__one-single-service-content">
                                    <h4>Formations IA</h4>
                                    <p>Maîtrise les outils qui changent la donne : ChatGPT, automatisation, IA pour le marketing, la vente, la productivité. Des formations concrètes et pratiques.</p>
                                    <Link href="https://meet.brevo.com/kevin-a2ta2l/presentation" target="_blank" className="btn-one mt-20">
                                        Prendre RDV<i className="fas fa-arrow-right"></i>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-4 col-lg-4 col-md-6 mb-30">
                            <div className="single-service text-center">
                                <div className="services__one-single-service-icon">
                                    <i className="flaticon-web-research"></i>
                                </div>
                                <div className="services__one-single-service-content">
                                    <h4>Audit IA</h4>
                                    <p>On analyse ton business et on identifie les leviers IA qui vont te faire gagner du temps et de l'argent. Un diagnostic personnalisé de ton activité.</p>
                                    <Link href="https://meet.brevo.com/kevin-a2ta2l/presentation" target="_blank" className="btn-one mt-20">
                                        Prendre RDV<i className="fas fa-arrow-right"></i>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-4 col-lg-4 col-md-6 mb-30">
                            <div className="single-service text-center">
                                <div className="services__one-single-service-icon">
                                    <i className="flaticon-it"></i>
                                </div>
                                <div className="services__one-single-service-content">
                                    <h4>Outils & Accompagnement</h4>
                                    <p>Des outils concrets et un accompagnement pour intégrer l'IA dans ton quotidien d'entrepreneur. Du sur-mesure, pas du générique.</p>
                                    <Link href="https://meet.brevo.com/kevin-a2ta2l/presentation" target="_blank" className="btn-one mt-20">
                                        Prendre RDV<i className="fas fa-arrow-right"></i>
                                    </Link>
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
