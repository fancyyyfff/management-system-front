<!-- 系统设置组件 -->
 <template>
<BreadCrumb ref="breadcrumb" :item="item"></BreadCrumb>
<div class="common-wrapped">
   <div class="common-content">
      <el-tabs v-model="activeName" class="demo-tabs">
    <el-tab-pane label="账号详情" name="first">User</el-tab-pane>
    <el-tab-pane label="公司信息" name="second">Config</el-tab-pane>
    <el-tab-pane label="首页管理" name="third">Role</el-tab-pane>
    <el-tab-pane label="其他设置" name="fourth">Task</el-tab-pane>
  </el-tabs>
   </div>
</div>
 </template>
 
 <script setup lang="ts" name="">
 import  BreadCrumb  from "@/components/BreadCrumb.vue";
 import { ref } from "vue";
import type { TabsPaneContext } from 'element-plus'
 const breadcrumb = ref()

 const item = ref({
    first:'系统设置'
 })


const activeName = ref('first')

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
   }
}


 .demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
 </style>