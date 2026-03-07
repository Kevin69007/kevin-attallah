<template>
  <div>
    <section class="thanks section--light">
      <div class="container thanks__content text-center">
        <ScrollReveal>
          <div class="thanks__icon">
            <CheckCircle :size="64" />
          </div>
        </ScrollReveal>

        <TextSplit
          text="Merci pour votre inscription !"
          tag="h1"
          :delay="0.3"
          class="thanks__title"
        />

        <ScrollReveal :delay="0.6">
          <p class="thanks__text">
            Votre paiement a été confirmé avec succès. Un email de confirmation
            vous a été envoyé avec tous les détails de votre formation.
          </p>
        </ScrollReveal>

        <ScrollReveal :delay="0.8">
          <div class="thanks__steps">
            <div class="thanks__step glass-card-light" v-for="step in nextSteps" :key="step.title">
              <component :is="step.icon" :size="28" class="thanks__step-icon" />
              <h3>{{ step.title }}</h3>
              <p>{{ step.description }}</p>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal :delay="1">
          <div class="btn-group" style="justify-content: center; margin-top: 48px">
            <AppButton variant="primary" to="/formations">
              Découvrir d'autres formations
            </AppButton>
            <AppButton variant="ghost-light" to="/">
              Retour à l'accueil
            </AppButton>
          </div>
        </ScrollReveal>
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
    title: 'Vérifiez votre email',
    description: 'Un email de confirmation avec vos accès a été envoyé.',
  },
  {
    icon: BookOpen,
    title: 'Accédez à la formation',
    description: 'Connectez-vous à votre espace et commencez immédiatement.',
  },
  {
    icon: Headphones,
    title: 'Support disponible',
    description: 'Notre équipe est là pour vous accompagner tout au long de votre formation.',
  },
]
</script>

<style lang="scss" scoped>
.thanks {
  min-height: 100vh;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
  padding: 120px 0;

  &__content {
    position: relative;
    z-index: 1;
    max-width: 800px;
    margin: 0 auto;
  }

  &__icon {
    color: $orange;
    margin-bottom: 24px;

    svg {
      width: 64px;
      height: 64px;
    }
  }

  &__title {
    font-size: $h2;
    color: $text-heading;
    margin-bottom: 24px;
  }

  &__text {
    color: $text-body;
    font-size: $body-lg;
    line-height: 1.8;
    max-width: 550px;
    margin: 0 auto 48px;
  }

  &__steps {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }

  &__step {
    text-align: center;
    padding: 32px 24px;

    h3 {
      color: $text-heading;
      font-size: $body;
      margin: 12px 0 8px;
    }

    p {
      color: $text-body;
      font-size: $small;
      line-height: 1.6;
    }
  }

  &__step-icon {
    color: $purple;
  }
}
</style>
