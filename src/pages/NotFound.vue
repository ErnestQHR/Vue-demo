<template>
  <div class="min-h-[calc(100vh-200px)] flex items-center justify-center px-4">
    <div class="text-center max-w-md">
      <!-- 404 大号文字 -->
      <h1 class="text-8xl sm:text-9xl font-black text-neutral-200 dark:text-neutral-800">
        404
      </h1>
      
      <!-- 标题 -->
      <h2 class="mt-4 text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white">
        页面未找到
      </h2>
      
      <!-- 描述 -->
      <p class="mt-3 text-neutral-600 dark:text-neutral-400">
        抱歉，你访问的页面不存在或已被移除。
      </p>
      
      <!-- 操作按钮 -->
      <div class="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
        <router-link 
          to="/" 
          class="inline-flex items-center justify-center rounded-md bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 px-6 py-3 font-medium hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-colors"
        >
          返回首页
        </router-link>
        
        <button 
          @click="$router.back()" 
          class="inline-flex items-center justify-center rounded-md border border-neutral-300 dark:border-neutral-700 px-6 py-3 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors"
        >
          返回上一页
        </button>
      </div>
      
      <!-- 推荐链接 -->
      <div class="mt-12 text-left">
        <h3 class="text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-3">
          你可能想访问：
        </h3>
        <ul class="space-y-2 text-sm">
          <li>
            <router-link to="/category/all" class="text-blue-600 dark:text-blue-400 hover:underline">
              浏览所有工具
            </router-link>
          </li>
          <li>
            <router-link to="/category/agent" class="text-blue-600 dark:text-blue-400 hover:underline">
              AI 智能体分类
            </router-link>
          </li>
          <li>
            <router-link to="/category/chat" class="text-blue-600 dark:text-blue-400 hover:underline">
              AI 聊天助手
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 纯展示组件，无需额外逻辑
</script>

