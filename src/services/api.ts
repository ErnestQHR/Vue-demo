import axios from 'axios'

// WordPress REST API 基础配置
const WP_BASE_URL = import.meta.env.VITE_WP_API_URL || 'https://your-wordpress-site.com/wp-json/wp/v2'

export const apiClient = axios.create({
  baseURL: WP_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// 请求拦截器（可添加 JWT token）
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// 响应拦截器
apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.error('API Error:', error)
    return Promise.reject(error)
  }
)

// WordPress 工具 API（自定义文章类型 'ai-tool'）
export const toolsApi = {
  async getAll(params?: { per_page?: number; page?: number; categories?: string; search?: string }) {
    return apiClient.get('/ai-tools', { params })
  },
  async getById(id: string | number) {
    return apiClient.get(`/ai-tools/${id}`)
  },
  async getBySlug(slug: string) {
    return apiClient.get('/ai-tools', { params: { slug } })
  },
}

// 分类 API
export const categoriesApi = {
  async getAll() {
    return apiClient.get('/ai-tool-categories')
  },
  async getById(id: string | number) {
    return apiClient.get(`/ai-tool-categories/${id}`)
  },
}

// 认证 API（使用 JWT Authentication for WP-API 插件）
export const authApi = {
  async login(username: string, password: string) {
    const response = await axios.post(`${WP_BASE_URL.replace('/wp/v2', '')}/jwt-auth/v1/token`, {
      username,
      password,
    })
    return response.data
  },
  async validate(token: string) {
    const response = await axios.post(
      `${WP_BASE_URL.replace('/wp/v2', '')}/jwt-auth/v1/token/validate`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
    return response.data
  },
}

