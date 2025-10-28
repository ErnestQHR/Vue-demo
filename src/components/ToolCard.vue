<template>
  <router-link :to="`/tool/${tool.id}`" class="group block rounded-xl border border-neutral-100/80 dark:border-neutral-800/70 overflow-hidden bg-white dark:bg-neutral-900 hover:shadow-md hover:-translate-y-0.5 transition">
    <div class="aspect-[16/9] bg-neutral-100 dark:bg-neutral-800">
      <img v-if="tool.cover" :src="tool.cover" alt="" class="h-full w-full object-cover" loading="lazy" />
    </div>
    <div class="p-3">
      <div class="flex items-center gap-1.5 mb-1">
        <span v-for="b in tool.badges" :key="b" class="inline-flex items-center rounded-full bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5 text-[11px] text-neutral-700 dark:text-neutral-300">{{ b }}</span>
      </div>
      <h3 class="text-sm md:text-base font-semibold text-neutral-900 dark:text-white line-clamp-1 group-hover:underline underline-offset-2">{{ tool.title }}</h3>
      <p class="mt-1 text-xs text-neutral-600 dark:text-neutral-300 line-clamp-2">{{ tool.summary }}</p>
    </div>
  </router-link>
</template>

<script setup lang="ts">
export interface ToolCardData {
  id: string | number
  title: string
  cover?: string
  badges?: string[]
  summary?: string
}

defineProps<{ tool: ToolCardData }>()
</script>


