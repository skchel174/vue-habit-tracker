<script setup lang="ts">
defineProps<{
  title: string;
  description?: string;
}>();
</script>

<template>
  <div>
    <h2 class="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
      {{ title }}
    </h2>
    <p v-if="description" class="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
      {{ description }}
    </p>
  </div>
</template>
