import Link from 'next/link';
import { useState, useEffect } from 'react';

const MainMenu = () => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setVisible(true), 200);
        return () => clearTimeout(timer);
    }, []);

    const handleMenuClick = (pageName) => {
        if (typeof window !== "undefined" && window.fbq) {
            window.fbq('track', 'PageView', {
                page_name: pageName,
            });
        }
    };

    const pillars = [
        { href: '/se-connaitre', label: 'Trouver l'idée' },
        { href: '/se-lancer', label: 'Se Lancer' },
        { href: '/se-developper', label: "Décoller avec l'IA" },
    ];

    return (
        <>
            <ul className="pillar-nav">
                {pillars.map((pillar, index) => (
                    <li
                        key={pillar.href}
                        className={`pillar-nav__item ${visible ? 'pillar-nav__item--visible' : ''}`}
                        style={{ animationDelay: `${index * 180}ms` }}
                    >
                        <Link
                            href={pillar.href}
                            className="pillar-nav__link"
                            onClick={() => handleMenuClick(pillar.label)}
                        >
                            <span className="pillar-nav__text">{pillar.label}</span>
                        </Link>
                    </li>
                ))}
            </ul>
        </>
    );
};

export default MainMenu;
