<template>
 <div class="common-layout">
    <el-container>
        <!-- 侧边的导航栏 -->
        <el-aside width="200px">
            <el-menu class="el-menu-vertical-demo" router>
                <div class="title">通用后台管理系统</div>
              <el-menu-item index="home">
                <el-icon><House /></el-icon>
               <span>首页</span>
              </el-menu-item>

              <el-menu-item index="2">
               <el-icon><location /></el-icon>
               <span>系统概述</span>
              </el-menu-item>

              <el-sub-menu index="3">
          <template #title>
            <el-icon><User /></el-icon>
            <span>用户管理</span>
          </template>

          <el-menu-item-group title="管理员管理">
            <el-menu-item index="3-1">产品管理员</el-menu-item>
            <el-menu-item index="3-2">用户管理员</el-menu-item>
            <el-menu-item index="3-3">消息管理员</el-menu-item>
          </el-menu-item-group>

          <el-menu-item-group title="员工管理">
            <el-menu-item index="3-4">用户列表</el-menu-item>
          </el-menu-item-group>
          
        </el-sub-menu>
            

            <el-sub-menu index="4">
          <template #title>
            <el-icon><TakeawayBox /></el-icon>
            <span>产品管理</span>
          </template>
          <el-menu-item-group title="入库管理">
            <el-menu-item index="4-1">产品列表</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="出库管理">
            <el-menu-item index="4-2">出库列表</el-menu-item>
          </el-menu-item-group>
        </el-sub-menu>

        <el-sub-menu index="5">
          <template #title>
            <el-icon><ChatDotSquare /></el-icon>
            <span>消息管理</span>
          </template>
          <el-menu-item-group title="消息管理">
            <el-menu-item index="5-1">消息列表</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="回收站">
            <el-menu-item index="5-3">回收站</el-menu-item>
          </el-menu-item-group>
        </el-sub-menu>

        <el-menu-item index="6">
            <el-icon><Document /></el-icon>
          <span>合同管理</span>
        </el-menu-item>

        <el-menu-item index="7">
            <el-icon><Collection /></el-icon>
          <span>操作日志</span>
        </el-menu-item>

        <el-menu-item index="8">
            <el-icon><DocumentChecked /></el-icon>
          <span>登录日志</span>
        </el-menu-item>

        <el-menu-item index="set">
            <el-icon><Tools /></el-icon>
          <span>系统设置</span>
        </el-menu-item>
    </el-menu>
        </el-aside>

        <!-- 顶部和main -->
        <el-container>
          <el-header>
            <span class="header-left-content">尊敬的 fancy 欢迎您登录本系统</span>
            <div class="header-right-content">
                <!-- 消息 -->
                <el-icon :size="20"><Message /></el-icon>
                <!-- 头像 -->
                <el-avatar :size="24" :src="circleUrl" />
                <!-- 设置的下拉菜单 -->
                <el-dropdown>
    <span class="el-dropdown-link">
     设置
      <el-icon class="el-icon--right">
        <arrow-down />
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item>设置账号</el-dropdown-item>
        <el-dropdown-item>更改头像</el-dropdown-item>
        <el-dropdown-item @click="logOut">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
            </div>
          </el-header>
          <el-main>
            <router-view></router-view>
          </el-main>
    </el-container>
</el-container>
  </div>
</template>

<script setup lang="ts" name="Index">
import {
  Location,
} from '@element-plus/icons-vue'

import { reactive, toRefs } from 'vue'
// 调用vue-router中的useRouter
import {useRouter} from 'vue-router'

const router=useRouter()



// 这是头像：
const state = reactive({
  circleUrl:
    'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',

})
const { circleUrl } = toRefs(state)

const logOut = ()=> {
  // 退出登录就是回到一开始登录的地方
  router.push('/login')
}

</script>

<style lang="scss" scoped>
// 侧边栏
.el-aside {
    height: 100vh;
    background-color: rgb(30, 30, 30);
    // width: 210px;
    // 隐藏横轴方向溢出的部分
    overflow-x: hidden;
// 菜单
    .el-menu {
        background-color: #1e1e1e;
        width: 210px;
        height: 100vh;
        border-right: 0px;
    }
// 标题
    .title {
        padding: 20px;
        display: flex;
        justify-content: center;
        background-color: #1e1e1e;
        color: white;
    }

    // 设置字体颜色
    .el-menu-item {
        color: white;
    }

    // 没有子菜单的：
    .el-menu-item:hover {
        background-color: #006eff;
    }

    // 有子菜单的
    :deep(.el-sub-menu__title:hover) {
        background-color: #006eff;
    }

    // 设置字体颜色   
    :deep(.el-sub-menu__title) {
        color: white;
        
    }
    :deep(.el-menu .el-menu--inline) {
        background-color: #1e1e1e;
    }
}

.el-header {
        display: flex;
        height: 55px;
        background-color: #262f3e;
        color: #c1c6c8;
        align-items: center;
        justify-content: space-between;

        .header-left-content {
            font-size: 16px;       
        }

        .header-right-content {
            width: 160px;
        display: flex;
            align-items: center;
        justify-content: space-between;
        }
    }

    .el-main {
      --el-main-padding: 0px;
      background-color: #f3f4fb;
    }

    .bread-crumb-icon {
      margin-right: 4px;
    }

</style>