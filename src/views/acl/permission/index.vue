<template>
  <el-table
    style="width: 100%; margin-bottom: 20px"
    row-key="id"
    border
    :data="permissionArr"
  >
    <el-table-column label="名稱" prop="name" />
    <el-table-column label="權限值" prop="code" width="200" />
    <el-table-column label="修改時間" prop="updateTime" width="250" />
    <el-table-column label="操作" width="width">
      <template v-slot="{ row, $index }">
        <el-button
          @click="addPermission(row)"
          type="primary"
          icon="Plus"
          :disabled="row.level == 4"
        >
          {{ row.level == 3 ? '添加功能' : '添加菜單' }}
        </el-button>
        <el-button
          @click="updatePermission(row)"
          type="primary"
          icon="Edit"
          :disabled="row.level == 1"
        >
          編輯
        </el-button>
        <el-popconfirm
          width="260px"
          :title="`確定要刪除 ${row.name} ?`"
          @confirm="deletePermission(row.id)"
        >
          <template #reference>
            <el-button type="primary" icon="Delete" :disabled="row.level == 1">
              刪除
            </el-button>
          </template>
        </el-popconfirm>
      </template>
    </el-table-column>
  </el-table>
  <!--  添加數據-->
  <el-dialog
    v-model="dialogVisible"
    :title="menuData.id ? '更新菜單' : '添加菜單'"
  >
    <el-form label-width="80">
      <el-form-item label="名稱">
        <el-input placeholder="請輸入名稱" v-model="menuData.name" />
      </el-form-item>
      <el-form-item label="權限值">
        <el-input placeholder="請輸入權限" v-model="menuData.code" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="save">確定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts">
export default {
  name: 'Permission',
}
</script>

<script setup lang="ts">
import { onMounted, ref, reactive } from 'vue'
import {
  reqAllPermisstion,
  reqAddOrUpdateMenu,
  reqRemoveMenu,
} from '@/api/acl/menu'
import type {
  PermisstionList,
  PermisstionResponseData,
  Permisstion,
  MenuParams,
} from '@/api/acl/menu/type.ts'
import { ElMessage } from 'element-plus'

let permissionArr = ref<PermisstionList>([])
let dialogVisible = ref<boolean>(false)
let menuData = reactive<MenuParams>({
  id: 0,
  name: '',
  code: '',
  level: 0,
  pid: 0,
})

onMounted(() => {
  getHasPermission()
})

const getHasPermission = async () => {
  let res: PermisstionResponseData = await reqAllPermisstion()
  if (res.code === 200) {
    permissionArr.value = res.data
  }
}

const addPermission = (row: Permisstion) => {
  Object.assign(menuData, {
    id: 0,
    name: '',
    code: '',
    level: 0,
    pid: 0,
  })
  dialogVisible.value = true
  //   收集
  menuData.level = row.level + 1
  menuData.pid = row.id!
}

const updatePermission = (row: Permisstion) => {
  dialogVisible.value = true
  Object.assign(menuData, row)
}

const save = async () => {
  let res: any = await reqAddOrUpdateMenu(menuData)
  if (res.code === 200) {
    await getHasPermission()
    dialogVisible.value = false
    ElMessage({
      type: 'success',
      message: menuData.id ? '更新成功' : '添加成功',
    })
  } else {
    dialogVisible.value = false
    ElMessage({
      type: 'error',
      message: menuData.id ? '更新失敗' : '添加失敗',
    })
  }
}

const deletePermission = async (id: number) => {
  const res: any = await reqRemoveMenu(id)
  if (res.code === 200) {
    await getHasPermission()
    ElMessage({
      type: 'success',
      message: '刪除成功',
    })
  } else {
    ElMessage({
      type: 'success',
      message: '刪除失敗',
    })
  }
}
</script>

<style scoped lang="scss"></style>
