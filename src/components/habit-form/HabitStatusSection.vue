<script setup lang="ts">
import UiCheckbox from '@/components/UiCheckbox.vue';

const isArchived = defineModel<boolean>('isArchived', { required: true });
</script>

<template>
  <div class="lg:col-span-12">
    <label
      class="flex items-start justify-between gap-3 rounded-2xl border border-rose-200/70 bg-rose-50/40 px-4 py-3.5"
    >
      <div>
        <span class="block text-sm font-medium text-slate-700">
          Archive habit
        </span>
        <span class="mt-0.5 block text-sm leading-5 text-slate-500">
          Keep it in history, but hide it from active planning.
        </span>
      </div>  

      <UiCheckbox v-model="isArchived" />
    </label>
  </div>
</template>
