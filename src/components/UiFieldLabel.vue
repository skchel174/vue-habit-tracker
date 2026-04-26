<script setup lang="ts">
withDefaults(
  defineProps<{
    for?: string;
    required?: boolean;
  }>(),
  {
    required: false,
  },
);
</script>

<template>
  <label :for="for" class="block text-sm font-medium text-slate-700">
    <span class="inline-flex items-center gap-1">
      <slot />
      <span v-if="required" aria-hidden="true" class="text-rose-500">*</span>
    </span>
  </label>
</template>
