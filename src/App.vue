<script setup lang="ts">
import AppAlertStack from '@/components/app-alert/AppAlertStack.vue';
import AppLayout from '@/components/AppLayout.vue';
import HabitFormContainer from '@/components/habit-form/HabitFormContainer.vue';
import HabitItem from '@/components/HabitItem.vue';
import HabitPageLayout from '@/components/HabitPageLayout.vue';
import UiButton from '@/components/UiButton.vue';
import UiSurface from '@/components/UiSurface.vue';
import { useAppAlert } from '@/composables/useAppAlert';
import { AlertType } from '@/constants';
import type { Habit, HabitForm } from '@/types';
import {
  CalendarIcon,
  FilterIcon,
  PlusIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@lucide/vue';
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
  return `${progressText.value} completed today`;
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

  <AppLayout>
    <HabitPageLayout>
      <template #main>
        <UiSurface>
          <header class="mb-9">
            <div class="flex items-start justify-between gap-6">
              <div class="space-y-3">
                <h1
                  class="text-[40px] font-semibold leading-none tracking-[-0.04em] text-slate-700"
                >
                  Habits
                </h1>

                <p class="text-sm font-medium leading-6 text-slate-500">
                  Your weekly overview
                </p>
              </div>

              <div
                class="min-w-[220px] rounded-lg border-[1.5px] border-rose-200/70 px-4 py-2"
              >
                <p class="text-sm font-medium leading-6 text-slate-500">
                  {{ statusText }}
                </p>
              </div>
            </div>
          </header>

          <section class="mb-8">
            <div class="grid grid-cols-[1fr_auto_1fr] items-center gap-4">
              <div class="flex items-center gap-4">
                <UiButton
                  class="max-h-[40px]"
                  variant="primary"
                >
                  <PlusIcon class="h-5 w-5 mr-2.5" />
                  New Habit
                </UiButton>

                <UiButton
                  variant="secondary"
                  class="max-h-[40px]"
                >
                  <FilterIcon class="h-5 w-5 mr-2.5" />
                  Filters
                </UiButton>
              </div>

              <div class="flex items-center gap-3">
                <UiButton
                  variant="secondary"
                  size="icon"
                  class="p-[10px] w-[40px] h-[40px]"
                >
                  <ChevronLeftIcon />
                </UiButton>

                <p
                  class="text-base font-semibold text-slate-700"
                >
                  May 5 - May 11, 2025
                </p>

                <UiButton
                  variant="secondary"
                  size="icon"
                  class="max-h-[40px]"
                >
                  <ChevronRightIcon class="h-4 w-4" />
                </UiButton>
              </div>

              <div class="flex justify-end">
                <UiButton
                  variant="secondary"
                  class="h-12 rounded-[14px] border border-rose-200 bg-white px-5 text-[16px] font-semibold text-slate-700 shadow-none hover:bg-rose-50"
                >
                  <CalendarIcon class="h-5 w-5" />
                  Today
                </UiButton>
              </div>
            </div>
          </section>

          <div class="flex flex-col gap-1">
            <HabitItem
              v-for="habit in habits"
              :key="habit.id"
              :habit="habit"
              @delete="deleteHabit"
              @toggle="toggleHabit"
            />
          </div>
        </UiSurface>
      </template>

      <template #sidebar>
        <UiSurface>
          <HabitFormContainer @submit="addHabit" />
        </UiSurface>
      </template>
    </HabitPageLayout>
  </AppLayout>
</template>
