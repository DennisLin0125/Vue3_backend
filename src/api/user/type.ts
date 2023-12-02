//定義使用者相關資料的ts類型
//使用者登入介面攜帶參數的ts類型
export interface loginFormData {
  username: string
  password: string
}

//定義全部介面回傳資料都擁有ts類型
export interface ResponseData {
  code: number
  message: string
  ok: boolean
}

//定義登入介面回傳資料類型
export interface loginResponseData extends ResponseData {
  data: string
}

//定義取得使用者資訊回傳資料類型
export interface userInfoReponseData extends ResponseData {
  data: {
    routes: string[]
    buttons: string[]
    roles: string[]
    name: string
    avatar: string
  }
}
