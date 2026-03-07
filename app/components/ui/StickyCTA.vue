<template>
  <Transition name="slide-up">
    <div v-if="visible" class="sticky-cta">
      <div class="sticky-cta__inner container flex-between">
        <div class="sticky-cta__info">
          <span class="sticky-cta__price">{{ price }}€</span>
          <span v-if="originalPrice" class="sticky-cta__original">{{ originalPrice }}€</span>
        </div>
        <AppButton variant="primary" size="sm" @click="$emit('click')">
          {{ text }}
        </AppButton>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
interface Props {
  price: number
  originalPrice?: number
  text?: string
  visible?: boolean
}

withDefaults(defineProps<Props>(), {
  text: "S'inscrire",
  visible: true,
})

defineEmits(['click'])
</script>

<style lang="scss" scoped>
.sticky-cta {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 900;
  padding: 12px 0;
  background: rgba(255, 255, 255, 0.55);
  backdrop-filter: blur($glass-blur-heavy) saturate(1.3);
  -webkit-backdrop-filter: blur($glass-blur-heavy) saturate(1.3);
  border-top: 1px solid rgba(255, 255, 255, 0.6);
  box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.06);
  display: none;

  @media (max-width: 768px) {
    display: block;
  }

  &__info {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  &__price {
    font-family: $font-heading;
    font-size: 1.5rem;
    font-weight: 800;
    color: $text-heading;
  }

  &__original {
    font-size: $small;
    color: $text-muted;
    text-decoration: line-through;
  }
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: transform 0.3s ease;
}
.slide-up-enter-from,
.slide-up-leave-to {
  transform: translateY(100%);
}
</style>
