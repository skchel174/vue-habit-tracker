<script setup lang="ts">
import UiFieldLabel from '@/components/UiFieldLabel.vue';
import UiFieldMessage from '@/components/UiFieldMessage.vue';
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
    <UiFieldLabel for="targetCount">Target count</UiFieldLabel>
    <UiInput
      id="targetCount"
      v-model="targetCount"
      type="number"
      min="1"
      placeholder="For example 7"
    />
    <UiFieldMessage :message="errors.targetCount" variant="error" />
  </div>

  <div v-if="habitKind === 'duration'" class="lg:col-span-4 space-y-1.5">
    <UiFieldLabel for="targetMinutes">Duration in minutes</UiFieldLabel>
    <UiInput
      id="targetMinutes"
      v-model="targetMinutes"
      type="number"
      min="1"
      placeholder="For example 30"
    />
    <UiFieldMessage :message="errors.targetMinutes" variant="error" />
  </div>
</template>
