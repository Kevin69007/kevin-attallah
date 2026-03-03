<template>
  <footer class="footer section--dark">
    <div class="container">
      <div class="footer__top grid grid-4">
        <!-- Brand -->
        <div class="footer__brand">
          <NuxtLink to="/" class="footer__logo">
            <span class="gradient-text">Kevin</span> Attallah
          </NuxtLink>
          <p class="footer__desc">
            Formations professionnelles certifiantes éligibles CPF.
            Entrepreneuriat, langues, bureautique et bien plus.
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

        <!-- Formations -->
        <div class="footer__col">
          <h4 class="footer__heading">Formations</h4>
          <ul class="footer__links">
            <li><NuxtLink to="/formations">Catalogue</NuxtLink></li>
            <li><NuxtLink to="/formations?cat=LANGUES">Langues</NuxtLink></li>
            <li><NuxtLink to="/formations?cat=BUREAUTIQUE">Bureautique</NuxtLink></li>
            <li><NuxtLink to="/formations?cat=Entrepreneur">Entrepreneuriat</NuxtLink></li>
            <li><NuxtLink to="/formation-gratuite" class="footer__free-link">Formation Gratuite</NuxtLink></li>
          </ul>
        </div>

        <!-- Company -->
        <div class="footer__col">
          <h4 class="footer__heading">Entreprise</h4>
          <ul class="footer__links">
            <li><NuxtLink to="/about">À propos</NuxtLink></li>
            <li><NuxtLink to="/accompagnement">Accompagnement</NuxtLink></li>
            <li><NuxtLink to="/blog">Blog</NuxtLink></li>
          </ul>
        </div>

        <!-- Contact -->
        <div class="footer__col">
          <h4 class="footer__heading">Contact</h4>
          <ul class="footer__links">
            <li>
              <a :href="'mailto:' + externalLinks.contact.email">{{ externalLinks.contact.email }}</a>
            </li>
            <li>
              <a :href="externalLinks.booking.brevoMeeting" target="_blank" rel="noopener">
                Prendre rendez-vous
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div class="glass-divider mt-48 mb-24"></div>

      <div class="footer__bottom flex-between">
        <p class="footer__copy">
          &copy; {{ currentYear }} Kevin Attallah. Tous droits réservés.
        </p>
        <div class="footer__legal">
          <NuxtLink to="/mentions-legales">Mentions légales</NuxtLink>
          <NuxtLink to="/cgv">CGV</NuxtLink>
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
  padding-top: $section-pad-sm;
  padding-bottom: 32px;
  background: $gradient-hero;

  &__logo {
    font-family: $font-heading;
    font-size: 1.5rem;
    font-weight: 800;
    color: $text-white;
    display: inline-block;
    margin-bottom: 16px;
  }

  &__desc {
    color: $text-on-dark-muted;
    font-size: $small;
    line-height: 1.7;
    margin-bottom: 24px;
    max-width: 280px;
  }

  &__social {
    display: flex;
    gap: 12px;
  }

  &__social-link {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background: $glass-bg;
    border: 1px solid $glass-border;
    color: $text-on-dark-muted;
    transition: $transition-base;

    &:hover {
      background: $purple;
      border-color: $purple;
      color: $text-white;
      transform: translateY(-3px);
    }
  }

  &__col {
    @media (max-width: 640px) {
      margin-top: 32px;
    }
  }

  &__heading {
    font-family: $font-heading;
    font-size: $body;
    font-weight: 700;
    color: $text-white;
    margin-bottom: 20px;
  }

  &__links {
    display: flex;
    flex-direction: column;
    gap: 12px;

    a {
      color: $text-on-dark-muted;
      font-size: $small;
      transition: color 0.3s ease;

      &:hover {
        color: $orange;
      }
    }
  }

  &__free-link {
    color: $orange-light !important;
    font-weight: 600;
  }

  &__bottom {
    @media (max-width: 640px) {
      flex-direction: column;
      gap: 12px;
      text-align: center;
    }
  }

  &__copy {
    font-size: $xs;
    color: $text-on-dark-muted;
  }

  &__legal {
    display: flex;
    gap: 24px;

    a {
      font-size: $xs;
      color: $text-on-dark-muted;
      transition: color 0.3s ease;

      &:hover {
        color: $text-white;
      }
    }
  }
}
</style>
