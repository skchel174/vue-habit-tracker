import { Frequency, HabitKind } from '@/constants';
import { z } from 'zod';

export const habitFormSchema = z
  .object({
    title: z
      .string()
      .trim()
      .min(1, 'Title is required.')
      .max(100, 'Title must be 100 characters or less.'),
    description: z.string(),
    habitKind: z.enum(Object.values(HabitKind)),
    frequency: z.enum(Object.values(Frequency)),
    interval: z.number().int().min(1, 'Interval must be at least 1.'),
    daysOfWeek: z.array(z.number()),
    dayOfMonth: z.number().nullable(),
    targetCount: z.number().nullable(),
    targetMinutes: z.number().nullable(),
    startDate: z.string().min(1, 'Start date is required.'),
    endDate: z.string().nullable(),
    repeatLimit: z.number().nullable(),
    preferredTime: z.string(),
    indicatorColor: z.string(),
    isArchived: z.boolean(),
  })
  .superRefine((form, ctx) => {
    if (form.endDate && form.startDate && form.endDate < form.startDate) {
      ctx.addIssue({
        code: 'custom',
        path: ['endDate'],
        message: 'End date cannot be earlier than start date.',
      });
    }

    if (form.frequency === Frequency.Weekly && form.daysOfWeek.length === 0) {
      ctx.addIssue({
        code: 'custom',
        path: ['daysOfWeek'],
        message: 'Select at least one weekday.',
      });
    }

    if (form.frequency === Frequency.Monthly && form.dayOfMonth === null) {
      ctx.addIssue({
        code: 'custom',
        path: ['dayOfMonth'],
        message: 'Select a day of month.',
      });
    }

    if (
      form.habitKind === HabitKind.Duration &&
      (!form.targetMinutes || form.targetMinutes < 1)
    ) {
      ctx.addIssue({
        code: 'custom',
        path: ['targetMinutes'],
        message: 'Target duration must be at least 1 minute.',
      });
    }

    if (
      form.habitKind === HabitKind.Countable &&
      (!form.targetCount || form.targetCount < 1)
    ) {
      ctx.addIssue({
        code: 'custom',
        path: ['targetCount'],
        message: 'Target count must be at least 1.',
      });
    }

    if (form.repeatLimit !== null && form.repeatLimit < 1) {
      ctx.addIssue({
        code: 'custom',
        path: ['repeatLimit'],
        message: 'Repeat limit must be at least 1.',
      });
    }
  });

export type HabitFormData = z.infer<typeof habitFormSchema>;
