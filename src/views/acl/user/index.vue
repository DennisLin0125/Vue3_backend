<template>
  <el-card style="height: 75px">
    <el-form inline class="form">
      <el-form-item label="用戶名:">
        <el-input placeholder="請輸入用戶名" v-model="keyword" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :disabled="!keyword" @click="search">
          搜索
        </el-button>
        <el-button @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
  <el-card style="margin: 10px 0">
    <el-button type="primary" @click="addUser">添加用戶</el-button>
    <el-button
      type="danger"
      :disabled="!selectIdArr.length"
      @click="deleteSelectUser"
    >
      批量刪除
    </el-button>
    <el-table
      border
      style="margin: 10px 0"
      :data="userArr"
      @selection-change="selectChange"
    >
      <el-table-column type="selection" width="80" align="center" />
      <el-table-column label="#" type="index" width="80" align="center" />
      <el-table-column prop="id" label="ID" align="center" />
      <el-table-column
        prop="username"
        label="用戶名字"
        align="center"
        width="100"
        show-overflow-tooltip="..."
      />
      <el-table-column
        prop="name"
        label="用戶名稱"
        align="center"
        width="200"
        show-overflow-tooltip="..."
      />
      <el-table-column
        prop="roleName"
        label="用戶角色"
        align="center"
        width="200"
        show-overflow-tooltip="..."
      />
      <el-table-column
        prop="createTime"
        label="創建時間"
        align="center"
        width="200"
      />
      <el-table-column
        prop="updateTime"
        label="更新時間"
        align="center"
        width="200"
      />
      <el-table-column label="操作" width="300" align="center" fixed="right">
        <template v-slot="{ row, $index }">
          <el-button
            @click="setRole(row)"
            type="primary"
            icon="User"
            size="small"
          >
            分配角色
          </el-button>
          <el-button
            type="info"
            icon="Edit"
            size="small"
            @click="updateUser(row)"
          >
            編輯
          </el-button>
          <el-popconfirm
            :title="`確定要刪除 ${row.username} ?`"
            width="250"
            @confirm="deleteUser(row.id)"
          >
            <template #reference>
              <el-button type="danger" icon="Delete" size="small">
                刪除
              </el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-model:current-page="page"
      v-model:page-size="size"
      :page-sizes="[3, 5, 10]"
      background
      layout="prev, pager, next, jumper,->, sizes,total"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="getHasUser"
    />
  </el-card>
  <!--  抽屜 用於添加新用戶-->
  <el-drawer v-model="drawer">
    <template #header>
      <h4>{{ userParams.id ? '更新用戶' : '添加用戶' }}</h4>
    </template>
    <template #default>
      <el-form :model="userParams" :rules="rules" ref="formRef">
        <el-form-item label="用戶姓名" prop="username">
          <el-input placeholder="請輸入名字" v-model="userParams.username" />
        </el-form-item>
        <el-form-item label="用戶暱稱" prop="name">
          <el-input placeholder="請輸入暱稱" v-model="userParams.name" />
        </el-form-item>
        <el-form-item label="用戶密碼" prop="password" v-if="!userParams.id">
          <el-input placeholder="請輸入密碼" v-model="userParams.password" />
        </el-form-item>
      </el-form>
    </template>
    <template #footer>
      <div style="flex: auto">
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="save">確定</el-button>
      </div>
    </template>
  </el-drawer>
  <!--  抽屜 用於分配角色-->
  <el-drawer v-model="drawer1">
    <template #header>
      <h4>分配角色</h4>
    </template>
    <template #default>
      <el-form>
        <el-form-item label="用戶姓名">
          <el-input v-model="userParams.username" disabled />
        </el-form-item>
        <el-form-item label="職位列表">
          <el-checkbox
            v-model="checkedAll"
            :indeterminate="isIndeterminate"
            @change="handleCheckAllChange"
          >
            全選
          </el-checkbox>
          <!--          顯示職位-->
          <el-checkbox-group v-model="userRole" @change="handleCheckedChange">
            <el-checkbox
              v-for="(role, index) in allRole"
              :key="index"
              :label="role"
            >
              {{ role.roleName }}
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
    </template>
    <template #footer>
      <div style="flex: auto">
        <el-button @click="drawer1 = false">取消</el-button>
        <el-button type="primary" @click="confirmRole">確定</el-button>
      </div>
    </template>
  </el-drawer>
</template>

<script lang="ts">
export default {
  name: 'User',
}
</script>

<script setup lang="ts">
import { ref, onMounted, reactive, nextTick } from 'vue'
import useLayoutSettingStore from '@/store/modules/setting.ts'
import {
  reqAddOrUpdateUser,
  reqUserInfo,
  reqAllRole,
  reqSetUserRole,
  reqRemoveUser,
  reqSelectUser,
} from '@/api/acl/user'
import type {
  UserResponseData,
  Records,
  User,
  AllRoleResponseData,
  AllRole,
  SetRoleData,
} from '@/api/acl/user/type.ts'
import { ElMessage } from 'element-plus'

let page = ref<number>(1)
let size = ref<number>(5)
let total = ref<number>(10)
let keyword = ref<string>('')
let userArr = ref<Records>([])
let drawer = ref<boolean>(false)
let drawer1 = ref<boolean>(false)
let userParams = reactive<User>({
  username: '',
  name: '',
  password: '',
})

let formRef = ref<any>()

onMounted(() => {
  getHasUser()
})

const getHasUser = async (pager = 1) => {
  page.value = pager
  let result: UserResponseData = await reqUserInfo(
    page.value,
    size.value,
    keyword.value,
  )
  if (result.code == 200) {
    total.value = result.data.total
    userArr.value = result.data.records
  }
}

const handleSizeChange = () => {
  getHasUser()
}

const addUser = () => {
  drawer.value = true
  // 清空數據
  Object.assign(userParams, {
    id: 0,
    username: '',
    name: '',
    password: '',
  })
  // 清除上一次錯誤訊息
  nextTick(() => {
    formRef.value.clearValidate('username')
    formRef.value.clearValidate('name')
    formRef.value.clearValidate('password')
  })
}

const updateUser = (row: User) => {
  drawer.value = true
  // 蒐集已有的數據
  Object.assign(userParams, row)
  // 清除上一次錯誤訊息
  nextTick(() => {
    formRef.value.clearValidate('username')
    formRef.value.clearValidate('name')
  })
}

const save = async () => {
  // 等待表單驗證是否成功
  await formRef.value.validate()

  let result: any = await reqAddOrUpdateUser(userParams)
  if (result.code === 200) {
    drawer.value = false
    // await getHasUser(userParams.id ? page.value : 1)
    ElMessage({
      type: 'success',
      message: userParams.id ? '更新成功' : '添加成功',
    })
    //   瀏覽器自動刷新
    window.location.reload()
  } else {
    drawer.value = false
    ElMessage({
      type: 'error',
      message: userParams.id ? '更新失敗' : '添加失敗',
    })
  }
}

const validatorUserName = (rule: any, value: any, callBack: any) => {
  if (value.trim().length >= 5) {
    callBack()
  } else {
    callBack(new Error('用戶名稱至少5位'))
  }
}

const validatorName = (rule: any, value: any, callBack: any) => {
  if (value.trim().length >= 5) {
    callBack()
  } else {
    callBack(new Error('用戶暱稱至少5位'))
  }
}

const validatorPassword = (rule: any, value: any, callBack: any) => {
  if (value.trim().length >= 6) {
    callBack()
  } else {
    callBack(new Error('用戶密碼至少6位'))
  }
}
const rules = {
  username: [{ required: true, trigger: 'blur', validator: validatorUserName }],
  name: [{ required: true, trigger: 'blur', validator: validatorName }],
  password: [{ required: true, trigger: 'blur', validator: validatorPassword }],
}

const cancel = () => {
  drawer.value = false
}

let checkedAll = ref<boolean>(false)
let isIndeterminate = ref<boolean>(true)
let allRole = ref<AllRole>([])
let userRole = ref<AllRole>([])

const setRole = async (row: User) => {
  Object.assign(userParams, row)
  let result: AllRoleResponseData = await reqAllRole(userParams.id!)
  if (result.code === 200) {
    allRole.value = result.data.allRolesList
    userRole.value = result.data.assignRoles
    drawer1.value = true
  }
}

const handleCheckAllChange = (val: boolean) => {
  userRole.value = val ? allRole.value : []
  isIndeterminate.value = false
}

const handleCheckedChange = (value: string[]) => {
  const checkedCount = value.length
  checkedAll.value = checkedCount === allRole.value.length
  isIndeterminate.value =
    checkedCount > 0 && checkedCount < allRole.value.length
}

const confirmRole = async () => {
  let data: SetRoleData = {
    userId: userParams.id!,
    roleIdList: userRole.value.map((item) => item.id!),
  }
  let result: any = await reqSetUserRole(data)
  if (result.code === 200) {
    drawer1.value = false
    await getHasUser(page.value)
    ElMessage({ type: 'success', message: '分配職務成功' })
  } else {
    ElMessage({ type: 'error', message: '分配職務失敗' })
  }
}

const deleteUser = async (userId: number) => {
  let result: any = await reqRemoveUser(userId)
  if (result.code === 200) {
    await getHasUser(userArr.value.length > 1 ? page.value : page.value - 1)
    ElMessage({ type: 'success', message: '刪除成功' })
  } else {
    ElMessage({ type: 'error', message: '刪除失敗' })
  }
}

let selectIdArr = ref<User[]>([])
// table複選框勾選的回調
const selectChange = (value: any) => {
  selectIdArr.value = value
}

const deleteSelectUser = async () => {
  let idList: any = selectIdArr.value.map((item) => item.id)
  let result: any = await reqSelectUser(idList)
  if (result.code === 200) {
    await getHasUser(page.value)
    ElMessage({ type: 'success', message: '批量刪除成功' })
  } else {
    ElMessage({ type: 'error', message: '批量刪除失敗' })
  }
}

const search = () => {
  getHasUser()
  keyword.value = ''
}

let layoutSettingStore = useLayoutSettingStore()
const reset = () => {
  layoutSettingStore.reflash = !layoutSettingStore.reflash
}
</script>

<style scoped lang="scss">
.form {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
