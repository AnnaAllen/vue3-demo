import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('@/views/login/index.vue'),
      // children: [
      //   {
      //     path: 'index',
      //     name: 'index',
      //     component: () => import('@/views/login/index.vue')
      //   }
      // ]
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('@/views/AboutView.vue')
    },
    {
      path: '/test',
      name: 'test',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('@/views/test.vue')
    },
    {
      path: '/use-vue',
      name: 'use-vue',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('@/views/use-vue.vue')
    },
    {
      path: '/keep-alive',
      name: 'keep-alive',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route 
      // which is lazy-loaded when the route is visited.
      component: () => import('@/views/keep-alive/index.vue')
    },
    {
      path: '/provide-inject',
      name: 'provide-inject',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('@/views/provide-inject/index.vue')
    },
    {
      path: '/custom-directives',
      name: 'custom-directives',
      component: () => import('@/views/custom-directives/index.vue')
    },
    {
      path: '/use-hook',
      name: 'use-hook',
      component: () => import('@/views/hooks/use-hooks.vue')
    },
    {
      path: '/scroll-bar',
      name: 'scroll-bar',
      component: () => import('@/views/scroll-bar.vue')
    },
    // 简单状态管理
    {
      path: '/simple-state',
      name: 'simple-state',
      component: () => import('@/views/simple-state/index.vue')
    },
    // 主题切换
    {
      path: '/theme-change',
      name: 'theme-change',
      component: () => import('@/views/theme-change/index.vue')
    }
  ]
})

export default router
