<script setup lang="ts">
withDefaults(
  defineProps<{
    forId?: string | undefined;
    required?: boolean;
  }>(),
  {
    forId: undefined,
    required: false,
  },
);
</script>

<template>
  <label
    :for-id="forId"
    class="block text-sm font-medium text-slate-700"
  >
    <span class="inline-flex items-center gap-1">
      <slot />
      <span
        v-if="required"
        aria-hidden="true"
        class="text-rose-500"
      >*</span>
    </span>
  </label>
</template>
