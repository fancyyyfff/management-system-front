
<template>

<el-dialog v-model="state.forgetPasswordDialog"
    title="忘记密码"
    width="500">

    <!-- 忘记密码，输入账号和邮箱 -->
    <el-form class="login-form" :label-position="labelPosition" :rules="rules">
                  <!-- 表单的输入框 -->
        <el-form-item label="输入您的注册账号" prop="account">
          <el-input v-model="forgetData.account"  placeholder="输入您的注册账号"/>
        </el-form-item>
        <el-form-item label="输入您的个人邮箱" prop="email">
          <el-input v-model="forgetData.email"  placeholder="输入您的个人邮箱"/>
        </el-form-item>
    </el-form>

    <template #footer>
      <div class="dialog-footer">
        <el-button @click="state.forgetPasswordDialog = false">取消</el-button>
        <el-button type="primary" @click="verifyAccount">
          下一步
        </el-button>
      </div>
    </template>
</el-dialog>


<!-- 修改密码 -->
<el-dialog v-model="state.changePasswordDialog"
    title="修改密码"
    width="500">

    <!-- 输入两次的密码 -->
    <el-form class="login-form" :label-position="labelPosition" :rules="rules">
                  <!-- 表单的输入框 -->
        <el-form-item label="输入您的密码" prop="password">
          <el-input v-model="forgetData.password"  placeholder="输入您的密码" show-password />
        </el-form-item>
        <el-form-item label="请再次输入您的密码" prop="repassword">
          <el-input v-model="forgetData.repassword"  placeholder="请再次输入您的密码" show-password />
        </el-form-item>
    </el-form>

    <template #footer>
      <div class="dialog-footer">
        <el-button @click="state.changePasswordDialog = false">取消</el-button>
        <el-button type="primary"  @click="resetPassword">
          确定
        </el-button>
      </div>
    </template>

</el-dialog>

</template>

<script setup lang="ts" name="ForgetPassword">
import { ref,reactive } from 'vue'
import {verify,reset} from '@/api/login'
// 对话框弹出的信息
import { ElMessage } from 'element-plus'

// import type { ComponentSize, FormInstance, FormRules } from 'element-plus'


const dialogVisible = ref(false)

// 让输入框的文字在上方
const labelPosition = ref<FormProps['labelPosition']>('top')

interface forgetDataT {
    account:string;
    email:string;
    password;
    repassword:string;
}
const forgetData:forgetDataT = reactive({
    account:'',
    email:'',
    password:'',
    repassword:''

})

// 表单校验规则：设置账号和邮箱都是必填项，否则就会提示信息
const rules = reactive({
  account: [
    { required: true, message: '请输入您的账号', trigger: 'blur' },
  ],
  email: [
    { required: true, message: '请输入您的邮箱', trigger: 'blur' },
  ],
})

// 设置对话框的初始状态为关闭
const state = reactive({
    forgetPasswordDialog:false,
    changePasswordDialog:false
})

// 验证账号和邮箱
// 在打开新对话框之前需要验证，如果成功，就可以下一步，否则中止
const verifyAccount = async ()=>{
  const res =await verify(forgetData)

// console.log(res)
  if(res.data.status==0){
    // 弹窗的信息
    ElMessage({
    message: '验证成功',
    type: 'success',
  })
  // 验证成功后，保存下后端传来的id,方便后面的修改密码的使用
  localStorage.setItem('id',res.data.id)
  // 两个对话框重叠，先关闭修改密码的对话框
  state.forgetPasswordDialog=false
  // 打开修改密码的弹窗
  state.changePasswordDialog=true
}else {
  ElMessage.error('验证失败')
}
}

// 修改密码
const resetPassword = async ()=>{

  const newPassword = forgetData.repassword
  if(forgetData.password!=forgetData.repassword){
    ElMessage.error('输入的两次密码不一致')
  }

  const res=await reset(localStorage.getItem("id"),newPassword)
  console.log(res)
    if(res.data.status==0){
      ElMessage({
    message: '修改成功',
    type: 'success',
    })
    }else {
    ElMessage.error('修改失败')
    } 
}

// 让对话框弹出来，只需要改变属性
const open = ()=>{
    state.forgetPasswordDialog=true
}

// 暴露open，另一个组件调用时可以让对话框弹出来
defineExpose({
    open
})


    
</script>

<style lang="scss" scoped>

</style>