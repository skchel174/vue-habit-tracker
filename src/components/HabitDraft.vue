<script setup lang="ts">
import { Habit } from '@/types';

defineProps<{ habit: Habit }>();
</script>

<template>
  <div class="flex flex-col gap-1">
    <div class="px-1">
      <p class="text-base font-semibold text-gray-700">Habit draft</p>
    </div>
    <div class="px-2.5 py-2 bg-neutral-100 rounded-lg">
      <div class="flex gap-1.5">
        <p class="text-sm font-semibold text-gray-700">Title:</p>
        <p class="text-sm text-gray-500">{{ habit.title }}</p>
      </div>
      <div class="flex gap-1.5">
        <p class="text-sm font-semibold text-gray-700">Status:</p>
        <p class="text-sm text-gray-500">
          {{ habit.doneToday ? 'Done' : 'Not done' }}
        </p>
      </div>
    </div>
  </div>
</template>
