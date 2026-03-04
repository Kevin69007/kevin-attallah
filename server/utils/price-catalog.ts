// server/utils/price-catalog.ts
// Server-side price catalog — the single source of truth for all product pricing.
// The client sends a productId; the server resolves the price from this catalog.

export interface Product {
  id: string
  description: string
  price: number // in EUR
}

// Base price for all individual formations
const SINGLE_FORMATION_PRICE = 69

// All valid formation IDs from app/data/formations.ts
const FORMATION_IDS = [
  'excel_initiation_01',
  'excel-intermediaire-01',
  'excel-avance-01',
  'excel-expert-01',
  'certification-tosa-excel-2019',
  'word-debutant',
  'word-intermediaire',
  'certification-tosa-word-2019',
  'powerpoint-365',
  'discover-powerpoint-2019',
  'certification-tosa-powerpoint-2019',
  'microsoft-office-365-for-windows',
  'discover-onedrive',
  'anglais-debutant-a1-a2',
  'anglais-intermediaire-b1-b2',
  'anglais-avance-c1-c2',
  'anglais-affaires-avance-c1-c2',
  'anglais-medical-a1-a2',
  'anglais-medical-b1-b2',
  'english-second-language-beginner',
  'english-second-language-intermediate',
  'english-second-language-advanced',
  'business-english-second-language',
  'preparation-examen-anglais-toeic',
  'preparation-examen-anglais-cambridge',
  'preparation-examen-anglais-ielts',
  'preparation-examen-anglais-linguaskill',
  'preparation-examen-anglais-toefl',
  'allemand-debutant-a1-a2',
  'arabe-debutant-a1-a2',
  'arabe-intermediaire-b1-b2',
  'chinois-mandarin-pinyin-a1-a2',
  'espagnol-debutant-a1-a2',
  'espagnol-intermediaire-b1-b2',
  'espagnol-avance-c1-c2',
  'preparation-examen-espagnol-dele',
  'preparation-examen-espagnol-siele',
  'francais-langue-etrangere-fle-a1-a2',
  'francais-langue-etrangere-fle-b1',
  'francais-langue-etrangere-fle-b2',
  'italien-debutant-a1-a2',
  'japonais-debutant-a1-a2',
  'langue-des-signes-francaise-a1-a2',
  'portugais-debutant-a1-a2',
  'russe-debutant-a1-a2',
  'photoshop-cc2023',
  'illustrator-cc-2019-2023',
  'indesign-cc-2019-2023',
  'adobe-premiere-pro-2020-2024',
  'adobe-after-effects-2020-2024',
  'bâtir-estime-confiance-soi',
  'gestion-du-stress',
  'utiliser-voix-pour-convaincre',
  'langage-non-verbal',
  'secrets-body-language',
  'maitriser-communication',
  'se-presenter-10-min',
  'construire-son-personal-branding',
  'maitriser-la-pensee-critique',
  'decouvrir-la-pnl',
  'reussir-vos-presentations-pour-convaincre',
  'reussir-votre-presentation-virtuelle',
  'parler-en-public-gerer-la-pression',
  'l-ecoute-active',
  'conquerir-tous-les-publics',
  'reussir-son-entretien',
  'maitriser-les-relations-publiques',
  'intelligence-emotionnelle',
  'recruter-sans-discriminer',
  'accompagnement-nouveau-salarie',
  'gestion-performances-employes',
  'stimuler-recompenser-employes',
  'comblez-gap-generationnel',
  'resolution-des-conflits',
  'comprendre-gestion-de-projet',
  'maitriser-gestion-de-projet',
  'apprendre-a-deleger',
  'fondements-methode-agile',
  'choisir-bons-outils-aide-decision',
  'gerer-efficacement-votre-temps',
  'profiter-pleinement-teletravail',
  'initiation-intelligence-artificielle',
  'comptabilite-initiation-01',
  'comptabilite-fondamentaux-01',
  'gestion-de-paie-01',
  'calcul-bulletin-paie-01',
  'prelevement-a-la-source-01',
  'identification-temps-de-travail-01',
  'role-IRP-et-confidentialite-01',
  'calcul-bulletin-paie-variable-01',
  'calcul-paie-de-depart-01',
  'calcul-post-paie-01',
  'oral-blanc-01',
  'initiation-metier-secretaire-bureautique',
  'initiation-metier-secretaire-medicale',
  'demarrer-booster-micro-entreprise',
  'creation-cabinet-infirmier-liberal',
  'essentiel-de-la-naturopathie',
  'revit-2021-fondamentaux',
  'autocad-2021-fondamentaux',
  'archicad-2021-fondamentaux',
  'sketchup-2021-fondamentaux',
  'haccp-methode',
  'essentiel-rgpd',
  'cybersecurite-entreprise',
  'html-css-debutant-expert',
  'javascript-fondamentaux',
  'react-redux',
  'devenir-developpeur-python',
  'devenir-developpeur-csharp',
  'essentiel-wordpress-woocommerce',
  'essentiel-wordpress',
  'woocommerce',
  'storytelling-marketing',
  'surmonter-les-objections',
  'formation-email-marketing',
  'former-un-call-center',
  'dynamisez-vos-presentations-commerciales',
  'social-selling-petites-entreprises',
  'facebook-ads-debutant-a-expert',
  'gestion-des-reseaux-sociaux',
  'google-ads-essentiel',
  'risque-suicidaire-01',
  'alzheimer-prise-en-charge-01',
  'prise-en-charge-douleur-01',
  'plaies-et-cicatrisation-01',
  'abords-vasculaires-01',
  'kine-rehab-respiratoire-01',
  'bilan-redflags-kine-respiratoire-01',
  'levee-tensions-musculaires-01',
  'reeducation-pelvi-perineale-01',
  'renforcement-abdominal-perinee-01',
  'pathologies-epaule-01',
  'pathologies-genou-01',
  'atm-01',
  'lombalgie-01',
  'cervicalgie-01',
  'pathologies-traumatiques-cheville-01',
  'gestion-urgence-officine-01',
  'bilan-medicament-01',
] as const

// Pack products with their fixed prices
const PACK_PRODUCTS: Product[] = [
  {
    id: 'pack-anglais-debutant-intermediaire',
    description: 'Pack Débutant + Intermédiaire',
    price: 99,
  },
  {
    id: 'pack-anglais-intermediaire-avance',
    description: 'Pack Intermédiaire + Avancé',
    price: 99,
  },
  {
    id: 'pack-anglais-complet',
    description: 'Pack Complet (3 niveaux)',
    price: 139,
  },
  {
    id: 'pack-compta-initiation-fondamentaux',
    description: 'Pack Initiation + Fondamentaux',
    price: 99,
  },
]

// Build catalog as a Map for O(1) lookup
const catalog = new Map<string, Product>()

for (const id of FORMATION_IDS) {
  catalog.set(id, { id, description: id, price: SINGLE_FORMATION_PRICE })
}

for (const pack of PACK_PRODUCTS) {
  catalog.set(pack.id, pack)
}

export function getProduct(productId: string): Product | undefined {
  return catalog.get(productId)
}
