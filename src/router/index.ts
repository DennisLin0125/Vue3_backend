import { createRouter, createWebHashHistory } from 'vue-router'
import { constantRouter } from '@/router/routes.ts'

const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRouter,
  //     滾動行為
  scrollBehavior() {
    return {
      left: 0,
      top: 0,
    }
  },
})
export default router
