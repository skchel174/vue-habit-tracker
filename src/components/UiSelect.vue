<script setup lang="ts">
defineProps<{
  modelValue: string;
  options: { value: string; label: string }[];
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();

const handleInput = (event: Event) => {
  const target = event.target as HTMLSelectElement;
  emit('update:modelValue', target.value);
};
</script>

<template>
  <select
    id="habitKind"
    :value="modelValue"
    class="w-full rounded-xl border border-rose-200 bg-white px-3.5 py-2.5 text-sm text-slate-700 outline-none transition focus:border-rose-300 focus:ring-4 focus:ring-rose-100"
    @input="handleInput"
  >
    <option
      v-for="option in options"
      :key="option.value"
      :value="option.value"
    >
      {{ option.label }}
    </option>
  </select>
</template>
