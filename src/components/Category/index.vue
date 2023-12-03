<template>
  <el-card>
    <el-form inline="true">
      <el-form-item label="一級分類">
        <el-select v-model="categoryStore.c1Id" @change="handlerC1">
          <el-option
            v-for="c1 in categoryStore.c1Arr"
            :key="c1.id"
            :label="c1.name"
            :value="c1.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="二級分類">
        <el-select v-model="categoryStore.c2Id" @change="handlerC2">
          <el-option
            v-for="c2 in categoryStore.c2Arr"
            :key="c2.id"
            :label="c2.name"
            :value="c2.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="三級分類">
        <el-select v-model="categoryStore.c3Id" @change="handlerC3">
          <el-option
            v-for="c3 in categoryStore.c3Arr"
            :key="c3.id"
            :label="c3.name"
            :value="c3.id"
          />
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

const handlerC1 = () => {
  categoryStore.c2Id = ''
  categoryStore.c3Id = ''
  categoryStore.c3Arr = []
  categoryStore.getC2()
}

const handlerC2 = () => {
  categoryStore.c3Id = ''
  categoryStore.getC3()
}

const handlerC3 = () => {}
</script>

<style scoped lang="scss"></style>
