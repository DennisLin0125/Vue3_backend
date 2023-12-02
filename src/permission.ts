import router from '@/router'
import nProgress from 'nprogress'
import 'nprogress/nprogress.css'
router.beforeEach((to: any, from: any, next: any) => {
  nProgress.start()
  next()
})

router.afterEach((to: any, from: any) => {
  nProgress.done()
})
