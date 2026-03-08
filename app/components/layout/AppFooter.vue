<template>
  <footer class="footer">
    <div class="container">
      <!-- Large decorative K behind -->
      <span class="footer__letter" aria-hidden="true">K</span>
      <!-- Large decorative watermark -->
      <h2 class="footer__watermark" aria-hidden="true">KEVINATTALLAH</h2>

      <!-- Link columns -->
      <div class="footer__grid">
        <!-- Site links -->
        <div class="footer__col">
          <h4 class="footer__heading">Site</h4>
          <NuxtLink to="/">Accueil</NuxtLink>
          <NuxtLink to="/creer-entreprise">Créer mon entreprise</NuxtLink>
          <NuxtLink to="/evoluer-ia">Faire évoluer avec l'IA</NuxtLink>
          <NuxtLink to="/about">À propos</NuxtLink>
          <NuxtLink to="/blog">Blog</NuxtLink>
          <NuxtLink to="/formation-gratuite" class="footer__free-link">Formation Gratuite</NuxtLink>
        </div>

        <!-- Legal + Contact -->
        <div class="footer__col footer__col--right">
          <h4 class="footer__heading">Légal</h4>
          <NuxtLink to="/mentions-legales">Mentions légales</NuxtLink>
          <NuxtLink to="/cgv">CGV</NuxtLink>
          <a :href="'mailto:' + externalLinks.contact.email">{{ externalLinks.contact.email }}</a>
          <a :href="externalLinks.booking.brevoMeeting" target="_blank" rel="noopener">Prendre rendez-vous</a>
        </div>
      </div>

      <!-- Bottom bar -->
      <div class="footer__bottom">
        <p class="footer__copy">
          &copy; {{ currentYear }} Kevin Attallah. Tous droits réservés.
        </p>
        <div class="footer__social">
          <a
            v-for="link in socialLinks"
            :key="link.name"
            :href="link.url"
            target="_blank"
            rel="noopener noreferrer"
            class="footer__social-link"
            :aria-label="link.name"
          >
            <component :is="socialIcons[link.icon]" :size="18" />
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
.footer {
  background: transparent;
  color: $text-body;
  padding: 80px 0 32px;
  position: relative;
  overflow: hidden;

  // Large background "K" — stretches full height of footer
  &__letter {
    position: absolute;
    bottom: 0;
    left: 5%;
    font-family: $font-heading;
    font-size: clamp(28rem, 60vw, 55rem);
    font-weight: 900;
    line-height: 0.75;
    color: rgba(0, 0, 0, 0.04);
    user-select: none;
    pointer-events: none;
    z-index: 0;
  }

  // Large decorative text — 3D gradient copper fill + white border
  &__watermark {
    position: relative;
    z-index: 1;
    font-family: $font-heading;
    font-size: clamp(3rem, 9.5vw, 10rem);
    font-weight: 900;
    text-transform: uppercase;
    letter-spacing: -4px;
    text-align: center;
    line-height: 1;
    margin-bottom: 48px;
    user-select: none;
    // 3D metallic gradient — lighter top, darker bottom
    background: linear-gradient(
      180deg,
      $orange-light 0%,
      $orange 40%,
      $orange-dark 70%,
      darken($orange-dark, 8%) 100%
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    // White border around letters
    -webkit-text-stroke: 1.5px rgba(255, 255, 255, 0.6);
    paint-order: stroke fill;
    // Warm glow behind text
    filter: drop-shadow(0 0 40px rgba($orange, 0.2)) drop-shadow(0 0 80px rgba($orange-dark, 0.15));
  }

  // 2-column layout
  &__grid {
    display: flex;
    justify-content: space-between;
    gap: 40px;

    @media (max-width: 640px) {
      flex-direction: column;
      gap: 32px;
    }
  }

  &__col {
    display: flex;
    flex-direction: column;
    gap: 12px;

    &--right {
      text-align: right;

      @media (max-width: 640px) {
        text-align: left;
      }
    }

    a {
      color: $text-body;
      font-size: $small;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      transition: color 0.3s ease;

      &:hover {
        color: $text-heading;
      }
    }
  }

  &__heading {
    font-family: $font-heading;
    font-size: $xs;
    font-weight: 600;
    color: $text-muted;
    text-transform: uppercase;
    letter-spacing: 2px;
    margin-bottom: 8px;
  }

  &__free-link {
    color: $orange !important;
    font-weight: 600;
  }

  // Bottom bar
  &__bottom {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-top: 1px solid $card-border;
    margin-top: 48px;
    padding-top: 24px;

    @media (max-width: 640px) {
      flex-direction: column;
      gap: 16px;
      text-align: center;
    }
  }

  &__copy {
    font-size: $xs;
    color: $text-muted;
  }

  &__social {
    display: flex;
    gap: 16px;
  }

  &__social-link {
    color: $text-muted;
    transition: all 0.3s ease;

    &:hover {
      color: $purple;
    }
  }
}
</style>
