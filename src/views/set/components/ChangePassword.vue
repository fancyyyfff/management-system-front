<template>
<!-- 修改密码 -->
<el-dialog v-model="state.changePasswordDialog"
    title="修改密码"
    width="500">

    <!-- 输入两次的密码 -->
    <el-form class="login-form" :label-position="labelPosition" :rules="rules">
                  <!-- 表单的输入框 -->
        <el-form-item label="输入您的旧密码" prop="password">
          <el-input v-model="passwordData.oldPassword"  placeholder="输入您的旧密码" show-password />
        </el-form-item>
        <el-form-item label="输入您的新密码" prop="repassword">
          <el-input v-model="passwordData.newPassword"  placeholder="输入您的新密码" show-password />
        </el-form-item>
    </el-form>

    <template #footer>
      <div class="dialog-footer">
        <el-button @click="state.changePasswordDialog = false">取消</el-button>
        <el-button type="primary"  @click="changeUserPassword">
          确定
        </el-button>
      </div>
    </template>

</el-dialog>
</template>

<script setup lang="ts" name="ChangePassword">

import { ref,reactive } from 'vue'
import {changePassword} from '@/api/userinfo'
// 对话框弹出的信息
import { ElMessage } from 'element-plus'
import { fa } from 'element-plus/es/locale';
import { useRouter } from "vue-router";
const router = useRouter()

// import type { ComponentSize, FormInstance, FormRules } from 'element-plus'


const dialogVisible = ref(false)

// 让输入框的文字在上方
const labelPosition = ref<FormProps['labelPosition']>('top')


interface passwordDataT {
    oldPassword:string;
    newPassword:string;
}
const passwordData:passwordDataT = reactive({
    oldPassword:'',
    newPassword:''
})

// 表单校验规则：设置账号和邮箱都是必填项，否则就会提示信息
const rules = reactive({
    oldPassword: [
    { required: true, message: '输入您的旧密码', trigger: 'blur' },
  ],
  newPassword: [
    { required: true, message: '输入您的新密码', trigger: 'blur' },
  ],
})

// 设置对话框的初始状态为关闭
const state = reactive({
    changePasswordDialog:false
})

// 让对话框弹出来，只需要改变属性
const open = ()=>{
    state.changePasswordDialog=true
}

const changeUserPassword = async ()=> {

  // 如果输入的新旧密码不为空，就发送请求调用
  if(passwordData.oldPassword&&passwordData.oldPassword) {
    const res = await changePassword(passwordData.oldPassword,passwordData.newPassword,localStorage.getItem('id'))
    if(res.status==0) {
      // 修改成功后先关闭弹窗
      state.changePasswordDialog=false
      // 接着弹出修改成功的消息
      ElMessage.success('修改成功')
      // 然后跳转到登录成功的页面
      router.push('/login')
    }
  }else {
    ElMessage.error('请检查输入的数据')
  }

}

// 暴露open，另一个组件调用时可以让对话框弹出来
defineExpose({
    open
})
</script>

<style scoped>

</style>