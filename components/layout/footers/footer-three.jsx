import Link from "next/link";
import logo from "../../../public/assets/img/logo-2.png";
import Social from "@/components/data/social";
import { useState } from 'react';

const FooterThree = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email) {
            setMessage('Veuillez entrer un email valide.');
            return;
        }

        setLoading(true);
        setMessage('');

        try {
            const response = await fetch('/api/subscribe', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage('Votre email a été envoyé avec succès !');
                setEmail('');

                setTimeout(() => {
                    setMessage('');
                }, 3000);
            } else {
                setMessage(`Erreur: ${data.message}`);
                setTimeout(() => {
                    setMessage('');
                }, 3000);
            }
        } catch (error) {
            setMessage('Une erreur est survenue. Veuillez réessayer.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
        <div className="footer__three">
            <div className="container pt-80 pb-80">
                <div className="footer__three-top">
                    <h3>Rejoignez notre communauté sociale !</h3>
                    <div className="footer__three-top-social">
                        <Social />
                    </div>
                </div>
                <div className="row gy-4 justify-content-between">
                    <div className="col-xl-4 col-md-6 col-sm-7 xl-mb-30">
                        <div className="footer__three-widget">
                            <div className="footer__three-widget-about">
                                <Link href="/"><img src={logo.src} alt="image" /></Link>
                                <p>Crée la vie qui te ressemble — De la connaissance de soi à la maîtrise de l'IA, je t'accompagne à bâtir un projet qui a du sens.</p>
                                <h6>Inscrivez-vous à notre Newsletter</h6>
                                <form onSubmit={handleSubmit}>
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Votre e-mail"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                    <button type="submit" disabled={loading}>
                                        {loading ? 'Envoi...' : <i className="fas fa-paper-plane"></i>}
                                    </button>
                                </form>
                                {message && (
                                    <div style={{ color: message.includes('succès') ? 'green' : 'red' }}>
                                        {message}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-4 col-md-6 col-sm-5 sm-mb-30">
                        <div className="footer__three-widget border-one">
                            <h4 className="ml-60">Mes Accompagnements</h4>
                            <div className="footer__three-widget-solution">
                                <ul>
                                    <li><Link href="/se-connaitre"><i className="far fa-chevron-double-right"></i>Se Connaître</Link></li>
                                    <li><Link href="/se-lancer"><i className="far fa-chevron-double-right"></i>Se Lancer</Link></li>
                                    <li><Link href="/se-developper"><i className="far fa-chevron-double-right"></i>Se Développer</Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-4 col-md-6 col-sm-5 sm-mb-30">
                        <div className="footer__three-widget border-one">
                            <h4 className="ml-60">Ressources</h4>
                            <div className="footer__three-widget-solution">
                                <ul>
                                    <li><Link href="/formations"><i className="far fa-chevron-double-right"></i>Catalogue de formations</Link></li>
                                    <li><Link href="/blog"><i className="far fa-chevron-double-right"></i>Blog</Link></li>
                                    <li><Link href="/about"><i className="far fa-chevron-double-right"></i>À propos</Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="copyright__one two">
                <div className="container">
                    <div className="row justify-content-between copyright__one-container-area">
                        <div className="col-xl-5 col-lg-6">
                            <div className="copyright__one-left">
                                <p>© Kevin Attallah 2026</p>
                            </div>
                        </div>
                        <div className="col-xl-5 col-lg-6">
                            <div className="copyright__one-right">
                                <Link href="https://meet.brevo.com/kevin-a2ta2l/presentation" target="_blank">Prendre RDV</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
};

export default FooterThree;
