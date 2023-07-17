import { createRouter, createWebHistory } from 'vue-router'
import type { Component } from 'vue'
import utils from '@/utils'

import routerMenu from './module/menu'
console.log(routerMenu)
const modules = import.meta.glob('/src/views/**/**.tsx')
const components: { [key: string]: Component } = utils.mapping(modules)
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '',
      name: '',
      meta: {
        // keepAlive:true,
      },
      component: () => import('@/layout/index'),
      // ...routerMenu,
      children: routerMenu
    },

    {
      path: '/editor',
      name: 'editor',
      meta: {
        // keepAlive:true,
      },
      component: components['editor']
    },
    {
      path: '/login',
      name: 'login',
      meta: {
        // keepAlive:true,
      },
      component: components['login']
    },
    {
      path: '/flow',
      name: 'flow',
      meta: {
        // keepAlive:true,
      },
      component: () => import('@/views/flow/index.vue')
    }
  ]
})

export default router
