<script setup lang="ts">
defineEmits<{
  (e: 'submit'): void;
}>();
</script>

<template>
  <form @submit.prevent="$emit('submit')">
    <div
      v-if="$slots['header']"
      class="mb-7"
    >
      <slot name="header" />
    </div>

    <div class="grid grid-cols-1 gap-x-4 gap-y-5 lg:grid-cols-12">
      <slot />
    </div>

    <div
      class="mt-8 flex flex-col-reverse gap-2 border-t border-rose-100 pt-5 sm:flex-row sm:justify-end"
    >
      <slot name="actions" />
    </div>
  </form>
</template>
