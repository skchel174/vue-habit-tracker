<script setup lang="ts">
import UiFormField from '@/components/UiFormField.vue';
import UiInput from '@/components/UiInput.vue';
import type { FieldError } from '@/types';
import { computed } from 'vue';

type HabitScheduleErrors = {
  startDate: FieldError;
  endDate: FieldError;
  repeatLimit: FieldError;
  preferredTime: FieldError;
};

const props = defineProps<{
  isRecurring: boolean;
  errors: HabitScheduleErrors;
}>();

const startDate = defineModel<string | null>('startDate', { default: null });
const endDate = defineModel<string | null>('endDate', { default: null });
const repeatLimit = defineModel<number | null>('repeatLimit', {
  default: null,
});
const preferredTime = defineModel<string>('preferredTime', { required: true });

const startDateLabel = computed(() => {
  return props.isRecurring ? 'Start date' : 'Date';
});
</script>

<template>
  <div class="lg:col-span-4 space-y-1.5">
    <UiFormField
      for-id="startDate"
      :label="startDateLabel"
      :error="errors.startDate"
    >
      <UiInput
        id="startDate"
        v-model="startDate"
        type="date"
      />
    </UiFormField>
  </div>

  <div
    v-if="isRecurring"
    class="lg:col-span-4 space-y-1.5"
  >
    <UiFormField
      for-id="endDate"
      label="End date"
      :error="errors.endDate"
    >
      <UiInput
        id="endDate"
        v-model="endDate"
        type="date"
      />
    </UiFormField>
  </div>

  <div
    v-if="isRecurring"
    class="lg:col-span-4 space-y-1.5"
  >
    <UiFormField
      for-id="repeatLimit"
      label="Repeat limit"
      :error="errors.repeatLimit"
    >
      <UiInput
        id="repeatLimit"
        v-model.number="repeatLimit"
        type="number"
        min="1"
        placeholder="e.g. 10 times"
      />
    </UiFormField>
  </div>

  <div class="lg:col-span-6 space-y-1.5">
    <UiFormField
      for-id="preferredTime"
      label="Preferred time"
      :error="errors.preferredTime"
    >
      <UiInput
        id="preferredTime"
        v-model="preferredTime"
        type="time"
      />
    </UiFormField>
  </div>
</template>
