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
  background: rgba(10, 5, 20, 0.9);
  backdrop-filter: blur($glass-blur-heavy);
  -webkit-backdrop-filter: blur($glass-blur-heavy);
  border-top: 1px solid $glass-border;
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
    color: $text-white;
  }

  &__original {
    font-size: $small;
    color: $text-on-dark-muted;
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
