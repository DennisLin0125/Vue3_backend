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
            <template v-slot="{ row, $index }">
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
            <template v-slot="{ row, $index }">
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
            <el-input
              placeholder="請輸入屬性名稱"
              v-model="attrParams.attrName"
            />
          </el-form-item>
        </el-form>
        <el-button
          @click="addAttrValue"
          :disabled="!attrParams.attrName"
          type="primary"
          icon="Plus"
        >
          添加屬性值
        </el-button>
        <el-button @click="cancel">取消</el-button>

        <el-table
          border
          style="margin: 20px 0"
          :data="attrParams.attrValueList"
        >
          <el-table-column
            type="index"
            label="序號"
            width="80"
            align="center"
          />
          <el-table-column label="屬性值名稱">
            <template v-slot="{ row, $index }">
              <el-input
                placeholder="請輸入屬性值名稱"
                v-model="row.valueName"
              />
            </template>
          </el-table-column>
          <el-table-column label="屬性值操作">
            <template v-slot="{ row, $index }"></template>
          </el-table-column>
        </el-table>

        <el-button
          @click="save"
          :disabled="!attrParams.attrName"
          type="primary"
        >
          保存
        </el-button>
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
import { watch, ref, reactive } from 'vue'
import { reqAttr, reqAddOrUpdateAttr } from '@/api/product/attr'
import useCategoryStore from '@/store/modules/category.ts'
import type { AttrResponseData, Attr } from '@/api/product/attr/type.ts'
import { ElMessage } from 'element-plus'

let categoryStore = useCategoryStore()
let attrArr = ref<Attr[]>([])
let scene = ref<number>(0)
let attrParams = reactive<Attr>({
  attrName: '',
  attrValueList: [],
  categoryId: '',
  categoryLevel: 3,
})

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
  // 清空數據
  Object.assign(attrParams, {
    attrName: '',
    attrValueList: [],
    categoryId: categoryStore.c3Id,
    categoryLevel: 3,
  })
  scene.value = 1
}

const updateAttr = () => {
  scene.value = 1
}

const cancel = () => {
  scene.value = 0
}

const addAttrValue = () => {
  attrParams.attrValueList.push({
    valueName: '',
  })
}

const save = async () => {
  const result = await reqAddOrUpdateAttr(attrParams)
  if (result.code === 200) {
    scene.value = 0
    await getAttr()
    ElMessage({
      type: 'success',
      message: '添加成功',
    })
  } else {
    scene.value = 0
    ElMessage({
      type: 'error',
      message: '添加失敗',
    })
  }
}
</script>

<style scoped lang="scss"></style>
