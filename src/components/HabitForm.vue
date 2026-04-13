<script setup lang="ts">
import UiButton from '@/components/UiButton.vue';
import UiCheckbox from '@/components/UiCheckbox.vue';
import UiInput from '@/components/UiInput.vue';
import UiLabel from '@/components/UiLabel.vue';
import UiSelect from '@/components/UiSelect.vue';
import UiTextarea from '@/components/UiTextarea.vue';
import type { Frequency, HabitColor, HabitForm, HabitKind } from '@/types';
import { computed, reactive, watch } from 'vue';

const weekDays = [
  { value: 1, short: 'Mon', label: 'Monday' },
  { value: 2, short: 'Tue', label: 'Tuesday' },
  { value: 3, short: 'Wed', label: 'Wednesday' },
  { value: 4, short: 'Thu', label: 'Thursday' },
  { value: 5, short: 'Fri', label: 'Friday' },
  { value: 6, short: 'Sat', label: 'Saturday' },
  { value: 7, short: 'Sun', label: 'Sunday' },
];

const indicatorColors: Array<{
  value: HabitColor;
  label: string;
  dotClass: string;
}> = [
  { value: 'rose', label: 'Rose', dotClass: 'bg-rose-400' },
  { value: 'pink', label: 'Pink', dotClass: 'bg-pink-400' },
  { value: 'violet', label: 'Violet', dotClass: 'bg-violet-400' },
  { value: 'blue', label: 'Blue', dotClass: 'bg-sky-400' },
  { value: 'emerald', label: 'Emerald', dotClass: 'bg-emerald-400' },
  { value: 'amber', label: 'Amber', dotClass: 'bg-amber-400' },
  { value: 'slate', label: 'Slate', dotClass: 'bg-slate-400' },
];

const habitKindOptions: Array<{ value: HabitKind; label: string }> = [
  { value: 'one-time', label: 'One-time action' },
  { value: 'check', label: 'Check-based' },
  { value: 'duration', label: 'Duration-based' },
  { value: 'countable', label: 'Count-based' },
];

const frequencyOptions: Array<{ value: Frequency; label: string }> = [
  { value: 'none', label: 'Does not repeat' },
  { value: 'daily', label: 'Daily' },
  { value: 'weekly', label: 'Weekly' },
  { value: 'monthly', label: 'Monthly' },
];

const form = reactive<HabitForm>({
  title: '',
  description: '',
  habitKind: 'check',
  frequency: 'daily',
  interval: 1,
  daysOfWeek: [],
  dayOfMonth: null,
  targetCount: null,
  targetMinutes: null,
  startDate: '',
  endDate: null,
  repeatLimit: null,
  preferredTime: '',
  indicatorColor: 'rose',
  isArchived: false,
});

const canConfigureRecurrence = computed(() => form.habitKind !== 'one-time');

const isRecurring = computed(
  () => canConfigureRecurrence.value && form.frequency !== 'none',
);

const showFrequency = computed(() => canConfigureRecurrence.value);

const showInterval = computed(() => isRecurring.value);

const showWeeklyDays = computed(
  () => isRecurring.value && form.frequency === 'weekly',
);

const showMonthlyDay = computed(
  () => isRecurring.value && form.frequency === 'monthly',
);

const showTargetCount = computed(() => form.habitKind === 'countable');

const showTargetMinutes = computed(() => form.habitKind === 'duration');

const showRecurrencePreview = computed(() => isRecurring.value);

const showEndDate = computed(() => isRecurring.value);

const showRepeatLimit = computed(() => isRecurring.value);

const startDateLabel = computed(() => {
  return form.habitKind === 'one-time' ? 'Date' : 'Start date';
});

watch(
  () => form.frequency,
  (frequency) => {
    if (frequency !== 'weekly') {
      form.daysOfWeek = [];
    }

    if (frequency !== 'monthly') {
      form.dayOfMonth = null;
    }

    if (frequency === 'none') {
      form.interval = 1;
      form.daysOfWeek = [];
      form.dayOfMonth = null;
      form.endDate = null;
      form.repeatLimit = null;
    } else if (form.interval < 1) {
      form.interval = 1;
    }
  },
);

watch(
  () => form.habitKind,
  (kind) => {
    if (kind === 'one-time') {
      form.frequency = 'none';
      form.interval = 1;
      form.daysOfWeek = [];
      form.dayOfMonth = null;
      form.endDate = null;
      form.repeatLimit = null;
      form.targetCount = null;
      form.targetMinutes = null;
      return;
    }

    if (form.frequency === 'none') {
      form.frequency = 'daily';
    }

    if (kind === 'check') {
      form.targetCount = null;
      form.targetMinutes = null;
      return;
    }

    if (kind === 'duration') {
      form.targetCount = null;

      if (form.targetMinutes === null || form.targetMinutes < 1) {
        form.targetMinutes = 30;
      }

      return;
    }

    if (kind === 'countable') {
      form.targetMinutes = null;

      if (form.targetCount === null || form.targetCount < 1) {
        form.targetCount = 1;
      }
    }
  },
  { immediate: true },
);

const toggleWeekDay = (day: number) => {
  if (form.daysOfWeek.includes(day)) {
    form.daysOfWeek = form.daysOfWeek.filter((item) => item !== day);
    return;
  }

  form.daysOfWeek = [...form.daysOfWeek, day].sort((a, b) => a - b);
};

const frequencyUnitLabel = computed(() => {
  switch (form.frequency) {
    case 'daily':
      return form.interval === 1 ? 'day' : 'days';
    case 'weekly':
      return form.interval === 1 ? 'week' : 'weeks';
    case 'monthly':
      return form.interval === 1 ? 'month' : 'months';
    default:
      return '';
  }
});

const recurrencePreview = computed(() => {
  if (!isRecurring.value) {
    return 'Does not repeat';
  }

  if (form.frequency === 'daily') {
    return form.interval === 1 ? 'Every day' : `Every ${form.interval} days`;
  }

  if (form.frequency === 'weekly') {
    const selectedDays = weekDays
      .filter((day) => form.daysOfWeek.includes(day.value))
      .map((day) => day.short)
      .join(', ');

    const base =
      form.interval === 1 ? 'Every week' : `Every ${form.interval} weeks`;

    return selectedDays ? `${base} on ${selectedDays}` : base;
  }

  if (form.frequency === 'monthly') {
    const base =
      form.interval === 1 ? 'Every month' : `Every ${form.interval} months`;

    return form.dayOfMonth ? `${base} on day ${form.dayOfMonth}` : base;
  }

  return '';
});

const submitForm = () => {
  console.log('submit', { ...form });
};
</script>

<template>
  <form
    class="w-full rounded-2xl border border-rose-200/80 bg-white/95 p-4 shadow-sm sm:p-5 lg:p-6"
    @submit.prevent="submitForm"
  >
    <div class="mb-6">
      <h2
        class="text-xl font-semibold tracking-tight text-slate-800 sm:text-2xl"
      >
        Create habit
      </h2>
      <p class="mt-1 text-sm text-slate-500">
        Configure the habit once, then let the interface do its job for a
        change.
      </p>
    </div>

    <div class="grid grid-cols-1 gap-4 lg:grid-cols-12">
      <div class="lg:col-span-12 space-y-1.5">
        <UiLabel for="title">Title</UiLabel>
        <UiInput
          id="title"
          type="text"
          v-model="form.title"
          placeholder="Read, stretch, drink water..."
        />
      </div>

      <div class="lg:col-span-12 space-y-1.5">
        <UiLabel for="description">Description</UiLabel>
        <UiTextarea
          id="description"
          v-model="form.description"
          placeholder="Optional notes, motivation, or rules..."
        />
      </div>

      <div class="lg:col-span-4 space-y-1.5">
        <UiLabel for="habitKind">Habit type</UiLabel>
        <UiSelect
          id="habitKind"
          v-model="form.habitKind"
          :options="habitKindOptions"
        />
      </div>

      <div v-if="showFrequency" class="lg:col-span-4 space-y-1.5">
        <UiLabel for="frequency">Frequency</UiLabel>
        <UiSelect
          id="frequency"
          v-model="form.frequency"
          :options="frequencyOptions"
        />
      </div>

      <div v-if="showInterval" class="lg:col-span-4 space-y-1.5">
        <UiLabel for="interval">Repeat every</UiLabel>
        <div class="flex gap-2">
          <UiInput
            id="interval"
            type="number"
            v-model="form.interval"
            min="1"
            max="365"
          />
          <div
            class="inline-flex items-center rounded-xl border border-rose-200 bg-rose-50 px-3 text-sm text-slate-600"
          >
            {{ frequencyUnitLabel }}
          </div>
        </div>
      </div>

      <div v-if="showTargetCount" class="lg:col-span-4 space-y-1.5">
        <UiLabel for="targetCount">Target count</UiLabel>
        <UiInput
          id="targetCount"
          type="number"
          v-model="form.targetCount"
          min="1"
          placeholder="For example 7"
        />
      </div>

      <div v-if="showTargetMinutes" class="lg:col-span-4 space-y-1.5">
        <UiLabel for="targetMinutes">Duration in minutes</UiLabel>
        <UiInput
          id="targetMinutes"
          type="number"
          v-model="form.targetMinutes"
          min="1"
          placeholder="For example 30"
        />
      </div>

      <div v-if="showWeeklyDays" class="lg:col-span-12 space-y-1.5">
        <UiLabel for="daysOfWeek">Days of week</UiLabel>
        <div class="flex flex-wrap gap-2">
          <button
            v-for="day in weekDays"
            :key="day.value"
            type="button"
            class="rounded-xl border px-3 py-2 text-sm transition"
            :class="
              form.daysOfWeek.includes(day.value)
                ? 'border-rose-300 bg-rose-100 text-slate-700'
                : 'border-rose-200 bg-white text-slate-500 hover:border-rose-300 hover:bg-rose-50'
            "
            @click="toggleWeekDay(day.value)"
          >
            {{ day.short }}
          </button>
        </div>
      </div>

      <div v-if="showMonthlyDay" class="lg:col-span-4 space-y-1.5">
        <UiLabel for="dayOfMonth">Day of month</UiLabel>
        <UiInput
          id="dayOfMonth"
          type="number"
          v-model="form.dayOfMonth"
          min="1"
          max="31"
          placeholder="For example 15"
        />
      </div>

      <div v-if="showRecurrencePreview" class="lg:col-span-12 space-y-1.5">
        <div
          class="rounded-xl border border-rose-200 bg-rose-50/70 px-3.5 py-3"
        >
          <p class="text-sm font-medium text-slate-700">
            {{ recurrencePreview }}
          </p>
        </div>
      </div>

      <div class="lg:col-span-4 space-y-1.5">
        <UiLabel for="startDate">{{ startDateLabel }}</UiLabel>
        <UiInput id="startDate" v-model="form.startDate" type="date" />
      </div>

      <div v-if="showEndDate" class="lg:col-span-4 space-y-1.5">
        <UiLabel for="endDate">End date</UiLabel>
        <UiInput id="endDate" v-model="form.endDate" type="date" />
      </div>

      <div v-if="showRepeatLimit" class="lg:col-span-4 space-y-1.5">
        <UiLabel for="repeatLimit">Repeat limit</UiLabel>
        <UiInput
          id="repeatLimit"
          v-model="form.repeatLimit"
          type="number"
          min="1"
          placeholder="e.g. 10 times"
        />
      </div>

      <div class="lg:col-span-6 space-y-1.5">
        <UiLabel for="preferredTime">Preferred time</UiLabel>
        <UiInput id="preferredTime" type="time" v-model="form.preferredTime" />
      </div>

      <div class="lg:col-span-6 space-y-1.5">
        <UiLabel for="indicatorColor">Indicator color</UiLabel>
        <div class="flex flex-wrap gap-2">
          <button
            v-for="color in indicatorColors"
            :key="color.value"
            type="button"
            class="inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-sm transition"
            :class="
              form.indicatorColor === color.value
                ? 'border-rose-300 bg-rose-50 text-slate-700'
                : 'border-rose-200 bg-white text-slate-500 hover:border-rose-300 hover:bg-rose-50'
            "
            @click="form.indicatorColor = color.value"
          >
            <span class="h-2.5 w-2.5 rounded-full" :class="color.dotClass" />
            {{ color.label }}
          </button>
        </div>
      </div>

      <div class="lg:col-span-12">
        <label
          class="flex items-start justify-between gap-3 rounded-xl border border-rose-200 bg-rose-50/60 px-3.5 py-3"
        >
          <div>
            <span class="block text-sm font-medium text-slate-700">
              Archive habit
            </span>
            <span class="mt-0.5 block text-sm text-slate-500">
              Keep it in history, but hide it from active planning.
            </span>
          </div>

          <UiCheckbox v-model="form.isArchived" />
        </label>
      </div>
    </div>

    <div class="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
      <UiButton variant="secondary">Cancel</UiButton>
      <UiButton type="submit">Save habit</UiButton>
    </div>
  </form>
</template>
