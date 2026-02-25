import React, { useEffect } from 'react';
import TabContent from './tab-content1';
import Link from 'next/link';

const Tab = () => {
    // Utilisation de useEffect pour intégrer l'événement Facebook Pixel
    useEffect(() => {
        // Assurez-vous que le script Pixel est chargé dans votre application
        if (typeof window !== "undefined" && window.fbq) {
            window.fbq('track', 'PageView'); // Suivi de la page vue
        }
    }, []);

    const handleScheduleEvent = () => {
        // Quand un utilisateur clique sur un rendez-vous, on suit l'événement "Schedule"
        if (typeof window !== "undefined" && window.fbq) {
            window.fbq('track', 'Schedule'); // Suivi de l'événement "Schedule"
        }
    };

    return (
        <>
            <div className="skill__two section-padding">
                <div className="container">
                    <div className="row justify-content-center text-center">
                        <div className="col-xl-9 col-lg-9 col-md-12 services__one-title">
                            <span className="subtitle-one">Je veux lancer mon business</span>
                            <h2>De l'idée au premier client payant : 8 semaines, pas 8 mois</h2>
                        </div>
                        <div className="mb-5 ">
                            <p className="p1"><span className="fw-bold fs-4">Ensemble, on analyse ce qui compte vraiment :</span></p>
                            <p className="p1" style={{marginTop: '12px'}}>
                                👉 Quelles sont tes forces et comment les exploiter ?<br />
                                👉 Ton idée est-elle viable et alignée avec qui tu es ? <br />
                                👉 Comment structurer ton projet pour qu'il prenne vie ?
                            </p>
                            <p className="p1" style={{marginTop: '12px'}}>
                                Pas de phrases toutes faites, pas d'artifice :<br /> juste toi, ton projet et des solutions qui te correspondent. Prêt·e à passer à l'action ?
                            </p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-6 col-md-12">
                            <div className="skill__two-tab-title">
                                <div className="">
                                    <Link href="https://meet.brevo.com/kevin-a2ta2l/presentation" target="_blank">
                                        <div className="skill__two-tab nav-link active " data-bs-toggle="pill" role="button">
                                            <span>J'ai besoin d'un accompagnement</span>
                                        </div>
                                    </Link>
                                    <div className="formation_rigth">
                                        <TabContent 
                                            title={`Fini de procrastiner. On lance ensemble, main dans la main`}
                                            description="Profitez d’un accompagnement personnalisé pour chaque étape : de l’idée au lancement. Bénéficiez du soutien dont vous avez besoin pour transformer vos ambitions en succès durable 🚀."
                                            description2="Et cerise sur le gâteau, votre formation est peut-être éligible au CPF 💰."
                                            servicesLeft={[
                                                "Plan d’action clair et efficace",
                                                "Conseil stratégique sur mesure"
                                            ]}
                                            servicesRight={[
                                                "Vous avancez comme vous voulez",
                                                "Accès à des outils pratiques et performants"
                                            ]}
                                            buttonText="Prendre RDV"
                                            buttonLink="https://meet.brevo.com/kevin-a2ta2l/presentation"
                                            class1="btn-one btn-one-busn1"
                                            onClick={handleScheduleEvent} // Ajout de l'événement de planification pour "Prendre RDV"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-12">
                            <div className="skill__two-tab-title">
                                <div className="">
                                    <Link href="https://www.formation.kevin-attallah.com/formation-creation-entreprise" target="_blank">
                                        <div className="skill__two-tab nav-link " data-bs-toggle="pill" data-bs-target="#topic-2" role="button">
                                            <span>Je suis autonome</span>
                                        </div> 
                                    </Link> 
                                    <div className="formation_left">
                                        <TabContent 
                                            title="Mode warrior solo : Tu veux tout faire toi-même ? Voici le blueprint"
                                            description="Profitez de notre formation complète pour construire votre projet d’entreprise en totale liberté."
                                            description2="Vous avancez comme vous voulez, où vous voulez, avec des outils clairs et pratiques pour transformer vos idées en réalité 🚀."
                                            servicesLeft={[
                                                "Liberté totale",
                                                "Contenu 100% en ligne"
                                            ]}
                                            servicesRight={[
                                                "Accessible immédiatement",
                                                "Créez Votre Entreprise",
                                                "Outils Concrets Et Clés En Main"
                                            ]}
                                            buttonText="Je lance mon business"
                                            buttonLink="https://www.formation.kevin-attallah.com/formation-creation-entreprise"
                                            class1="btn-one btn-one-busn2"
                                            onClick={handleScheduleEvent} // Ajout de l'événement de planification pour "Je lance mon business"
                                        />
                                    </div>                      
                                </div> 
                            </div>
                        </div>
                    </div>
                </div>
            </div>            
        </>
    );
};

export default Tab;
