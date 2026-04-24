<script setup lang="ts">
import UiInput from '@/components/UiInput.vue';
import UiLabel from '@/components/UiLabel.vue';
import { computed } from 'vue';

const props = defineProps<{
  isRecurring: boolean;
}>();

const startDate = defineModel<string | null>('startDate', { default: null });
const endDate = defineModel<string | null>('endDate', { default: null });
const repeatLimit = defineModel<number | null>('repeatLimit', {
  default: null,
});
const preferredTime = defineModel<string>('preferredTime', { required: true });

const startDateLabel = computed(() => {
  return props.isRecurring ? 'Start date' : 'Date';
});
</script>

<template>
  <div class="lg:col-span-4 space-y-1.5">
    <UiLabel for="startDate">{{ startDateLabel }}</UiLabel>
    <UiInput id="startDate" v-model="startDate" type="date" />
  </div>

  <div v-if="isRecurring" class="lg:col-span-4 space-y-1.5">
    <UiLabel for="endDate">End date</UiLabel>
    <UiInput id="endDate" v-model="endDate" type="date" />
  </div>

  <div v-if="isRecurring" class="lg:col-span-4 space-y-1.5">
    <UiLabel for="repeatLimit">Repeat limit</UiLabel>
    <UiInput
      id="repeatLimit"
      v-model="repeatLimit"
      type="number"
      min="1"
      placeholder="e.g. 10 times"
    />
  </div>

  <div class="lg:col-span-6 space-y-1.5">
    <UiLabel for="preferredTime">Preferred time</UiLabel>
    <UiInput id="preferredTime" v-model="preferredTime" type="time" />
  </div>
</template>
