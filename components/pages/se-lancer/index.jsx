"use client"
import SEO from "@/components/data/seo";
import HeaderOne from "@/components/layout/headers/header/header-one";
import ScrollToTop from "../common/scroll/scroll-to-top";
import FooterThree from "@/components/layout/footers/footer-three";
import Tab1 from "../home/tab1/tab1";
import Link from "next/link";

const SeLancer = () => {
    return (
        <>
            <SEO pageTitle="Se Lancer - Crée ton entreprise" />
            <HeaderOne />
            <Tab1 />

            {/* Section bonus : formation offerte */}
            <div className="about__one section-padding">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-xl-10 col-lg-10">
                            <div className="about__one-content text-center">
                                <span className="subtitle-one">Bonus inclus</span>
                                <h2>Une formation offerte avec ton accompagnement</h2>
                                <p>
                                    Pour te donner le maximum de chances de réussir, chaque accompagnement inclut une formation offerte
                                    de notre catalogue. Langues, bureautique, marketing digital, soft skills... à toi de choisir
                                    celle qui va booster ton projet.
                                </p>
                                <Link href="/formations" className="btn-one mt-20">
                                    Voir le catalogue de formations<i className="fas fa-arrow-right"></i>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bandeau IA */}
            <div className="why-choose-us__three section-padding pt-0">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-xl-10 col-lg-10">
                            <div className="why-choose-us__three-left text-center">
                                <div className="why-choose-us__three-title">
                                    <h2>Ton projet sera pensé pour le monde d'aujourd'hui — IA incluse</h2>
                                    <p>
                                        En 2026, lancer un business sans intégrer l'IA, c'est partir avec un handicap.
                                        Je m'assure que ton projet est moderne, compétitif et prêt pour le monde de demain.
                                    </p>
                                    <Link href="/se-developper" className="btn-two mt-20">
                                        Découvrir le pilier IA<i className="fas fa-arrow-right"></i>
                                    </Link>
                                </div>
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
