//資料型別定義
export interface ResponseData {
  code: number
  message: string
  ok: boolean
}
//選單資料與按鈕資料的ts類型
export interface Permisstion {
  id?: number
  createTime: string
  updateTime: string
  pid: number
  name: string
  code: null
  toCode: null
  type: number
  status: null
  level: number
  children?: PermisstionList
  select: boolean
}
export type PermisstionList = Permisstion[]
//選單介面傳回的資料類型
export interface PermisstionResponseData extends ResponseData {
  data: PermisstionList
}

//新增與修改選單所攜帶的參數的ts類型
export interface MenuParams {
  id?: number //ID
  code: string //權限數值
  level: number //幾級選單
  name: string //選單的名字
  pid: number //選單的ID
}
