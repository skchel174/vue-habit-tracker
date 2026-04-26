<script setup lang="ts">
import type { FieldError } from '@/types';
import UiFieldLabel from './UiFieldLabel.vue';
import UiFieldMessage from './UiFieldMessage.vue';

defineProps<{
  forId?: string;
  label?: string;
  error?: FieldError;
  required?: boolean;
}>();
</script>

<template>
  <div
    :data-error="!!error"
    class="space-y-1.5"
  >
    <slot name="label">
      <UiFieldLabel
        v-if="label"
        :for-id="forId"
        :required="required"
      >
        {{ label }}
      </UiFieldLabel>
    </slot>

    <slot />

    <slot name="message">
      <UiFieldMessage
        :message="error"
        variant="error"
      />
    </slot>
  </div>
</template>
