export interface Habit {
  id: number;
  title: string;
  doneToday: boolean;
}

export type HabitColor =
  | 'rose'
  | 'pink'
  | 'violet'
  | 'blue'
  | 'emerald'
  | 'amber'
  | 'slate';

export type HabitKind = 'check' | 'duration' | 'countable';

export type Frequency = 'none' | 'daily' | 'weekly' | 'monthly';

export interface HabitForm {
  title: string;
  description: string;
  habitKind: HabitKind;
  frequency: Frequency;
  interval: number; // how often to repeat the habit
  daysOfWeek: number[];
  dayOfMonth: number | null; // for monthly habits
  endDate: string | null; // when habit ends
  repeatLimit: number | null; // how many times to repeat the habit
  targetMinutes: number | null; // for duration
  targetCount: number | null; // for countable
  startDate: string; // when habit starts
  preferredTime: string; // when habit is preferred to be done
  indicatorColor: HabitColor; // color for ui
  isArchived: boolean; // whether habit is archived 
}
