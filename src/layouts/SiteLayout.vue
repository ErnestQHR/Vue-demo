<template>
  <div class="min-h-screen bg-neutral-950 text-neutral-100">
    <div class="mx-auto max-w-[120rem] grid grid-cols-12 gap-0">
      <aside class="hidden lg:block col-span-2 border-r border-neutral-800 sticky top-0 h-screen overflow-y-auto">
        <Sidebar />
      </aside>
      <div class="col-span-12 lg:col-span-10 min-h-screen flex flex-col">
        <HeaderBar class="border-b border-neutral-800/60" />
        <main class="flex-1"> 
          <slot />
        </main>
        <FooterBar class="border-t border-neutral-800/60" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import HeaderBar from '@/components/HeaderBar.vue'
import FooterBar from '@/components/FooterBar.vue'
import Sidebar from '@/components/Sidebar.vue'
</script>


