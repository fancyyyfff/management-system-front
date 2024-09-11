<template>
<BreadCrumb ref="breadcrumb" :item="item"></BreadCrumb>
<div class="home-wrapped">
    <div class="swiper-wrapped">
        <!-- 轮播图：elment plus的走马灯之卡片 -->
        <el-carousel :interval="4000"  indicator-position="outside" type="card" height="320px">
    <el-carousel-item v-for="(item,index) in imageUrl" :key="index">
      <!-- <h3 text="2xl" justify="center">{{ item }}</h3> -->
    <img v-if="imageUrl[index] && index >= 0 && index < imageUrl.length" :src="imageUrl[index]" class="swiper" />

    </el-carousel-item>
  </el-carousel>
    </div>
    <!-- 栅格布局 -->
    <div class="layout-wrapped">
        <!-- layout的分栏间隔 -->
        <el-row :gutter="20">
    <el-col :span="6" v-for="(item,index) in allCompanyIntroduce" :key="index">
        <div class="company-message-area"> 
            <span>{{ item.set_name }}</span>  
            <div v-html="item.set_text" class="company-introduce"></div>         
        </div>
    </el-col>
    <!-- <el-col :span="6">
        <div class="company-message-area">
            <span>公司架构</span>

        </div>
    </el-col>
    <el-col :span="6">
        <div class="company-message-area">
            <span>公司战略</span>

        </div>
    </el-col>
    <el-col :span="6">
        <div class="company-message-area">
            <span>高层介绍</span>

        </div>
    </el-col> -->

  </el-row>

    </div>

    <!-- 表格布局 -->
    <div class="two-table-wrapped">
        <div class="company-notice">
            <span class="title">公司公告</span>
            <el-table :data="tableData" style="width: 100%" :show-header="false">
    <el-table-column prop="date" label="Date" width="180" />
    <el-table-column prop="name" label="Name" width="180" />
    <el-table-column prop="address" label="Address" />
  </el-table>
        </div>

        <div class="system-message">
            <span class="title">系统消息</span>
            <el-table :data="tableData" style="width: 100%" :show-header="false">
    <el-table-column prop="date" label="Date" width="180" />
    <el-table-column prop="name" label="Name" width="180" />
    <el-table-column prop="address" label="Address" />
  </el-table>
        </div>

    </div>
</div>

</template>

<script setup lang="ts" name="Index">
 import  BreadCrumb  from "@/components/BreadCrumb.vue";
 import { reactive, ref } from "vue";
 import { getAllSwipers,getAllCompanyIntroduce } from "@/api/setting";
import Index from "../login/Index.vue";
 // 面包屑
 const breadcrumb = ref()
 const item = ref({
    first:'首页'
 })

//  表格数据
const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
]



// 获取所有轮播图：
// 轮播图的图片
const imageUrl = ref([])

// 获取所有轮播图
const getAllSwipers1 = async ()=>{
  imageUrl.value= await getAllSwipers()
}

// 调用,必须要调用，这样加载资源就会自动获取响应的资源
getAllSwipers1()



// 获取公司的全部信息
const allCompanyIntroduce = ref([])
const getAllCompanyIntroduce1 = async ()=> {
   const res= await getAllCompanyIntroduce() 
   
   const [name,...intro] = res
   allCompanyIntroduce.value = intro
   console.log("获取公司的全部信息返回的结果：",res)
}
getAllCompanyIntroduce1()


</script>

<style lang="scss" scoped>
 @mixin table-class {
    height: 240px;
    width: 48%;
    display: flex;
    flex-direction: column;
 }
//  首页外壳
 .home-wrapped {
    padding: 8px;
    height: calc(100vh - 101px);
    background: #f5f5f5;
    display: flex;
    flex-direction: column;

    // 轮播图
    .swiper-wrapped {
        padding: 0 20px;
        background: #fff;
        margin-bottom: 8px;

        // 让轮播图自适应盒子的宽高，实现自动缩放，图片会保证充满整个父盒子
        .swiper {
          width: 100%;
          height: 100%;
        }
    }

    // 栅格布局外壳
    .layout-wrapped {
        padding: 8px;
        margin-top:8px;
        background: #fff;

        // 公司信息
        .company-message-area {
            background: #f5f5f5;
            height: 200px;
            padding: 8px;
            cursor: pointer;

            span {
                border-bottom: 1px solid #409eff;
                font-size: 14px;
            }
        }

        .company-message-area :hover {
            cursor: pointer;
            background-color: #eef5ff;
        }
        
    }

    // 表格外壳
    .two-table-wrapped {
        height: 300px;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-around;
        background: #fff;

        // 公司公告
        .company-notice {
            @include table-class
        }

        // 系统消息
        .system-message {
            @include table-class
        }

        .title {
            font-size: 14px;
            margin-bottom: 5px;
            border-bottom: 1px solid #ea0709;
        }
    }
 }

 .el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>