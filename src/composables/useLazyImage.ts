import { ref, onMounted, onUnmounted } from 'vue'

/**
 * 图片懒加载 Composable
 * 使用 IntersectionObserver API 实现性能优化
 */
export function useLazyImage(imageRef: HTMLImageElement | null, src: string) {
  const isLoaded = ref(false)
  const isInView = ref(false)
  let observer: IntersectionObserver | null = null

  onMounted(() => {
    if (!imageRef) return

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            isInView.value = true
            const img = entry.target as HTMLImageElement
            img.src = src
            img.onload = () => {
              isLoaded.value = true
            }
            observer?.unobserve(img)
          }
        })
      },
      {
        rootMargin: '50px', // 提前 50px 开始加载
      }
    )

    observer.observe(imageRef)
  })

  onUnmounted(() => {
    observer?.disconnect()
  })

  return { isLoaded, isInView }
}

/**
 * Vue 指令方式的图片懒加载（可选）
 */
export const vLazyImage = {
  mounted(el: HTMLImageElement, binding: { value: string }) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement
            img.src = binding.value
            img.classList.add('lazy-loaded')
            observer.unobserve(img)
          }
        })
      },
      { rootMargin: '50px' }
    )
    observer.observe(el)
  },
}

