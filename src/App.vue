<script setup lang="ts">
import { ref, computed, h } from 'vue';

interface Habit {
  id: number;
  title: string;
  doneToday: boolean;
}

const habits = ref<Habit[]>([
  { id: 1, title: 'Drink water', doneToday: false },
  { id: 2, title: 'Reed 20 minutes', doneToday: true },
  { id: 3, title: 'Stretching', doneToday: false },
]);

const completedCount = computed(() => {
  return habits.value.filter((habit) => habit.doneToday).length;
});

const completeHabbit = (id: number) => {
  const habit = habits.value.find((h) => h.id === id);
  if (!habit) {
    return;
  }
  habit.doneToday = true;
};

const resetHabbit = (id: number) => {
  const habit = habits.value.find((h) => h.id === id);
  if (!habit) {
    return;
  }
  habit.doneToday = false;
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
        <p
          v-if="completedCount < habits.length"
          class="text-base font-semibold text-gray-700"
        >
          Today completed {{ completedCount }} out of {{ habits.length }}
        </p>
        <p v-else-if="completedCount > 0" class="text-base font-semibold text-gray-700">
          Today completed all habits
        </p>
        <p v-else class="text-base font-semibold text-gray-700">
          No habits today
        </p>
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
            v-if="habit.doneToday"
            type="button"
            class="py-2 px-4 text-sm font-medium rounded-md bg-neutral-200 border border-transparent text-neutral-900 hover:bg-neutral-300 disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
            @click="resetHabbit(habit.id)"
          >
            Reset
          </button>
          <button
            v-else
            type="button"
            class="py-2 px-4 text-sm font-medium rounded-md bg-pink-200 border border-transparent text-pink-900 hover:bg-pink-300 disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
            @click="completeHabbit(habit.id)"
          >
            Complete
          </button>
        </div>
      </div>
    </main>
  </div>
</template>
