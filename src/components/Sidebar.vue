<template>
  <div class="p-3 text-sm">
    <router-link to="/" class="flex items-center gap-2 px-2 py-2 rounded hover:bg-neutral-900">
      <span class="inline-flex h-7 w-7 items-center justify-center rounded-md bg-neutral-100 text-neutral-900">H</span>
      <span class="font-semibold">皓然站</span>
    </router-link>

    <div class="mt-4 text-neutral-400 px-2">常用推荐</div>
    <nav class="mt-1 space-y-1">
      <a v-for="i in common" :key="i.title" :href="i.href" target="_blank" class="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-neutral-900">
        <span class="size-2 rounded-full bg-neutral-600"></span>
        <span class="truncate">{{ i.title }}</span>
      </a>
    </nav>

    <div class="mt-4 text-neutral-400 px-2">热门分类</div>
    <nav class="mt-1 space-y-1">
      <router-link v-for="c in categories" :key="c.slug" :to="`/category/${c.slug}`" class="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-neutral-900">
        <span class="size-2 rounded-full bg-neutral-600"></span>
        <span class="truncate">{{ c.name }}</span>
      </router-link>
    </nav>
  </div>
</template>

<script setup lang="ts">
import categories from '@/data/categories.json'

const common = [
  { title: '扣子空间', href: 'https://www.coze.cn/' },
  { title: '绘蛙AI', href: 'https://huwa.ai/' },
  { title: '讯飞星火', href: 'https://xinghuo.xfyun.cn/' },
  { title: 'HeyGen', href: 'https://www.heygen.com/' },
]
</script>


