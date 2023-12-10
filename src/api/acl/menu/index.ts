import request from '@/utils/request'
import type { PermisstionResponseData, MenuParams } from './type'
//枚舉位址
enum API {
  //取得全部選單與按鈕的標識數據
  ALLPERMISSTION_URL = '/admin/acl/permission',
  //為某一級選單新增一個子選單
  ADDMENU_URL = '/admin/acl/permission/save',
  //更新某一個已有的選單
  UPDATE_URL = '/admin/acl/permission/update',
  //刪除已有的選單
  DELETEMENU_URL = '/admin/acl/permission/remove/',
}
//取得選單數據
export const reqAllPermisstion = () =>
  request.get<any, PermisstionResponseData>(API.ALLPERMISSTION_URL)
//新增與更新選單的方法
export const reqAddOrUpdateMenu = (data: MenuParams) => {
  if (data.id) {
    return request.put<any, any>(API.UPDATE_URL, data)
  } else {
    return request.post<any, any>(API.ADDMENU_URL, data)
  }
}

//刪除某一個已有的選單
export const reqRemoveMenu = (id: number) =>
  request.delete<any, any>(API.DELETEMENU_URL + id)
