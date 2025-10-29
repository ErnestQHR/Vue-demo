import { ref, watch, onMounted } from 'vue'

export type Theme = 'light' | 'dark'

const STORAGE_KEY = 'site-theme'
const theme = ref<Theme>('dark')

export function useTheme() {
  // 初始化主题
  function initTheme() {
    const stored = localStorage.getItem(STORAGE_KEY) as Theme | null
    theme.value = stored || 'dark'
    applyTheme(theme.value)
  }

  // 切换主题
  function toggleTheme() {
    theme.value = theme.value === 'dark' ? 'light' : 'dark'
  }

  // 应用主题到 DOM
  function applyTheme(t: Theme) {
    const html = document.documentElement
    if (t === 'dark') {
      html.classList.add('dark')
      html.classList.remove('light')
    } else {
      html.classList.add('light')
      html.classList.remove('dark')
    }
    localStorage.setItem(STORAGE_KEY, t)
  }

  // 监听主题变化
  watch(theme, (newTheme) => {
    applyTheme(newTheme)
  })

  onMounted(() => {
    initTheme()
  })

  return {
    theme,
    toggleTheme,
    initTheme,
  }
}

