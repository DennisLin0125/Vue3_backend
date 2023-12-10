export interface ResponseData {
  code: number
  message: string
  ok: boolean
}
//職位資料型
export interface RoleData {
  id?: number
  createTime?: string
  updateTime?: string
  roleName: string
  remark?: null
}

//全部職位的陣列的ts類型
export type Records = RoleData[]
//全部職位資料的對應的ts類型
export interface RoleResponseData extends ResponseData {
  data: {
    records: Records
    total: number
    size: number
    current: number
    orders: []
    optimizeCountSql: boolean
    hitCount: boolean
    countId: null
    maxLimit: null
    searchCount: boolean
    pages: number
  }
}

//選單與按鈕資料的ts類型
export interface MunuData {
  id: number
  createTime: string
  updateTime: string
  pid: number
  name: string
  code: string
  toCode: string
  type: number
  status: null
  level: number
  children?: MenuList
  select: boolean
}
export type MenuList = MunuData[]

//選單權限與按鈕權限資料的ts類型
export interface MenuResponseData extends ResponseData {
  data: MenuList
}
