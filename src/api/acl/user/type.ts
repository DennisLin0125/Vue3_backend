//帳號資訊的ts類型
export interface ResponseData {
  code: number
  message: string
  ok: boolean
}
//代表一個帳號資訊的ts類型
export interface User {
  id?: number
  createTime?: string
  updateTime?: string
  username?: string
  password?: string
  name?: string
  phone?: null
  roleName?: string
}
//數組包含全部的使用者訊息
export type Records = User[]
//取得全部用戶資訊介面回傳的資料ts類型
export interface UserResponseData extends ResponseData {
  data: {
    records: Records
    total: number
    size: number
    current: number
    pages: number
  }
}

//代表一個職位的ts類型
export interface RoleData {
  id?: number
  createTime?: string
  updateTime?: string
  roleName: string
  remark: null
}
//全部職位的列表
export type AllRole = RoleData[]
//取得全部職位的介面回傳的資料ts類型
export interface AllRoleResponseData extends ResponseData {
  data: {
    assignRoles: AllRole
    allRolesList: AllRole
  }
}

//給使用者指派職位介面攜帶參數的ts類型
export interface SetRoleData {
  roleIdList: number[]
  userId: number
}
