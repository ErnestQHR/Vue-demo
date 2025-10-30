import { createRouter, createWebHistory } from 'vue-router'

const Home = () => import('../pages/Home.vue')
const Category = () => import('../pages/Category.vue')
const ToolDetail = () => import('../pages/ToolDetail.vue')
const Login = () => import('../pages/Login.vue')
const NotFound = () => import('../pages/NotFound.vue')

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { 
      path: '/', 
      name: 'Home', 
      component: Home,
      meta: { title: '皓然站 · AI 导航', description: '探索与发现最新、热门的智能体与 AI 工具' }
    },
    { 
      path: '/category/:slug', 
      name: 'Category', 
      component: Category, 
      props: true,
      meta: { title: '分类浏览 · 皓然站' }
    },
    { 
      path: '/tool/:id', 
      name: 'ToolDetail', 
      component: ToolDetail, 
      props: true,
      meta: { title: '工具详情 · 皓然站' }
    },
    { 
      path: '/login', 
      name: 'Login', 
      component: Login,
      meta: { title: '登录 · 皓然站' }
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: NotFound,
      meta: { title: '404 页面未找到 · 皓然站' }
    },
  ],
  scrollBehavior() {
    return { top: 0, behavior: 'smooth' }
  }
})

// 全局路由守卫：更新页面标题
router.beforeEach((to, _from, next) => {
  const title = (to.meta.title as string) || '皓然站 · AI 导航'
  document.title = title
  next()
})

export default router


