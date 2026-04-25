<script setup lang="ts">
import UiFieldLabel from '@/components/UiFieldLabel.vue';
import UiFieldMessage from '@/components/UiFieldMessage.vue';
import UiInput from '@/components/UiInput.vue';
import UiSelect from '@/components/UiSelect.vue';
import { Frequency } from '@/constants';
import type { FieldError } from '@/types';
import { computed } from 'vue';

type HabitRecurrenceErrors = {
  frequency: FieldError;
  interval: FieldError;
  daysOfWeek: FieldError;
  dayOfMonth: FieldError;
};

defineProps<{
  weekDays: { value: number; short: string; label: string }[];
  frequencyOptions: { value: Frequency; label: string }[];
  recurrencePreview: string;
  errors: HabitRecurrenceErrors;
}>();

const frequency = defineModel<Frequency>('frequency', { required: true });
const interval = defineModel<number>('interval', { required: true });
const selectedDaysOfWeek = defineModel<number[]>('daysOfWeek', { default: [] });
const dayOfMonth = defineModel<number | null>('dayOfMonth', { default: null });

const frequencyUnitLabel = computed(() => {
  switch (frequency.value) {
    case Frequency.Daily:
      return interval.value === 1 ? 'day' : 'days';
    case Frequency.Weekly:
      return interval.value === 1 ? 'week' : 'weeks';
    case Frequency.Monthly:
      return interval.value === 1 ? 'month' : 'months';
    default:
      return '';
  }
});

const handleToggleWeekDay = (day: string | number) => {
  const dayNumber = Number(day);
  if (selectedDaysOfWeek.value.includes(dayNumber)) {
    selectedDaysOfWeek.value = selectedDaysOfWeek.value.filter(
      (item) => item !== dayNumber,
    );
    return;
  }

  selectedDaysOfWeek.value = [...selectedDaysOfWeek.value, dayNumber].sort(
    (a, b) => a - b,
  );
};
</script>

<template>
  <div class="lg:col-span-4 space-y-1.5">
    <UiFieldLabel for="frequency">Frequency</UiFieldLabel>
    <UiSelect id="frequency" v-model="frequency" :options="frequencyOptions" />
    <UiFieldMessage :message="errors.frequency" variant="error" />
  </div>

  <div v-if="frequency !== 'none'" class="lg:col-span-4 space-y-1.5">
    <UiFieldLabel for="interval">Repeat every</UiFieldLabel>
    <div class="flex gap-2">
      <UiInput
        id="interval"
        v-model.number="interval"
        type="number"
        min="1"
        max="365"
      />
      <div
        class="inline-flex min-w-[72px] items-center justify-center rounded-xl border border-rose-200 bg-rose-50/80 px-3 text-sm font-medium text-slate-600"
      >
        {{ frequencyUnitLabel }}
      </div>
    </div>
    <UiFieldMessage :message="errors.interval" variant="error" />
  </div>

  <div v-if="frequency === 'weekly'" class="lg:col-span-12 space-y-1.5">
    <UiFieldLabel for="daysOfWeek">Days of week</UiFieldLabel>
    <div class="flex flex-wrap gap-2">
      <button
        v-for="day in weekDays"
        :key="day.value"
        type="button"
        class="rounded-xl border px-3 py-2 text-sm font-medium transition"
        :class="
          selectedDaysOfWeek.includes(day.value)
            ? 'border-rose-300 bg-rose-100 text-slate-700 shadow-sm'
            : 'border-rose-200 bg-white text-slate-500 hover:border-rose-300 hover:bg-rose-50'
        "
        @click="handleToggleWeekDay(day.value)"
      >
        {{ day.short }}
      </button>
    </div>
    <UiFieldMessage :message="errors.daysOfWeek" variant="error" />
  </div>

  <div v-if="frequency === 'monthly'" class="lg:col-span-4 space-y-1.5">
    <UiFieldLabel for="dayOfMonth">Day of month</UiFieldLabel>
    <UiInput
      id="dayOfMonth"
      v-model.number="dayOfMonth"
      type="number"
      min="1"
      max="31"
      placeholder="For example 15"
    />
    <UiFieldMessage :message="errors.dayOfMonth" variant="error" />
  </div>

  <div v-if="frequency !== 'none'" class="lg:col-span-12 space-y-1.5">
    <div class="rounded-2xl border border-rose-200 bg-rose-50/60 px-4 py-3">
      <p class="text-sm font-medium text-slate-700">
        {{ recurrencePreview }}
      </p>
    </div>
  </div>
</template>
