<template>
  <div>
    测试组件a
    <slot></slot>
    <el-button @click="emitChangeValue">传值给父组件</el-button>
    <div>上级组件传下来的值 {{ setValue }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref, onActivated, onMounted, onUnmounted, onDeactivated } from 'vue'

// 给父组件传值
const emit = defineEmits(['aValue'])
const aValue = ref('aaaa')
const emitChangeValue = () => {
  emit('aValue', aValue)
}
// 接收父组件传来的值
type Props = {
  setValue: string
}
defineProps<Props>()



// * 在keep-alive中组件只会进行一次初始化，若有一次大量的请求则可以放在onMounted中
onMounted(() => {
  console.log('初始化');
  
})
// * 每次切换组件时都会调用该生命周期，每次都需要更新的请求可以放在onActivated中
onActivated(() => {
  console.log('keep-alive初始化');
  
})
onDeactivated(() => {
  console.log('keep-alive卸载');
  
})
onUnmounted(() => {
  console.log('卸载');
  
})
</script>

<style lang="scss" scoped>

</style>