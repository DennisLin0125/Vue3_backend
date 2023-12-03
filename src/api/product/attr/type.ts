//分類相關的資料ts類型
export interface ResponseData {
  code: number
  message: string
  ok: boolean
}

//分類ts類型
export interface CategoryObj {
  id: number | string
  name: string
  category1Id?: number
  category2Id?: number
}

//對應的分類介面傳回資料的類型
export interface CategoryResponseData extends ResponseData {
  data: CategoryObj[]
}

//屬性與屬性值的ts類型

//屬性值物件的ts類型
export interface AttrValue {
  id?: number
  valueName: string
  attrId?: number
  flag?: boolean
}
//儲存每一個屬性值的陣列類型
export type AttrValueList = AttrValue[]
//屬性物件
export interface Attr {
  id?: number
  attrName: string
  categoryId: number | string
  categoryLevel: number
  attrValueList: AttrValueList
}
//儲存每個屬性物件的陣列ts類型
export type AttrList = Attr[]
//屬性介面傳回的資料ts類型
export interface AttrResponseData extends ResponseData {
  data: Attr[]
}
