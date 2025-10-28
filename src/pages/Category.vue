<template>
  <div class="mx-auto max-w-7xl px-4 py-8">
    <SectionTitle :title="categoryTitle" />

    <div class="mb-4 flex flex-wrap items-center gap-2">
      <input v-model="q" type="search" placeholder="筛选关键词…" class="w-full md:w-72 rounded-md border border-neutral-200 dark:border-neutral-700 bg-white/70 dark:bg-neutral-800/70 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-neutral-300 dark:focus:ring-neutral-700" />
      <select v-model="sort" class="rounded-md border border-neutral-200 dark:border-neutral-700 bg-white/70 dark:bg-neutral-800/70 px-3 py-2 text-sm">
        <option value="newest">最新</option>
        <option value="title">标题</option>
      </select>
    </div>

    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
      <ToolCard v-for="t in paged" :key="t.id" :tool="t" />
    </div>

    <div class="mt-6 flex justify-center gap-2">
      <button :disabled="page===1" @click="page--" class="px-3 py-1.5 rounded border disabled:opacity-50">上一页</button>
      <button :disabled="page===pages" @click="page++" class="px-3 py-1.5 rounded border disabled:opacity-50">下一页</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import SectionTitle from '@/components/SectionTitle.vue'
import ToolCard from '@/components/ToolCard.vue'
import tools from '@/data/tools.json'

const route = useRoute()
const slug = computed(() => String(route.params.slug || 'all'))
const categoryTitle = computed(() => ({ all: '全部工具' } as Record<string, string>)[slug.value] || slug.value)

const q = ref('')
const sort = ref<'newest'|'title'>('newest')
const page = ref(1)
const pageSize = 16

const filtered = computed(() => {
  const base = slug.value === 'all' ? tools : tools.filter(t => (t.categories || []).includes(slug.value))
  const byQ = q.value ? base.filter(t => (t.title + ' ' + (t.summary||'')).toLowerCase().includes(q.value.toLowerCase())) : base
  const bySort = [...byQ].sort((a, b) => sort.value === 'title' ? a.title.localeCompare(b.title) : new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  return bySort
})

const pages = computed(() => Math.max(1, Math.ceil(filtered.value.length / pageSize)))
const paged = computed(() => filtered.value.slice((page.value-1)*pageSize, page.value*pageSize))

// Initialize from query param
import { onMounted, watch } from 'vue'
onMounted(() => {
  const qParam = String(route.query.q || '')
  if (qParam) q.value = qParam
})
watch(() => route.query.q, (val) => {
  q.value = String(val || '')
})
</script>


