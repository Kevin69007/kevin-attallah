export interface FreeFormationConfig {
  title: string
  subtitle: string
  originalPrice: number
  features: string[]
  badgeText: string
  ctaText: string
  successMessage: string
  brevoListId: number
}

export const freeFormationConfig: FreeFormationConfig = {
  title: 'Formation Offerte',
  subtitle:
    'Accédez gratuitement à une formation professionnelle complète pour booster votre carrière.',
  originalPrice: 99,
  features: [
    'Formation complète en ligne',
    'Certificat de fin de formation',
    'Accès à vie au contenu',
    'Support pédagogique inclus',
  ],
  badgeText: 'Formation Gratuite',
  ctaText: 'Recevoir ma formation gratuite',
  successMessage:
    'Vérifiez votre boîte email pour accéder à votre formation !',
  brevoListId: 56,
}
