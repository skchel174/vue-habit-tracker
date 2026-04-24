<script setup lang="ts">
import UiInput from '@/components/UiInput.vue';
import UiLabel from '@/components/UiLabel.vue';
import UiSelect from '@/components/UiSelect.vue';
import UiTextarea from '@/components/UiTextarea.vue';
import type { HabitKind } from '@/types';

defineProps<{
  habitKindOptions: { value: HabitKind; label: string }[];
}>();

const title = defineModel<string>('title', { required: true });
const description = defineModel<string>('description', { required: true });
const habitKind = defineModel<HabitKind>('habitKind', { required: true });
</script>

<template>
  <div class="lg:col-span-12 space-y-1.5">
    <UiLabel for="title">Title</UiLabel>
    <UiInput
      id="title"
      type="text"
      v-model="title"
      placeholder="Read, stretch, drink water..."
    />
  </div>

  <div class="lg:col-span-12 space-y-1.5">
    <UiLabel for="description">Description</UiLabel>
    <UiTextarea
      id="description"
      v-model="description"
      placeholder="Optional notes, motivation, or rules..."
    />
  </div>
  
  <div class="lg:col-span-4 space-y-1.5">
    <UiLabel for="habitKind">Habit type</UiLabel>
    <UiSelect id="habitKind" v-model="habitKind" :options="habitKindOptions" />
  </div>
</template>
