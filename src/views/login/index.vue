<template>
  <div class="login">Login</div>
  <el-form 
    :model="form" 
    label-width="120px"
    ref="formInfo"
    :rules="rules"
  >
    <el-form-item label="Activity name" prop="userName">
      <el-input v-model="form.userName" />
    </el-form-item>
    <el-form-item label="password" prop="password">
      <el-input v-model="form.password" type="password" show-password/>
    </el-form-item>
    <el-form-item prop="agreement1">
      <el-checkbox v-model="form.agreement1" label="agreement"></el-checkbox>
    </el-form-item>
    <el-form-item prop="agreement2">
      <el-checkbox v-model="form.agreement2">
        <template v-slot:default >agreement2-default-slot</template>
      </el-checkbox>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit(formInfo)">Create</el-button>
      <el-button type="default" @click="resetForm(formInfo)">Reset</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'

// 表单使用的变量
const form = reactive({
  userName: '',
  password: '',
  agreement1: '',
  agreement2: '',
})

// interface form {
//   userName?: string,
//   password?: string,
//   agreement1?: boolean,
//   agreement2?: boolean
// }

// const form = reactive<form>({})

// 自定义表单校验
const formInfo = ref<FormInstance>() // 定义泛型为FormInstance的变量，FormInstance是从外部引入的库

const validateUserName = (rule: any, value: any, callback: any) => {
  if(value === '') {
    callback(new Error('用户名为必填'))
  }
  callback()
}

const validatePassword = (rule: any, value: any, callback: any) => {
  if(value === '') {
    callback(new Error('密码为必填'))
  }
  callback()
}

const validateAgreement1 = (rule: any, value: any, callback: any) => {
  console.log(typeof value, typeof form.agreement1,'validateAgreement--value------');
  if(!value) callback(new Error('请勾选协议'))
  callback()
}

const rules = reactive<FormRules>({
  userName: [{ validator: validateUserName, trigger: 'blur'}],
  password: [{ validator: validatePassword, trigger: 'blur'}],
  agreement1: [{ validator: validateAgreement1, trigger: 'change'}],
  agreement2: [{ validator: validateAgreement1, trigger: 'change'}]
})

// 提交表单
const onSubmit = (formEl: FormInstance | undefined) => {
  if(!formEl) return
  formEl.validate(valid => {
    if(!valid) return false
  })
}

// 重置
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}
</script>

<style lang="scss" scoped>
.login {
  font-size: 30px;
  text-align: center;
  margin-bottom: 12px;
}
</style>