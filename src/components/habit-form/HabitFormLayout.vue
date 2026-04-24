<script setup lang="ts">
defineEmits<{
  (e: 'submit'): void;
}>();
</script>

<template>
  <form
    class="w-full rounded-3xl border border-rose-200/80 bg-white/95 p-5 shadow-sm sm:p-6 lg:p-7"
    @submit.prevent="$emit('submit')"
  >
    <div v-if="$slots['header']" class="mb-7">
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
