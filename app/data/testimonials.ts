export interface Testimonial {
  id: string
  name: string
  age: number
  quote: string
  rating: number
  categorie: string
  image: string
}

export const testimonials: Testimonial[] = [
  {
    id: 'excel_initiation_01',
    name: 'Marie',
    age: 34,
    quote: "Grâce à cette formation, j'ai pu aborder mon voyage plus sereinement !",
    rating: 5,
    categorie: 'BUREAUTIQUE',
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
  {
    id: 'anglais-debutant-a1-a2',
    name: 'Jay',
    age: 31,
    quote: "Franchement top ! Ça m'a vraiment aidé à y voir plus clair avec l'anglais.",
    rating: 5,
    categorie: 'LANGUES',
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  {
    id: 'photoshop-cc2023',
    name: 'Isabelle',
    age: 49,
    quote: 'Simple, clair et vraiment rassurant !',
    rating: 5,
    categorie: 'INFOGRAPHIE',
    image: 'https://randomuser.me/api/portraits/women/65.jpg',
  },
  {
    id: 'adobe-premiere-pro-2020-2024',
    name: 'Masshadia',
    age: 25,
    quote: "J'ai appris plein de choses utiles en peu de temps, super pratique !",
    rating: 5,
    categorie: 'VIDEO',
    image: 'https://randomuser.me/api/portraits/women/28.jpg',
  },
  {
    id: 'creation-entreprise',
    name: 'Jussy',
    age: 41,
    quote: 'Je recommande à 100 %, hyper accessible même pour moi !',
    rating: 5,
    categorie: 'ENTREPRENEUR',
    image: 'https://randomuser.me/api/portraits/men/46.jpg',
  },
  {
    id: 'anglais-intermediaire-b1-b2',
    name: 'Thomas',
    age: 38,
    quote: "Un vrai déclic pour mon niveau d'anglais, je me sens enfin à l'aise à l'oral.",
    rating: 5,
    categorie: 'LANGUES',
    image: 'https://randomuser.me/api/portraits/men/36.jpg',
  },
  {
    id: 'word-avance',
    name: 'Sophie',
    age: 27,
    quote: "Formation claire et structurée, j'ai gagné un temps fou au bureau.",
    rating: 5,
    categorie: 'BUREAUTIQUE',
    image: 'https://randomuser.me/api/portraits/women/26.jpg',
  },
  {
    id: 'creation-entreprise-02',
    name: 'Karim',
    age: 33,
    quote: "Ça m'a donné les bases solides pour lancer mon projet sans stress.",
    rating: 5,
    categorie: 'ENTREPRENEUR',
    image: 'https://randomuser.me/api/portraits/men/34.jpg',
  },
  {
    id: 'illustrator-cc2023',
    name: 'Léa',
    age: 44,
    quote: "J'ai enfin compris Photoshop grâce à des explications simples et concrètes.",
    rating: 5,
    categorie: 'INFOGRAPHIE',
    image: 'https://randomuser.me/api/portraits/women/47.jpg',
  },
  {
    id: 'after-effects-2024',
    name: 'David',
    age: 29,
    quote: "Le formateur explique super bien, j'ai progressé rapidement en montage.",
    rating: 5,
    categorie: 'VIDEO',
    image: 'https://randomuser.me/api/portraits/men/29.jpg',
  },
]

export default testimonials
