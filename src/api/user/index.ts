import request from '@/utils/request.ts'
import type {
  loginForm,
  loginResponseData,
  userResponseData,
} from '@/api/user/type.ts'

// 統一管理API
enum API {
  LOGIN_URL = '/user/login',
  USERINFO_URL = '/user/info',
}

// 登入API
export const reqLogin = (data: loginForm) =>
  request.post<any, loginResponseData>(API.LOGIN_URL, data)
// 獲取用戶訊息
export const reqUserInfo = () =>
  request.get<any, userResponseData>(API.USERINFO_URL)
