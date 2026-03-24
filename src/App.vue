<script setup lang="ts">
import { ref, computed } from 'vue';

interface Habit {
  id: number;
  title: string;
  doneToday: boolean;
}

const habits = ref<Habit[]>([
  { id: 1, title: 'Drink water', doneToday: false },
  { id: 2, title: 'Read 20 minutes', doneToday: true },
  { id: 3, title: 'Stretching', doneToday: false },
]);

const completedCount = computed(() => {
  return habits.value.filter((habit) => habit.doneToday).length;
});

const statusText = computed(() => {
  if (habits.value.length === 0) {
    return 'No habits today';
  }
  if (completedCount.value === habits.value.length) {
    return 'All habits completed';
  }
  return `Today completed ${completedCount.value} out of ${habits.value.length}`;
});

const toggleHabit = (id: number) => {
  const habit = habits.value.find((h) => h.id === id);
  if (!habit) {
    return;
  }
  habit.doneToday = !habit.doneToday;
};
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <header class="border-b-[1.5px] border-gray-200">
      <div class="container mx-auto px-4 sm:px-6 py-4">
        <h1 class="text-3xl text-gray-700 font-bold">Routine</h1>
      </div>
    </header>

    <main class="container mx-auto px-4 sm:px-6">
      <div class="py-4">
        <p class="text-base font-semibold text-gray-700">{{ statusText }}</p>
      </div>

      <div class="flex flex-col gap-2">
        <div
          v-for="habit in habits"
          :key="habit.id"
          class="p-4 flex items-center gap-4 bg-white border border-gray-200 shadow-2xs rounded-md"
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
                : 'bg-pink-200 text-pink-900 hover:bg-pink-300'
            "
            @click="toggleHabit(habit.id)"
          >
            {{ habit.doneToday ? 'Reset' : 'Complete' }}
          </button>
        </div>
      </div>
    </main>
  </div>
</template>
