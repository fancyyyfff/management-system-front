<!-- 系统设置组件 -->
 <template>
<BreadCrumb ref="breadcrumb" :item="item"></BreadCrumb>
<div class="common-wrapped">
   <div class="common-content">
      <el-tabs v-model="activeName" class="demo-tabs">
    <el-tab-pane label="账号详情" name="first">
      
      <div class="account-infor-wrapped">
         <span>用户头像：</span>
         <div class="account-infor-content">
            <el-upload
    class="avatar-uploader"
    action="http://127.0.0.1:3007/user/uploadAvatar"
    :show-file-list="false"
    :on-success="handleAvatarSuccess"
    :before-upload="beforeAvatarUpload"
  >
    <img v-if="imageUrl" :src="imageUrl" class="avatar" />
    <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
  </el-upload>
            
         </div>
      </div>

      <!-- 用户账号 -->
      <div class="account-infor-wrapped">
         <span>用户账号:</span>
         <div class="account-infor-content">
          <!-- 使用了 disabled 属性表示输入框不可修改,不能输入内容 -->
         <el-input v-model="AcccountDetailData.account" disabled></el-input>
         </div>
         
      </div>

      <div class="account-infor-wrapped">
         <span>用户身份:</span>
         <div class="account-infor-content">
                <!-- 使用了 disabled 属性表示输入框不可修改,不能输入内容 -->
         <el-input v-model="AcccountDetailData.identity" disabled></el-input>
         </div>
   
      </div>

      <div class="account-infor-wrapped">
         <span>用户姓名:</span>
         <div class="account-infor-content">
           <!-- 使用了 disabled 属性表示输入框不可修改,不能输入内容 -->
         <el-input v-model="AcccountDetailData.name" ></el-input>
        </div> 
         <div  class="account-save-buttont">
         <el-button type="primary">保存</el-button>
         
         </div>        
      </div>


      <div class="account-infor-wrapped">
         <span>用户性别:</span>
         <div class="account-infor-content">
          <el-select v-model="AcccountDetailData.sex">
            <el-option label="男" value="man"></el-option>
            <el-option label="女" value="woman"></el-option>
          </el-select>
         </div> 
         <div  class="account-save-buttont">
         <el-button type="primary">保存</el-button>
         </div>       
      </div>

      <div class="account-infor-wrapped">
        <span>用户部门:</span>
        <div class="account-infor-content">
                <!-- 使用了 disabled 属性表示输入框不可修改,不能输入内容 -->
         <el-input v-model="AcccountDetailData.department"
    disabled></el-input>
         </div>         
      </div>

      <div class="account-infor-wrapped">
         <span>用户邮箱:</span>
         <div class="account-infor-content">
           <!-- 使用了 disabled 属性表示输入框不可修改,不能输入内容 -->
         <el-input v-model="AcccountDetailData.email" ></el-input>
        </div> 
         <div  class="account-save-buttont">
         <el-button type="primary">保存</el-button>
          
         </div>        
      </div>
    </el-tab-pane>
    <el-tab-pane label="公司信息" name="second">Config</el-tab-pane>
    <el-tab-pane label="首页管理" name="third">Role</el-tab-pane>
    <el-tab-pane label="其他设置" name="fourth">Task</el-tab-pane>
  </el-tabs>
   </div>
</div>
 </template>
 
 <script setup lang="ts" name="">
 import  BreadCrumb  from "@/components/BreadCrumb.vue";
 import { reactive, ref } from "vue";
import type { TabsPaneContext } from 'element-plus'
// 头像上传
import { ElMessage } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import type { UploadProps } from 'element-plus'

// 面包屑
 const breadcrumb = ref()

 const item = ref({
    first:'系统设置'
 })


const activeName = ref('first')

// 头像上传
const imageUrl = ref('')

const handleAvatarSuccess: UploadProps['onSuccess'] = (
  response,
  uploadFile
) => {
  imageUrl.value = URL.createObjectURL(uploadFile.raw!)
}

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (rawFile.type !== 'image/jpeg') {
    ElMessage.error('图像必须是 JPG 格式!')
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('头像必须小于2MB!')
    return false
  }
  return true
}

// 账号详情的三个输入框
const AcccountDetailData = reactive({
   account:'',
   identity:'',
   department:'',
   name:'',
   sex:'',
   email:''
})

</script>
 
 <style lang="scss" scoped>

// 外壳
.common-wrapped {
   padding: 8px;
   background: #f5f5f5;
   // 计算：减去了头部和面包屑
   // 中间的-要用空格隔开两边
   height: calc(100vh - 85px);
   
   // 内容
   .common-content {
      padding: 0 10px;
      height: 100%;
      background: #fff;

      .account-infor-wrapped {

         display: flex;
         align-items: center;
         padding-left: 50px;
         margin-bottom: 24px;
         font-size: 14px;

         .account-infor-content {
         margin-left: 24px;
         margin-right: 16px;
        }

        // 按钮
        .account-save-buttont {
          margin-left: 16px;
        }
      }

      
   }
}

 .demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}

.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
 </style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>