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
    <img v-if="userStore.imageUrl" :src="userStore.imageUrl" class="avatar" />
    <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
  </el-upload>
            
         </div>
      </div>

      <!-- 用户账号 -->
      <div class="account-infor-wrapped">
         <span>用户账号:</span>
         <div class="account-infor-content">
          <!-- 使用了 disabled 属性表示输入框不可修改,不能输入内容 -->
         <el-input v-model="userStore.account" disabled></el-input>
         </div>
         
      </div>

      <!-- 修改密码 -->
      <div class="account-infor-wrapped">
         <span>修改密码:</span>
         <div class="account-infor-content">
          <!-- 使用了 disabled 属性表示输入框不可修改,不能输入内容 -->
           <el-button type="primary" @click="openChangePassword">修改密码</el-button>       
         </div>        
      </div>


      <div class="account-infor-wrapped">
         <span>用户身份:</span>
         <div class="account-infor-content">
                <!-- 使用了 disabled 属性表示输入框不可修改,不能输入内容 -->
         <el-input v-model="userStore.identity" disabled></el-input>
         </div>   
      </div>

      <div class="account-infor-wrapped">
         <span>用户姓名:</span>
         <div class="account-infor-content">
           <!-- 使用了 disabled 属性表示输入框不可修改,不能输入内容 -->
         <el-input v-model="userStore.name" ></el-input>
        </div> 
         <div  class="account-save-buttont">
         <el-button type="primary" @click="saveName">保存</el-button>      
         </div>        
      </div>


      <div class="account-infor-wrapped">
         <span>用户性别:</span>
         <div class="account-infor-content">
          <el-select v-model="userStore.sex">
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
         <el-input v-model="userStore.department"
    disabled></el-input>
         </div>         
      </div>

      <div class="account-infor-wrapped">
         <span>用户邮箱:</span>
         <div class="account-infor-content">
         <el-input v-model="userStore.email" ></el-input>
        </div> 
         <div  class="account-save-buttont">
         <el-button type="primary">保存</el-button>         
         </div>        
      </div>
    </el-tab-pane>


    <el-tab-pane label="公司信息" name="second">

      <div class="account-infor-wrapped">
         <span>公司名称:</span>
         <div class="account-infor-content">
           <!-- 使用了 disabled 属性表示输入框不可修改,不能输入内容 -->
         <el-input v-model="companyName" ></el-input>
        </div> 
         <div  class="account-save-buttont">
         <el-button type="primary" @click="openEditor(1)">编辑公司名称</el-button>      
         </div>        
      </div>

      <div class="account-infor-wrapped">
         <span>公司介绍:</span>
         <div  class="account-save-buttont">
         <el-button type="success" @click="openEditor(2)">编辑公司介绍</el-button>      
         </div>        
      </div>

      <div class="account-infor-wrapped">
         <span>公司架构:</span>
         <div  class="account-save-buttont">
         <el-button type="success" @click="openEditor(3)">编辑公司架构</el-button>      
         </div>        
      </div>

      <div class="account-infor-wrapped">
         <span>公司战略:</span>
         <div  class="account-save-buttont">
         <el-button type="success" @click="openEditor(4)">编辑公司战略</el-button>      
         </div>        
      </div>

      <div class="account-infor-wrapped">
         <span>公司高层:</span>
         <div  class="account-save-buttont">
         <el-button type="success" @click="openEditor(5)">编辑公司高层介绍</el-button>      
         </div>        
      </div>
    </el-tab-pane>


    <el-tab-pane label="首页管理" name="third">
      <div class="home-wrapped">
        <div class="tips">
          <span>提示：点击图片切换轮播图</span>
        </div>

        <div class="swiper-wrapped" v-for="(item,index) in swiperData" :key="index">
          <div class="swiper-name">轮播图{{ index+1 }}:&nbsp;&nbsp;</div>
            
            <el-upload
    class="avatar-uploader"
    action="http://127.0.0.1:3007/set/uploadSwiper"
    :show-file-list="false"
    :on-success="handleSwiperSuccess"
    :before-upload="beforeAvatarUpload"
    :data="item"
  >
  <template #trigger >   
    <img v-if="imageUrl[index] && index >= 0 && index < imageUrl.length" :src="imageUrl[index]" class="swiper" />
    <img src="@/assets/images/cat1.jpeg" alt="" v-else>
  </template>
  </el-upload>
        </div>
      </div>
    </el-tab-pane>
    <el-tab-pane label="其他设置" name="fourth">Task</el-tab-pane>
  </el-tabs>
   </div>
</div>

<ChangePassword ref="changeP"></ChangePassword>
<Editor ref="editorP"></Editor>
 </template>
 
 <script setup lang="ts" name="">
 import  BreadCrumb  from "@/components/BreadCrumb.vue";
 import { compile, reactive, ref } from "vue";
import type { TabsPaneContext } from 'element-plus'
// 头像上传
import { ElMessage } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import type { UploadProps } from 'element-plus'
import {useUserInfo} from '@/store/userInfo'
import { bindAccount, changeName } from "@/api/userinfo";
import ChangePassword from "./components/ChangePassword.vue";
import  Editor  from "./components/Editor.vue";
import { bus } from "@/utils/mitt";
import { getCompanyName,changeCompanyName,getAllSwipers } from "@/api/setting";

const changeP=ref()
const editorP = ref()

// pinia的store
const userStore = useUserInfo()

// 面包屑
 const breadcrumb = ref()

 const item = ref({
    first:'系统设置'
 })


const activeName = ref('first')

// 公司信息
const companyName = ref()

// 一组轮播图的set_name
const swiperData = [{name:'swiper1'},{name:'swiper2'},{name:'swiper3'},{name:'swiper4'},{name:'swiper5'},{name:'swiper6'}]

const handleAvatarSuccess: UploadProps['onSuccess'] = (
  response,

) => {
  // 下面这一句是实现把图片渲染到页面的：
  // imageUrl.value = URL.createObjectURL(uploadFile.raw!)

  // pinia实现头像联动
  if(response.status==0) {
    userStore.$patch({
      imageUrl:response.url
    })
    ElMessage({
      message:"头像更新成功",
      type:'success'
    }),
    (async ()=>{
      const res=await bindAccount(userStore.account,response.onlyId,response.url)
      console.log("头像请求更新后的响应结果",res)
    })()
  }else {
      ElMessage.error('头像更新失败')
    }

  console.log(response)
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
// const AcccountDetailData = reactive({
//    account:'',
//    identity:'',
//    department:null,
//    name:'',
//    sex:'',
//    email:''
// })

const openChangePassword = ()=>{
  changeP.value.open()

}

const saveName = async ()=>{
  const res = await changeName(userStore.name,localStorage.getItem('id'))
  if(res.status==0) {
    ElMessage.success('修改成功')
  } else {
    ElMessage.error('修改失败')
  }

}

// 打开富文本编辑器的菜单
const openEditor = (id:number)=> {
  bus.emit('editorTitle',id)
  editorP.value.open()
}

// 获取公司名称
const getCompanyName1 = async ()=> {
  companyName.value = await getCompanyName()

}

getCompanyName1()
// 修改公司名称
const changeCompanyName1 = async ()=>{
  const res = await changeCompanyName(companyName.value)
  if(res.status==0) {
    ElMessage.success("修改成功")
  }else {
    ElMessage.error("修改失败")
  }
}

// 上传轮播图
const handleSwiperSuccess :UploadProps['onSuccess'] = (
  response,
) => {
  console.log("上传轮播图的结果",response)
  getAllSwipers1()
  // 以免再次刷新，获取成功后调用
  // if(response.status==0) {
    
  // }
}

// 获取所有轮播图：
// 轮播图的图片
const imageUrl = ref([])

// 获取所有轮播图
const getAllSwipers1 = async ()=>{
  imageUrl.value= await getAllSwipers()
}

// 调用,必须要调用，这样加载资源就会自动获取响应的资源
getAllSwipers1()

</script>
 
 <style lang="scss" scoped>

// 外壳
.common-wrapped {
   padding: 8px;
   background: #f5f5f5;
   // 计算：减去了头部和面包屑
   // 中间的-要用空格隔开两边-2*padding的值
  //  height: calc(100vh - 85px);
  height: calc(100vh - 101px);
   
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


      .home-wrapped {
        padding-left: 50px;
        display: flex;
        flex-direction: column;

        .tips {
          display: flex;
          align-items: center;
          margin-bottom: 8px;

          span {
            font-size: 14px;
            color: silver;
          }
        }

        .swiper-wrapped {
          display: flex;
          margin-bottom: 16px;

          .swiper-name {
            font-size: 14px;
            margin-bottom: 24px;
          }

          .swiper {
            width: 336px;
            height: 96px;
          }
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

.el-button {
  background-color: rgb(54, 129, 214);
  color: aliceblue;
}
</style>