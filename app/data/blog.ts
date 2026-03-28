export interface BlogPost {
  number: string
  id: string
  date: string
  month: string
  year: string
  title: string
  image: string
  images: string[]
  category: string
  locked?: boolean
}

export const blogCategories = [
  { key: 'all', label: 'Tous' },
  { key: 'fondamentaux', label: 'Fondamentaux' },
  { key: 'marche', label: 'Le Marché' },
  { key: 'etapes', label: 'Étapes de Création' },
  { key: 'statuts', label: 'Statuts Juridiques' },
  { key: 'aides', label: 'Coûts & Aides' },
]

function blogImages(folder: string, count: number): { image: string; images: string[] } {
  const all = Array.from({ length: count }, (_, i) => `/img/blog/${folder}/page-${i + 1}.png`)
  return { image: all[0], images: all.slice(1) }
}

export const blogPosts: BlogPost[] = [
  {
    number: '01',
    id: '01-A',
    date: '7',
    month: 'Déc',
    year: '2024',
    title: "Comment lancer son projet d'entreprise sans se louper ?",
    ...blogImages('01-A', 4),
    category: 'fondamentaux',
  },
  {
    number: '02',
    id: '01-B',
    date: '14',
    month: 'Déc',
    year: '2024',
    title: "Les causes d'échec dans la création d'entreprise",
    ...blogImages('01-B', 7),
    category: 'fondamentaux',
  },
  {
    number: '03',
    id: '01-C',
    date: '21',
    month: 'Déc',
    year: '2024',
    title: "Les compétences clés d'un chef d'entreprise (Partie 1)",
    ...blogImages('01-C', 1),
    category: 'fondamentaux',
    locked: true,
  },
  {
    number: '04',
    id: '01-D',
    date: '28',
    month: 'Déc',
    year: '2024',
    title: "Les compétences clés d'un chef d'entreprise (Partie 2)",
    ...blogImages('01-D', 1),
    category: 'fondamentaux',
    locked: true,
  },
  {
    number: '05',
    id: '01-E',
    date: '4',
    month: 'Jan',
    year: '2025',
    title: "Les compétences essentielles d'un chef d'entreprise",
    ...blogImages('01-E', 1),
    category: 'fondamentaux',
    locked: true,
  },
  {
    number: '06',
    id: '02-A',
    date: '11',
    month: 'Jan',
    year: '2025',
    title: "Les étapes de la création d'entreprise - Le marché",
    ...blogImages('02-A', 1),
    category: 'marche',
    locked: true,
  },
  {
    number: '07',
    id: '03-A',
    date: '18',
    month: 'Jan',
    year: '2025',
    title: "La création d'entreprise en 6 étapes",
    ...blogImages('03-A', 7),
    category: 'etapes',
  },
  {
    number: '08',
    id: '03-B',
    date: '25',
    month: 'Jan',
    year: '2025',
    title: "Les étapes de la création d'entreprise - Chiffres et financements",
    ...blogImages('03-B', 10),
    category: 'etapes',
  },
  {
    number: '09',
    id: '03-C',
    date: '1',
    month: 'Fév',
    year: '2025',
    title: "Les étapes de la création d'entreprise - L'idée",
    ...blogImages('03-C', 1),
    category: 'etapes',
    locked: true,
  },
  {
    number: '10',
    id: '03-D',
    date: '8',
    month: 'Fév',
    year: '2025',
    title: "Les étapes essentielles pour rédiger un business plan",
    ...blogImages('03-D', 1),
    category: 'etapes',
    locked: true,
  },
  {
    number: '11',
    id: '04-A',
    date: '15',
    month: 'Fév',
    year: '2025',
    title: "Les étapes de la création d'entreprise - Structure et création",
    ...blogImages('04-A', 9),
    category: 'statuts',
  },
  {
    number: '12',
    id: '04-B',
    date: '22',
    month: 'Fév',
    year: '2025',
    title: "Statuts juridiques - Auto-entrepreneur / Individuel",
    ...blogImages('04-B', 11),
    category: 'statuts',
  },
  {
    number: '13',
    id: '04-C',
    date: '1',
    month: 'Mar',
    year: '2025',
    title: "Statuts juridiques - EIRL",
    ...blogImages('04-C', 1),
    category: 'statuts',
    locked: true,
  },
  {
    number: '14',
    id: '04-D',
    date: '8',
    month: 'Mar',
    year: '2025',
    title: "Statuts juridiques - EURL / SARL",
    ...blogImages('04-D', 1),
    category: 'statuts',
    locked: true,
  },
  {
    number: '15',
    id: '04-E',
    date: '15',
    month: 'Mar',
    year: '2025',
    title: "Statuts juridiques - SAS / SASU",
    ...blogImages('04-E', 1),
    category: 'statuts',
    locked: true,
  },
  {
    number: '16',
    id: '05-A',
    date: '22',
    month: 'Mar',
    year: '2025',
    title: "Les coûts de création d'entreprise - Les aides",
    ...blogImages('05-A', 1),
    category: 'aides',
    locked: true,
  },
]

export default blogPosts
