<script setup lang="ts">
import AppAlert from '@/components/app-alert/AppAlert.vue';
import type { AppAlertItem } from '@/types';

defineProps<{
  alerts: AppAlertItem[];
}>();

const emit = defineEmits<{
  close: [id: string];
}>();
</script>

<template>
  <div
    class="pointer-events-none fixed inset-x-0 top-2 z-50 flex justify-center px-2 sm:top-6"
  >
    <div class="flex w-full max-w-md flex-col gap-3 sm:max-w-lg">
      <TransitionGroup
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="-translate-y-3 opacity-0"
        enter-to-class="translate-y-0 opacity-100"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="translate-y-0 opacity-100"
        leave-to-class="-translate-y-2 opacity-0"
      >
        <AppAlert
          v-for="alert in alerts"
          :key="alert.id"
          :type="alert.type"
          :title="alert.title"
          :message="alert.message"
          @close="emit('close', alert.id)"
        />
      </TransitionGroup>
    </div>
  </div>
</template>
