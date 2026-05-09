<template>
  <main class="min-h-screen p-3 sm:p-5 lg:p-6">
    <div
      class="grid min-h-[calc(100vh-24px)] gap-5 xl:grid-cols-[minmax(0,1fr)_360px] 2xl:grid-cols-[minmax(0,1fr)_400px]"
    >
      <section class="min-w-0">
        <slot name="main" />
      </section>

      <aside class="hidden min-w-0 xl:block">
        <slot name="sidebar" />
      </aside>
    </div>

    <slot name="drawer" />
  </main>
</template>
