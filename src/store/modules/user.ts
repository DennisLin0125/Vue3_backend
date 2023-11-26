import { defineStore } from 'pinia'
import { reqLogin } from '@/api/user'
// 引入數據類型
import type { loginForm, loginResponseData } from '@/api/user/type.ts'
import type { userState } from '@/store/modules/types/type.ts'
// 引入本地存儲
import { SET_TOKEN, GET_TOKEN } from '@/utils/token.ts'
// 創建小倉庫
const useUserStore = defineStore('User', {
  state: (): userState => {
    return {
      token: GET_TOKEN(),
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
  },
  getters: {},
})

export default useUserStore
