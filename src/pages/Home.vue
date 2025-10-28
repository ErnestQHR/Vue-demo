<template>
  <div>
    <section class="relative overflow-hidden bg-gradient-to-b from-neutral-900 to-neutral-950 border-b border-neutral-800/60">
      <div class="pointer-events-none absolute inset-0 bg-[radial-gradient(40%_50%_at_50%_0%,rgba(0,0,0,0.06),transparent_60%)] dark:bg-[radial-gradient(40%_50%_at_50%_0%,rgba(255,255,255,0.06),transparent_60%)]" />
      <div class="relative mx-auto max-w-7xl px-4 py-12 md:py-16">
        <h1 class="text-3xl md:text-5xl font-extrabold tracking-tight text-white">皓然站 · AI 导航</h1>
        <p class="mt-3 md:mt-4 text-base md:text-lg text-neutral-300 max-w-2xl">探索与发现最新、热门的智能体与 AI 工具，助力学习、工作与创意。</p>
        <div class="mt-6 flex gap-3">
          <router-link to="/category/all" class="inline-flex items-center rounded-md bg-white text-neutral-900 px-4 py-2 text-sm hover:bg-neutral-200">浏览全部</router-link>
          <a href="https://gongke.net/" target="_blank" class="inline-flex items-center rounded-md border border-neutral-700 px-4 py-2 text-sm text-neutral-300 hover:bg-neutral-900/60">参考站点</a>
        </div>
      </div>
    </section>

    <main class="mx-auto max-w-7xl px-4 py-8">
      <SectionTitle title="热门工具" moreHref="/category/all" />
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5">
        <ToolCard v-for="t in hotTools" :key="t.id" :tool="t" />
      </div>

      <div class="mt-10">
        <SectionTitle title="最新添加" moreHref="/category/latest" />
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5">
          <ToolCard v-for="t in latestTools" :key="t.id" :tool="t" />
        </div>
      </div>

      <div class="mt-10">
        <SectionTitle title="热门分类" moreHref="/category/all" />
        <div class="flex flex-wrap gap-2">
          <router-link v-for="c in categories" :key="c.slug" :to="`/category/${c.slug}`" class="rounded-full border border-neutral-200/70 dark:border-neutral-700/60 px-3 py-1 text-sm text-neutral-700 dark:text-neutral-300 hover:border-neutral-400 dark:hover:border-neutral-500">{{ c.name }}</router-link>
        </div>
      </div>
    </main>
  </div>
  
</template>

<script setup lang="ts">
import SectionTitle from '@/components/SectionTitle.vue'
import ToolCard from '@/components/ToolCard.vue'
import tools from '@/data/tools.json'
import categories from '@/data/categories.json'

const hotTools = tools.slice(0, 8)
const latestTools = tools.slice(8, 16)

</script>


