<template>
  <div class="flex items-end justify-between mb-4">
    <h2 class="text-lg md:text-xl font-semibold text-neutral-900 dark:text-white">{{ title }}</h2>
    <router-link v-if="moreHref" :to="moreHref" class="text-sm text-neutral-600 dark:text-neutral-300 hover:text-black dark:hover:text-white">查看更多</router-link>
  </div>
</template>

<script setup lang="ts">
defineProps<{ title: string; moreHref?: string }>()
</script>


