import { createRouter, createWebHistory } from 'vue-router'

const Home = () => import('../pages/Home.vue')
const Category = () => import('../pages/Category.vue')
const ToolDetail = () => import('../pages/ToolDetail.vue')
const Login = () => import('../pages/Login.vue')

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'Home', component: Home },
    { path: '/category/:slug', name: 'Category', component: Category, props: true },
    { path: '/tool/:id', name: 'ToolDetail', component: ToolDetail, props: true },
    { path: '/login', name: 'Login', component: Login },
  ],
  scrollBehavior() {
    return { top: 0 }
  }
})

export default router


