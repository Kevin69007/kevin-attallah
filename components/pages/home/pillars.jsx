import Link from "next/link";
import image from "../../../public/assets/img/service/services.png";

const Pillars = () => {
    return (
        <div className="services__one section-padding" style={{backgroundColor: 'var(--color-1)'}}>
            <div className="container">
                <div className="row justify-content-center text-center">
                    <div className="col-xl-8 col-lg-8 col-md-10 services__one-title">
                        <span className="subtitle-one" style={{color: 'var(--primary-color-1)'}}>Mon accompagnement</span>
                        <h2 style={{color: '#1a1a2e'}}>3 piliers pour construire ta <span className="highlighted">réussite</span></h2>
                        <p style={{color: '#555', fontSize: '17px'}}>De l'idée au lancement, jusqu'à la maîtrise de l'IA — un accompagnement complet pour créer ton entreprise.</p>
                    </div>
                </div>
                <div className="row align-items-center justify-content-center">
                    <div className="col-xl-3">
                        <div className="row">
                            <div className="col-xl-12 col-md-6">
                                <div className="single-service" style={{borderLeft: '4px solid var(--primary-color-1)'}}>
                                    <div className="services__one-single-service-icon">
                                        <i className="flaticon-idea"></i>
                                    </div>
                                    <div className="services__one-single-service-content">
                                        <span style={{fontSize: '48px', fontWeight: '700', color: 'var(--primary-color-1)', opacity: 0.15, lineHeight: 1}}>01</span>
                                        <h4>Trouver ton idée</h4>
                                        <p>Trouve ta voie grâce à l'Ikigai et au bilan de compétences. Avant de créer, il faut savoir pourquoi.</p>
                                        <Link href="/se-connaitre" className="btn-one mt-20">Trouver mon idée<i className="fas fa-arrow-right"></i></Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-6 col-lg-7">
                        <div className="services-image-wrapper">
                            <img src={image.src} alt="image" />
                        </div>
                    </div>
                    <div className="col-xl-3">
                        <div className="row">
                            <div className="col-xl-12 col-md-6">
                                <div className="single-service" style={{borderLeft: '4px solid var(--primary-color-1)'}}>
                                    <div className="services__one-single-service-icon">
                                        <i className="flaticon-global-network"></i>
                                    </div>
                                    <div className="services__one-single-service-content">
                                        <span style={{fontSize: '48px', fontWeight: '700', color: 'var(--primary-color-1)', opacity: 0.15, lineHeight: 1}}>02</span>
                                        <h4>Se Lancer</h4>
                                        <p>Crée ton entreprise avec un accompagnement personnalisé. +2100 entrepreneurs déjà accompagnés.</p>
                                        <Link href="/se-lancer" className="btn-two mt-20">Lancer mon business<i className="fas fa-arrow-right"></i></Link>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-12 col-md-6 xl-mb-30">
                                <div className="single-service" style={{borderLeft: '4px solid var(--primary-color-1)'}}>
                                    <div className="services__one-single-service-icon">
                                        <i className="flaticon-it"></i>
                                    </div>
                                    <div className="services__one-single-service-content">
                                        <span style={{fontSize: '48px', fontWeight: '700', color: 'var(--primary-color-1)', opacity: 0.15, lineHeight: 1}}>03</span>
                                        <h4>Décoller avec l'IA</h4>
                                        <p>Booste ton business avec l'IA. Formations, audits et outils pour passer au niveau supérieur.</p>
                                        <Link href="/se-developper" className="btn-one mt-20">Décoller avec l'IA<i className="fas fa-arrow-right"></i></Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Pillars;
