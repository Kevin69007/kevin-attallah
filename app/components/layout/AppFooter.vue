<template>
  <footer class="footer-brutal">
    <div class="container relative">
      <div class="footer-brutal__top">
        <h2 class="footer-brutal__title" aria-hidden="true">KEVIN_ATTALLAH<span class="cursor">_</span></h2>
        <div class="footer-brutal__desc">
          <span>// INTELLIGENCE ARTIFICIELLE</span>
          <span>// STRATÉGIE BUSINESS</span>
          <span>// SCALING OPÉRATIONNEL</span>
        </div>
      </div>

      <div class="footer-brutal__grid">
        <div class="footer__col">
          <h4 class="footer__heading">Site</h4>
          <NuxtLink to="/">Accueil</NuxtLink>
          <NuxtLink to="/creer-entreprise">Créer mon entreprise</NuxtLink>
          <NuxtLink to="/evoluer-ia">Faire évoluer avec l'IA</NuxtLink>
          <NuxtLink to="/about">À propos</NuxtLink>
          <NuxtLink to="/blog">Blog</NuxtLink>
          <NuxtLink to="/formation-gratuite" class="footer__free-link">Formation Gratuite</NuxtLink>
        </div>

        <div class="footer__col footer__col--right">
          <h4 class="footer__heading">Légal</h4>
          <NuxtLink to="/mentions-legales">Mentions légales</NuxtLink>
          <NuxtLink to="/cgv">CGV</NuxtLink>
          <a :href="'mailto:' + externalLinks.contact.email">{{ externalLinks.contact.email }}</a>
          <a :href="externalLinks.booking.brevoMeeting" target="_blank" rel="noopener">Prendre rendez-vous</a>
        </div>
      </div>

      <!-- TEMP: Preview buttons (remove later) -->
      <div style="display: flex; gap: 16px; margin: 24px 0;">
        <AppButton variant="primary" @click="previewPaiement">PREVIEW PAIEMENT</AppButton>
        <AppButton variant="ghost-light" to="/remerciement" @click="setPaymentSuccess">PREVIEW REMERCIEMENT</AppButton>
      </div>

      <!-- Bottom bar -->
      <div class="footer-brutal__bottom">
        <p class="footer-brutal__copy">
          &copy; {{ currentYear }} KEVIN ATTALLAH. TOUS DROITS RÉSERVÉS.
        </p>
        <div class="footer-brutal__social">
          <a
            v-for="link in socialLinks"
            :key="link.name"
            :href="link.url"
            target="_blank"
            rel="noopener noreferrer"
            class="footer-brutal__social-link"
            :aria-label="link.name"
          >
            <component :is="socialIcons[link.icon]" :size="24" />
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { Facebook, Twitter, Linkedin, Youtube, Instagram, Music2 } from 'lucide-vue-next'
import { socialLinks } from '~/data/social'
import { externalLinks } from '~/data/external-links'

const currentYear = new Date().getFullYear()
const router = useRouter()

function previewPaiement() {
  localStorage.setItem('orderResponse', JSON.stringify({
    token: 'preview-token',
    order_amount: { value: 29900 },
    description: 'Créer mon entreprise — Formation en autonomie',
  }))
  router.push('/paiement')
}

function setPaymentSuccess() {
  localStorage.setItem('paymentSuccess', 'true')
}

const socialIcons: Record<string, any> = {
  facebook: Facebook,
  twitter: Twitter,
  linkedin: Linkedin,
  youtube: Youtube,
  instagram: Instagram,
  tiktok: Music2,
}
</script>

<style lang="scss" scoped>
.footer-brutal {
  background: #000;
  color: #FFF;
  border-top: 4px solid #000; // In case we place it right after a white section
  padding: 80px 0 32px;
  position: relative;
  overflow: hidden;
  z-index: 20;

  &__top {
    margin-bottom: 60px;
    border-bottom: 4px solid #FFF;
    padding-bottom: 40px;
  }

  &__title {
    font-size: clamp(3rem, 10vw, 8rem);
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: -0.05em;
    line-height: 0.9;
    color: #FFF;
    margin-bottom: 24px;
    
    .cursor {
      color: $orange;
      animation: blink 1s step-end infinite;
    }
  }

  &__desc {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    font-family: $font-mono;
    font-size: 1.25rem;
    font-weight: 700;
    color: $purple;
  }

  &__grid {
    display: flex;
    justify-content: space-between;
    gap: 40px;

    @media (max-width: 768px) {
      flex-direction: column;
      gap: 40px;
    }
  }

  .footer__col {
    display: flex;
    flex-direction: column;
    gap: 16px;

    &--right {
      text-align: right;

      @media (max-width: 768px) {
        text-align: left;
      }
    }

    a {
      font-family: $font-mono;
      color: #FFF;
      font-size: 1.125rem;
      text-transform: uppercase;
      font-weight: 700;
      transition: color 0.2s, padding-left 0.2s;

      &:hover {
        color: $orange;
        padding-left: 8px; // mechanical shift
      }
    }
  }

  .footer__heading {
    font-family: $font-mono;
    font-size: 0.85rem;
    color: $text-muted;
    text-transform: uppercase;
    letter-spacing: 2px;
    margin-bottom: 12px;
  }

  .footer__free-link {
    color: $orange !important;
    background: #FFF;
    padding: 4px 8px;
    color: #000 !important;
    width: fit-content;
    border: 2px solid #FFF;
    
    &:hover {
      background: #000;
      color: #FFF !important;
    }
  }

  &__bottom {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-top: 4px solid #FFF;
    margin-top: 60px;
    padding-top: 24px;

    @media (max-width: 768px) {
      flex-direction: column-reverse;
      gap: 24px;
      text-align: center;
    }
  }

  &__copy {
    font-family: $font-mono;
    font-size: 0.85rem;
    font-weight: 700;
    color: $text-muted;
  }

  &__social {
    display: flex;
    gap: 24px;
  }

  &__social-link {
    color: #FFF;
    border: 2px solid #FFF;
    padding: 8px;
    transition: all 0.2s;
    background: #000;

    &:hover {
      background: $purple;
      transform: translate(-4px, -4px);
      box-shadow: 4px 4px 0px $orange;
    }
  }
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}
</style>
