export interface Category {
  id: string
  categorie: string
  image: string
}

export const categories: Category[] = [
  { id: 'anglais-debutant-a1-a2', categorie: 'LANGUES', image: '/img/categories/LANGUES.png' },
  { id: 'comptabilite-initiation-01', categorie: 'COMPTABILITE', image: '/img/categories/COMPTABILITÉ.png' },
  { id: 'excel_initiation_01', categorie: 'BUREAUTIQUE', image: '/img/categories/BUREAUTIQUE.png' },
  { id: 'photoshop-cc2023', categorie: 'INFOGRAPHIE', image: '/img/categories/INFOGRAPHIE.png' },
  { id: 'adobe-premiere-pro-2020-2024', categorie: 'VIDEO', image: '/img/categories/VIDEO.png' },
  { id: 'bâtir-estime-confiance-soi', categorie: 'SOFT_SKILLS', image: '/img/categories/SOFT SKILLS.png' },
  { id: 'recruter-sans-discriminer', categorie: 'MANAGEMENT_RH', image: '/img/categories/MANAGEMENT RH.png' },
  { id: 'fondements-methode-agile', categorie: 'PRODUCTIVITE', image: '/img/categories/PRODUCTIVITÉ.png' },
  { id: 'gestion-de-paie-01', categorie: 'GESTION_DE_PAIE', image: '/img/categories/GESTION DE PAIE.png' },
  { id: 'initiation-metier-secretaire-bureautique', categorie: 'SECRETARIAT_BUREAUTIQUE', image: '/img/categories/SECRÉTARIAT BUREAUTIQUE.png' },
  { id: 'initiation-metier-secretaire-medicale', categorie: 'SECRETARIAT_MEDICAL', image: '/img/categories/SECRÉTARIAT MÉDICAL.png' },
  { id: 'demarrer-booster-micro-entreprise', categorie: 'ENTREPRENEUR', image: '/img/categories/ENTREPRENEUR.png' },
  { id: 'creation-cabinet-infirmier-liberal', categorie: 'RECONVERSION_PROFESSIONNELLE', image: '/img/categories/RECONVERSION PROFESSIONNELLE.png' },
  { id: 'revit-2021-fondamentaux', categorie: 'CAO-DAO', image: '/img/categories/CAO-DAO.png' },
  { id: 'haccp-methode', categorie: 'SECURITE', image: '/img/categories/SÉCURITÉ.png' },
  { id: 'html-css-debutant-expert', categorie: 'DEVELOPPEMENT_WEB', image: '/img/categories/DÉVELOPPEMENT WEB.png' },
  { id: 'storytelling-marketing', categorie: 'VENTE_MARKETING_DIGITAL', image: '/img/categories/VENTE & MARKETING DIGITAL.png' },
]

export default categories
