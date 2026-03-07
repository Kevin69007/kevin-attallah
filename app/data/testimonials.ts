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
    id: 'creation-entreprise',
    name: 'Jussy',
    age: 41,
    quote: 'Je recommande à 100 %, hyper accessible même pour moi !',
    rating: 5,
    categorie: 'ENTREPRENEUR',
    image: 'https://randomuser.me/api/portraits/men/46.jpg',
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
]

export default testimonials
