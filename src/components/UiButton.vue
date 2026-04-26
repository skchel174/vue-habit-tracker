<script setup lang="ts">
import { computed } from 'vue';

const props = withDefaults(
  defineProps<{
    type?: 'button' | 'submit' | 'reset';
    variant?: 'primary' | 'secondary';
    disabled?: boolean;
  }>(),
  {
    type: 'button',
    variant: 'primary',
    disabled: false,
  },
);

const classes = computed(() => [
  'inline-flex items-center justify-center rounded-xl px-4 py-2.5 text-sm font-medium transition outline-none',
  'focus-visible:ring-4 focus-visible:ring-rose-100 cursor-pointer',
  props.variant === 'primary' && 'bg-rose-500 text-white hover:bg-rose-600',
  props.variant === 'secondary' &&
    'border border-rose-200 bg-white text-slate-700 hover:bg-rose-50',
  props.disabled && 'opacity-50 cursor-not-allowed pointer-events-none',
]);
</script>

<template>
  <button
    :type="type"
    :disabled="disabled"
    :class="classes"
  >
    <slot />
  </button>
</template>
