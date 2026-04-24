<script setup lang="ts">
import UiInput from '@/components/UiInput.vue';
import UiLabel from '@/components/UiLabel.vue';
import UiSelect from '@/components/UiSelect.vue';
import type { Frequency } from '@/types';
import { computed } from 'vue';

defineProps<{
  weekDays: { value: number; short: string; label: string }[];
  frequencyOptions: { value: Frequency; label: string }[];
  recurrencePreview: string;
}>();

const frequency = defineModel<Frequency>('frequency', { required: true });
const interval = defineModel<number>('interval', { required: true });
const selectedDaysOfWeek = defineModel<number[]>('daysOfWeek', { default: [] });
const dayOfMonth = defineModel<number | null>('dayOfMonth', { default: null });

const frequencyUnitLabel = computed(() => {
  switch (frequency.value) {
    case 'daily':
      return interval.value === 1 ? 'day' : 'days';
    case 'weekly':
      return interval.value === 1 ? 'week' : 'weeks';
    case 'monthly':
      return interval.value === 1 ? 'month' : 'months';
    default:
      return '';
  }
});

const handleToggleWeekDay = (day: number) => {
  if (selectedDaysOfWeek.value.includes(day)) {
    selectedDaysOfWeek.value = selectedDaysOfWeek.value.filter(
      (item) => item !== day,
    );
    return;
  }

  selectedDaysOfWeek.value = [...selectedDaysOfWeek.value, day].sort(
    (a, b) => a - b,
  );
};
</script>

<template>
  <div class="lg:col-span-4 space-y-1.5">
    <UiLabel for="frequency">Frequency</UiLabel>
    <UiSelect id="frequency" v-model="frequency" :options="frequencyOptions" />
  </div>

  <div v-if="frequency !== 'none'" class="lg:col-span-4 space-y-1.5">
    <UiLabel for="interval">Repeat every</UiLabel>

    <div class="flex gap-2">
      <UiInput
        id="interval"
        v-model="interval"
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
  </div>

  <div v-if="frequency === 'weekly'" class="lg:col-span-12 space-y-1.5">
    <UiLabel for="daysOfWeek">Days of week</UiLabel>

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
  </div>

  <div v-if="frequency === 'monthly'" class="lg:col-span-4 space-y-1.5">
    <UiLabel for="dayOfMonth">Day of month</UiLabel>
    <UiInput
      id="dayOfMonth"
      v-model="dayOfMonth"
      type="number"
      min="1"
      max="31"
      placeholder="For example 15"
    />
  </div>

  <div v-if="frequency !== 'none'" class="lg:col-span-12 space-y-1.5">
    <div class="rounded-2xl border border-rose-200 bg-rose-50/60 px-4 py-3">
      <p class="text-sm font-medium text-slate-700">
        {{ recurrencePreview }}
      </p>
    </div>
  </div>
</template>
