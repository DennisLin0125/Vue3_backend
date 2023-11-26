import { defineStore } from 'pinia'
import { reqLogin } from '@/api/user'
// 引入數據類型
import type { loginForm } from '@/api/user/type.ts'
// 創建小倉庫
let useUserStore = defineStore('User', {
  state: () => {
    return {
      token: localStorage.getItem('TOKEN'),
    }
  },
  actions: {
    // 用戶登入
    async userLogin(data: loginForm) {
      let result = await reqLogin(data)
      if (result.code === 200) {
        this.token = result.data.token
        localStorage.setItem('TOKEN', this.token)
        return 'ok'
      } else {
        return Promise.reject(new Error(result.data.message))
      }
    },
  },
  getters: {},
})

export default useUserStore
