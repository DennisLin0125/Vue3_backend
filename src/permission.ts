import router from '@/router'
import nProgress from 'nprogress'
import 'nprogress/nprogress.css'

nProgress.configure({ showSpinner: false })

import pinia from '@/store'
import useUserStore from '@/store/modules/user.ts'
let userStore = useUserStore(pinia)
let username = userStore.username

import setting from '@/setting.ts'

router.beforeEach(async (to: any, from: any, next: any) => {
  document.title = `${setting.title}-${to.meta.title}`
  nProgress.start()
  let token = userStore.token
  if (token) {
    if (to.path == '/login') {
      next('/')
    } else {
      // 登入成功訪問除了login的其他路由
      if (username) {
        next()
      } else {
        //   沒有用戶訊息
        try {
          // 獲取用戶訊息成功後再放行
          await userStore.userInfo()
          next()
        } catch (e) {
          //   token過期
          await userStore.userLogout()
          alert('token過期')
          next({
            path: '/login',
            query: {
              redirect: to.path,
            },
          })
        }
      }
    }
  } else {
    //   用戶未登入判斷
    if (to.path == '/login') {
      next()
    } else {
      next({
        path: '/login',
        query: {
          redirect: to.path,
        },
      })
    }
  }
})

router.afterEach((to: any, from: any) => {
  nProgress.done()
})
