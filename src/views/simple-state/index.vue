<!-- ComponentA.vue -->
<template>
  <div>
    <aa :num="a"></aa>
    <bb :num="b"></bb>
    <el-radio-group v-model="radio">
      <el-radio :label="'a'">Option A</el-radio>
      <el-radio :label="'b'">Option B</el-radio>
    </el-radio-group>
    <el-button type="primary" @click="setFun()">{{ `向子组件${radio.toUpperCase()}传值：${random}` }}</el-button>
  </div>
</template>

<script setup lang="ts">
import aa from './components/a.vue'
import bb from './components/b.vue'
import {ref} from 'vue'

const radio = ref('a')
const random = ref(Math.round(Math.random()*100))
let a = ref(0)
let b = ref(0)

const setFun = () => {
  radio.value === 'a' ? a.value = random.value : b.value = random.value
  random.value = Math.round(Math.random()*100)
}
</script>

<style scoped lang="scss">
.el-radio-group {
  display: block;
}
</style>
