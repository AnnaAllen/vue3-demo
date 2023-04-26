<template>
  <div>
    <!-- keep-alive -->
    <el-button @click="flag = !flag">切换组件</el-button>
    <!-- :include="['aaaa']" :exclude="['aaaa']" :max="1" -->
    <keep-alive>
      <aaaa v-if="flag" :set-value="'aaa'">
        <el-input v-model="aInput" placeholder="Please input" />
      </aaaa>
    </keep-alive>

    <br>

    <!-- transition -->
    <el-button @click="change = !change">切换</el-button>
    <transition
      name="fade"
      @before-enter="enterForm"
      @enter="enterActive"
      @after-enter="enterTo"
      @enter-cancelled="enterCancel"
      @before-leave="leaveForm"
      @leave="leave"
      @after-leave="leaveTo"
    >
      <bbbb class="bbbb" v-if="change">
        <el-input v-model="bInput" placeholder="Please input" />
      </bbbb>
    </transition>

    <br>

    <div>
      <el-button @click="random()">随机变换</el-button>
      <transition-group class="number-box" move-class="random" tag="div">
        <div class="number" v-for="item in list" :key="item.id">{{ item.number }}</div>
      </transition-group>
    </div>

    <br>

    <div>两个盒子交换位子动画</div>
    <el-button @click="changePosition">交换位置</el-button>
    <transition-group class="big-box" move-class="random" tag="div">
      <div class="box" v-for="item in box" :key="item.id">{{ item.name }}</div>
    </transition-group>

  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import _ from 'lodash'

import aaaa from '@/components/test/a.vue'
import bbbb from '@/components/test/b.vue'

// 两个盒子交换位置动画
const box = reactive([
  {
    name: 'Lili',
    id: 'Lili'
  },
  {
    name: 'Hiyori',
    id: 'Hiyori'
  }
])
const changePosition = () => {
  let aaa = box.splice(box.length-1, 1)
  box.splice(0, 0, ...aaa)
  console.log(aaa);
  
}

// 动画周期事件
const aInput = ref('')
const bInput = ref('')

const flag = ref<boolean>(true)
const change = ref<boolean>(true)

const enterForm = (el: Element) => {
  console.log('进入之前');
  
}
const enterActive = (el: Element, done:Function) => {
  console.log('过度曲线');
  setTimeout(() => {
    done()
  }, 3000)
  
}
const enterTo = (el: Element) => {
  console.log('过度完成');
  
}
const enterCancel = (el: Element) => {
  console.log('过度效果被打断');
  
}
const leaveForm = (el: Element) => {
  console.log('离开之前');
  
}
const leave = (el: Element) => {
  console.log('离开过度曲线');
  
}
const leaveTo = (el: Element) => {
  console.log('离开完成');
  
}

// 动画组
let list = ref(Array.apply(null, {length: 81} as number[]).map((_, index) => {
  return {
    id: index,
    number: (index % 9) + 1
  }
}))

const random = () => {
  list.value = _.shuffle(list.value)
  // console.log(list.value, 'list.value----');
  
}


</script>

<style scoped lang="scss">
.big-box {
  display: flex;
  .box:nth-child(1){
    width: 100px;
    height: 100px;
    background-color: aqua;
  }
  .box:nth-child(2){
    width: 100px;
    height: 100px;
    background-color: burlywood;
  }
}
.random {
  transition: 1s;
}
.number-box {
  display: flex;
  flex-wrap: wrap;
  width: calc(24px * 9);
}
.number {
  width: 24px;
  border: 1px solid pink;
  text-align: center;
}
.bbbb {
  background-color: pink;
  width: 400px;
  height: 100px;
}

.fade-enter-to,
.fade-leave-from {
  width: 400px;
  height: 100px;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  width: 0;
  height: 0;
}
</style>