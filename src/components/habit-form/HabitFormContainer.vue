<script setup lang="ts">
import HabitAppearanceSection from '@/components/habit-form/HabitAppearanceSection.vue';
import HabitBaseSection from '@/components/habit-form/HabitBaseSection.vue';
import HabitFormHeader from '@/components/habit-form/HabitFormHeader.vue';
import HabitFormLayout from '@/components/habit-form/HabitFormLayout.vue';
import HabitGoalSection from '@/components/habit-form/HabitGoalSection.vue';
import HabitRecurrenceSection from '@/components/habit-form/HabitRecurrenceSection.vue';
import HabitScheduleSection from '@/components/habit-form/HabitScheduleSection.vue';
import HabitStatusSection from '@/components/habit-form/HabitStatusSection.vue';
import UiButton from '@/components/UiButton.vue';
import { useAppAlert } from '@/composables/useAppAlert';
import { useHabitForm } from '@/composables/useHabitForm';
import { useRecurrencePreview } from '@/composables/useRecurrencePreview';
import {
  AlertType,
  Frequency,
  HabitKind,
  frequencyOptions,
  habitKindOptions,
  indicatorColors,
  weekDays,
} from '@/constants';
import type { HabitForm } from '@/types';
import { nextTick } from 'vue';

const { form, errors, validate, reset } = useHabitForm();

const { recurrencePreview } = useRecurrencePreview(form, weekDays);

const emit = defineEmits<{
  (e: 'submit', form: HabitForm): void;
}>();

const { showAlert } = useAppAlert();

const handleSubmit = async () => {
  const isValid = validate();
  if (!isValid) {
    await nextTick();
    const firstErrorElement = document.querySelector('[data-error="true"]');
    firstErrorElement?.scrollIntoView({ behavior: 'smooth', block: 'center' });

    showAlert({
      type: AlertType.Error,
      message: 'Habit form contains errors',
    });

    return;
  }
  emit('submit', form);
};
</script>

<template>
  <HabitFormLayout @submit="handleSubmit">
    <template #header>
      <HabitFormHeader
        title="Create habit"
        description="Configure the habit once, then let the interface do its job for a change."
      />
    </template>

    <HabitBaseSection
      v-model:title="form.title"
      v-model:description="form.description"
      v-model:habit-kind="form.habitKind"
      :habit-kind-options="habitKindOptions"
      :errors="{
        title: errors.title,
        description: errors.description,
        habitKind: errors.habitKind,
      }"
    />

    <HabitRecurrenceSection
      v-model:frequency="form.frequency"
      v-model:interval="form.interval"
      v-model:days-of-week="form.daysOfWeek"
      v-model:day-of-month="form.dayOfMonth"
      :week-days="weekDays"
      :frequency-options="frequencyOptions"
      :recurrence-preview="recurrencePreview"
      :errors="{
        frequency: errors.frequency,
        interval: errors.interval,
        daysOfWeek: errors.daysOfWeek,
        dayOfMonth: errors.dayOfMonth,
      }"
    />

    <HabitGoalSection
      v-if="form.habitKind !== HabitKind.Check"
      v-model:target-count="form.targetCount"
      v-model:target-minutes="form.targetMinutes"
      :habit-kind="form.habitKind"
      :errors="{
        targetCount: errors.targetCount,
        targetMinutes: errors.targetMinutes,
      }"
    />

    <HabitScheduleSection
      v-model:start-date="form.startDate"
      v-model:end-date="form.endDate"
      v-model:repeat-limit="form.repeatLimit"
      v-model:preferred-time="form.preferredTime"
      :is-recurring="form.frequency !== Frequency.None"
      :errors="{
        startDate: errors.startDate,
        endDate: errors.endDate,
        repeatLimit: errors.repeatLimit,
        preferredTime: errors.preferredTime,
      }"
    />

    <HabitAppearanceSection
      v-model:indicator-color="form.indicatorColor"
      :indicator-colors="indicatorColors"
    />

    <HabitStatusSection v-model:is-archived="form.isArchived" />

    <template #actions>
      <UiButton
        variant="secondary"
        @click="reset"
      >
        Cancel
      </UiButton>
      <UiButton type="submit"> Save habit </UiButton>
    </template>
  </HabitFormLayout>
</template>
