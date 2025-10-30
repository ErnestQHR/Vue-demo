<template>
  <div class="group block rounded-xl border border-neutral-200 dark:border-neutral-800 overflow-hidden bg-white dark:bg-neutral-900 hover:shadow-lg hover:-translate-y-1 transition-all duration-200 relative">
    <!-- 图片容器 + 懒加载 -->
    <router-link :to="`/tool/${tool.id}`" class="block aspect-[16/9] bg-neutral-100 dark:bg-neutral-800 relative overflow-hidden">
      <img 
        v-if="tool.cover" 
        ref="imageRef"
        :data-src="tool.cover" 
        :alt="tool.title" 
        class="h-full w-full object-cover transition-opacity duration-300"
        :class="{ 'opacity-0': !imageLoaded, 'opacity-100': imageLoaded }"
        loading="lazy" 
      />
      <!-- 加载占位符 -->
      <div v-if="!imageLoaded" class="absolute inset-0 bg-neutral-200 dark:bg-neutral-800 animate-pulse"></div>
      
      <!-- 外链图标 -->
      <div v-if="tool.link" class="absolute top-2 right-2 rounded-full bg-black/50 p-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
        <svg class="h-3 w-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
        </svg>
      </div>
    </router-link>
    
    <!-- 收藏按钮（悬浮在图片左上角） -->
    <button 
      @click.prevent="handleToggleFavorite"
      class="absolute top-2 left-2 z-10 rounded-full bg-white/90 dark:bg-neutral-900/90 backdrop-blur-sm p-2 opacity-0 group-hover:opacity-100 transition-opacity hover:scale-110"
      :class="{ '!opacity-100': isFav }"
      :title="isFav ? '取消收藏' : '收藏'"
    >
      <svg 
        class="h-4 w-4 transition-colors" 
        :class="isFav ? 'text-red-500 fill-current' : 'text-neutral-600 dark:text-neutral-400'"
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
      </svg>
    </button>
    
    <!-- 卡片内容 -->
    <router-link :to="`/tool/${tool.id}`" class="block p-3 sm:p-4">
      <!-- 徽章 -->
      <div class="flex flex-wrap items-center gap-1.5 mb-2">
        <span v-for="b in tool.badges?.slice(0, 3)" :key="b" class="inline-flex items-center rounded-full bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5 text-[11px] text-neutral-700 dark:text-neutral-300">{{ b }}</span>
      </div>
      
      <!-- 标题 -->
      <h3 class="text-sm md:text-base font-semibold text-neutral-900 dark:text-white line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
        {{ tool.title }}
      </h3>
      
      <!-- 简介 -->
      <p class="mt-1.5 text-xs text-neutral-600 dark:text-neutral-400 line-clamp-2 leading-relaxed">
        {{ tool.summary }}
      </p>
    </router-link>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useFavorites } from '@/composables/useFavorites'

export interface ToolCardData {
  id: string | number
  title: string
  cover?: string
  badges?: string[]
  summary?: string
  link?: string
}

const props = defineProps<{ tool: ToolCardData }>()

const imageRef = ref<HTMLImageElement | null>(null)
const imageLoaded = ref(false)

// 收藏功能
const { toggleFavorite, isFavorite } = useFavorites()
const isFav = computed(() => isFavorite(props.tool.id))

function handleToggleFavorite() {
  toggleFavorite(props.tool.id)
}

onMounted(() => {
  if (!imageRef.value || !props.tool.cover) return

  // IntersectionObserver 实现懒加载
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement
          const src = img.getAttribute('data-src')
          if (src) {
            img.src = src
            img.onload = () => {
              imageLoaded.value = true
            }
            observer.unobserve(img)
          }
        }
      })
    },
    { rootMargin: '100px' } // 提前 100px 开始加载
  )

  observer.observe(imageRef.value)
})
</script>


