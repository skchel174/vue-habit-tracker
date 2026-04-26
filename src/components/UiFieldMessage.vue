<script setup lang="ts">
type Variant = 'error' | 'success' | 'neutral';

withDefaults(
  defineProps<{
    message: string | null | undefined;
    variant?: Variant;
  }>(),
  { variant: 'neutral' },
);
</script>

<template>
  <p
    v-if="message"
    class="text-xs leading-5"
    :class="{
      'text-red-600': variant === 'error',
      'text-emerald-600': variant === 'success',
      'text-slate-500': variant === 'neutral',
    }"
  >
    {{ message }}
  </p>
</template>
