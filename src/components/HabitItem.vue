<script setup lang="ts">
import type { Habit } from '@/types';
import { usePopover } from '@/composables/usePopover';

defineProps<{ habit: Habit }>();

const emit = defineEmits<{
  (e: 'toggle', id: number): void;
  (e: 'delete', id: number): void;
}>();

const { triggerRef, menuRef, isOpen, toggle, close } = usePopover();
void triggerRef;
void menuRef;

const toggleHabit = (id: number) => {
  emit('toggle', id);
  close();
};

const deleteHabit = (id: number) => {
  emit('delete', id);
  close();
};
</script>

<template>
  <div
    ref="triggerRef"
    class="px-4 py-2 bg-white border border-gray-200 shadow-2xs rounded-lg"
    @click="toggle"
  >
    <div class="flex-1 cursor-pointer">
      <h5
        class="text-md font-medium text-gray-700"
        :class="[habit.doneToday ? 'line-through' : 'no-underline']"
      >
        {{ habit.title }}
      </h5>
    </div>

    <Teleport to="body">
      <transition
        enter-active-class="transition ease-out duration-100"
        enter-from-class="opacity-0 scale-95"
        enter-to-class="opacity-100 scale-100"
        leave-active-class="transition ease-in duration-75"
        leave-from-class="opacity-100 scale-100"
        leave-to-class="opacity-0 scale-95"
      >
        <div
          v-if="isOpen"
          ref="menuRef"
          aria-orientation="vertical"
          class="fixed z-50 min-w-40 origin-top-left overflow-hidden rounded-md border border-gray-200/70 bg-white py-1 shadow-lg"
        >
          <button
            type="button"
            class="flex w-full cursor-pointer items-center px-4 py-2.5 text-left text-sm transition-colors duration-150 ease-out hover:bg-rose-50 active:bg-rose-100/50 focus-visible:bg-rose-50 focus-visible:outline-none"
            :class="habit.doneToday ? 'text-gray-700' : 'text-green-700'"
            @click="toggleHabit(habit.id)"
          >
            {{ habit.doneToday ? 'Undo' : 'Complete' }}
          </button>
          <button
            type="button"
            class="flex w-full cursor-pointer items-center px-4 py-2.5 text-left text-sm text-red-700 transition-colors duration-150 ease-out hover:bg-rose-50 active:bg-rose-100/50 focus-visible:bg-rose-50 focus-visible:outline-none"
            @click="deleteHabit(habit.id)"
          >
            Delete habit
          </button>
        </div>
      </transition>
    </Teleport>
  </div>
</template>
