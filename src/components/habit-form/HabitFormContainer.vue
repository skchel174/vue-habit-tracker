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
import { useHabitForm } from '@/composables/useHabitForm';
import { useRecurrencePreview } from '@/composables/useRecurrencePreview';
import {
  frequencyOptions,
  habitKindOptions,
  indicatorColors,
  weekDays,
} from '@/constants';

const { form } = useHabitForm();

const { recurrencePreview } = useRecurrencePreview(form, weekDays);

const submitForm = () => {
  console.log('submit', form);
};
</script>

<template>
  <HabitFormLayout @submit="submitForm">
    <template #header>
      <HabitFormHeader
        title="Create habit"
        description="Configure the habit once, then let the interface do its job for a change."
      />
    </template>

    <HabitBaseSection
      :habitKindOptions="habitKindOptions"
      v-model:title="form.title"
      v-model:description="form.description"
      v-model:habitKind="form.habitKind"
    />

    <HabitRecurrenceSection
      :weekDays="weekDays"
      :frequencyOptions="frequencyOptions"
      :recurrencePreview="recurrencePreview"
      v-model:frequency="form.frequency"
      v-model:interval="form.interval"
      v-model:daysOfWeek="form.daysOfWeek"
      v-model:dayOfMonth="form.dayOfMonth"
    />

    <HabitGoalSection
      v-if="form.habitKind !== 'check'"
      :habitKind="form.habitKind"
      v-model:targetCount="form.targetCount"
      v-model:targetMinutes="form.targetMinutes"
    />

    <HabitScheduleSection
      :isRecurring="form.frequency !== 'none'"
      v-model:startDate="form.startDate"
      v-model:endDate="form.endDate"
      v-model:repeatLimit="form.repeatLimit"
      v-model:preferredTime="form.preferredTime"
    />

    <HabitAppearanceSection
      :indicatorColors="indicatorColors"
      v-model:indicatorColor="form.indicatorColor"
    />

    <HabitStatusSection v-model:isArchived="form.isArchived" />

    <template #actions>
      <UiButton variant="secondary">Cancel</UiButton>
      <UiButton type="submit">Save habit</UiButton>
    </template>
  </HabitFormLayout>
</template>
