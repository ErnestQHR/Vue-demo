<template>
  <div class="block rounded-xl border border-neutral-200 dark:border-neutral-800 overflow-hidden bg-white dark:bg-neutral-900 animate-pulse">
    <!-- 图片骨架 -->
    <div class="aspect-[16/9] bg-neutral-200 dark:bg-neutral-800"></div>
    
    <!-- 内容骨架 -->
    <div class="p-3 sm:p-4 space-y-3">
      <!-- 徽章骨架 -->
      <div class="flex gap-2">
        <div class="h-4 w-16 bg-neutral-200 dark:bg-neutral-800 rounded-full"></div>
        <div class="h-4 w-20 bg-neutral-200 dark:bg-neutral-800 rounded-full"></div>
      </div>
      
      <!-- 标题骨架 -->
      <div class="h-5 bg-neutral-200 dark:bg-neutral-800 rounded w-3/4"></div>
      
      <!-- 简介骨架 -->
      <div class="space-y-2">
        <div class="h-3 bg-neutral-200 dark:bg-neutral-800 rounded w-full"></div>
        <div class="h-3 bg-neutral-200 dark:bg-neutral-800 rounded w-2/3"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 纯展示组件，无需逻辑
</script>

