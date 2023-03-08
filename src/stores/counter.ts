// import { ref, reactive, computed } from 'vue'
// import { defineStore, storeToRefs } from 'pinia'
// import { axios } from '@/server/axios'

// export const useCounterStore = defineStore('counter', () => {
//   const count = ref(0)
//   const doubleCount = computed(() => count.value * 2)
//   function increment() {
//     count.value++
//   }


//   // let test = reactive([])
//   // interface testData {
//   //   data: {
//   //     name: string,
//   //     age: number,
//   //     url: string,
//   //     desc: string
//   //   }
//   // }
//   let getTestData = async() => {
//     let test = await axios.get('./skeletonTestData.json')
//     return test
//   }

//   return { count, doubleCount, increment, getTestData }
// })

// stores/counter.js
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
  state: () => {
    return { count: 0 }
  },
  // 也可以这样定义
  // state: () => ({ count: 0 })
  actions: {
    increment() {
      this.count++
    },
  },
})
