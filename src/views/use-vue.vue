<template>
  <div>
    Ask a yes/no question:
    <input v-model="question" :disabled="loading" />
    <p>{{ answer }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
const question = ref('')
const answer = ref('Questions usually contain a question mark. ;-)')
const loading = ref(false)

watch(question, async (newVal, oldVal) => {
  if(newVal.includes('?')) {
    loading.value = true
    answer.value = 'Thinking。。。'
    try {
      const res = await fetch('https://yesno.wtf/api')
      answer.value = (await res.json()).answer
    } catch (error) {
      answer.value = 'error! could not reach the API.' + error
    } finally {
      loading.value = false
    }
  }
})

const x = ref(0)
const y = ref(0)

watch(x, newX => {})
watch(
  () => x.value + y.value,
  (sum) => {}
)
watch([x, () => y.value], ([newX, newY]) => {})
</script>

<style lang="scss" scoped>

</style>