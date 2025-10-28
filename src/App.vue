<script setup lang="ts">
import HeaderBar from './components/HeaderBar.vue'
import FooterBar from './components/FooterBar.vue'
</script>

<template>
  <div class="min-h-screen bg-white dark:bg-neutral-950 text-neutral-900 dark:text-white">
    <HeaderBar />
    <router-view />
    <FooterBar />
  </div>
  
</template>

