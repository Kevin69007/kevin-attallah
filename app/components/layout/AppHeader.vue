<template>
  <header :class="['header', { 'header--scrolled': isScrolled }]" :style="{ top: barHeight + 'px' }">
    <div class="container header__container">
      <!-- Dark glass pill with logo + nav -->
      <div class="header__pill glass-card-light">
        <NuxtLink to="/" class="header__logo">
          <NuxtImg src="/img/logo-1.png" alt="Kevin Attallah" class="header__logo-img" />
        </NuxtLink>
        <nav class="header__nav">
          <NuxtLink to="/" class="header__link" active-class="header__link--active">Kevin Attallah</NuxtLink>
          <NuxtLink to="/creer-entreprise" class="header__link" active-class="header__link--active">Créer mon entreprise</NuxtLink>
          <NuxtLink to="/evoluer-ia" class="header__link" active-class="header__link--active">Faire évoluer mon entreprise</NuxtLink>
          <NuxtLink to="/about" class="header__link" active-class="header__link--active">À propos</NuxtLink>
          <NuxtLink to="/blog" class="header__link" active-class="header__link--active">Blog</NuxtLink>
        </nav>
      </div>

      <!-- CTA button — gold gradient, outside pill -->
      <a
        :href="externalLinks.booking.brevoMeeting"
        target="_blank"
        rel="noopener noreferrer"
        class="header__cta"
      >
        Prendre rendez-vous
      </a>

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
          <NuxtLink to="/" @click="mobileOpen = false">Kevin Attallah</NuxtLink>
          <NuxtLink to="/creer-entreprise" @click="mobileOpen = false">Créer mon entreprise</NuxtLink>
          <NuxtLink to="/evoluer-ia" @click="mobileOpen = false">Faire évoluer mon entreprise</NuxtLink>
          <NuxtLink to="/about" @click="mobileOpen = false">À propos</NuxtLink>
          <NuxtLink to="/blog" @click="mobileOpen = false">Blog</NuxtLink>
          <a :href="externalLinks.booking.brevoMeeting" target="_blank" rel="noopener noreferrer" class="header__mobile-cta" @click="mobileOpen = false">
            Prendre rendez-vous
          </a>
        </nav>
      </div>
    </Transition>
  </header>
</template>

<script setup lang="ts">
import { externalLinks } from '~/data/external-links'

const barHeight = useState('announceBarHeight', () => 0)
const mobileOpen = ref(false)
const isScrolled = ref(false)

onMounted(() => {
  const onScroll = () => {
    isScrolled.value = window.scrollY > 50
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
    padding: 10px 0;
  }

  &__container {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }

  // Liquid glass pill — frosted translucent
  &__pill {
    display: flex;
    align-items: center;
    gap: 8px;
    border-radius: 100px;
    padding: 10px 20px 10px 16px;
    transition: all 0.4s $ease-smooth;

    &:hover {
      transform: none;
    }

    .header--scrolled & {
      background: rgba(255, 255, 255, 0.15);
      border-color: rgba(255, 255, 255, 0.2);
      box-shadow:
        0 8px 32px rgba(0, 0, 0, 0.08),
        0 2px 6px rgba(0, 0, 0, 0.04),
        inset 0 1px 0 rgba(255, 255, 255, 0.4),
        inset 0 -1px 0 rgba(0, 0, 0, 0.03);
    }
  }

  &__logo {
    display: flex;
    align-items: center;
    z-index: 10;
    flex-shrink: 0;
  }

  &__logo-img {
    height: 34px;
    width: auto;
  }

  &__nav {
    display: flex;
    gap: 28px;
    margin-left: 16px;

    @media (max-width: 1024px) {
      display: none;
    }
  }

  &__link {
    color: $text-muted;
    font-size: $small;
    font-weight: 500;
    letter-spacing: 0.3px;
    transition: color 0.3s ease;
    position: relative;
    white-space: nowrap;

    &::after {
      content: '';
      position: absolute;
      bottom: -4px;
      left: 0;
      width: 0;
      height: 2px;
      background: linear-gradient(135deg, $orange, $orange-light);
      transition: width 0.3s ease;
    }

    &:hover,
    &--active {
      color: $text-heading;

      &::after {
        width: 100%;
      }
    }
  }

  // Clean solid CTA button — positioned right
  &__cta {
    position: absolute;
    right: 0;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: $orange;
    color: #fff;
    border-radius: 100px;
    padding: 12px 28px;
    font-family: $font-heading;
    font-weight: 700;
    font-size: $small;
    letter-spacing: 0.3px;
    border: 1px solid rgba($orange-light, 0.3);
    box-shadow:
      0 4px 16px rgba($orange-dark, 0.25),
      inset 0 1px 0 rgba(255, 255, 255, 0.2);
    transition: all 0.4s $ease-smooth;
    white-space: nowrap;

    &:hover {
      background: $orange-dark;
      box-shadow:
        0 6px 24px rgba($orange-dark, 0.35),
        inset 0 1px 0 rgba(255, 255, 255, 0.2);
      transform: translateY(-1px);
    }

    @media (max-width: 1024px) {
      display: none;
    }
  }

  // Burger menu
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
      background: $text-heading;
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

  // Mobile overlay (frosted glass)
  &__mobile {
    position: fixed;
    inset: 0;
    background: rgba(255, 255, 255, 0.85);
    backdrop-filter: blur($glass-blur-heavy) saturate(1.3);
    -webkit-backdrop-filter: blur($glass-blur-heavy) saturate(1.3);
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
      color: $text-heading;
      font-family: $font-heading;
      font-size: 1.5rem;
      font-weight: 700;
      transition: color 0.3s ease;

      &:hover {
        color: $purple;
      }
    }
  }

  &__mobile-cta {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: $orange !important;
    color: #fff !important;
    border-radius: 100px;
    padding: 16px 36px;
    font-weight: 700 !important;
    font-size: 1rem !important;
    border: 1px solid rgba($orange-light, 0.3);
    box-shadow:
      0 4px 16px rgba($orange-dark, 0.25),
      inset 0 1px 0 rgba(255, 255, 255, 0.2);
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
