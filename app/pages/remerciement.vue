<template>
  <div>
    <section class="thanks">
      <div class="container thanks__content text-center">
        <div class="thanks__icon">
          <CheckCircle :size="64" />
        </div>

        <h1 class="thanks__title">MERCI POUR VOTRE INSCRIPTION !</h1>

        <p class="thanks__text">
          VOTRE PAIEMENT A ÉTÉ CONFIRMÉ AVEC SUCCÈS. UN EMAIL DE CONFIRMATION
          VOUS A ÉTÉ ENVOYÉ AVEC TOUS LES DÉTAILS DE VOTRE FORMATION.
        </p>

        <div class="thanks__steps">
          <div v-for="step in nextSteps" :key="step.title" class="thanks__step">
            <component :is="step.icon" :size="28" class="thanks__step-icon" />
            <h3>{{ step.title }}</h3>
            <p>{{ step.description }}</p>
          </div>
        </div>

        <div class="thanks__ctas">
          <AppButton variant="primary" to="/formations">
            DÉCOUVRIR D'AUTRES FORMATIONS
          </AppButton>
          <AppButton variant="ghost-light" to="/">
            RETOUR À L'ACCUEIL
          </AppButton>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { CheckCircle, Mail, BookOpen, Headphones } from 'lucide-vue-next'

useHead({ title: 'Merci !' })

const router = useRouter()
const { trackViewContent } = useFBPixel()
const { trackViewItem } = useGoogleAds()
onMounted(() => {
  const paid = localStorage.getItem('paymentSuccess')
  if (!paid) {
    router.replace('/')
    return
  }
  localStorage.removeItem('paymentSuccess')

  trackViewContent({ content_name: 'Merci - Confirmation' })
  trackViewItem({ content_name: 'Merci - Confirmation' })
})

const nextSteps = [
  {
    icon: Mail,
    title: 'VÉRIFIEZ VOTRE EMAIL',
    description: 'Un email de confirmation avec vos accès a été envoyé.',
  },
  {
    icon: BookOpen,
    title: 'ACCÉDEZ À LA FORMATION',
    description: 'Connectez-vous à votre espace et commencez immédiatement.',
  },
  {
    icon: Headphones,
    title: 'SUPPORT DISPONIBLE',
    description: 'Notre équipe est là pour vous accompagner tout au long de votre formation.',
  },
]
</script>

<style lang="scss" scoped>
.thanks {
  min-height: 100vh;
  display: flex;
  align-items: center;
  background: #FFF;
  border-bottom: 4px solid #000;
  padding: 120px 0;

  &__content {
    max-width: 800px;
    margin: 0 auto;
  }

  &__icon {
    color: $orange;
    margin-bottom: 24px;
  }

  &__title {
    font-size: clamp(2rem, 5vw, 3.5rem);
    text-transform: uppercase;
    letter-spacing: -0.02em;
    color: #000;
    margin-bottom: 24px;
  }

  &__text {
    font-family: $font-mono;
    font-size: 1rem;
    line-height: 1.7;
    color: #000;
    max-width: 550px;
    margin: 0 auto 48px;
    text-transform: uppercase;
  }

  &__steps {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0;
    border: 4px solid #000;
    background: #000;
    margin-bottom: 48px;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }

  &__step {
    text-align: center;
    padding: 32px 24px;
    background: #FFF;
    border-right: 4px solid #000;

    &:last-child {
      border-right: none;
    }

    @media (max-width: 768px) {
      border-right: none;
      border-bottom: 4px solid #000;

      &:last-child {
        border-bottom: none;
      }
    }

    h3 {
      font-size: 1rem;
      text-transform: uppercase;
      color: #000;
      margin: 12px 0 8px;
    }

    p {
      font-family: $font-mono;
      color: #000;
      font-size: 0.875rem;
      line-height: 1.6;
    }
  }

  &__step-icon {
    color: $purple;
  }

  &__ctas {
    display: flex;
    gap: 16px;
    justify-content: center;
    flex-wrap: wrap;
  }
}
</style>
