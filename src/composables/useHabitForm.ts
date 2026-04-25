import { Frequency, HabitColor, HabitKind } from '@/constants';
import type { HabitForm } from '@/types';
import { reactive, watch } from 'vue';

export function useHabitForm() {
  const form = reactive<HabitForm>({
    title: '',
    description: '',
    habitKind: HabitKind.Check,
    frequency: Frequency.Daily,
    interval: 1,
    daysOfWeek: [],
    dayOfMonth: null,
    targetCount: null,
    targetMinutes: null,
    startDate: '',
    endDate: null,
    repeatLimit: null,
    preferredTime: '',
    indicatorColor: HabitColor.Rose,
    isArchived: false,
  });

  watch(
    () => form.frequency,
    (frequency) => {
      if (frequency !== Frequency.Weekly) {
        form.daysOfWeek = [];
      }

      if (frequency !== Frequency.Monthly) {
        form.dayOfMonth = null;
      }

      if (frequency === Frequency.None) {
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
      if (kind === HabitKind.Check) {
        form.targetCount = null;
        form.targetMinutes = null;
        return;
      }

      if (kind === HabitKind.Duration) {
        form.targetCount = null;

        if (form.targetMinutes === null || form.targetMinutes < 1) {
          form.targetMinutes = 30;
        }

        return;
      }

      if (kind === HabitKind.Countable) {
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
