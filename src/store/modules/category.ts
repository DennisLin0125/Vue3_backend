import { defineStore } from 'pinia'
import { reqC1 } from '@/api/product/attr'

let useCategoryStore = defineStore('Category', {
  state: () => {
    return {
      c1Arr: [],
      c1Id: '',
    }
  },
  actions: {
    async getC1() {
      let result: any = await reqC1()
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
