import { watch, onMounted } from 'vue'

export interface MetaInfo {
  title?: string
  description?: string
  ogImage?: string
  ogUrl?: string
}

/**
 * 动态更新页面 meta 标签
 */
export function useMeta(meta: MetaInfo) {
  function updateMeta() {
    // 更新 title
    if (meta.title) {
      document.title = meta.title
    }

    // 更新 description
    updateMetaTag('name', 'description', meta.description || '')

    // 更新 OpenGraph 标签
    updateMetaTag('property', 'og:title', meta.title || '')
    updateMetaTag('property', 'og:description', meta.description || '')
    updateMetaTag('property', 'og:image', meta.ogImage || '')
    updateMetaTag('property', 'og:url', meta.ogUrl || window.location.href)
  }

  function updateMetaTag(attribute: string, key: string, content: string) {
    if (!content) return

    let element = document.querySelector(`meta[${attribute}="${key}"]`)
    if (!element) {
      element = document.createElement('meta')
      element.setAttribute(attribute, key)
      document.head.appendChild(element)
    }
    element.setAttribute('content', content)
  }

  onMounted(() => {
    updateMeta()
  })

  // 监听 meta 变化
  watch(
    () => meta,
    () => {
      updateMeta()
    },
    { deep: true }
  )

  return { updateMeta }
}

