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
    <router-view />
  </SiteLayout>
</template>

