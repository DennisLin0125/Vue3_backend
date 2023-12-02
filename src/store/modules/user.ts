import { defineStore } from 'pinia'
import { reqLogin, reqUserInfo } from '@/api/user'
// 引入數據類型
import type { loginForm, loginResponseData } from '@/api/user/type.ts'
import type { userState } from '@/store/modules/types/type.ts'
// 引入本地存儲
import { SET_TOKEN, GET_TOKEN } from '@/utils/token.ts'
// 引入路由常量
import { constantRouter } from '@/router/routes.ts'
// 創建小倉庫
const useUserStore = defineStore('User', {
  state: (): userState => {
    return {
      token: GET_TOKEN(),
      menuRoutes: constantRouter,
      username: '',
      avatar: '',
    }
  },
  actions: {
    // 用戶登入
    async userLogin(data: loginForm) {
      const result: loginResponseData = await reqLogin(data)
      if (result.code === 200) {
        this.token = result.data.token as string
        SET_TOKEN(result.data.token as string)
        return 'ok'
      } else {
        return Promise.reject(new Error(result.data.message))
      }
    },
    //   獲取用戶訊息
    async userInfo() {
      const result = await reqUserInfo()
      if (result.code === 200) {
        this.username = result.data.checkUser.username
        this.avatar = result.data.checkUser.avatar
        return 'ok'
      } else {
        return Promise.reject(new Error(result.data.message))
      }
    },
  },
  getters: {},
})

export default useUserStore
