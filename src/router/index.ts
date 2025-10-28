import { createRouter, createWebHistory } from 'vue-router'

const Home = () => import('../pages/Home.vue')
const Category = () => import('../pages/Category.vue')
const ToolDetail = () => import('../pages/ToolDetail.vue')

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'Home', component: Home },
    { path: '/category/:slug', name: 'Category', component: Category },
    { path: '/tool/:id', name: 'ToolDetail', component: ToolDetail },
  ],
  scrollBehavior() {
    return { top: 0 }
  }
})

export default router


