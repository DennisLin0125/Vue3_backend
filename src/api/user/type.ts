// 登入API需要攜帶的參數類型
export interface loginForm {
  username: string
  password: string
}

interface dataType {
  token?: string
  message?: string
}

// 登入API返回數據類型
export interface loginResponseData {
  code: number
  data: dataType
}

interface userInfo {
  userId: number
  avatar: string
  username: string
  password: string
  desc: string
  roles: string[]
  buttons: string[]
  routes: []
  token: string
}

interface user {
  checkUser: userInfo
}
//定義服務器返回的數據類型
export interface userResponseData {
  code: number
  data: user
}
