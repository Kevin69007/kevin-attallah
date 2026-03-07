<template>
  <div class="faq">
    <div
      v-for="(item, index) in items"
      :key="index"
      :class="['faq__item', { 'faq__item--open': openIndex === index }]"
    >
      <button class="faq__question" @click="toggle(index)">
        <span>{{ item.question }}</span>
        <ChevronDown class="faq__icon" :size="20" />
      </button>
      <Transition name="accordion">
        <div v-show="openIndex === index" class="faq__answer">
          <div class="faq__answer-inner">
            <p>{{ item.answer }}</p>
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ChevronDown } from 'lucide-vue-next'

interface FAQItem {
  question: string
  answer: string
}

interface Props {
  items: FAQItem[]
}

defineProps<Props>()

const openIndex = ref<number | null>(null)

function toggle(index: number) {
  openIndex.value = openIndex.value === index ? null : index
}
</script>

<style lang="scss" scoped>
.faq {
  display: flex;
  flex-direction: column;
  gap: 12px;

  &__item {
    background: $bg-card;
    border: 1px solid $card-border;
    border-radius: $radius-md;
    overflow: hidden;
    transition: border-color 0.3s ease;
    box-shadow: $shadow-sm;

    &--open {
      border-color: rgba($purple, 0.2);
    }
  }

  &__question {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 24px;
    color: $text-heading;
    font-size: $body;
    font-weight: 600;
    text-align: left;
    cursor: pointer;
    transition: color 0.3s ease;

    &:hover {
      color: $purple;
    }
  }

  &__icon {
    transition: transform 0.3s ease;
    flex-shrink: 0;
    color: $text-muted;

    .faq__item--open & {
      transform: rotate(180deg);
      color: $purple;
    }
  }

  &__answer {
    overflow: hidden;
  }

  &__answer-inner {
    padding: 0 24px 20px;

    p {
      color: $text-body;
      line-height: 1.7;
      font-size: $small;
    }
  }
}

.accordion-enter-active,
.accordion-leave-active {
  transition: all 0.3s ease;
  max-height: 300px;
}

.accordion-enter-from,
.accordion-leave-to {
  opacity: 0;
  max-height: 0;
}
</style>
