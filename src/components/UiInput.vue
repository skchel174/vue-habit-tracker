<script setup lang="ts">
defineProps<{
  type: string;
  modelValue: string | number | null;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit('update:modelValue', target.value);
};
</script>

<template>
  <input
    :type="type"
    :value="modelValue"
    class="w-full rounded-xl border border-rose-200 bg-white px-3.5 py-2.5 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-rose-300 focus:ring-4 focus:ring-rose-100"
    @input="handleInput"
  >
</template>
