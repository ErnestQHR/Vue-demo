<template>
  <div class="mx-auto max-w-4xl px-3 sm:px-4 py-6 sm:py-10">
    <!-- 加载状态 -->
    <div v-if="loading" class="flex justify-center py-20">
      <div class="text-neutral-400">加载中...</div>
    </div>

    <!-- 错误状态 -->
    <div v-else-if="error" class="py-20 text-center">
      <p class="text-red-400">{{ error }}</p>
      <router-link to="/" class="mt-4 inline-block text-neutral-300 hover:text-white">返回首页</router-link>
    </div>

    <!-- 工具详情 -->
    <div v-else-if="tool" class="space-y-6">
      <!-- 返回导航 -->
      <nav class="flex items-center gap-2 text-sm text-neutral-400">
        <router-link to="/" class="hover:text-white">首页</router-link>
        <span>/</span>
        <span class="text-neutral-200">{{ tool.title }}</span>
      </nav>

      <!-- 封面图 -->
      <div v-if="tool.cover" class="aspect-[21/9] overflow-hidden rounded-xl border border-neutral-800">
        <img :src="tool.cover" :alt="tool.title" class="h-full w-full object-cover" loading="lazy" />
      </div>

      <!-- 标题与徽章 -->
      <div>
        <div class="flex flex-wrap items-center gap-2 mb-3">
          <span v-for="badge in tool.badges" :key="badge" class="inline-flex items-center rounded-full bg-neutral-800 px-3 py-1 text-xs text-neutral-300">{{ badge }}</span>
        </div>
        <h1 class="text-2xl sm:text-3xl md:text-4xl font-bold text-white">{{ tool.title }}</h1>
        <p v-if="tool.vendor" class="mt-2 text-neutral-400">by {{ tool.vendor }}</p>
      </div>

      <!-- 操作按钮 -->
      <div class="flex flex-col sm:flex-row gap-3">
        <a v-if="tool.link" :href="tool.link" target="_blank" rel="noopener" class="inline-flex items-center justify-center gap-2 rounded-md bg-white text-neutral-900 px-6 py-3 font-medium hover:bg-neutral-200">
          <span>访问官网</span>
          <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
        </a>
        <button @click="$router.back()" class="inline-flex items-center justify-center rounded-md border border-neutral-700 px-6 py-3 text-neutral-300 hover:bg-neutral-900">返回</button>
      </div>

      <!-- 简介 -->
      <div v-if="tool.summary" class="rounded-lg bg-neutral-900/50 border border-neutral-800 p-4">
        <h2 class="text-lg font-semibold text-white mb-2">简介</h2>
        <p class="text-neutral-300 leading-relaxed">{{ tool.summary }}</p>
      </div>

      <!-- 详细内容（富文本） -->
      <div v-if="tool.content" class="prose prose-invert max-w-none">
        <h2 class="text-lg font-semibold text-white mb-3">详细介绍</h2>
        <div v-html="tool.content" class="text-neutral-300 leading-relaxed space-y-4"></div>
      </div>

      <!-- 分类标签 -->
      <div v-if="tool.categories && tool.categories.length" class="pt-6 border-t border-neutral-800">
        <h3 class="text-sm text-neutral-400 mb-2">相关分类</h3>
        <div class="flex flex-wrap gap-2">
          <router-link v-for="cat in tool.categories" :key="cat" :to="`/category/${cat}`" class="rounded-full border border-neutral-700 px-3 py-1 text-sm text-neutral-300 hover:border-neutral-500">{{ cat }}</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useTool } from '@/composables/useWordPress'

const route = useRoute()
const toolId = route.params.id as string

const { tool, loading, error, fetchTool } = useTool(toolId)

onMounted(() => {
  fetchTool()
})
</script>

<style scoped>
.prose :deep(p) {
  margin-bottom: 1rem;
}
.prose :deep(ul), .prose :deep(ol) {
  margin-left: 1.5rem;
  margin-bottom: 1rem;
}
.prose :deep(li) {
  margin-bottom: 0.5rem;
}
.prose :deep(a) {
  color: #a3a3a3;
  text-decoration: underline;
}
.prose :deep(a:hover) {
  color: #ffffff;
}
</style>


