import { defineStore } from 'pinia'
import { axios } from '@/server/axios'

/*
 * Store 是用defineStore()定义的，组合式api规范将export出去的函数命名为use...
 * 第一个参数即id为必填，pinia使用id来连接store和devtools
 * 第二个参数可以接收 Setup对象或Option对象
 * 
 */

interface userInfo {
  name: string,
  id: number | string,
  age?: number
}

export const useTodos = defineStore('todos', {
  /*
   * 一般情况下pinia会自动推断出state的类型，但对一些复杂的state需要给它下断言 
   */
  state: () => {
    return {
      count: 0,
      // userList: [] as userInfo[]
      userList: [] as Array<userInfo>,
      user: null as userInfo | null
    }
  },
  getters: {
    // 接收第一个参数为state
    double: state => state.count * 2,
    // doublePlusOne: (): number => {
    //   return this.double + 1 // 箭头函数这里拿不到this
    // }
    // 返回类型必须明确设置，否则ts会报错
    doublePlusOne(): number {
      return this.double +1
    },
    getUserById: state => {
      return (userId: string | number) => state.userList.find(item => item.id === userId)
    }
  },
  actions: {
    increment() {
      this.count++
    },
    async getUserDataList() {
      try {
        const userList = await axios.get<userInfo>('./userInfo.json')
        this.userList = userList as unknown as userInfo[]
        return Promise.resolve()
      } catch(err) {
        return Promise.reject()
      }
    }
  }
})