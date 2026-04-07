import { nextTick, onUnmounted, ref, watch } from 'vue';

type UsePopoverOptions = {
  align?: 'left' | 'right';
  offset?: number;
  viewportPadding?: number;
};

export function usePopover({
  align = 'left',
  offset = 4,
  viewportPadding = 8,
}: UsePopoverOptions = {}) {
  const triggerRef = ref<HTMLElement | null>(null);
  const menuRef = ref<HTMLElement | null>(null);

  const isOpen = ref(false);

  const toggle = () => {
    isOpen.value = !isOpen.value;
  };

  const open = () => {
    isOpen.value = true;
  };

  const close = () => {
    isOpen.value = false;
  };

  const addListeners = () => {
    document.addEventListener('pointerdown', handleClickOutside);
    document.addEventListener('scroll', handleReposition, true);
    document.addEventListener('keydown', handleEscape);
    window.addEventListener('resize', handleReposition);
  };

  const removeListeners = () => {
    document.removeEventListener('pointerdown', handleClickOutside);
    document.removeEventListener('scroll', handleReposition, true);
    document.removeEventListener('keydown', handleEscape);
    window.removeEventListener('resize', handleReposition);
  };

  const limitInRange = (value: number, min: number, max: number) => {
    return Math.min(Math.max(value, min), max);
  };

  const updatePosition = () => {
    const triggerEl = triggerRef.value;
    const menuEl = menuRef.value;

    if (!triggerEl || !menuEl) {
      return;
    }

    const triggerRect = triggerEl.getBoundingClientRect();
    const menuRect = menuEl.getBoundingClientRect();

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    let left =
      align === 'right' ? triggerRect.right - menuRect.width : triggerRect.left;

    left = limitInRange(
      left,
      viewportPadding,
      viewportWidth - menuRect.width - viewportPadding,
    );

    let top = triggerRect.bottom + offset;

    if (top + menuRect.height > viewportHeight - viewportPadding) {
      top = triggerRect.top - menuRect.height - offset;
    }

    top = limitInRange(
      top,
      viewportPadding,
      viewportHeight - menuRect.height - viewportPadding,
    );

    menuEl.style.position = 'fixed';
    menuEl.style.top = `${top}px`;
    menuEl.style.left = `${left}px`;
  };

  const handleClickOutside = (event: MouseEvent) => {
    const triggerEl = triggerRef.value;
    const menuEl = menuRef.value;
    const target = event.target as Node | null;

    if (!triggerEl || !menuEl || !target) {
      return;
    }

    const clickedInsideTrigger = triggerEl.contains(target);
    const clickedInsideMenu = menuEl.contains(target);

    if (!clickedInsideTrigger && !clickedInsideMenu) {
      close();
    }
  };

  const handleReposition = () => {
    if (isOpen.value) {
      updatePosition();
    }
  };

  const handleEscape = (event: KeyboardEvent) => {
    if (event.key !== 'Escape' || !isOpen.value) {
      return;
    }

    close();
    triggerRef.value?.focus?.();
  };

  watch(
    isOpen,
    async (isPopoverOpen: boolean) => {
      removeListeners();

      if (!isPopoverOpen) {
        return;
      }

      await nextTick();
      updatePosition();
      addListeners();
    },
    { immediate: true },
  );

  onUnmounted(() => {
    removeListeners();
  });

  return {
    triggerRef,
    menuRef,
    isOpen,
    toggle,
    open,
    close,
    updatePosition,
  };
}
