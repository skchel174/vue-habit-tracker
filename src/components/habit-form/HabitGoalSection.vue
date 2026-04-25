<script setup lang="ts">
import UiFormField from '@/components/UiFormField.vue';
import UiInput from '@/components/UiInput.vue';
import type { HabitKind } from '@/constants';
import type { FieldError } from '@/types';

type HabitGoalErrors = {
  targetCount: FieldError;
  targetMinutes: FieldError;
};

defineProps<{
  habitKind: HabitKind;
  errors: HabitGoalErrors;
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
    <UiFormField
      for="targetCount"
      label="Target count"
      :error="errors.targetCount"
    >
      <UiInput
        id="targetCount"
        v-model="targetCount"
        type="number"
        min="1"
        placeholder="For example 7"
      />
    </UiFormField>
  </div>

  <div v-if="habitKind === 'duration'" class="lg:col-span-4 space-y-1.5">
    <UiFormField
      for="targetMinutes"
      label="Duration in minutes"
      :error="errors.targetMinutes"
    >
      <UiInput
        id="targetMinutes"
        v-model="targetMinutes"
        type="number"
        min="1"
        placeholder="For example 30"
      />
    </UiFormField>
  </div>
</template>
