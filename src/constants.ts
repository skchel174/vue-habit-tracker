export const AlertType = {
  Error: 'error',
  Info: 'info',
  Success: 'success',
} as const;

export type AlertType = (typeof AlertType)[keyof typeof AlertType];

export const HabitKind = {
  Check: 'check',
  Duration: 'duration',
  Countable: 'countable',
} as const;

export type HabitKind = (typeof HabitKind)[keyof typeof HabitKind];

export const Frequency = {
  None: 'none',
  Daily: 'daily',
  Weekly: 'weekly',
  Monthly: 'monthly',
} as const;

export type Frequency = (typeof Frequency)[keyof typeof Frequency];

export const HabitColor = {
  Rose: 'rose',
  Pink: 'pink',
  Violet: 'violet',
  Blue: 'blue',
  Emerald: 'emerald',
  Amber: 'amber',
  Slate: 'slate',
} as const;

export type HabitColor = (typeof HabitColor)[keyof typeof HabitColor];

export const weekDays = [
  { value: 1, short: 'Mon', label: 'Monday' },
  { value: 2, short: 'Tue', label: 'Tuesday' },
  { value: 3, short: 'Wed', label: 'Wednesday' },
  { value: 4, short: 'Thu', label: 'Thursday' },
  { value: 5, short: 'Fri', label: 'Friday' },
  { value: 6, short: 'Sat', label: 'Saturday' },
  { value: 7, short: 'Sun', label: 'Sunday' },
];

export const indicatorColors = [
  { value: 'rose', label: 'Rose', dotClass: 'bg-rose-400' },
  { value: 'pink', label: 'Pink', dotClass: 'bg-pink-400' },
  { value: 'violet', label: 'Violet', dotClass: 'bg-violet-400' },
  { value: 'blue', label: 'Blue', dotClass: 'bg-sky-400' },
  { value: 'emerald', label: 'Emerald', dotClass: 'bg-emerald-400' },
  { value: 'amber', label: 'Amber', dotClass: 'bg-amber-400' },
  { value: 'slate', label: 'Slate', dotClass: 'bg-slate-400' },
] satisfies Array<{ value: HabitColor; label: string; dotClass: string }>;

export const habitKindOptions = [
  { value: HabitKind.Check, label: 'Check-based' },
  { value: HabitKind.Duration, label: 'Duration-based' },
  { value: HabitKind.Countable, label: 'Count-based' },
] satisfies Array<{ value: HabitKind; label: string }>;

export const frequencyOptions = [
  { value: 'none', label: 'Does not repeat' },
  { value: 'daily', label: 'Daily' },
  { value: 'weekly', label: 'Weekly' },
  { value: 'monthly', label: 'Monthly' },
] satisfies Array<{ value: Frequency; label: string }>;
