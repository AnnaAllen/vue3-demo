import { onMounted } from 'vue'

type Options = {
  el: any
}

export default function(options: Options): Promise<{base64Url:String}> {
  return new Promise((resolve) => {
    onMounted(() => {
      let img:HTMLImageElement = options.el._rawValue
      // 获取图片后缀
      let src:String = options.el._rawValue.__vnode.props.src
      let type:String = src.substr(src.lastIndexOf('.'))
      // console.log(options.el, type, 'img---------');
      img.onload = () => {
        resolve({base64Url: base64(img, type)})
      }
    })
    
    const base64 = (el: HTMLImageElement, type:String) => {
      const canvas = document.createElement('canvas')
      const cts = canvas.getContext('2d')
      canvas.width = el.width
      canvas.height = el.height
      cts?.drawImage(el, 0, 0, canvas.width, canvas.height)
      return canvas.toDataURL(`image/${type}`)
    }
  })
}