<template>
  <el-card>
    <el-table border>
      <el-table-column type="index" label="序號" width="80" align="center" />
      <el-table-column label="名稱" width="150px" show-overflow-tooltip="..." />
      <el-table-column label="描述" width="150px" show-overflow-tooltip="..." />
      <el-table-column label="默認圖片" width="150px">
        <template v-slot="{ row, $index }">
          <img src="" alt="" style="width: 80px; height: 80px" />
        </template>
      </el-table-column>
      <el-table-column label="重量(g)" width="150px" />
      <el-table-column label="價格(元)" width="150px" />
      <el-table-column label="操作" fixed="right" width="width">
        <template v-slot="{ row, $index }">
          <el-button></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-model:current-page="page"
      v-model:page-size="size"
      :page-sizes="[10, 20, 30]"
      background
      layout="prev, pager, next, jumper, ->, sizes, total"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      style="margin: 10px 0"
    />
  </el-card>
</template>

<script lang="ts">
export default {
  name: 'Sku',
}
</script>

<script setup lang="ts">
import { ref } from 'vue'
let page = ref<number>(1)
let size = ref<number>(3)
let total = ref<number>(20)
</script>

<style scoped lang="scss"></style>
