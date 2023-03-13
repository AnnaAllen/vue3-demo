<template>
  <div>
    <!-- 11111 -->
    {{ isDark }}
  </div>
</template>

<script setup lang="ts">
import { useLocalStorage, useMouse, usePreferredDark } from '@vueuse/core'
const isDark = usePreferredDark()
// console.log(isDark, 'isDark-------');

const { x, y } = useMouse()
console.log( x.value, y.value, 'useMouse------');


</script>

<style lang="scss" scoped>

</style>