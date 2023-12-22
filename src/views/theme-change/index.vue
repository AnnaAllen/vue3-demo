<template>
  <div>
    <div class="container">
      <div>{{ theme }}</div>
      <el-button @click="() => toggle('light')">LIGHT</el-button>
      <el-button @click="() => toggle('dark')">DARK</el-button>
    </div>
    <div class="container">
      <el-select v-model="theme" full>
        <el-option value="light" label="LIGHT"></el-option>
        <el-option value="dark" label="DARK"></el-option>
      </el-select>
    </div>
    <div class="container">
      <el-switch
        v-model="theme"
        inactive-text="LIGHT"
        active-text="DARK"
        active-value="dark"
        inactive-value="light"
      ></el-switch>
    </div>
    <div class="container">
      <el-radio-group v-model="theme">
        <el-radio label="light">LIGHT</el-radio>
        <el-radio label="dark">DARK</el-radio>
      </el-radio-group>
    </div>
    <div class="container">
      <el-checkbox v-model="theme" false-label="light" true-label="dark" :label="theme" size="large" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useThemeStore } from '@/stores/theme'

const { toggle } = useThemeStore()
const { theme } = storeToRefs(useThemeStore())
</script>

<style>
.container {
  display: flex;
  flex-direction: row;
  text-align: center;
  align-items: center;
  justify-content: space-around;
}
</style>
