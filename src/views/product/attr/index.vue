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
                @click="updateAttr(row)"
                type="warning"
                icon="Edit"
                size="small"
              />
              <el-popconfirm
                @confirm="deleteAttrValue(row.id)"
                width="250px"
                :title="`你確定要刪除 ${row.attrName} ?`"
              >
                <template #reference>
                  <el-button type="danger" icon="Delete" size="small" />
                </template>
              </el-popconfirm>
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
                @blur="toLook(row, $index)"
                v-if="row.flag"
                placeholder="請輸入屬性值名稱"
                v-model="row.valueName"
                :ref="(vc: any) => (inputArr[$index] = vc)"
              />
              <div @click="toEdit(row, $index)" v-else>
                <span>{{ row.valueName }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="屬性值操作">
            <template v-slot="{ row, $index }">
              <el-button
                @click="deleteAttr(row, $index)"
                type="danger"
                icon="Delete"
                size="small"
              />
            </template>
          </el-table-column>
        </el-table>

        <el-button
          @click="save"
          :disabled="attrParams.attrValueList.length <= 0"
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
import { watch, ref, reactive, nextTick, onBeforeUnmount } from 'vue'
import { reqAttr, reqAddOrUpdateAttr, reqRemoveAttr } from '@/api/product/attr'
import useCategoryStore from '@/store/modules/category.ts'
import type {
  AttrResponseData,
  Attr,
  AttrValue,
} from '@/api/product/attr/type.ts'
import { ElMessage } from 'element-plus'
import '@/views/product/attr/index.vue'

let categoryStore = useCategoryStore()
let attrArr = ref<Attr[]>([])
let scene = ref<number>(0)
let inputArr = ref<any>([])
let attrParams = reactive<Attr>({
  attrName: '',
  attrValueList: [],
  categoryId: '',
  categoryLevel: 3,
})

onBeforeUnmount(() => {
  categoryStore.$reset()
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

const updateAttr = (row: Attr) => {
  scene.value = 1
  // 深拷貝
  Object.assign(attrParams, JSON.parse(JSON.stringify(row)))
}

const cancel = () => {
  scene.value = 0
}

const addAttrValue = () => {
  attrParams.attrValueList.push({
    valueName: '',
    flag: true,
  })
  //   獲取最後一個input組件
  nextTick(() => {
    inputArr.value[attrParams.attrValueList.length - 1].focus()
  })
}

const save = async () => {
  const result = await reqAddOrUpdateAttr(attrParams)
  if (result.code === 200) {
    await getAttr()
    ElMessage({
      type: 'success',
      message: '添加成功',
    })
    scene.value = 0
  } else {
    scene.value = 0
    ElMessage({
      type: 'error',
      message: '添加失敗',
    })
  }
}

const toLook = (row: AttrValue, $index: number) => {
  if (row.valueName.trim() === '') {
    // 刪除對應屬性為空的元素
    attrParams.attrValueList.splice($index, 1)
    ElMessage({
      type: 'error',
      message: '屬性值名稱不能為空',
    })
    return
  }
  // 判斷是否重複
  let result = attrParams.attrValueList.find((item) => {
    // 排除自己以外的
    if (item !== row) {
      return item.valueName === row.valueName
    }
  })

  if (result) {
    // 刪除對應屬性為空的元素
    attrParams.attrValueList.splice($index, 1)

    ElMessage({
      type: 'error',
      message: '屬性值不能重複',
    })
    return
  }
  row.flag = false
}

const toEdit = (row: AttrValue, $index: number) => {
  row.flag = true
  nextTick(() => {
    inputArr.value[$index].focus()
  })
}

const deleteAttr = (row: AttrValue, $index: number) => {
  attrParams.attrValueList.splice($index, 1)
}

const deleteAttrValue = async (attrId: number) => {
  const result: any = await reqRemoveAttr(attrId)
  if (result.code === 200) {
    await getAttr()
    ElMessage({ type: 'success', message: '刪除成功' })
  } else {
    ElMessage({ type: 'error', message: '刪除失敗' })
  }
}
</script>

<style scoped lang="scss"></style>
