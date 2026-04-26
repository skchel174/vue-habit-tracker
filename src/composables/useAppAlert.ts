import type { AppAlertItem } from '@/types';
import { ref } from 'vue';

const alerts = ref<AppAlertItem[]>([]);

export function useAppAlert() {
  function showAlert(alert: Omit<AppAlertItem, 'id'>, timeout = 5000) {
    const id = crypto.randomUUID();

    alerts.value.push({ id, ...alert });

    window.setTimeout(() => {
      closeAlert(id);
    }, timeout);
  }

  function closeAlert(id: string) {
    alerts.value = alerts.value.filter((alert) => alert.id !== id);
  }

  return {
    alerts,
    showAlert,
    closeAlert,
  };
}
