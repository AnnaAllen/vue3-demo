
<template>
  <button @click="open = true">Open Modal</button>

  <!-- 1. Teleport 接收一个 to prop 来指定传送的目标; to 的值可以是一个 CSS 选择器字符串，也可以是一个 DOM 元素对象 -->
  <!-- 2. 禁用Teleport :disabled="true" 使用该属性后不会被挂载在其他地方 -->
  <!-- 3. 多个 <Teleport> 组件可以将其内容挂载在同一个目标元素上，而顺序就是简单的顺次追加 -->
  <Teleport to="body" :disabled="true">
    <Transition name="modal">
      <div v-if="open" class="modal-container">
        <p>Hello from the modal!</p>
        <button @click="open = false">Close</button>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
  import { ref, Transition } from 'vue'
  const open = ref(false)

</script>

<style scoped>
.modal-container {
  background-color: aquamarine;
  position: fixed;
  z-index: 999;
  top: 20%;
  left: 50%;
  width: 300px;
  margin-left: -150px;
  transition: all 0.3s ease;
}
.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>