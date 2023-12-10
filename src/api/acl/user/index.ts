//使用者管理模組的接口
import request from '@/utils/request'
import type {
  UserResponseData,
  User,
  AllRoleResponseData,
  SetRoleData,
} from './type'
//枚舉位址
enum API {
  //取得全部已有用戶帳號訊息
  ALLUSER_URL = '/admin/acl/user/',
  //新增一個新的使用者帳號
  ADDUSER_URL = '/admin/acl/user/save',
  //更新已有的使用者帳號
  UPDATEUSER_URL = '/admin/acl/user/update',
  //取得全部職位,目前帳號擁有的職位接口
  ALLROLEURL = '/admin/acl/user/toAssign/',
  //給已有的使用者指派角色接口
  SETROLE_URL = '/admin/acl/user/doAssignRole',
  //刪除某一個帳號
  DELETEUSER_URL = '/admin/acl/user/remove/',
  //批量刪除的介面
  DELETEALLUSER_URL = '/admin/acl/user/batchRemove',
}
//取得用戶帳號資訊的接口
export const reqUserInfo = (page: number, limit: number, username: string) =>
  request.get<any, UserResponseData>(
    API.ALLUSER_URL + `${page}/${limit}/?username=${username}`,
  )
//新增使用者與更新已有使用者的接口
export const reqAddOrUpdateUser = (data: User) => {
  //攜帶參數有ID更新
  if (data.id) {
    return request.put<any, any>(API.UPDATEUSER_URL, data)
  } else {
    return request.post<any, any>(API.ADDUSER_URL, data)
  }
}
//取得全部職位以及包含目前使用者的已有的職位
export const reqAllRole = (userId: number) =>
  request.get<any, AllRoleResponseData>(API.ALLROLEURL + userId)
//分配職位
export const reqSetUserRole = (data: SetRoleData) =>
  request.post<any, any>(API.SETROLE_URL, data)
//刪除某一個帳號的信息
export const reqRemoveUser = (userId: number) =>
  request.delete<any, any>(API.DELETEUSER_URL + userId)
//批量刪除的介面
export const reqSelectUser = (idList: number[]) =>
  request.delete(API.DELETEALLUSER_URL, { data: idList })
