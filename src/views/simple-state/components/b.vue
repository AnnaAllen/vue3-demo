<template>
  <div>B子：{{ num }}</div>
</template>

<script setup lang="ts">
import { store } from '@/stores/simple-state'
import {ref ,defineProps} from "vue"
const props = defineProps({
  num: Number
})
</script>

<style scoped></style>
