//這裡書寫屬性相關的API文件
import request from '@/utils/request'
import type { CategoryResponseData, AttrResponseData, Attr } from './type'
//屬性管理模組介面位址
enum API {
  //取得一級分類介面位址
  C1_URL = '/admin/product/getCategory1',
  //取得二級分類介面位址
  C2_URL = '/admin/product/getCategory2/',
  //取得三級分類介面位址
  C3_URL = '/admin/product/getCategory3/',
  //取得分類下已有的屬性與屬性值
  ATTR_URL = '/admin/product/attrInfoList/',
  //新增或修改已有的屬性的接口
  ADDORUPDATEATTR_URL = '/admin/product/saveAttrInfo',
  //刪除某一個已有的屬性
  DELETEATTR_URL = '/admin/product/deleteAttr/',
}

//取得一級分類的介面方法
export const reqC1 = () => request.get<any, CategoryResponseData>(API.C1_URL)
//取得二級分類的介面方法
export const reqC2 = (category1Id: number | string) =>
  request.get<any, CategoryResponseData>(API.C2_URL + category1Id)
//取得二級分類的介面方法
export const reqC3 = (category2Id: number | string) =>
  request.get<any, CategoryResponseData>(API.C3_URL + category2Id)
//取得對應分類下已有的屬性與屬性值介面
export const reqAttr = (
  category1Id: string | number,
  category2Id: string | number,
  category3Id: string | number,
) =>
  request.get<any, AttrResponseData>(
    API.ATTR_URL + `${category1Id}/${category2Id}/${category3Id}`,
  )

//新增或修改已有的屬性接口
export const reqAddOrUpdateAttr = (data: Attr) =>
  request.post<any, any>(API.ADDORUPDATEATTR_URL, data)

//刪除某一個已有的屬性業務
export const reqRemoveAttr = (attrId: number) =>
  request.delete<any, any>(API.DELETEATTR_URL + attrId)