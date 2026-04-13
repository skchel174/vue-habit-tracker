<script setup lang="ts">
const props = defineProps<{
  modelValue: boolean;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
}>();

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit('update:modelValue', target.checked);
};
</script>

<template>
  <input
    type="checkbox"
    :value="modelValue"
    @input="handleInput"
    class="mt-0.5 h-4 w-4 rounded border-rose-300 text-rose-500 focus:ring-rose-200"
  />
</template>
