/*
 * XMLHttpRequest 是浏览器api 用于和服务端交换数据
 */

const axios =  {
  get<T>(url: string): Promise<T> {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest()
      // 建立连接
      xhr.open('get', url)

      // 超时设置
      // xhr.timeout = 3000
      // xhr.ontimeout  = () => {
      //   ElMessage.error('请求超时')
      // }

      xhr.onreadystatechange = () => {
        setTimeout(() => {
          resolve(JSON.parse(xhr.responseText))
          // reject(new Error('43434'))
        }, 3000)
        // if(xhr.readyState == 4 && xhr.status == 200) {
        // }
      }

      // reject(new Error('43434'))

      xhr.send(null)
    })
  }
}

export { axios }