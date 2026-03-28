<template>
  <section class="cta-brutal" ref="sectionRef">
    <WaveLines />
    <div class="container cta-brutal__inner">
      <h2 class="cta-brutal__title">
        <span class="block">{{ titleLine1 }}</span>
        <span class="block outline-text">{{ line2Text }}<span v-if="line2Suffix" class="text-purple">{{ line2Suffix }}</span></span>
      </h2>

      <p class="cta-brutal__subtitle">{{ subtitle }}</p>

      <div class="cta-brutal__btn-wrap" ref="btnWrapRef">
        <AppButton variant="primary" size="lg" :to="!buttonHref ? buttonTo : undefined" :href="buttonHref || undefined" class="btn-massive">
          {{ buttonText }}
        </AppButton>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

const props = withDefaults(defineProps<{
  titleLine1?: string
  titleLine2?: string
  subtitle?: string
  buttonText?: string
  buttonTo?: string
  buttonHref?: string
}>(), {
  titleLine1: "L'HÉSITATION",
  titleLine2: 'COÛTE CHER.',
  subtitle: "Le marché n'attend pas ceux qui réfléchissent trop. Passez à l'action. Maintenant.",
  buttonText: 'RÉSERVER MON APPEL',
  buttonTo: '',
  buttonHref: '',
})

const line2Text = computed(() => {
  if (props.titleLine2.endsWith(' ?')) return props.titleLine2.slice(0, -2)
  if (props.titleLine2.endsWith('?')) return props.titleLine2.slice(0, -1)
  return props.titleLine2
})

const line2Suffix = computed(() => {
  if (props.titleLine2.endsWith(' ?')) return ' ?'
  if (props.titleLine2.endsWith('?')) return '?'
  return ''
})

const sectionRef = ref<HTMLElement | null>(null)
const btnWrapRef = ref(null)
const { $gsap } = useNuxtApp()

onMounted(() => {
  if (!$gsap || !btnWrapRef.value || !sectionRef.value) return
  const gsap = $gsap as any

  gsap.from(btnWrapRef.value, {
    scale: 0.5,
    opacity: 0,
    rotationZ: -5,
    duration: 0.8,
    ease: 'back.out(2)',
    scrollTrigger: {
      trigger: sectionRef.value,
      start: 'top 70%'
    }
  })
})
</script>

<style lang="scss" scoped>
.cta-brutal {
  position: relative;
  z-index: 20;
  background: #FFF;
  border-top: 4px solid #000;
  padding: 120px 0;
  text-align: center;
  overflow: hidden;

  &__inner {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  &__title {
    font-size: clamp(3rem, 10vw, 8rem);
    text-transform: uppercase;
    line-height: 0.85;
    letter-spacing: -0.05em;
    margin-bottom: 30px;
    color: #000;

    .block {
      display: block;
    }

    .text-purple {
      color: $purple;
      -webkit-text-stroke: 0;
    }

    .outline-text {
      color: transparent;
      -webkit-text-stroke: 4px #000;

      @media (max-width: 768px) {
        -webkit-text-stroke: 2px #000;
      }
    }
  }

  &__subtitle {
    font-family: $font-mono;
    font-size: 1.25rem;
    font-weight: 700;
    color: #000;
    text-transform: uppercase;
    max-width: 600px;
    margin-bottom: 60px;
  }

  &__btn-wrap {
    display: inline-block;
  }

  .btn-massive {
    font-size: 2rem;
    padding: 30px 60px;
    border-width: 4px;
    box-shadow: 12px 12px 0px #000;

    &:hover {
      transform: translate(-4px, -4px);
      box-shadow: 16px 16px 0px #000;
    }

    &:active {
      transform: translate(8px, 8px);
      box-shadow: 0px 0px 0px #000;
    }

    @media (max-width: 768px) {
      font-size: 1.25rem;
      padding: 20px 40px;
    }
  }
}

@media (max-width: 640px) {
  .cta-brutal__subtitle {
    font-size: 1rem;
    max-width: 90%;
  }

  .btn-massive {
    padding: 20px 32px;
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .cta-brutal__title .outline-text {
    -webkit-text-stroke: 1px #000;
  }
}
</style>
