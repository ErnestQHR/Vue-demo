<template>
  <header class="sticky top-0 z-40 bg-neutral-950/70 backdrop-blur">
    <div class="px-4 py-3 flex items-center gap-4">
      <router-link to="/" class="flex items-center gap-2 font-semibold text-neutral-900 dark:text-white">
        <span class="inline-flex h-7 w-7 items-center justify-center rounded-md bg-gradient-to-br from-neutral-900 to-neutral-700 dark:from-white dark:to-neutral-300 text-xs text-white dark:text-neutral-900">H</span>
        <span class="tracking-tight">皓然站 · AI导航</span>
      </router-link>

      <div class="hidden md:flex items-center gap-3 ml-6 text-neutral-300">
        <router-link v-for="c in quickCategories" :key="c.slug" :to="`/category/${c.slug}`" class="text-sm text-neutral-600 dark:text-neutral-300 hover:text-black dark:hover:text-white">
          {{ c.name }}
        </router-link>
      </div>

      <div class="ml-auto flex-1 max-w-xl">
        <div class="relative">
          <input v-model="keyword" type="search" placeholder="搜索AI工具…" class="w-full rounded-md border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-neutral-700 text-neutral-200" />
          <button class="absolute right-1 top-1/2 -translate-y-1/2 px-3 py-1 text-sm text-neutral-300 hover:text-white" @click="$emit('search', keyword)">搜索</button>
        </div>
      </div>
    </div>
  </header>
  
</template>

<script setup lang="ts">
import { ref } from 'vue'

defineEmits<{ (e: 'search', q: string): void }>()

const keyword = ref('')
const quickCategories = [
  { slug: 'agent', name: 'AI智能体' },
  { slug: 'chat', name: 'AI聊天助手' },
  { slug: 'design', name: 'AI图像/设计' },
]
</script>


