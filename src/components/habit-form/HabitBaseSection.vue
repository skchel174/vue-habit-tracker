<script setup lang="ts">
import UiFormField from '@/components/UiFormField.vue';
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
    <UiFormField for="title" label="Title" :error="errors.title">
      <UiInput
        id="title"
        type="text"
        v-model="title"
        placeholder="Read, stretch, drink water..."
      />
    </UiFormField>
  </div>

  <div class="lg:col-span-12 space-y-1.5">
    <UiFormField for="description" label="Description" :error="errors.description">
    <UiTextarea
      id="description"
        v-model="description"
        placeholder="Optional notes, motivation, or rules..."
      />
    </UiFormField>
  </div>

  <div class="lg:col-span-4 space-y-1.5">
    <UiFormField for="habitKind" label="Habit type" :error="errors.habitKind">
      <UiSelect id="habitKind" v-model="habitKind" :options="habitKindOptions" />
    </UiFormField>
  </div>
</template>
