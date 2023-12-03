<template>
  <el-card>
    <el-form inline="true">
      <el-form-item label="一級分類">
        <el-select v-model="categoryStore.c1Id">
          <el-option
            v-for="c1 in categoryStore.c1Arr"
            :key="c1.id"
            :label="c1.name"
            :value="c1.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="二級分類">
        <el-select>
          <el-option label="aaa"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="三級分類">
        <el-select>
          <el-option label="aaa"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script lang="ts">
export default {
  name: 'Category',
}
</script>

<script setup lang="ts">
import { onMounted } from 'vue'
import useCategoryStore from '@/store/modules/category.ts'

let categoryStore = useCategoryStore()

onMounted(() => {
  getC1()
})

const getC1 = () => {
  categoryStore.getC1()
}
</script>

<style scoped lang="scss"></style>
