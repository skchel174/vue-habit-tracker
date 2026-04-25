<script setup lang="ts">
import UiInput from '@/components/UiInput.vue';
import UiLabel from '@/components/UiLabel.vue';
import type { HabitKind } from '@/constants';

defineProps<{
  habitKind: HabitKind;
}>();

const targetCount = defineModel<number | null>('targetCount', {
  default: null,
});

const targetMinutes = defineModel<number | null>('targetMinutes', {
  default: null,
});
</script>

<template>
  <div v-if="habitKind === 'countable'" class="lg:col-span-4 space-y-1.5">
    <UiLabel for="targetCount">Target count</UiLabel>
    <UiInput
      id="targetCount"
      v-model="targetCount"
      type="number"
      min="1"
      placeholder="For example 7"
    />
  </div>

  <div v-if="habitKind === 'duration'" class="lg:col-span-4 space-y-1.5">
    <UiLabel for="targetMinutes">Duration in minutes</UiLabel>
    <UiInput
      id="targetMinutes"
      v-model="targetMinutes"
      type="number"
      min="1"
      placeholder="For example 30"
    />
  </div>
</template>
