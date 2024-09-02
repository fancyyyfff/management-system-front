<template>
    <div class="common-layout">
      <el-container>
        <el-header class="header-wrapped">
            <div class="header-content">
                <h3>通用后台管理系统</h3>
                <span class="welcome">欢迎您的登录</span>
            </div>
        </el-header>
        <el-main>
          <div class="login-wrapped">
            <el-card class="box-card">
              <el-tabs v-model="activeName" class="demo-tabs" :stretch="true">
                <el-tab-pane label="登录" name="first">
                  <!-- 登录表单 -->
                  <el-form class="login-form">
                  <!-- 表单的输入框 -->
                    <el-form-item label="账号">
                      <el-input v-model="loginData.account"  placeholder="请输入账号"/>
                    </el-form-item>
                    <el-form-item label="密码">
                      <el-input v-model="loginData.password"  placeholder="请输入密码" show-password />
                    </el-form-item>
                    <!-- 表单底部 -->
                    <div class="footer-wrapped">
                        <div class="forget-password">
                          <span class="forget-password-button" @click="openForget">
                            忘记密码
                          </span>
                        </div>
                        <!-- 按钮 -->
                         <div class="footer-button">
                          <!-- 使用el组件 -->
                          <el-button type="primary" @click="Login">登录</el-button>
                         </div>
                         <!-- 提醒注册 -->
                          <div class="footer-go-register">
                            还没有账号？<span class="go-register">马上注册</span>
                          </div>
                     </div>
                  </el-form>
                </el-tab-pane>


                <el-tab-pane label="注册" name="second">
                   <!-- 注册表单 -->
                    <!-- 注意这里的 
                     el-form class="login-form" 
                     绝对不能够改类名,
                     不然就会覆盖登录的表单,并且不会切标签页-->
                    <el-form class="login-form">
                     <!-- 表单的输入框 -->
                     <el-form-item label="账号">
                      <el-input v-model="registerData.account"  placeholder="账号长度6~12位"/>
                    </el-form-item>
                    <el-form-item label="密码">
                      <el-input v-model="registerData.password"  placeholder="密码需长度6~12位含字母数字"/>
                    </el-form-item>
                    <el-form-item label="确认密码">
                      <el-input v-model="registerData.repassword"  placeholder="请再次输入密码"/>
                    </el-form-item>

                     <!-- 按钮 -->
                     <div class="footer-button">
                          <!-- 使用el组件 -->
                          <el-button type="primary" @click="Register">注册</el-button>
                         </div>

                    </el-form>             
                </el-tab-pane>
              </el-tabs>
            </el-card>
          </div>
        </el-main>
        <el-footer class="footer-wrapped">
          <div class="footer-content">
            <div class="title">
              <span>享受当下</span>|
              <span>享受当下</span>|
              <span>享受当下</span>
            </div>
          </div>

        </el-footer>
      </el-container>
    </div>
    <ForgetPassword ref="forgetP"></ForgetPassword>
</template> 

<script setup lang="ts" name="Index">
import { ref,reactive} from 'vue'
import ForgetPassword from './components/ForgetPassword.vue';
import { register,login } from '@/api/login';
// 弹出提示消息
import { ElMessage } from 'element-plus'
import {useRouter} from 'vue-router'

const activeName = ref('first')
// 路由
const router =useRouter()


// 表单接口
interface formData {
  account: string;
  password: string;
  // 看实际情况，repassword可能用到可能用不到
  repassword?:string;
}

// 登录表单数据
const loginData : formData=  reactive({
  account:'',
  password:''
})
// 注册表单的数据
const registerData : formData=  reactive({
  account:'',
  password:'',
  repassword:''
})

// 登录
const Login = async ()=> {
  const res= await login(loginData)
  const {token} =res.data
  if(res.data.message=="登录成功") {
    ElMessage({
    message: '登录成功',
    type: 'success',
    plain: true,
  })
  // 登录后会返回token，需要保存下来
  localStorage.setItem('token',token)
  // 登录成功之后跳转到首页 
  router.push('/home')
}else {

  ElMessage({
    message: '注册失败',
    type: 'error',
    plain: true,
  })

}
}

// 注册
const Register = async ()=> {
  // 如果两次密码不一样就提示错误信息
  if(registerData.password!=registerData.repassword) {
    ElMessage({
    message: '注册失败',
    type: 'error',
    plain: true,
  })
  }

    const res =await register(registerData)
  // 如果成功，弹出成功消息
  if(res.data.message=='注册成功'){
    ElMessage({
    message: '注册成功',
    type: 'success',
    plain: true,
  })
  // 提示成功后，默认跳转到登录界面，只需要更改一个属性值
  activeName.value='first'
  }else {
    ElMessage({
    message: '注册失败',
    type: 'error',
    plain: true,
  })
  }


  
  

}

const forgetP = ref()
// 打开忘记密码弹窗
const openForget= ()=>{
  forgetP.value.open()
}

</script>

<style lang="scss" scoped>

.header-wrapped {
  .header-content {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .welcome {
      font-size:13px;
    }
  }
}

.el-main {
  background-image: url('@/assets/car.jpg');
  height: 600px;

  .login-wrapped {
    width: 1200px;
    height: 600px;
    margin:0 auto;

    .box-card {
      width: 350px;
      height: 375px;
      float: right;
      position: relative;
      top: 14%;

      .login-form {
        .footer-wrapped {
          display: flex;
          flex-direction: column;

          // 忘记密码，单独占一行，放到最右边
          .forget-password {
            display: flex;
            justify-content: flex-end;
            margin: 10px 0;

            // 忘记密码 ，这几个字设置为鼠标经过变成手
            .forget-password-button {
              font-size: 12px;
              color: #409eff;
              cursor: pointer;
            }
          }

          // 马上注册 居中 设置字体大小以及边距
          .footer-go-register {
            font-size: 12px;
            margin: 12px 0;
            display: flex;
            justify-content: center;

            // 马上注册的样式和忘记密码的一样
            .go-register {
              font-size: 12px;
              color: #409eff;
              cursor: pointer;
            }
           
          }
        }

        // 登录按钮设置居中
        // 因为登录的有footer-wrapped这一层级,而注册没有,
        //就按注册的来直接放在了login-form这个共同的类下
        // 但我还不能理解为什么.footer-button这个类
        // 跨越了footer-wrapped这一层级,
        // 却依然能够生效
        .footer-button {
            width: 100%;
            display: flex;
            justify-content: center;
          }
      }
    }
  }
}

.footer-wrapped {
  margin-top: 10px;

  .footer-content {
    width: 1200px;
    margin:0 auto;
    display: flex;
    justify-content: center;
    align-items: center;

    .title {
      color: #666;
    }

    span {
      color: #666;
      font-size: 12px;
    }
  }
}

// 输入框
.el-form {
  margin-top:30px;
}

:deep(.el-tabs_item){
  color: #333;
  font-size: 18px;
}

// 使得输入框里面的文字高度和输入框外面的文字对齐
// 设置框的高度和外面标签的高度一致，然后再给外框的行高设置一样的高度
:deep(.el-input__inner) {
  height: 40px;
}

:deep(.el-form-item__label){
  height: 40px;
  line-height: 40px;
}

// 登录按钮样式穿透
:deep(.el-button) {
  width: 300px;
  height: 45px;
  font-size: 16px;
}

</style>