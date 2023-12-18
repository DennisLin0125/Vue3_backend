import { defineStore } from 'pinia'
import { reqLogin, reqUserInfo, reqLogout } from '@/api/user'
// 引入數據類型
import type {
  loginFormData,
  loginResponseData,
  userInfoReponseData,
} from '@/api/user/type.ts'
import type { userState } from '@/store/modules/types/type.ts'
// 引入本地存儲
import { SET_TOKEN, GET_TOKEN, REMOVE_TOKEN } from '@/utils/token.ts'
// 引入路由
import { constantRoute, asyncRoute, anyRoute } from '@/router/routes.ts'

import router from '@/router'
// 引入深拷貝
// @ts-ignore
import cloneDeep from 'lodash/cloneDeep'
function filterAsyncRoute(asyncRoute: any, routes: any) {
  return asyncRoute.filter((item: any) => {
    if (routes.includes(item.name)) {
      if (item.children && item.children.length > 0) {
        item.children = filterAsyncRoute(item.children, routes)
      }
      return true
    }
  })
}
// 創建小倉庫
const useUserStore = defineStore('User', {
  state: (): userState => {
    return {
      token: GET_TOKEN(),
      menuRoutes: constantRoute,
      username: '',
      avatar: '',
      buttons: [],
    }
  },
  actions: {
    // 用戶登入
    async userLogin(data: loginFormData) {
      const result: loginResponseData = await reqLogin(data)
      if (result.code === 200) {
        this.token = result.data as string
        SET_TOKEN(result.data as string)
        return 'ok'
      } else {
        return Promise.reject(new Error(result.data))
      }
    },
    //   獲取用戶訊息
    async userInfo() {
      const result: userInfoReponseData = await reqUserInfo()
      if (result.code === 200) {
        this.username = result.data.name
        this.avatar = result.data.avatar
        this.buttons = result.data.buttons

        let userAsyncRoute = filterAsyncRoute(
          cloneDeep(asyncRoute),
          result.data.routes,
        )

        this.menuRoutes = [...constantRoute, ...userAsyncRoute, anyRoute]

        let arr: any = [...userAsyncRoute, anyRoute]

        // 追加路由
        arr.forEach((route: any) => router.addRoute(route))

        return 'ok'
      } else {
        return Promise.reject(new Error(result.message))
      }
    },
    //   用戶登出
    async userLogout() {
      const result: any = await reqLogout()
      if (result.code === 200) {
        this.token = ''
        this.username = ''
        this.avatar = ''
        REMOVE_TOKEN()
        return 'ok'
      } else {
        return Promise.reject(new Error(result.message))
      }
    },
  },
  getters: {},
})

export default useUserStore
