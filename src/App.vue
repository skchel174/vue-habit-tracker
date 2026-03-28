<script setup lang="ts">
import { ref, computed, reactive, watch } from 'vue';
import HabitItem from '@/components/HabitItem.vue';
import HabitForm from '@/components/HabitForm.vue';
import type { Habit, HabitForm as HabitFormInterface } from '@/types';

const defaultHabit = [
  { id: 1, title: 'Drink water', doneToday: false },
  { id: 2, title: 'Read 20 minutes', doneToday: true },
  { id: 3, title: 'Stretching', doneToday: false },
];

const habitsCache = localStorage.getItem('habits');

const habits = ref<Habit[]>(
  habitsCache ? JSON.parse(habitsCache) : defaultHabit,
);

const totalCount = computed(() => {
  return habits.value.length;
});

const completedCount = computed(() => {
  return habits.value.filter((habit) => habit.doneToday).length;
});

const progressText = computed(() => {
  return `${completedCount.value} / ${totalCount.value}`;
});

const statusText = computed(() => {
  if (totalCount.value === 0) {
    return 'No habits today';
  }
  if (completedCount.value === totalCount.value) {
    return 'All habits completed';
  }
  return `Today completed: ${progressText.value}`;
});

const toggleHabit = (id: number) => {
  const habit = habits.value.find((h) => h.id === id);
  if (!habit) {
    return;
  }
  habit.doneToday = !habit.doneToday;
};

const habitForm = reactive<HabitFormInterface>({
  title: '',
});

const addHabit = () => {
  const habitTitle = habitForm.title.trim();

  if (!habitTitle) {
    return;
  }

  habits.value.push({
    id: Date.now(),
    title: habitTitle,
    doneToday: false,
  });

  habitForm.title = '';
};

watch(
  habits,
  (newValue) => {
    localStorage.setItem('habits', JSON.stringify(newValue));
  },
  { deep: true },
);
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <header class="border-b-[1.5px] border-gray-200">
      <div class="container mx-auto px-4 sm:px-6 py-4">
        <h1 class="text-3xl text-gray-700 font-bold">Routine</h1>
      </div>
    </header>

    <main class="container mx-auto px-2 sm:px-6 py-4">
      <div
        class="py-3 px-4 bg-white border border-gray-200 shadow-2xs rounded-lg flex flex-col gap-4"
      >
        <HabitForm :form="habitForm" @submit="addHabit" />
      </div>

      <div class="py-4">
        <p class="text-base font-semibold text-gray-700">{{ statusText }}</p>
      </div>

      <div class="flex flex-col gap-2">
        <HabitItem
          v-for="habit in habits"
          :key="habit.id"
          :habit="habit"
          @toggle="toggleHabit"
        />
      </div>
    </main>
  </div>
</template>
