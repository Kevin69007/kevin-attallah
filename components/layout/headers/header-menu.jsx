import Link from 'next/link';

const MainMenu = () => {

    // Fonction pour envoyer un événement Pixel lors d'un clic
    const handleMenuClick = (pageName) => {
        if (typeof window !== "undefined" && window.fbq) {
            // On envoie un événement 'PageView' pour chaque lien cliqué
            window.fbq('track', 'PageView', {
                page_name: pageName,  // Le nom de la page visitée
            });
        }
    };

    return (
        <>
            <ul>
                <li className="menu-item-has-children">
                    <Link href="/" onClick={() => handleMenuClick('Accueil')}>Accueil</Link>
                </li>
                <li className="menu-item-has-children">
                    <Link href="/se-connaitre" onClick={() => handleMenuClick('Trouver ton idée')}>Trouver ton idée</Link>
                </li>
                <li className="menu-item-has-children">
                    <Link href="/se-lancer" onClick={() => handleMenuClick('Se Lancer')}>Se Lancer</Link>
                </li>
                <li className="menu-item-has-children">
                    <Link href="/se-developper" onClick={() => handleMenuClick('Décoller avec l\'IA')}>Décoller avec l'IA</Link>
                </li>
                <li className="menu-item-has-children">
                    <Link href="/blog" onClick={() => handleMenuClick('Blog')}>Blog</Link>
                </li>
                <li className="menu-item-has-children">
                    <Link href="/about" onClick={() => handleMenuClick('À propos')}>À propos</Link>
                </li>
            </ul>
        </>
    );
};

export default MainMenu;
