<template>
  <header class="sticky top-0 z-40 bg-neutral-950/70 backdrop-blur">
    <div class="px-4 py-3 flex items-center gap-4">
      <button @click="$emit('toggleDrawer')" class="lg:hidden text-neutral-300 hover:text-white">
        <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
        </svg>
      </button>
      <router-link to="/" class="flex items-center gap-2 font-semibold text-white">
        <span class="inline-flex h-7 w-7 items-center justify-center rounded-md bg-gradient-to-br from-white to-neutral-300 text-xs text-neutral-900">H</span>
        <span class="tracking-tight hidden sm:inline">皓然站 · AI导航</span>
      </router-link>

      <div class="hidden md:flex items-center gap-3 ml-6 text-neutral-300">
        <router-link v-for="c in quickCategories" :key="c.slug" :to="`/category/${c.slug}`" class="text-sm text-neutral-600 dark:text-neutral-300 hover:text-black dark:hover:text-white">
          {{ c.name }}
        </router-link>
      </div>

      <div class="ml-auto flex-1 max-w-xl">
        <div class="relative">
          <input v-model="keyword" @keyup.enter="doSearch" type="search" placeholder="搜索AI工具…" class="w-full rounded-md border border-neutral-700 bg-neutral-900 dark:bg-neutral-900 dark:border-neutral-700 bg-white text-neutral-900 dark:text-neutral-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-neutral-700" />
          <button class="absolute right-1 top-1/2 -translate-y-1/2 px-3 py-1 text-sm text-neutral-300 hover:text-white" @click="doSearch">搜索</button>
        </div>
      </div>

      <!-- 主题切换按钮 -->
      <button @click="toggleTheme" class="ml-2 p-2 rounded-md text-neutral-300 hover:bg-neutral-800 hover:text-white" title="切换主题">
        <svg v-if="theme === 'dark'" class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/>
        </svg>
        <svg v-else class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/>
        </svg>
      </button>

      <!-- 登录按钮 -->
      <router-link to="/login" class="ml-2 hidden sm:inline-flex items-center rounded-md bg-neutral-800 px-3 py-2 text-sm text-neutral-300 hover:bg-neutral-700 hover:text-white">
        登录
      </router-link>
    </div>
  </header>
  
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useTheme } from '@/composables/useTheme'

defineEmits<{ (e: 'toggleDrawer'): void }>()

const router = useRouter()
const keyword = ref('')
const { theme, toggleTheme } = useTheme()

const quickCategories = [
  { slug: 'agent', name: 'AI智能体' },
  { slug: 'chat', name: 'AI聊天助手' },
  { slug: 'design', name: 'AI图像/设计' },
]

function doSearch() {
  if (!keyword.value.trim()) return
  router.push({ name: 'Category', params: { slug: 'all' }, query: { q: keyword.value } })
}
</script>


