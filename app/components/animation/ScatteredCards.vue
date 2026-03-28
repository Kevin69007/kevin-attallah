<template>
  <div class="scattered-cards" @mouseleave="onScatterLeave">
    <div
      v-for="i in count"
      :key="i - 1"
      :ref="(el) => setCardRef(el, i - 1)"
      v-magnetic="0.15"
      class="scattered-cards__card glass-card-light"
      @mouseenter="onCardEnter(i - 1)"
      @mouseleave="onCardLeave(i - 1)"
    >
      <slot :name="`card-${i - 1}`" />
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  count: number
  spreadDistance?: number
}

const props = withDefaults(defineProps<Props>(), {
  spreadDistance: 30,
})

const { $gsap: gsap } = useNuxtApp()
const cardEls: HTMLElement[] = []
const rotations = ref<number[]>([])

// Generate initial rotations based on card count
const ROTATION_POOL = [-8, 5, -4, 7, -6, 4, -7, 6, -5, 3]
function generateRotations(n: number): number[] {
  return Array.from({ length: n }, (_, i) => ROTATION_POOL[i % ROTATION_POOL.length]!)
}

function setCardRef(el: any, i: number) {
  if (el) cardEls[i] = el as HTMLElement
}

onMounted(() => {
  rotations.value = generateRotations(props.count)

  cardEls.forEach((card, i) => {
    if (card && gsap) {
      gsap.set(card, { rotation: rotations.value[i], zIndex: 1 })
    }
  })
})

function onCardEnter(i: number) {
  if (!gsap) return
  const el = cardEls[i]
  if (!el) return

  // Hovered card: straighten, scale up, raise
  gsap.to(el, {
    rotation: 0,
    scale: 1.05,
    zIndex: 10,
    duration: 0.4,
    ease: 'power2.out',
  })

  // Spread all other cards away from hovered card
  for (let j = 0; j < props.count; j++) {
    const other = cardEls[j]
    if (j === i || !other) continue
    const offset = (j - i) * props.spreadDistance
    gsap.to(other, {
      x: offset,
      duration: 0.5,
      ease: 'power2.out',
    })
  }
}

function onCardLeave(i: number) {
  const el = cardEls[i]
  if (!el || !gsap) return
  const current = rotations.value[i] ?? 0
  let next: number
  do {
    next = Math.floor(Math.random() * 17) - 8
  } while (Math.abs(next - current) < 3 || next === 0)
  rotations.value[i] = next

  gsap.to(el, {
    rotation: next,
    scale: 1,
    zIndex: 1,
    duration: 0.6,
    ease: 'elastic.out(1, 0.5)',
  })
}

function onScatterLeave() {
  if (!gsap) return
  for (let j = 0; j < props.count; j++) {
    const el = cardEls[j]
    if (!el) continue
    gsap.to(el, {
      x: 0,
      duration: 0.5,
      ease: 'power2.out',
    })
  }
}
</script>

<style lang="scss" scoped>
.scattered-cards {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 0;
  position: relative;

  &__card {
    width: 300px;
    height: 340px;
    border-radius: $radius-lg;
    overflow: hidden;
    cursor: pointer;
    will-change: transform;
    position: relative;
    flex-shrink: 0;
    margin: 0 -12px;

    // Override glass-card-light hover transform (we handle it via GSAP)
    &:hover {
      transform: none;
    }

    @media (max-width: 1024px) {
      width: 250px;
      height: 290px;
      margin: 0 -8px;
    }

    @media (max-width: 768px) {
      width: 210px;
      height: 250px;
      margin: 0 -6px;
    }

    @media (max-width: 480px) {
      width: 165px;
      height: 200px;
      margin: 0 -4px;
    }
  }
}
</style>
