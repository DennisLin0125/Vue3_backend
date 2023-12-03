import { defineStore } from 'pinia'
import { reqC1, reqC2, reqC3 } from '@/api/product/attr'
import type { CategoryResponseData } from '@/api/product/attr/type.ts'
import type { CategoryState } from '@/store/modules/types/type.ts'

let useCategoryStore = defineStore('Category', {
  state: (): CategoryState => {
    return {
      c1Arr: [],
      c1Id: '',
      c2Arr: [],
      c2Id: '',
      c3Arr: [],
      c3Id: '',
    }
  },
  actions: {
    async getC1() {
      let result: CategoryResponseData = await reqC1()
      if (result.code === 200) {
        this.c1Arr = result.data
        return 'ok'
      } else {
        return Promise.reject(new Error('failed'))
      }
    },
    async getC2() {
      const result: CategoryResponseData = await reqC2(this.c1Id)
      if (result.code === 200) {
        this.c2Arr = result.data
        return 'ok'
      } else {
        return Promise.reject(new Error('failed'))
      }
    },
    async getC3() {
      const result: CategoryResponseData = await reqC3(this.c2Id)
      if (result.code === 200) {
        this.c3Arr = result.data
        return 'ok'
      } else {
        return Promise.reject(new Error('failed'))
      }
    },
  },
  getters: {},
})

export default useCategoryStore
