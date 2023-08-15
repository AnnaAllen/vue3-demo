<template>
  <div>test =============</div>
  <div class="big-box" ref="line" @scroll="getScrollTop">
    <div class="height-box" ref="height">
      <div class="box" v-for="item in 100" :key="item">{{ item }}</div>
    </div>
  </div>
  <div class="line" @mousedown="mousedownLine" ref="progressBar">
    <div
      class="main-line"
      :style="{
        width: `${lineWidth}%`
      }"
    />
    <div class="cicle" :style="{ left: `${left}px` }" @mousedown="mousemoveCicle"></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useEventListener } from '@vueuse/core'

/**
 * 1. 获取滚动条滚动的距离相对高度的百分比
 * 2. 计算进度条步进的长度
 */
let lineWidth = ref(0)
let left = ref(0)
const line = ref<HTMLDivElement>()
const height = ref<HTMLDivElement>()
const progressBar = ref<HTMLDivElement>()
const bodyElement = document.querySelector('body')

const getScrollTop = () => {
  const divHeight = height.value && height.value.offsetHeight
  if (!divHeight || !progressBar.value) return
  lineWidth.value = line.value ? (line.value.scrollTop / divHeight) * 100 : 0
  left.value = (lineWidth.value * progressBar.value.offsetWidth) / 100 - 10
}

// 进度条中鼠标按下
const mousedownLine = (e: MouseEvent) => {
  console.log(e, e.clientX, '鼠标按下')
  left.value = e.clientX - 40
}

// 进度条圆点中鼠标按下
let mousemoveEvent = ref<Function>(() => {})
const mousemoveCicle = (e: MouseEvent) => {
  const divHeight = height.value && height.value.offsetHeight
  // 注册鼠标移动监听事件
  mousemoveEvent.value = useEventListener(bodyElement, 'mousemove', (evt: MouseEvent) => {
    if (!height.value) return
    // 使用offsetX会出现抖动
    if (evt.clientX > 0 && progressBar.value && divHeight && line.value) {
      left.value =
        evt.clientX - 40 > progressBar.value.offsetWidth - 10
          ? progressBar.value.offsetWidth - 20
          : evt.clientX - 40 < 0
          ? 0
          : evt.clientX - 40
      // 进度条滑动距离
      lineWidth.value = ((left.value + 20) / progressBar.value.offsetWidth) * 100
      lineWidth.value = lineWidth.value > 100 ? 100 : lineWidth.value < 0 ? 0 : lineWidth.value
      // 滚动条滑动距离
      line.value.scrollTop = (lineWidth.value / 100) * divHeight
    }
  })
}

// 监听body中的鼠标抬起事件
const mouseupEvent = useEventListener(bodyElement, 'mouseup', (evt) => {
  // 注销鼠标移动监听事件
  console.log('鼠标抬起')
  mousemoveEvent.value()
})
</script>

<style scoped>
.big-box {
  height: 200px;
  overflow: auto;
  background-color: aliceblue;
  .box {
    background-color: rgb(175, 209, 239);
    /* margin: 10px; */
    display: flex;
    justify-content: center;
    border-radius: 5px;
  }
}
.line {
  background-color: aliceblue;
  width: 100%;
  height: 10px;
  margin: 20px 0px;
  .main-line {
    height: 100%;
    background-color: rgb(175, 209, 239);
    border-radius: 5px;
  }
  .cicle {
    height: 20px;
    width: 20px;
    background-color: aliceblue;
    border: 2px solid rgb(175, 209, 239);
    border-radius: 50%;
    position: relative;
    top: -15px;
  }
}
</style>
