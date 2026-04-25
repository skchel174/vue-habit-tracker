<script setup lang="ts">
import UiFieldLabel from '@/components/UiFieldLabel.vue';
import UiFieldMessage from '@/components/UiFieldMessage.vue';
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
    <UiFieldLabel for="startDate">{{ startDateLabel }}</UiFieldLabel>
    <UiInput id="startDate" v-model="startDate" type="date" />
    <UiFieldMessage :message="errors.startDate" variant="error" />
  </div>

  <div v-if="isRecurring" class="lg:col-span-4 space-y-1.5">
    <UiFieldLabel for="endDate">End date</UiFieldLabel>
    <UiInput id="endDate" v-model="endDate" type="date" />
    <UiFieldMessage :message="errors.endDate" variant="error" />
  </div>

  <div v-if="isRecurring" class="lg:col-span-4 space-y-1.5">
    <UiFieldLabel for="repeatLimit">Repeat limit</UiFieldLabel>
    <UiInput
      id="repeatLimit"
      v-model.number="repeatLimit"
      type="number"
      min="1"
      placeholder="e.g. 10 times"
    />
    <UiFieldMessage :message="errors.repeatLimit" variant="error" />
  </div>

  <div class="lg:col-span-6 space-y-1.5">
    <UiFieldLabel for="preferredTime">Preferred time</UiFieldLabel>
    <UiInput id="preferredTime" v-model="preferredTime" type="time" />
    <UiFieldMessage :message="errors.preferredTime" variant="error" />
  </div>
</template>
