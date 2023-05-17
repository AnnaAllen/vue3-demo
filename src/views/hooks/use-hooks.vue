<!-- 
  自定义hooks
  1. 对标vue2中的minix，
  2. hooks返回一个方法，不会造成变量重叠和生命周期渲染dom混乱
 -->
<template>
  <div>
    <img ref="useToChangeBase64" src="@/assets/test_pic/eee.png" alt="">
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import useChangeToBase64 from '@/hooks/useChangeToBase64'

const useToChangeBase64 = ref(null)

useChangeToBase64({
  el: useToChangeBase64
}).then(res => {
  console.log(res, 'res--------');
  
})
</script>

<style scoped>

</style>