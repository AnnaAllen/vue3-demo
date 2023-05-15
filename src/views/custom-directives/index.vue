<template>
  自定义指令控制按钮的展示和消失
  <hr>
  <button v-has-show="'BUT_A'">BUT_A</button>
  <button v-has-show="'BUT_B'">BUT_B</button>
  <button v-has-show="'BUT_C'">BUT_C</button>
  <br/>
  <br/>

  自定义指令控制方块的拖动
  <hr>
  <div class="move-box" v-move>
    <div class="move-box-header">
      can tough to move
    </div>
    div can move
  </div>
  <br/>
  <br/>

  图片懒加载
  <hr>
  <!-- <img v-lazy alt=""> -->
  <img alt="" v-for="(item, index) in pic_list" :key="index" v-lazy="item" style="height: 400px; width: 300px;">

</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import type { Directive, DirectiveBinding} from 'vue'



// 按钮的展示和消失
const authority = ['BUT_A', 'BUT_B', 'BUT_C']
const vHasShow:Directive<HTMLElement, string> = (el, bingding) => {
  el.style.display = authority.includes(bingding.value) ? 'unset' : 'none'
}

// 方块的拖动
const vMove:Directive<HTMLElement, string> = (el:HTMLElement, bingding:DirectiveBinding) => {
  let moveElement:HTMLDivElement = el.firstElementChild as HTMLDivElement
  
  const mouseDown = () => {
    const move = (e: MouseEvent) => {
      el.style.left = e.clientX - 200 + 'px'
      el.style.top = e.clientY - 200 + 'px'
    }
    document.addEventListener('mousemove', move)
    document.addEventListener('mouseup', () => {
      document.removeEventListener('mousemove', move)
    })
  }
  moveElement.addEventListener('mousedown', mouseDown)
}

// 图片懒加载
/**
 * glob: 默认为懒加载引入，后面加一个{ eager: true }参数后为静态的模块引入
 */
const pic_list_obj = import.meta.glob('@/assets/test_pic/*.*', { eager: true })
let pic_list = Object.values(pic_list_obj).map((v:any) => v.default)
const def = '/src/assets/logo.svg'

let vLazy:Directive<HTMLImageElement, string> = async(el, bingding) => {
  el.src = def
  const observer = new IntersectionObserver((entries) => {
    if(entries[0].intersectionRatio > 0) {
      setTimeout(() => {
        el.src = bingding.value
        observer.unobserve(el)
      }, 1000)
    }
  })
  observer.observe(el)
}

console.log(pic_list, 'pic_list-------')

</script>

<style lang="scss" scoped>
.move-box {
  height: 100px;
  width: 200px;
  background-color: aquamarine;
  .move-box-header {
    width: 100%;
    height: 20px;
    background-color: bisque;
  }
}
</style>