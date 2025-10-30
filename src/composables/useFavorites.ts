import { ref, computed } from 'vue'

const STORAGE_KEY = 'haoran-favorites'

// 全局状态：收藏的工具 ID 列表
const favoriteIds = ref<Set<string | number>>(new Set())

/**
 * 收藏功能 Composable
 * 使用 localStorage 持久化
 */
export function useFavorites() {
  // 初始化：从 localStorage 加载
  function loadFavorites() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const ids = JSON.parse(stored) as Array<string | number>
        favoriteIds.value = new Set(ids)
      }
    } catch (error) {
      console.error('Failed to load favorites', error)
    }
  }

  // 保存到 localStorage
  function saveFavorites() {
    try {
      const ids = Array.from(favoriteIds.value)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(ids))
    } catch (error) {
      console.error('Failed to save favorites', error)
    }
  }

  // 切换收藏状态
  function toggleFavorite(id: string | number) {
    if (favoriteIds.value.has(id)) {
      favoriteIds.value.delete(id)
    } else {
      favoriteIds.value.add(id)
    }
    saveFavorites()
  }

  // 检查是否已收藏
  function isFavorite(id: string | number) {
    return favoriteIds.value.has(id)
  }

  // 获取所有收藏的 ID
  const favorites = computed(() => Array.from(favoriteIds.value))

  // 收藏数量
  const favoritesCount = computed(() => favoriteIds.value.size)

  // 初始化加载
  if (favoriteIds.value.size === 0) {
    loadFavorites()
  }

  return {
    favorites,
    favoritesCount,
    toggleFavorite,
    isFavorite,
    loadFavorites,
  }
}

