import type { Frequency } from '@/types';
import { computed } from 'vue';

interface WeekDay {
  value: number;
  short: string;
}

interface Recurrence {
  frequency: Frequency;
  interval: number;
  daysOfWeek: number[];
  dayOfMonth: number | null;
}

export function useRecurrencePreview(
  recurrence: Recurrence,
  weekDays: WeekDay[],
) {
  const recurrencePreview = computed(() => {
    if (recurrence.frequency === 'none') {
      return 'Does not repeat';
    }

    if (recurrence.frequency === 'daily') {
      return recurrence.interval === 1 ? 'Every day' : `Every ${recurrence.interval} days`;
    }

    if (recurrence.frequency === 'weekly') {
      const selectedDays = weekDays
        .filter((day) => recurrence.daysOfWeek.includes(day.value))
        .map((day) => day.short)
        .join(', ');

      const base = recurrence.interval === 1 ? 'Every week' : `Every ${recurrence.interval} weeks`;

      return selectedDays ? `${base} on ${selectedDays}` : base;
    }

    if (recurrence.frequency === 'monthly') {
      const base = recurrence.interval === 1 ? 'Every month' : `Every ${recurrence.interval} months`;

      return recurrence.dayOfMonth ? `${base} on day ${recurrence.dayOfMonth}` : base;
    }

    return '';
  });

  return { recurrencePreview };
}
