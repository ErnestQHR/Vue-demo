import { ref, watch } from 'vue'

/**
 * 防抖 Composable
 * @param value 需要防抖的值
 * @param delay 延迟时间（毫秒）
 * @returns 防抖后的值
 */
export function useDebounce<T>(value: T, delay = 300) {
  const debouncedValue = ref(value) as typeof value
  let timeout: NodeJS.Timeout | null = null

  watch(
    () => value,
    (newValue) => {
      if (timeout) clearTimeout(timeout)
      timeout = setTimeout(() => {
        debouncedValue.value = newValue
      }, delay)
    },
    { immediate: true }
  )

  return debouncedValue
}

/**
 * 防抖函数（高阶函数版本）
 */
export function debounce<T extends (...args: any[]) => any>(fn: T, delay = 300) {
  let timeout: NodeJS.Timeout | null = null
  return function (this: any, ...args: Parameters<T>) {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => fn.apply(this, args), delay)
  } as T
}

