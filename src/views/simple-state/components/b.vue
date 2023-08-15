<template>
  <div>this is B components, count is {{ store.count }}</div>
</template>

<script setup lang="ts">
import { store } from '@/stores/simple-state'
</script>

<style scoped></style>
