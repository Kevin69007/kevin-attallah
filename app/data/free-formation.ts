export interface FreeFormationConfig {
  title: string
  subtitle: string
  features: string[]
  badgeText: string
  ctaText: string
  successMessage: string
  reassurance: string
  brevoListId: number
  originalPrice: number
}

export const freeFormationConfig: FreeFormationConfig = {
  title: 'Formation Gratuite',
  subtitle:
    'On te crée un accès personnel à ta formation. Remplis le formulaire et reçois tes identifiants sous 48h ouvrées.',
  features: [
    'Formation complète en ligne',
    'RDV sur Instagram pour découvrir quelle formation est offerte cette semaine',
    'Inscris-toi chaque semaine pour ne rien rater',
  ],
  badgeText: 'Formation Gratuite',
  ctaText: 'Je veux mon accès',
  successMessage:
    'Vérifiez votre boîte email pour accéder à votre formation !',
  reassurance:
    'Tu recevras un email de notre part avec tes accès. Pense à vérifier tes spams si tu ne reçois rien sous 48h.',
  brevoListId: 99,
  originalPrice: 99,
}
