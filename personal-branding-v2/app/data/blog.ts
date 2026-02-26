export interface BlogPost {
  number: string
  id: string
  date: string
  month: string
  year: string
  title: string
  image: string
  images: string[]
}

export const blogPosts: BlogPost[] = [
  {
    number: '01',
    id: '1',
    date: '30',
    month: 'Nov',
    year: '2024',
    title: "Comment lancer son projet d'entreprise sans se louper ?",
    image: '/img/blog/img_car/novembre23/01.png',
    images: [
      '/img/blog/img_car/novembre23/02.png',
      '/img/blog/img_car/novembre23/03.png',
      '/img/blog/img_car/novembre23/04.png',
    ],
  },
  {
    number: '02',
    id: '2',
    date: '23',
    month: 'Nov',
    year: '2024',
    title: "Les 4 clés pour bâtir un empire financier d'après Père Riche Père Pauvre de Robert T. Kiyosaki !",
    image: '/img/blog/img_car/novembre30/01.png',
    images: [
      '/img/blog/img_car/novembre30/02.png',
      '/img/blog/img_car/novembre30/03.png',
      '/img/blog/img_car/novembre30/04.png',
      '/img/blog/img_car/novembre30/05.png',
    ],
  },
  {
    number: '03',
    id: '3',
    date: '7',
    month: 'Dec',
    year: '2024',
    title: "Les 4 principales causes d'échec de la création d'entreprise",
    image: '/img/blog/img_car/decembre7/01.png',
    images: [
      '/img/blog/img_car/decembre7/02.png',
      '/img/blog/img_car/decembre7/03.png',
      '/img/blog/img_car/decembre7/04.png',
      '/img/blog/img_car/decembre7/05.png',
      '/img/blog/img_car/decembre7/06.png',
      '/img/blog/img_car/decembre7/07.png',
    ],
  },
  {
    number: '04',
    id: '4',
    date: '21',
    month: 'Dec',
    year: '2024',
    title: "Devenir un chef d'entreprise accompli commence ici !",
    image: '/img/blog/img_car/decembre21/01.png',
    images: [
      '/img/blog/img_car/decembre21/02.png',
      '/img/blog/img_car/decembre21/03.png',
      '/img/blog/img_car/decembre21/04.png',
      '/img/blog/img_car/decembre21/05.png',
      '/img/blog/img_car/decembre21/06.png',
      '/img/blog/img_car/decembre21/07.png',
    ],
  },
]

export default blogPosts
