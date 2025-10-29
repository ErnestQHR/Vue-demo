import { ref, computed } from 'vue'
import { toolsApi, categoriesApi } from '@/services/api'
import toolsJson from '@/data/tools.json'
import categoriesJson from '@/data/categories.json'

// WordPress 数据类型映射
export interface WPTool {
  id: number
  title: { rendered: string }
  content: { rendered: string }
  excerpt: { rendered: string }
  slug: string
  acf?: {
    cover_image?: string
    badges?: string[]
    external_link?: string
    vendor?: string
  }
  categories: number[]
  date: string
}

export interface Tool {
  id: number
  title: string
  cover?: string
  badges?: string[]
  summary?: string
  content?: string
  link?: string
  categories?: string[]
  createdAt: string
  vendor?: string
}

/**
 * 获取工具列表
 * 优先从 WordPress API 获取，失败时降级到静态 JSON
 */
export function useTools() {
  const tools = ref<Tool[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  const useWordPress = ref(import.meta.env.VITE_USE_WORDPRESS === 'true')

  async function fetchTools(params?: { category?: string; search?: string }) {
    loading.value = true
    error.value = null

    try {
      if (useWordPress.value) {
        // 从 WordPress 获取
        const wpTools: WPTool[] = await toolsApi.getAll({
          per_page: 100,
          search: params?.search,
          categories: params?.category,
        })
        tools.value = wpTools.map(mapWPToolToTool)
      } else {
        // 降级到静态 JSON
        tools.value = toolsJson as Tool[]
        
        // 客户端过滤
        if (params?.category) {
          tools.value = tools.value.filter(t => t.categories?.includes(params.category))
        }
        if (params?.search) {
          const q = params.search.toLowerCase()
          tools.value = tools.value.filter(t => 
            (t.title + ' ' + (t.summary || '')).toLowerCase().includes(q)
          )
        }
      }
    } catch (err) {
      console.warn('WordPress API failed, using static data', err)
      error.value = 'Failed to load from WordPress, using local data'
      tools.value = toolsJson as Tool[]
    } finally {
      loading.value = false
    }
  }

  return { tools, loading, error, fetchTools, useWordPress }
}

/**
 * 获取单个工具详情
 */
export function useTool(id: string | number) {
  const tool = ref<Tool | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)
  const useWordPress = ref(import.meta.env.VITE_USE_WORDPRESS === 'true')

  async function fetchTool() {
    loading.value = true
    error.value = null

    try {
      if (useWordPress.value) {
        const wpTool: WPTool = await toolsApi.getById(id)
        tool.value = mapWPToolToTool(wpTool)
      } else {
        const staticTool = (toolsJson as Tool[]).find(t => t.id === Number(id))
        tool.value = staticTool || null
      }
    } catch (err) {
      console.error('Failed to fetch tool', err)
      error.value = 'Tool not found'
      const staticTool = (toolsJson as Tool[]).find(t => t.id === Number(id))
      tool.value = staticTool || null
    } finally {
      loading.value = false
    }
  }

  return { tool, loading, error, fetchTool }
}

/**
 * 获取分类列表
 */
export function useCategories() {
  const categories = ref<Array<{ slug: string; name: string }>>([])
  const loading = ref(false)
  const useWordPress = ref(import.meta.env.VITE_USE_WORDPRESS === 'true')

  async function fetchCategories() {
    loading.value = true

    try {
      if (useWordPress.value) {
        const wpCategories = await categoriesApi.getAll()
        categories.value = wpCategories.map((c: any) => ({
          slug: c.slug,
          name: c.name,
        }))
      } else {
        categories.value = categoriesJson
      }
    } catch (err) {
      console.warn('Failed to fetch categories from WP, using static', err)
      categories.value = categoriesJson
    } finally {
      loading.value = false
    }
  }

  return { categories, loading, fetchCategories }
}

/**
 * 映射 WordPress 数据到本地模型
 */
function mapWPToolToTool(wpTool: WPTool): Tool {
  return {
    id: wpTool.id,
    title: wpTool.title.rendered,
    summary: wpTool.excerpt?.rendered?.replace(/<[^>]*>/g, '').slice(0, 200) || '',
    content: wpTool.content?.rendered || '',
    cover: wpTool.acf?.cover_image || `https://picsum.photos/seed/${wpTool.id}/640/360`,
    badges: wpTool.acf?.badges || [],
    link: wpTool.acf?.external_link || '#',
    vendor: wpTool.acf?.vendor,
    categories: wpTool.categories?.map(String) || [],
    createdAt: wpTool.date,
  }
}

