<template>
  <div>
    <div>
      <Category :scene="scene" />
    </div>
    <el-card style="margin: 10px 0">
      <div v-show="scene == 0">
        <el-button
          @click="addAttr"
          type="primary"
          icon="Plus"
          :disabled="!categoryStore.c3Id"
        >
          添加屬性
        </el-button>
        <el-table border style="margin: 10px 0" :data="attrArr">
          <el-table-column
            type="index"
            label="序號"
            width="80"
            align="center"
          />
          <el-table-column prop="attrName" label="屬性名稱" width="120" />
          <el-table-column prop="bbb" label="屬性值名稱" width="width">
            <template #="{ row, $index }">
              <el-tag
                style="margin: 5px"
                type="primary"
                v-for="item in row.attrValueList"
                :key="item.id"
              >
                {{ item.valueName }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="120">
            <template #="{ row, $index }">
              <el-button
                @click="updateAttr"
                type="warning"
                icon="Edit"
                size="small"
              />
              <el-button type="danger" icon="Delete" size="small" />
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div v-show="scene == 1">
        <el-form inline>
          <el-form-item label="屬性名稱">
            <el-input placeholder="請輸入屬性名稱" />
          </el-form-item>
        </el-form>
        <el-button type="primary" icon="Plus">添加屬性值</el-button>
        <el-button @click="cancel">取消</el-button>

        <el-table border style="margin: 20px 0">
          <el-table-column
            type="index"
            label="序號"
            width="80"
            align="center"
          />
          <el-table-column label="屬性值"></el-table-column>
          <el-table-column label="操作"></el-table-column>
        </el-table>

        <el-button type="primary">保存</el-button>
        <el-button @click="cancel">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts">
export default {
  name: 'Attr',
}
</script>

<script setup lang="ts">
import Category from '@/components/Category/index.vue'
import { watch, ref } from 'vue'
import { reqAttr } from '@/api/product/attr'
import useCategoryStore from '@/store/modules/category.ts'
import type { AttrResponseData, Attr } from '@/api/product/attr/type.ts'

let categoryStore = useCategoryStore()
let attrArr = ref<Attr[]>([])
let scene = ref<number>(0)

watch(
  () => categoryStore.c3Id,
  () => {
    attrArr.value = []
    if (!categoryStore.c3Id) return
    getAttr()
  },
)
const getAttr = async () => {
  const { c1Id, c2Id, c3Id } = categoryStore
  let result: AttrResponseData = await reqAttr(c1Id, c2Id, c3Id)
  if (result.code === 200) {
    attrArr.value = result.data
  }
}

const addAttr = () => {
  scene.value = 1
}

const updateAttr = () => {
  scene.value = 1
}

const cancel = () => {
  scene.value = 0
}
</script>

<style scoped lang="scss"></style>
