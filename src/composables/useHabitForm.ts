import { habitFormSchema } from '@/composables/habitFormSchema';
import { Frequency, HabitColor, HabitKind } from '@/constants';
import type { HabitForm } from '@/types';
import { computed, reactive, watch } from 'vue';

type HabitFormErrors = Partial<Record<keyof HabitForm, string | null>>;

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

  const errors = reactive<HabitFormErrors>({});

  const hasErrors = computed(() => Object.values(errors).some(Boolean));

  const clearErrors = () => {
    for (const key of Object.keys(errors) as Array<keyof HabitForm>) {
      errors[key] = null;
    }
  }

  const validate = () => {
    clearErrors();

    const result = habitFormSchema.safeParse(form);
  
    if (result.success) {
      return true;
    }
  
    for (const issue of result.error.issues) {
      const field = issue.path[0] as keyof HabitFormErrors;
  
      if (!errors[field]) {
        errors[field] = issue.message;
      }
    }
  
    return false;
  };

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

  return {
    form,
    errors,
    hasErrors,
    validate,
    clearErrors,
  };
}
