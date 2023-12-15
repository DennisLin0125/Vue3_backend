<template>
  <el-card>
    <el-form inline class="header-class">
      <el-form-item label="職位搜索">
        <el-input placeholder="請輸入關鍵字" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary">搜索</el-button>
        <el-button>重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
  <el-card style="margin: 10px 0">
    <el-button type="primary" icon="Plus">添加角色</el-button>
    <el-table border style="margin: 10px 0">
      <el-table-column label="#" type="index" align="center" width="80" />
      <el-table-column label="id" align="center" width="80" />
      <el-table-column
        label="角色名稱"
        align="center"
        width="width"
        show-overflow-tooltip="..."
      />
      <el-table-column
        label="創建時間"
        align="center"
        width="width"
        show-overflow-tooltip="..."
      />
      <el-table-column
        label="更新時間"
        align="center"
        width="width"
        show-overflow-tooltip="..."
      />
      <el-table-column label="操作" width="260" align="center">
        <template v-slot="{ row, $index }">
          <el-button type="primary" icon="User">分配權限</el-button>
          <el-button type="info" icon="Edit">編輯</el-button>
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
      @current-change="handleCurrentChange"
    />
  </el-card>
</template>

<script lang="ts">
export default {
  name: 'Role',
}
</script>

<script setup lang="ts">
import { ref } from 'vue'
let page = ref<number>(1)
let size = ref<number>(3)
let total = ref<number>(10)
</script>

<style scoped lang="scss">
.header-class {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 50px;
}
</style>
