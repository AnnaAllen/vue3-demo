<template>
  <div>
    测试组件b
    {{ getValue }}
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { getCurrentInstance } from 'vue'
const instance = getCurrentInstance()
const getValue = ref<string>('')
instance?.proxy?.$Bus.on('but-click', (val) => {
  // console.log(val, 'val-----');
  getValue.value = val as string
})

</script>

<style scoped>

</style>