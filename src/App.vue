<script setup lang="ts">
import { onMounted } from 'vue'
import SiteLayout from './layouts/SiteLayout.vue'
import { useTheme } from '@/composables/useTheme'

const { initTheme } = useTheme()

onMounted(() => {
  initTheme()
})
</script>

<template>
  <SiteLayout>
    <router-view v-slot="{ Component, route }">
      <transition
        name="fade"
        mode="out-in"
        @before-enter="onBeforeEnter"
        @enter="onEnter"
        @leave="onLeave"
      >
        <component :is="Component" :key="route.path" />
      </transition>
    </router-view>
  </SiteLayout>
</template>

<style>
/* 页面过渡动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* 平滑滚动 */
html {
  scroll-behavior: smooth;
}

/* 自定义滚动条（Webkit） */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 4px;
}

.dark ::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 0, 0, 0.3);
}

.dark ::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.3);
}
</style>

<script lang="ts">
// 页面过渡钩子（可选的额外动画控制）
function onBeforeEnter(el: Element) {
  (el as HTMLElement).style.opacity = '0'
}

function onEnter(el: Element, done: () => void) {
  setTimeout(() => {
    (el as HTMLElement).style.opacity = '1'
    done()
  }, 20)
}

function onLeave(el: Element, done: () => void) {
  (el as HTMLElement).style.opacity = '0'
  setTimeout(done, 200)
}
</script>

