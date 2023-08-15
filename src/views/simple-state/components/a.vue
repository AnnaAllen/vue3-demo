<template>
  <div @click="store.increment">From A: {{ store.count }}</div>
</template>

<script lang="ts" setup>
import { store } from '@/stores/simple-state'
</script>

<style lang="scss" scoped></style>
