import { defineStore } from 'pinia'
import { reqC1 } from '@/api/product/attr'
import type { CategoryResponseData } from '@/api/product/attr/type.ts'
import type { CategoryState } from '@/store/modules/types/type.ts'

let useCategoryStore = defineStore('Category', {
  state: (): CategoryState => {
    return {
      c1Arr: [],
      c1Id: '',
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
  },
  getters: {},
})

export default useCategoryStore
