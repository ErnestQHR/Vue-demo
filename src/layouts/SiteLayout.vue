<template>
  <div class="min-h-screen bg-neutral-950 text-neutral-100">
    <!-- Mobile drawer backdrop -->
    <div v-if="showDrawer" @click="showDrawer=false" class="fixed inset-0 bg-black/60 z-40 lg:hidden"></div>
    
    <!-- Mobile drawer -->
    <aside :class="['fixed inset-y-0 left-0 w-64 bg-neutral-950 border-r border-neutral-800 z-50 transform transition-transform lg:hidden', showDrawer ? 'translate-x-0' : '-translate-x-full']">
      <div class="flex items-center justify-between px-3 py-3 border-b border-neutral-800">
        <span class="font-semibold">导航菜单</span>
        <button @click="showDrawer=false" class="text-neutral-400 hover:text-white">✕</button>
      </div>
      <div class="overflow-y-auto h-[calc(100vh-4rem)]">
        <Sidebar @click="showDrawer=false" />
      </div>
    </aside>

    <div class="mx-auto max-w-[120rem] grid grid-cols-12 gap-0">
      <aside class="hidden lg:block col-span-2 border-r border-neutral-800 sticky top-0 h-screen overflow-y-auto">
        <Sidebar />
      </aside>
      <div class="col-span-12 lg:col-span-10 min-h-screen flex flex-col">
        <HeaderBar class="border-b border-neutral-800/60" @toggle-drawer="showDrawer=!showDrawer" />
        <main class="flex-1"> 
          <slot />
        </main>
        <FooterBar class="border-t border-neutral-800/60" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import HeaderBar from '@/components/HeaderBar.vue'
import FooterBar from '@/components/FooterBar.vue'
import Sidebar from '@/components/Sidebar.vue'

const showDrawer = ref(false)
</script>


