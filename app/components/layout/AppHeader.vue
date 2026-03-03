<template>
  <header :class="['header', { 'header--scrolled': isScrolled, 'header--hidden': isHidden }]" :style="{ top: barHeight + 'px' }">
    <div class="container flex-between">
      <!-- Logo -->
      <NuxtLink to="/" class="header__logo">
        <NuxtImg src="/img/logo-1.png" alt="Kevin Attallah" class="header__logo-img" />
      </NuxtLink>

      <!-- Desktop Nav -->
      <nav class="header__nav">
        <NuxtLink to="/" class="header__link" active-class="header__link--active">Accueil</NuxtLink>
        <NuxtLink to="/formations" class="header__link" active-class="header__link--active">Formations</NuxtLink>
        <NuxtLink to="/accompagnement" class="header__link" active-class="header__link--active">Accompagnement</NuxtLink>
        <NuxtLink to="/ia" class="header__link" active-class="header__link--active">Booster par l'IA</NuxtLink>
        <NuxtLink to="/about" class="header__link" active-class="header__link--active">À propos</NuxtLink>
        <NuxtLink to="/blog" class="header__link" active-class="header__link--active">Blog</NuxtLink>
      </nav>

      <!-- CTA -->
      <div class="header__actions">
        <a :href="externalLinks.booking.brevoMeeting" target="_blank" rel="noopener noreferrer" class="btn btn--primary btn--sm header__cta-free">
          <Calendar :size="16" />
          Prendre rendez-vous
        </a>
      </div>

      <!-- Mobile toggle -->
      <button
        class="header__burger"
        :class="{ 'header__burger--open': mobileOpen }"
        @click="mobileOpen = !mobileOpen"
        aria-label="Menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>

    <!-- Mobile Menu -->
    <Transition name="mobile-menu">
      <div v-if="mobileOpen" class="header__mobile">
        <nav class="header__mobile-nav">
          <NuxtLink to="/" @click="mobileOpen = false">Accueil</NuxtLink>
          <NuxtLink to="/formations" @click="mobileOpen = false">Formations</NuxtLink>
          <NuxtLink to="/accompagnement" @click="mobileOpen = false">Accompagnement</NuxtLink>
          <NuxtLink to="/ia" @click="mobileOpen = false">Booster par l'IA</NuxtLink>
          <NuxtLink to="/about" @click="mobileOpen = false">À propos</NuxtLink>
          <NuxtLink to="/blog" @click="mobileOpen = false">Blog</NuxtLink>
          <a :href="externalLinks.booking.brevoMeeting" target="_blank" rel="noopener noreferrer" class="btn btn--primary btn--block" @click="mobileOpen = false">
            <Calendar :size="16" />
            Prendre rendez-vous
          </a>
        </nav>
      </div>
    </Transition>
  </header>
</template>

<script setup lang="ts">
import { Calendar } from 'lucide-vue-next'
import { externalLinks } from '~/data/external-links'

const barHeight = useState('announceBarHeight', () => 0)
const mobileOpen = ref(false)
const isScrolled = ref(false)
const isHidden = ref(false)
let lastScrollY = 0

onMounted(() => {
  const onScroll = () => {
    const currentY = window.scrollY
    isScrolled.value = currentY > 50
    isHidden.value = currentY > 300 && currentY > lastScrollY
    lastScrollY = currentY
  }
  window.addEventListener('scroll', onScroll, { passive: true })
  onUnmounted(() => window.removeEventListener('scroll', onScroll))
})

watch(mobileOpen, (open) => {
  if (typeof document !== 'undefined') {
    document.body.style.overflow = open ? 'hidden' : ''
  }
})
</script>

<style lang="scss" scoped>
.header {
  position: fixed;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: 16px 0;
  transition: all 0.4s $ease-smooth;

  &--scrolled {
    background: rgba(10, 5, 20, 0.85);
    backdrop-filter: blur($glass-blur-heavy);
    -webkit-backdrop-filter: blur($glass-blur-heavy);
    border-bottom: 1px solid $glass-border;
    padding: 10px 0;
  }

  &--hidden {
    transform: translateY(-100%);
  }

  &__logo {
    display: flex;
    align-items: center;
    z-index: 10;
  }

  &__logo-img {
    height: 38px;
    width: auto;
  }

  &__nav {
    display: flex;
    gap: 32px;

    @media (max-width: 1024px) {
      display: none;
    }
  }

  &__link {
    color: $text-on-dark-muted;
    font-size: $small;
    font-weight: 500;
    letter-spacing: 0.5px;
    transition: color 0.3s ease;
    position: relative;

    &::after {
      content: '';
      position: absolute;
      bottom: -4px;
      left: 0;
      width: 0;
      height: 2px;
      background: $gradient-primary;
      transition: width 0.3s ease;
    }

    &:hover,
    &--active {
      color: $text-white;

      &::after {
        width: 100%;
      }
    }
  }

  &__actions {
    @media (max-width: 1024px) {
      display: none;
    }
  }

  &__cta-free {
    display: inline-flex;
    align-items: center;
    gap: 6px;
  }

  &__burger {
    display: none;
    flex-direction: column;
    gap: 5px;
    z-index: 10;
    padding: 8px;

    @media (max-width: 1024px) {
      display: flex;
    }

    span {
      display: block;
      width: 24px;
      height: 2px;
      background: $text-white;
      transition: all 0.3s ease;
    }

    &--open {
      span:nth-child(1) {
        transform: translateY(7px) rotate(45deg);
      }
      span:nth-child(2) {
        opacity: 0;
      }
      span:nth-child(3) {
        transform: translateY(-7px) rotate(-45deg);
      }
    }
  }

  &__mobile {
    position: fixed;
    inset: 0;
    background: rgba(10, 5, 20, 0.95);
    backdrop-filter: blur($glass-blur-heavy);
    -webkit-backdrop-filter: blur($glass-blur-heavy);
    z-index: 5;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__mobile-nav {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 28px;

    a {
      color: $text-white;
      font-family: $font-heading;
      font-size: 1.5rem;
      font-weight: 700;
      transition: color 0.3s ease;

      &:hover {
        color: $orange;
      }
    }
  }
}

.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: opacity 0.3s ease;
}
.mobile-menu-enter-from,
.mobile-menu-leave-to {
  opacity: 0;
}
</style>
