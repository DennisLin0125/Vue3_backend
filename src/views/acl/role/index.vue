<template>
  <el-card>
    <el-form inline class="header-class">
      <el-form-item label="職位搜索">
        <el-input placeholder="請輸入關鍵字" v-model="keyword" />
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
    <el-button type="primary" icon="Plus" @click="addRole">添加職位</el-button>
    <el-table border style="margin: 10px 0" :data="allRole">
      <el-table-column label="#" type="index" align="center" width="80" />
      <el-table-column prop="id" label="id" align="center" width="80" />
      <el-table-column
        label="角色名稱"
        align="center"
        width="200"
        show-overflow-tooltip="..."
        prop="roleName"
      />
      <el-table-column
        label="創建時間"
        align="center"
        width="200"
        show-overflow-tooltip="..."
        prop="createTime"
      />
      <el-table-column
        label="更新時間"
        align="center"
        width="200"
        show-overflow-tooltip="..."
        prop="updateTime"
      />
      <el-table-column label="操作" width="width" align="center">
        <template v-slot="{ row, $index }">
          <el-button type="primary" icon="User" @click="setPermission(row)">
            分配權限
          </el-button>
          <el-button type="info" icon="Edit" @click="updateRole(row)">
            編輯
          </el-button>
          <el-button type="danger" icon="Delete">刪除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--    分頁器-->
    <el-pagination
      v-model:current-page="page"
      v-model:page-size="size"
      :page-sizes="[3, 5, 10]"
      background
      layout="prev, pager, next, jumper, ->, sizes, total"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="getHasRole"
    />
  </el-card>
  <!--  添加職位-->
  <el-dialog
    v-model="dialogTableVisible"
    :title="roleParams.id ? '更新職位' : '添加職位'"
  >
    <el-form :model="roleParams" :rules="rules" ref="form">
      <el-form-item label="職位名稱" prop="roleName">
        <el-input placeholder="請輸入職位名稱" v-model="roleParams.roleName" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="dialogTableVisible = false">取消</el-button>
      <el-button type="primary" @click="save">確定</el-button>
    </template>
  </el-dialog>
  <!--  分配職位-->
  <el-drawer v-model="drawer">
    <template #header>
      <h4>分配權限</h4>
    </template>
    <template #default>
      <el-tree
        ref="tree"
        :data="menuArr"
        show-checkbox
        default-expand-all
        node-key="id"
        highlight-current
        :props="defaultProps"
        :default-checked-keys="selectArr"
      />
    </template>
    <template #footer>
      <div style="flex: auto">
        <el-button @click="drawer = false">取消</el-button>
        <el-button type="primary" @click="handler">確認</el-button>
      </div>
    </template>
  </el-drawer>
</template>

<script lang="ts">
export default {
  name: 'Role',
}
</script>

<script setup lang="ts">
import { ref, onMounted, reactive, nextTick } from 'vue'
import {
  reqAllRoleList,
  reqAddOrUpdateRole,
  reqAllMenuList,
  reqSetPermisstion,
} from '@/api/acl/role'
import type {
  RoleResponseData,
  Records,
  RoleData,
  MenuResponseData,
  MenuList,
} from '@/api/acl/role/type.ts'
import useLayoutSettingStore from '@/store/modules/setting.ts'
import { ElMessage } from 'element-plus'

let page = ref<number>(1)
let size = ref<number>(3)
let total = ref<number>(10)
let keyword = ref<string>('')
let allRole = ref<Records>([])
let dialogTableVisible = ref<boolean>(false)
let drawer = ref<boolean>(false)

let roleParams = reactive<RoleData>({
  roleName: '',
})

let layoutSettingStore = useLayoutSettingStore()
let form = ref<any>()
let tree = ref<any>()

onMounted(() => {
  getHasRole()
})

const getHasRole = async (pager = 1) => {
  page.value = pager
  let res: RoleResponseData = await reqAllRoleList(
    page.value,
    size.value,
    keyword.value,
  )
  if (res.code === 200) {
    allRole.value = res.data.records
    total.value = res.data.total
  }
}

const handleSizeChange = () => {
  getHasRole()
}

const search = () => {
  getHasRole()
  keyword.value = ''
}

const reset = () => {
  layoutSettingStore.reflash = !layoutSettingStore.reflash
}

const addRole = () => {
  dialogTableVisible.value = true
  // 清空數據
  Object.assign(roleParams, {
    roleName: '',
    id: 0,
  })
  nextTick(() => {
    form.value.clearValidate()
  })
}

const updateRole = (row: RoleData) => {
  dialogTableVisible.value = true
  Object.assign(roleParams, row)
  nextTick(() => {
    form.value.clearValidate()
  })
}

const validatorRoleName = (rule: any, value: any, callback: any) => {
  if (value.trim().length > 2) {
    callback()
  } else {
    callback(new Error('字數需大於2位'))
  }
}

const rules = {
  roleName: [{ required: true, trigger: 'blur', validator: validatorRoleName }],
}

const save = async () => {
  await form.value.validate()
  let res: any = await reqAddOrUpdateRole(roleParams)
  if (res.code === 200) {
    dialogTableVisible.value = false
    await getHasRole(roleParams.id ? page.value : 1)
    ElMessage({
      type: 'success',
      message: roleParams.id ? '更新職位成功' : '添加職位成功',
    })
  } else {
    dialogTableVisible.value = false
    ElMessage({
      type: 'error',
      message: roleParams.id ? '更新職位失敗' : '添加職位失敗',
    })
  }
}

let menuArr = ref<MenuList>([])
let selectArr = ref<number[]>([])
const setPermission = async (row: RoleData) => {
  drawer.value = true
  //   收集數據
  Object.assign(roleParams, row)
  let res: MenuResponseData = await reqAllMenuList(roleParams.id!)
  if (res.code === 200) {
    menuArr.value = res.data
    selectArr.value = filterSelectArr(menuArr.value, [])
  }
}

const filterSelectArr = (allData: any, initArr: any) => {
  allData.forEach((item: any) => {
    if (item.select && item.level === 4) {
      initArr.push(item.id)
    }
    if (item.children && item.children.length > 0) {
      filterSelectArr(item.children, initArr)
    }
  })
  return initArr
}

const defaultProps = {
  children: 'children',
  label: 'name',
}

const handler = async () => {
  const roleId = roleParams.id

  const checkArr = tree.value.getHalfCheckedKeys()
  const checkArr1 = tree.value.getCheckedKeys()

  const permissionId = checkArr.concat(checkArr1)

  let res: any = await reqSetPermisstion(roleId!, permissionId)
  if (res.code === 200) {
    drawer.value = false
    ElMessage({ type: 'success', message: '新增職位成功' })
    window.location.reload()
  } else {
    drawer.value = false
    ElMessage({ type: 'error', message: '新增職位失敗' })
  }
}
</script>

<style scoped lang="scss">
.header-class {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 50px;
}
</style>
