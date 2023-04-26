<template>
  <div>
    测试组件c
    <div>从上级组件中获得 {{ name }}</div>
    <el-button @click="changeParentRole">修改上级组件的角色</el-button>
  </div>
</template>

<script setup lang="ts">
import {ref, provide, inject} from 'vue'
import type { Ref } from 'vue'
const name = inject<Ref<string>>('name')

const changeParentRole = () => {
  name!.value = 'Lili'
}
</script>

<style scoped>

</style>