<template>
  <div>
    <section class="thanks section--dark">
      <div class="thanks__bg">
        <div class="orb orb--purple thanks__orb thanks__orb--1"></div>
        <div class="orb orb--orange thanks__orb thanks__orb--2"></div>
      </div>
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
            <div class="thanks__step glass-card" v-for="step in nextSteps" :key="step.title">
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
            <AppButton variant="ghost" to="/">
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
  background: $gradient-hero;
  position: relative;
  overflow: hidden;
  padding: 120px 0;

  &__bg {
    position: absolute;
    inset: 0;
    pointer-events: none;
  }

  &__orb {
    position: absolute;
    &--1 { width: 500px; height: 500px; top: -15%; left: -10%; opacity: 0.2; }
    &--2 { width: 300px; height: 300px; bottom: -10%; right: -5%; opacity: 0.15; }
  }

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
    color: $text-white;
    margin-bottom: 24px;
  }

  &__text {
    color: $text-on-dark-muted;
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
      color: $text-white;
      font-size: $body;
      margin: 12px 0 8px;
    }

    p {
      color: $text-on-dark-muted;
      font-size: $small;
      line-height: 1.6;
    }
  }

  &__step-icon {
    color: $purple-light;
  }
}
</style>
