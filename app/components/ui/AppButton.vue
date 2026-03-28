<template>
  <NuxtLink
    v-if="to"
    v-magnetic="0.25"
    :to="to"
    :class="btnClasses"
    v-bind="$attrs"
  >
    <slot />
  </NuxtLink>
  <a
    v-else-if="href"
    v-magnetic="0.25"
    :href="href"
    target="_blank"
    rel="noopener noreferrer"
    :class="btnClasses"
    v-bind="$attrs"
  >
    <slot />
  </a>
  <button
    v-else
    v-magnetic="0.25"
    :class="btnClasses"
    v-bind="$attrs"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
interface Props {
  variant?: 'primary' | 'secondary' | 'ghost' | 'ghost-light' | 'outline' | 'outline-light'
  size?: 'sm' | 'md' | 'lg'
  block?: boolean
  to?: string
  href?: string
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  block: false,
})

const btnClasses = computed(() => [
  'btn',
  `btn--${props.variant}`,
  {
    'btn--sm': props.size === 'sm',
    'btn--lg': props.size === 'lg',
    'btn--block': props.block,
  },
])
</script>
