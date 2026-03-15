<template>
  <div class="page-remerciement">
    <WebGLBrutalistLight />
    <main class="brutal-content-stack">
    <section class="thanks">
      <div class="container thanks__content text-center">
        <!-- Success badge -->
        <div class="thanks__badge" ref="badgeRef">
          <CheckCircle :size="32" />
          <span>PAIEMENT CONFIRMÉ</span>
        </div>

        <h1 class="thanks__title" ref="titleRef">
          C'EST <span class="text-purple">CONFIRMÉ</span> !
        </h1>

        <p class="thanks__text">
          TON PAIEMENT EST VALIDÉ. UN EMAIL AVEC TES ACCÈS EST EN ROUTE.
          TU PEUX COMMENCER DÈS MAINTENANT.
        </p>

        <!-- Steps -->
        <div class="thanks__steps" ref="stepsRef">
          <div
            v-for="(step, i) in nextSteps"
            :key="step.title"
            :class="['thanks__step', i % 2 === 0 ? 'thanks__step--purple' : 'thanks__step--orange']"
          >
            <div class="thanks__step-num">{{ String(i + 1).padStart(2, '0') }}</div>
            <component :is="step.icon" :size="28" class="thanks__step-icon" />
            <h3>{{ step.title }}</h3>
            <p>{{ step.description }}</p>
          </div>
        </div>

        <!-- What happens next -->
        <div class="thanks__next">
          <h2 class="thanks__next-title">ET <span class="text-orange">MAINTENANT</span> ?</h2>
          <div class="thanks__next-grid">
            <div class="thanks__next-card">
              <div class="thanks__next-icon"><Rocket :size="24" /></div>
              <p>COMMENCE TA FORMATION DÈS AUJOURD'HUI. CHAQUE MODULE EST CONÇU POUR PASSER À L'ACTION IMMÉDIATEMENT.</p>
            </div>
            <div class="thanks__next-card">
              <div class="thanks__next-icon"><Zap :size="24" /></div>
              <p>L'IA EST INTÉGRÉE DÈS LE PREMIER MODULE. TU GAGNES DU TEMPS AVANT MÊME DE FINIR LA FORMATION.</p>
            </div>
          </div>
        </div>

        <!-- CTA -->
        <div class="thanks__cta-section">
          <div class="thanks__ctas">
            <AppButton variant="primary" size="lg" to="/formations">
              DÉCOUVRIR D'AUTRES FORMATIONS
            </AppButton>
            <AppButton variant="ghost-light" size="lg" to="/">
              RETOUR À L'ACCUEIL
            </AppButton>
          </div>
        </div>
      </div>
    </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import WebGLBrutalistLight from '~/components/animation/WebGLBrutalistLight.vue'
import { CheckCircle, Mail, BookOpen, Headphones, Rocket, Zap } from 'lucide-vue-next'

useHead({ title: 'Merci !' })

const badgeRef = ref<HTMLElement | null>(null)
const titleRef = ref<HTMLElement | null>(null)
const stepsRef = ref<HTMLElement | null>(null)

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

  // GSAP entrance animations
  const { $gsap } = useNuxtApp()
  if ($gsap) {
    const gsap = $gsap as any

    if (badgeRef.value) {
      gsap.from(badgeRef.value, {
        scale: 0, opacity: 0, duration: 0.6, ease: 'back.out(2)', delay: 0.2
      })
    }

    if (titleRef.value) {
      gsap.from(titleRef.value, {
        y: 40, opacity: 0, duration: 0.7, ease: 'power3.out', delay: 0.5
      })
    }

    if (stepsRef.value) {
      gsap.from(stepsRef.value.children, {
        y: 30, opacity: 0, duration: 0.5, stagger: 0.15, ease: 'power2.out', delay: 0.8
      })
    }
  }
})

const nextSteps = [
  {
    icon: Mail,
    title: 'CHECK TON EMAIL',
    description: 'Un email de confirmation avec tes accès a été envoyé.',
  },
  {
    icon: BookOpen,
    title: 'ACCÈDE À LA FORMATION',
    description: 'Connecte-toi à ton espace et commence immédiatement.',
  },
  {
    icon: Headphones,
    title: 'ON EST LÀ',
    description: 'Notre équipe t\'accompagne tout au long de ta formation.',
  },
]
</script>

<style lang="scss" scoped>
.page-remerciement {
  position: relative;
  background: #FFF;
}

.brutal-content-stack {
  position: relative;
  z-index: 10;
}

.text-purple { color: $purple; }
.text-orange { color: $orange; }

.thanks {
  min-height: 100vh;
  display: flex;
  align-items: center;
  background: #FFF;
  border-bottom: 4px solid #000;
  padding: 140px 0 80px;

  &__content {
    max-width: 900px;
    margin: 0 auto;
  }

  &__badge {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    background: $purple;
    color: #FFF;
    font-family: $font-mono;
    font-size: 0.85rem;
    font-weight: 700;
    padding: 10px 24px;
    border: 4px solid #000;
    box-shadow: 6px 6px 0px #000;
    margin-bottom: 32px;
    text-transform: uppercase;
  }

  &__title {
    font-size: clamp(2.5rem, 6vw, 4.5rem);
    text-transform: uppercase;
    letter-spacing: -0.03em;
    line-height: 0.95;
    color: #000;
    margin-bottom: 24px;
  }

  &__text {
    font-family: $font-mono;
    font-size: 0.95rem;
    line-height: 1.7;
    color: #000;
    max-width: 600px;
    margin: 0 auto 48px;
    text-transform: uppercase;
    padding: 20px 24px;
    border: 2px solid rgba(0, 0, 0, 0.1);
    background: #FAFAFA;
  }

  &__steps {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
    margin-bottom: 48px;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }

  &__step {
    text-align: center;
    padding: 32px 24px;
    border: 4px solid #000;
    background: #FFF;
    transition: transform 0.2s, box-shadow 0.2s, background 0.2s;
    position: relative;
    overflow: hidden;

    &--purple {
      box-shadow: 8px 8px 0px $purple;

      &:hover {
        transform: translate(-4px, -4px);
        box-shadow: 12px 12px 0px $purple;
        background: $purple;
        color: #FFF;

        .thanks__step-icon { color: $orange; }
        h3 { color: #FFF; }
        p { color: rgba(255, 255, 255, 0.8); }
        .thanks__step-num { color: rgba(255, 255, 255, 0.1); }
      }
    }

    &--orange {
      box-shadow: 8px 8px 0px $orange;

      &:hover {
        transform: translate(-4px, -4px);
        box-shadow: 12px 12px 0px $orange;
        background: $orange;
        color: #FFF;

        .thanks__step-icon { color: $purple; }
        h3 { color: #FFF; }
        p { color: rgba(255, 255, 255, 0.8); }
        .thanks__step-num { color: rgba(255, 255, 255, 0.1); }
      }
    }

    h3 {
      font-size: 1.1rem;
      text-transform: uppercase;
      color: #000;
      margin: 12px 0 8px;
      transition: color 0.2s;
    }

    p {
      font-family: $font-mono;
      color: #000;
      font-size: 0.85rem;
      line-height: 1.6;
      transition: color 0.2s;
    }
  }

  &__step-num {
    position: absolute;
    top: 8px;
    right: 12px;
    font-family: $font-heading;
    font-size: 3rem;
    font-weight: 900;
    color: rgba(0, 0, 0, 0.06);
    line-height: 1;
    transition: color 0.2s;
  }

  &__step-icon {
    color: $purple;
    transition: color 0.2s;
  }

  &__next {
    margin-bottom: 48px;
  }

  &__next-title {
    font-size: clamp(1.5rem, 3vw, 2.5rem);
    font-weight: 900;
    text-transform: uppercase;
    color: #000;
    margin-bottom: 24px;
  }

  &__next-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0;
    border: 4px solid #000;
    background: #000;

    @media (max-width: 640px) {
      grid-template-columns: 1fr;
    }
  }

  &__next-card {
    background: #FFF;
    padding: 32px 28px;
    display: flex;
    gap: 16px;
    align-items: flex-start;
    transition: background 0.2s;

    &:first-child {
      border-right: 4px solid #000;

      @media (max-width: 640px) {
        border-right: none;
        border-bottom: 4px solid #000;
      }
    }

    &:hover {
      background: #FAFAFA;
    }

    p {
      font-family: $font-mono;
      font-size: 0.85rem;
      color: #000;
      line-height: 1.6;
      text-align: left;
    }
  }

  &__next-icon {
    width: 48px;
    height: 48px;
    border: 3px solid #000;
    display: flex;
    align-items: center;
    justify-content: center;
    color: $purple;
    flex-shrink: 0;
  }

  &__cta-section {
    padding-top: 32px;
    border-top: 4px solid #000;
  }

  &__ctas {
    display: flex;
    gap: 16px;
    justify-content: center;
    flex-wrap: wrap;
  }
}

@media (max-width: 640px) {
  .thanks {
    padding: 120px 0 40px;
  }

  .thanks__step {
    padding: 20px 16px;

    &--purple { box-shadow: 4px 4px 0px $purple; }
    &--orange { box-shadow: 4px 4px 0px $orange; }
  }
}
</style>
