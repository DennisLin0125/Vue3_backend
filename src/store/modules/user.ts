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
