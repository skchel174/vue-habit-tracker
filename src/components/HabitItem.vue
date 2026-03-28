<script setup lang="ts">
import type { Habit } from '@/types';

const props = defineProps<{ habit: Habit }>();

const emit = defineEmits<{
  (e: 'toggle', id: number): void;
}>();

const toggleHabit = (id: number) => {
  emit('toggle', id);
}
</script>

<template>
  <div
    class="p-4 flex items-center gap-4 bg-white border border-gray-200 shadow-2xs rounded-lg"
  >
    <div class="flex-1">
      <h3
        class="font-semibold text-gray-800"
        :class="[habit.doneToday ? 'line-through' : 'no-underline']"
      >
        {{ habit.title }}
      </h3>
      <p class="mt-1 text-xs font-medium uppercase text-gray-500">
        {{ habit.doneToday ? 'Done' : 'Not done' }}
      </p>
    </div>
    <button
      type="button"
      class="py-2 px-4 text-sm font-medium rounded-md border border-transparent disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
      :class="
        habit.doneToday
          ? 'bg-neutral-200 text-neutral-900 hover:bg-neutral-300'
          : 'bg-rose-200 text-rose-900 hover:bg-rose-300'
      "
      @click="toggleHabit(habit.id)"
    >
      {{ habit.doneToday ? 'Undo' : 'Complete' }}
    </button>
  </div>
</template>
