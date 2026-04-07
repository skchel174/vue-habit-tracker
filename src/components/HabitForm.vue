<script setup lang="ts">
import type { HabitForm } from '@/types';
import { reactive } from 'vue';

const form = reactive<HabitForm>({
  title: '',
});

const emit = defineEmits<{
  (e: 'submit', data: HabitForm): void;
}>();

const handleSubmit = () => {
  const title = form.title.trim();
  
  if (!title) {
    return;
  }

  emit('submit', { title });
  form.title = '';
};
</script>

<template>
  <form class="flex align-center gap-3" @submit.prevent="handleSubmit">
    <div class="flex-1">
      <input
        v-model="form.title"
        id="input-base"
        type="text"
        class="py-1 sm:py-2 px-4 rounded-lg block w-full bg-layer border-layer-line sm:text-sm text-foreground placeholder:text-muted-foreground-1 border border-gray-200 focus:border-rose-200 focus-visible:outline-1 focus-visible:outline-rose-200 disabled:opacity-50 disabled:pointer-events-none placeholder:font-medium placeholder:text-base placeholder:text-gray-400"
        placeholder="Enter habit title..."
      />
    </div>

    <div>
      <button
        type="submit"
        class="py-2 px-4 text-sm rounded-lg border border-transparent disabled:opacity-50 disabled:pointer-events-none cursor-pointer text-white bg-rose-400 hover:bg-rose-400/85 transition-colors duration-200 ease-in-out font-bold"
      >
        Add
      </button>
    </div>
  </form>
</template>
