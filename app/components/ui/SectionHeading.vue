<template>
  <div ref="el" class="section-heading" :class="{ 'text-center': center }">
    <span ref="labelEl" class="section-heading__label">
      <span class="section-heading__label-line section-heading__label-line--left"></span>
      {{ label }}
      <span class="section-heading__label-line section-heading__label-line--right"></span>
    </span>
    <TextSplit
      :text="title"
      :gradient-text="gradientText"
      tag="h2"
      :mode="mode"
      :delay="0.15"
      :once="once"
      class="section-title"
    />
    <p v-if="subtitle" ref="subtitleEl" class="section-heading__subtitle">{{ subtitle }}</p>
  </div>
</template>

<script setup lang="ts">
interface Props {
  label: string
  title: string
  gradientText?: string
  subtitle?: string
  center?: boolean
  mode?: 'chars' | 'words' | 'blur-in'
  once?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  gradientText: '',
  subtitle: '',
  center: true,
  mode: 'blur-in',
  once: false,
})

const el = ref<HTMLElement | null>(null)
const labelEl = ref<HTMLElement | null>(null)
const subtitleEl = ref<HTMLElement | null>(null)

onMounted(() => {
  if (!el.value) return

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    if (labelEl.value) labelEl.value.style.opacity = '1'
    if (subtitleEl.value) subtitleEl.value.style.opacity = '1'
    el.value.querySelectorAll('.section-heading__label-line').forEach((line) => {
      ;(line as HTMLElement).style.transform = 'scaleX(1)'
    })
    return
  }

  const { $gsap, $ScrollTrigger } = useNuxtApp()
  if (!$gsap || !$ScrollTrigger) return

  const tl = $gsap.timeline({
    scrollTrigger: {
      trigger: el.value,
      start: 'top 90%',
      end: 'bottom top',
      toggleActions: props.once
        ? 'play none none none'
        : 'play reverse play reverse',
    },
  })

  // Label slides up and fades in
  if (labelEl.value) {
    tl.fromTo(
      labelEl.value,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
      0,
    )

    // Decorative lines draw outward
    const lines = el.value.querySelectorAll('.section-heading__label-line')
    tl.fromTo(
      lines,
      { scaleX: 0 },
      { scaleX: 1, duration: 0.8, ease: 'power3.out' },
      0.2,
    )
  }

  // Subtitle fades up
  if (subtitleEl.value) {
    tl.fromTo(
      subtitleEl.value,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' },
      0.3,
    )
  }
})
</script>

<style lang="scss" scoped>
.section-heading {
  &__label {
    display: inline-flex;
    align-items: center;
    gap: 14px;
    font-family: $font-heading;
    font-size: $xs;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 3px;
    color: $purple;
    opacity: 0;
    margin-bottom: 12px;
  }

  &__label-line {
    display: inline-block;
    width: 40px;
    height: 1.5px;
    background: linear-gradient(90deg, $purple, $orange);
    transform: scaleX(0);
    will-change: transform;

    &--left {
      transform-origin: right center;
    }

    &--right {
      transform-origin: left center;
    }
  }

  &__subtitle {
    font-size: $body-lg;
    color: $text-muted;
    line-height: 1.6;
    max-width: 600px;
    margin-top: 16px;
    opacity: 0;
  }

  &.text-center &__subtitle {
    margin-left: auto;
    margin-right: auto;
  }

  &.text-center &__label {
    justify-content: center;
    width: 100%;
  }
}
</style>
