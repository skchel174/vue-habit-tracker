<script setup lang="ts">
import UiFormField from '@/components/UiFormField.vue';
import type { HabitColor } from '@/constants';

defineProps<{
  indicatorColors: { value: HabitColor; label: string; dotClass: string }[];
}>();

const indicatorColor = defineModel<HabitColor>('indicatorColor', {
  required: true,
});

const changeIndicatorColor = (color: HabitColor) => {
  indicatorColor.value = color;
};
</script>

<template>
  <div class="lg:col-span-6 space-y-1.5">
    <UiFormField for="indicatorColor" label="Indicator color">
      <div class="flex flex-wrap gap-2">
        <button
          v-for="color in indicatorColors"
          :key="color.value"
          type="button"
          class="inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-sm transition"
          :class="
            indicatorColor === color.value
              ? 'border-rose-300 bg-rose-50 text-slate-700 shadow-sm'
              : 'border-rose-200/80 bg-white text-slate-500 hover:border-rose-300 hover:bg-rose-50'
          "
          @click="changeIndicatorColor(color.value)"
        >
          <span class="h-2.5 w-2.5 rounded-full" :class="color.dotClass" />
          {{ color.label }}
        </button>
      </div>
    </UiFormField>
  </div>
</template>
