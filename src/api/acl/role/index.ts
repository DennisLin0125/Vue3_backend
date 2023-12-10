//角色管理模組的的接口
import request from '@/utils/request'
import type { RoleResponseData, RoleData, MenuResponseData } from './type'
//枚舉位址
enum API {
  //取得全部的職位接口
  ALLROLE_URL = '/admin/acl/role/',
  //新增崗位的介面位址
  ADDROLE_URL = '/admin/acl/role/save',
  //更新已有的職位
  UPDATEROLE_URL = '/admin/acl/role/update',
  //取得全部的選單與按鈕的數據
  ALLPERMISSTION = '/admin/acl/permission/toAssign/',
  //給予對應的職位分配權限
  SETPERMISTION_URL = '/admin/acl/permission/doAssign/?',
  //刪除已有的職缺
  REMOVEROLE_URL = '/admin/acl/role/remove/',
}
//取得全部的角色
export const reqAllRoleList = (page: number, limit: number, roleName: string) =>
  request.get<any, RoleResponseData>(
    API.ALLROLE_URL + `${page}/${limit}/?roleName=${roleName}`,
  )
//新增職位與更新已有職位接口
export const reqAddOrUpdateRole = (data: RoleData) => {
  if (data.id) {
    return request.put<any, any>(API.UPDATEROLE_URL, data)
  } else {
    return request.post<any, any>(API.ADDROLE_URL, data)
  }
}

//取得全部選單與按鈕權限數據
export const reqAllMenuList = (roleId: number) =>
  request.get<any, MenuResponseData>(API.ALLPERMISSTION + roleId)
//給對應的職位下發權限
export const reqSetPermisstion = (roleId: number, permissionId: number[]) =>
  request.post(
    API.SETPERMISTION_URL + `roleId=${roleId}&permissionId=${permissionId}`,
  )
//刪除已有的職缺
export const reqRemoveRole = (roleId: number) =>
  request.delete<any, any>(API.REMOVEROLE_URL + roleId)
