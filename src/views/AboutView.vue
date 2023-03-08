<template>
  <div class="about">
    {{ userList }}
  </div>
</template>

<script setup lang="ts">
  import { useTodos } from '@/stores/todos'
  import  { storeToRefs } from 'pinia' 

  // * 使用storeToRefs()保证从store提取属性的响应性
  // * 可以直接从store解构action
  const store = useTodos()
  const { userList } = storeToRefs(store)
  const { getUserDataList } = store
  getUserDataList().then(() => {
    console.log(userList.value, 'userList------');
  }).catch(err => {
    console.log(err, 'err--------');
    
  })
  

</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
