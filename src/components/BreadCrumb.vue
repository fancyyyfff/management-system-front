<template>
<div class="bread-crumb">
    <SvgIcon icon-name="location" class="bread-crumb-icon"></SvgIcon>
    <el-breadcrumb separator="/">
    <el-breadcrumb-item>{{ props.item.first }}</el-breadcrumb-item>
    <el-breadcrumb-item v-if="props.item.second">{{ props.item.second }}</el-breadcrumb-item>
  </el-breadcrumb>
</div>
</template>

<script setup lang="ts" name="BrandCrumb">
import SvgIcon from '@/components/SvgIcon.vue'
const props=defineProps(['item'])
</script>

<style lang="scss" scoped>
.bread-crumb {
  height: 30px;
  padding: 0 20px;
  display: flex;
  align-items: center;
}

:deep(.el-breadcrumb_item) {
  height: 30px;
  font-size: 16px;
  line-height: 30px;
}

:deep(.el-breadcrumb_inner) {
  font-weight: 500;
}

</style>