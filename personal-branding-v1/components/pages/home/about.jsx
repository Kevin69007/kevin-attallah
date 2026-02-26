import brand1 from "../../../public/assets/img/brand/brand-1.png";
import brand2 from "../../../public/assets/img/brand/brand-2.png";
import brand3 from "../../../public/assets/img/brand/brand-3.png";
import brand4 from "../../../public/assets/img/brand/brand-4.png";
import brand5 from "../../../public/assets/img/brand/brand-5.png";
import brand6 from "../../../public/assets/img/brand/brand-6.png";
import brand7 from "../../../public/assets/img/brand/brand-7.png";
import about1 from "../../../public/assets/img/about/about-1.png";
import about2 from "../../../public/assets/img/about/about-2.png";
import logo from "../../../public/assets/img/about/ikigai_white.png";
import Link from "next/link";
import { useEffect } from 'react';

const About = () => {
    

    return (
        <>
        <div className="about__one section-padding">
            <div className="container">
                <div className="row align-items-center flex-wrap-reverse gy-4">
                    <div className="col-xl-6 col-lg-7 col-md-9">
                        <div className="about__one-content">
                            <span className="subtitle-one">Mon parcours</span>
                            <h2>Kevin Attallah</h2>
                            <p>Avec plus de 2 100 entrepreneurs accompagnés et 15 000 heures de formation dispensées, j'aide ceux qui veulent donner du sens à leur vie professionnelle. Mon parcours d'expatrié, en passant par des réussites et des échecs entrepreneuriaux, m'a appris une chose : le succès commence par la connaissance de soi.</p>
                            <div className="about__one-content-service">
                                <div className="service">
                                    <i className="far fa-check-circle"></i>
                                    <span>+2 100 entrepreneurs accompagnés</span>
                                </div>
                                <div className="service">
                                    <i className="far fa-check-circle"></i>
                                    <span>Méthode basée sur l'Ikigai</span>
                                </div>
                                <div className="service">
                                    <i className="far fa-check-circle"></i>
                                    <span>Expérience entrepreneuriale réelle</span>
                                </div>
                                <div className="service">
                                    <i className="far fa-check-circle"></i>
                                    <span>Expert IA pour entrepreneurs</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-6 col-lg-5">
                        <div className="about__one-image">
                            <div className="experience-bar animate-y-axis-slider">
                                <img src={logo.src} alt="image" className="" />
                                <div className="experience-bar-right">
                                    <div className="experience-bar-counter">
                                        <h4 className="counter"></h4>
                                        <span></span>
                                    </div>
                                    <span>Accompagnement</span>
                                </div>
                            </div>
                            <div className="about__one-image-wrapper">
                                <img src={about2.src} alt="image" className="image-1" />
                                <img src={about1.src} alt="image" className="image-2" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
};

export default About;