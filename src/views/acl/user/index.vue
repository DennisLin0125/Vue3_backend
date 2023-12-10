<template>
  <el-card style="height: 75px">
    <el-form inline class="form">
      <el-form-item label="用戶名:">
        <el-input placeholder="請輸入用戶名" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary">搜索</el-button>
        <el-button>重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
  <el-card style="margin: 10px 0">
    <el-button type="primary">添加</el-button>
    <el-button type="danger">批量刪除</el-button>
    <el-table border style="margin: 10px 0">
      <el-table-column type="selection" width="80" align="center" />
      <el-table-column label="#" type="index" width="80" align="center" />
      <el-table-column label="ID" align="center" />
      <el-table-column label="用戶名字" align="center" />
      <el-table-column label="用戶名稱" align="center" />
      <el-table-column label="用戶角色" align="center" />
      <el-table-column label="創建時間" align="center" />
      <el-table-column label="更新時間" align="center" />
      <el-table-column label="操作" width="260" align="center">
        <template v-slot="{ row, $index }">
          <el-button type="primary" icon="">分配角色</el-button>
          <el-button type="info" icon="Edit">編輯</el-button>
          <el-button type="danger" icon="Delete">刪除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
  <el-pagination
    v-model:current-page="page"
    v-model:page-size="size"
    :page-sizes="[5, 7, 9, 11]"
    background
    layout="prev, pager, next, jumper,->, sizes,total"
    :total="total"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
  />
</template>

<script lang="ts">
export default {
  name: 'User',
}
</script>

<script setup lang="ts">
import { ref } from 'vue'
let page = ref<number>(1)
let size = ref<number>(5)
let total = ref<number>(10)
</script>

<style scoped lang="scss">
.form {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
