<template>
  <header :class="['header', { 'header--scrolled': isScrolled }]" :style="{ top: barHeight + 'px' }">
    <div class="container header__container">
      <!-- Brutalist solid block with logo + nav -->
      <div class="header__pill brutal-header-block">
        <NuxtLink to="/" class="header__logo">
          <NuxtImg src="/img/logo-1.png" alt="Kevin Attallah" class="header__logo-img" />
        </NuxtLink>
        <nav class="header__nav">
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

  // Brutalist block — solid white, sharp shadow
  &__pill {
    display: flex;
    align-items: center;
    gap: 8px;
    background: #FFFFFF;
    border: 2px solid #000;
    box-shadow: 4px 4px 0px #000;
    padding: 10px 20px 10px 16px;
    transition: all 0.2s;

    &:hover {
      transform: translate(-2px, -2px);
      box-shadow: 6px 6px 0px #000;
    }

    .header--scrolled & {
      // Keeps same block style but could add a purple accent
      box-shadow: 4px 4px 0px $purple;
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

  // Brutalist solid CTA button
  &__cta {
    position: absolute;
    right: 0;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: #FFFFFF;
    color: #000;
    border: 2px solid #000;
    box-shadow: 4px 4px 0px #000;
    padding: 12px 28px;
    font-family: $font-mono;
    font-weight: 700;
    font-size: $small;
    text-transform: uppercase;
    transition: all 0.2s;
    white-space: nowrap;

    &:hover {
      background: $orange;
      transform: translate(-2px, -2px);
      box-shadow: 6px 6px 0px #000;
    }
    
    &:active {
      transform: translate(2px, 2px);
      box-shadow: 0px 0px 0px #000;
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
    min-width: 44px;
    min-height: 44px;

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

  // Mobile overlay
  &__mobile {
    position: fixed;
    inset: 0;
    background: #FFF;
    z-index: 999;
    border-top: 4px solid #000;
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
      font-family: $font-mono;
      font-size: 1.25rem;
      font-weight: 700;
      transition: color 0.3s ease;
      border-bottom: 2px solid #000;
      padding: 16px 0;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      width: 100%;
      display: block;

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
    padding: 16px 36px;
    font-weight: 700 !important;
    font-size: 1rem !important;
    font-family: $font-mono;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    border: 4px solid #000;
    box-shadow: 4px 4px 0px $purple;
  }
}

.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: opacity 0.3s ease;
}
.mobile-menu-enter-from,
.mobile-menu-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>
