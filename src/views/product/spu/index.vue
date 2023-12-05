<template>
  <div>
    <Category :scene="scene" />
    <el-card style="margin: 10px 0">
      <el-button type="primary" icon="Plus">添加SPU</el-button>
      <el-table border style="margin: 10px 0">
        <el-table-column
          type="index"
          label="序號"
          width="80"
          align="center"
        ></el-table-column>
        <el-table-column label="SPU名稱"></el-table-column>
        <el-table-column label="SPU描述">
          <template v-slot="{ row, $index }"></template>
        </el-table-column>
        <el-table-column label="操作">
          <template v-slot="{ row, $index }">
            <el-button type="primary" icon="Plus" />
            <el-button type="warning" icon="Edit" />
            <el-button type="info" icon="Plus" />
            <el-button type="danger" icon="Delete" />
          </template>
        </el-table-column>
      </el-table>
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
  </div>
</template>

<script lang="ts">
export default {
  name: 'Spu',
}
</script>

<script setup lang="ts">
import { ref } from 'vue'
//場景的數據
let scene = ref<number>(0)
const page = ref(1)
const size = ref(3)
const total = ref(20)
</script>

<style scoped lang="scss"></style>
