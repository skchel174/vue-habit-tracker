<script setup lang="ts">
import UiFieldLabel from '@/components/UiFieldLabel.vue';
import UiFieldMessage from '@/components/UiFieldMessage.vue';
import UiInput from '@/components/UiInput.vue';
import UiSelect from '@/components/UiSelect.vue';
import UiTextarea from '@/components/UiTextarea.vue';
import type { HabitKind } from '@/constants';
import type { FieldError } from '@/types';

type HabitBaseErrors = {
  title: FieldError;
  description: FieldError;
  habitKind: FieldError;
};

defineProps<{
  habitKindOptions: Array<{ value: HabitKind; label: string }>;
  errors: HabitBaseErrors;
}>();

const title = defineModel<string>('title', { required: true });
const description = defineModel<string>('description', { required: true });
const habitKind = defineModel<HabitKind>('habitKind', { required: true });
</script>

<template>
  <div class="lg:col-span-12 space-y-1.5">
    <UiFieldLabel for="title">Title</UiFieldLabel>
    <UiInput
      id="title"
      type="text"
      v-model="title"
      placeholder="Read, stretch, drink water..."
    />
    <UiFieldMessage :message="errors.title" variant="error" />
  </div>

  <div class="lg:col-span-12 space-y-1.5">
    <UiFieldLabel for="description">Description</UiFieldLabel>
    <UiTextarea
      id="description"
      v-model="description"
      placeholder="Optional notes, motivation, or rules..."
    />
    <UiFieldMessage :message="errors.description" variant="error" />
  </div>

  <div class="lg:col-span-4 space-y-1.5">
    <UiFieldLabel for="habitKind">Habit type</UiFieldLabel>
    <UiSelect id="habitKind" v-model="habitKind" :options="habitKindOptions" />
    <UiFieldMessage :message="errors.habitKind" variant="error" />
  </div>
</template>
