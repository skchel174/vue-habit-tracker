<script setup lang="ts">
import { AlertType } from '@/constants';
import type { AppAlertItem } from '@/types';
import { computed } from 'vue';

type AppAlertProps = Omit<AppAlertItem, 'id'>;

const props = withDefaults(defineProps<AppAlertProps>(), {
  type: AlertType.Info,
  title: '',
});

const emit = defineEmits<{
  close: [];
}>();

const styles = computed(() => {
  switch (props.type) {
    case AlertType.Error:
      return {
        root: 'border-rose-200/70 bg-rose-50/80 shadow-rose-950/[0.06]',
        title: 'text-rose-950',
        message: 'text-rose-900/70',
        close:
          'text-rose-900/45 hover:bg-rose-200/40 hover:text-rose-950 focus-visible:ring-rose-300/60',
      };

    case AlertType.Success:
      return {
        root: 'border-emerald-200/70 bg-emerald-50/80 shadow-emerald-950/[0.06]',
        title: 'text-emerald-950',
        message: 'text-emerald-900/70',
        close:
          'text-emerald-900/45 hover:bg-emerald-200/40 hover:text-emerald-950 focus-visible:ring-emerald-300/60',
      };

    case AlertType.Info:
    default:
      return {
        root: 'border-slate-200/80 bg-slate-50/90 shadow-slate-950/[0.06]',
        title: 'text-slate-950',
        message: 'text-slate-600',
        close:
          'text-slate-400 hover:bg-slate-200/50 hover:text-slate-700 focus-visible:ring-slate-300/70',
      };
  }
});
</script>

<template>
  <div
    class="pointer-events-auto relative w-full overflow-hidden rounded-2xl border px-4 py-3 shadow-[0_18px_48px_-30px] backdrop-blur-xl"
    :class="styles.root"
    role="alert"
  >
    <div class="flex items-center gap-3">
      <div class="min-w-0 flex-1">
        <h3
          v-if="title"
          class="text-sm font-medium leading-5 tracking-[-0.01em]"
          :class="styles.title"
        >
          {{ title }}
        </h3>

        <p
          class="text-sm leading-5 tracking-[-0.01em]"
          :class="[styles.message, title ? 'mt-0.5' : '']"
        >
          {{ message }}
        </p>
      </div>

      <button
        type="button"
        class="inline-flex size-8 shrink-0 items-center justify-center rounded-xl text-lg leading-none transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent hover:text-slate-600 cursor-pointer"
        :class="styles.close"
        aria-label="Close alert"
        @click="emit('close')"
      >
        <span aria-hidden="true">×</span>
      </button>
    </div>
  </div>
</template>
