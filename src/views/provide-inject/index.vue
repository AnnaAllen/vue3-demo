<template>
  <div>
    <div>使用provide-inject传值</div>
    可选人物
    <el-radio-group v-model="activeRadio" @change="changeActiveRole">
      <el-radio v-for="item in roles" :key="item.id" :label="item.id">{{ item.name }}</el-radio>
    </el-radio-group>
    <br />
    <aaa :setValue="setValue"></aaa>
    <br />
    <bbb></bbb>
    <br />
    <ccc></ccc>
    <br />
    <br />

    <div>使用prop和emit</div>
    <aaa @aValue="aValue" :setValue="setValue"></aaa>
    <div>从子组件中收到的值 {{ getValue }}</div>
    <br />
    <br />

    <div>使用全局挂载的事件总线</div>
    <el-input v-model="setValueBus"></el-input>
    <el-button @click="patchEventToB">传递事件给组件b</el-button>
    <bbb></bbb>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, provide, inject, watch } from 'vue'
import { getCurrentInstance } from 'vue'
import aaa from '@/components/test/a.vue'
import bbb from '@/components/test/b.vue'
import ccc from '@/components/test/c.vue'

// 使用bus传递
const instance = getCurrentInstance()
const setValueBus = ref('')
const patchEventToB = () => {
  const val = setValueBus.value
  instance?.proxy?.$Bus.emit('but-click', val)
}

// 从子组件接收值
const getValue = ref('')
const aValue = (val: string) => {
  getValue.value = val
}

// 把值传给子组件
const setValue = ref('')

// 单选的角色
const activeRadio = ref<number>(1)

interface roles {
  name: string
  id: number
  desc?: string
}
const roles = reactive<roles[]>([
  { name: 'Lili', id: 1 },
  { name: 'Hiyori', id: 2 }
])

const name = ref<string | undefined>('')

// watch(() =>  activeRadio.value, (val) => {
//   name.value = roles.find(item => item.id === val)?.name
// })

const changeActiveRole = (val: number) => {
  name.value = roles.find((item) => item.id === val)?.name
}

// 选择角色后修改旗下的组件abc
/*
 * 使用readonly则inject无法反向改变provide
 * provide('name', readonly(name))
 */
provide('name', name)
</script>

<style lang="scss" scoped></style>
