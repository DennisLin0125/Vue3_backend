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
        <el-button type="primary" icon="Plus" :disabled="row.level == 4">
          {{ row.level == 3 ? '添加功能' : '添加菜單' }}
        </el-button>
        <el-button type="primary" icon="Edit" :disabled="row.level == 1">
          編輯
        </el-button>
        <el-button type="primary" icon="Delete" :disabled="row.level == 1">
          刪除
        </el-button>
      </template>
    </el-table-column>
  </el-table>
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
} from '@/api/acl/menu/type.ts'

let permissionArr = ref<PermisstionList>([])

onMounted(() => {
  getHasPermission()
})

const getHasPermission = async () => {
  let res: PermisstionResponseData = await reqAllPermisstion()
  if (res.code === 200) {
    permissionArr.value = res.data
  }
}
</script>

<style scoped lang="scss"></style>
