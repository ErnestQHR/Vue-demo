<template>
  <div class="min-h-[calc(100vh-200px)] flex items-center justify-center px-4 py-12">
    <div class="w-full max-w-md">
      <div class="rounded-xl border border-neutral-800 dark:border-neutral-700 bg-white dark:bg-neutral-900 p-8 shadow-2xl">
        <!-- Logo & Title -->
        <div class="text-center mb-8">
          <div class="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-white to-neutral-300 text-lg font-bold text-neutral-900 mb-3">H</div>
          <h1 class="text-2xl font-bold text-neutral-900 dark:text-white">皓然站 · AI 导航</h1>
          <p class="mt-2 text-sm text-neutral-600 dark:text-neutral-400">登录以管理内容</p>
        </div>

        <!-- Error Message -->
        <div v-if="error" class="mb-4 rounded-md bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-3 text-sm text-red-800 dark:text-red-300">
          {{ error }}
        </div>

        <!-- Login Form -->
        <form @submit.prevent="handleLogin" class="space-y-5">
          <div>
            <label for="username" class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">用户名</label>
            <input v-model="username" id="username" type="text" required class="w-full rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-4 py-2.5 text-neutral-900 dark:text-neutral-100 focus:ring-2 focus:ring-neutral-500 dark:focus:ring-neutral-600 outline-none" placeholder="输入用户名" />
          </div>

          <div>
            <label for="password" class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">密码</label>
            <input v-model="password" id="password" type="password" required class="w-full rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-4 py-2.5 text-neutral-900 dark:text-neutral-100 focus:ring-2 focus:ring-neutral-500 dark:focus:ring-neutral-600 outline-none" placeholder="输入密码" />
          </div>

          <button type="submit" :disabled="loading" class="w-full rounded-md bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 px-4 py-3 font-medium hover:bg-neutral-800 dark:hover:bg-neutral-100 disabled:opacity-50 disabled:cursor-not-allowed">
            <span v-if="!loading">登录</span>
            <span v-else>登录中...</span>
          </button>
        </form>

        <!-- Footer Links -->
        <div class="mt-6 text-center text-sm text-neutral-600 dark:text-neutral-400">
          <router-link to="/" class="hover:text-neutral-900 dark:hover:text-white">返回首页</router-link>
        </div>
      </div>

      <!-- Info Notice -->
      <div class="mt-6 text-center text-xs text-neutral-500 dark:text-neutral-400">
        <p>提示：需要在 WordPress 后台配置 JWT Authentication 插件</p>
        <p class="mt-1">环境变量 VITE_WP_API_URL 指定 WordPress API 地址</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { authApi } from '@/services/api'

const router = useRouter()
const username = ref('')
const password = ref('')
const loading = ref(false)
const error = ref<string | null>(null)

async function handleLogin() {
  if (!username.value || !password.value) {
    error.value = '请填写用户名和密码'
    return
  }

  loading.value = true
  error.value = null

  try {
    const response = await authApi.login(username.value, password.value)
    
    // 保存 token
    localStorage.setItem('auth_token', response.token)
    localStorage.setItem('user_display_name', response.user_display_name)
    
    // 跳转到首页
    router.push('/')
  } catch (err: any) {
    console.error('Login failed', err)
    error.value = err.response?.data?.message || '登录失败，请检查用户名和密码'
  } finally {
    loading.value = false
  }
}
</script>

