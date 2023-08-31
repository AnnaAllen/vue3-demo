<template>
  <div @click="store.increment">A子：{{ num }}</div>
</template>

<script lang="ts" setup>
import { store } from '@/stores/simple-state'
import {ref ,defineProps} from "vue"
const props = defineProps({
  num: Number
})

</script>

<style lang="scss" scoped></style>
