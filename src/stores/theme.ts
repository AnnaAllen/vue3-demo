import { ref, watch } from 'vue'
import { defineStore } from 'pinia'

export const useThemeStore = defineStore('theme', () => {

  const theme = ref('light')

  const toggle = (val: string) => theme.value = val

  watch(theme, (newVal, oldVal) => {
    console.log(document.querySelector('html'), 'document.querySelector')
    
    document.querySelector('html')?.classList.remove(oldVal)
    document.querySelector('html')?.classList.add(newVal)
  })

  return { theme, toggle }
})