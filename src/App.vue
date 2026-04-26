<script setup lang="ts">
import AppAlertStack from '@/components/app-alert/AppAlertStack.vue';
import HabitFormContainer from '@/components/habit-form/HabitFormContainer.vue';
import HabitItem from '@/components/HabitItem.vue';
import { useAppAlert } from '@/composables/useAppAlert';
import { AlertType } from '@/constants';
import type { Habit, HabitForm } from '@/types';
import { computed, ref, watch } from 'vue';

const { alerts, showAlert, closeAlert } = useAppAlert();

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

const addHabit = (data: HabitForm) => {
  console.log(data);
  showAlert({
    type: AlertType.Success,
    title: 'Habit created',
    message: 'Habit created successfully',
  });
};

const toggleHabit = (id: number) => {
  const habit = habits.value.find((habit) => habit.id === id);
  if (!habit) {
    return;
  }
  habit.doneToday = !habit.doneToday;
};

const deleteHabit = (id: number) => {
  habits.value = habits.value.filter((habit) => habit.id !== id);
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
  <Teleport to="body">
    <AppAlertStack
      :alerts="alerts"
      @close="closeAlert"
    />
  </Teleport>

  <div class="flex flex-col min-h-screen">
    <header class="border-b-[1.5px] border-gray-200">
      <div class="container mx-auto px-4 sm:px-6 py-4">
        <h1 class="text-3xl text-gray-700 font-bold">Routine</h1>
      </div>
    </header>

    <main class="container mx-auto px-2 sm:px-6 py-4">
      <HabitFormContainer @submit="addHabit" />

      <div class="py-4">
        <p class="text-base font-semibold text-gray-700">
          {{ statusText }}
        </p>
      </div>

      <div class="flex flex-col gap-1">
        <HabitItem
          v-for="habit in habits"
          :key="habit.id"
          :habit="habit"
          @delete="deleteHabit"
          @toggle="toggleHabit"
        />
      </div>
    </main>
  </div>
</template>
