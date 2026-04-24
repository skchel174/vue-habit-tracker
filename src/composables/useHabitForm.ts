import type { HabitForm } from '@/types';
import { reactive, watch } from 'vue';

export function useHabitForm() {
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

  return { form };
}
