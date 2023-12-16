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
          @click="addPermission"
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
        <el-button type="primary" icon="Delete" :disabled="row.level == 1">
          刪除
        </el-button>
      </template>
    </el-table-column>
  </el-table>
  <!--  添加數據-->
  <el-dialog v-model="dialogVisible" title="添加菜單">
    <el-form label-width="80">
      <el-form-item label="名稱">
        <el-input placeholder="請輸入名稱" />
      </el-form-item>
      <el-form-item label="權限值">
        <el-input placeholder="請輸入權限" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary">確定</el-button>
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
import { onMounted, ref } from 'vue'
import { reqAllPermisstion } from '@/api/acl/menu'
import type {
  PermisstionList,
  PermisstionResponseData,
  Permisstion,
} from '@/api/acl/menu/type.ts'

let permissionArr = ref<PermisstionList>([])
let dialogVisible = ref<boolean>(false)

onMounted(() => {
  getHasPermission()
})

const getHasPermission = async () => {
  let res: PermisstionResponseData = await reqAllPermisstion()
  if (res.code === 200) {
    permissionArr.value = res.data
  }
}

const addPermission = () => {
  dialogVisible.value = true
}

const updatePermission = (row: Permisstion) => {
  dialogVisible.value = true
}
</script>

<style scoped lang="scss"></style>
