<template>
  <div class="breadcrumb-box">
    <el-breadcrumb separator-class="el-icon-arrow-right" class="top-breadcrumb">
      <el-breadcrumb-item v-for="(item,index) in breadcrumbData" :class="{'enable': item.path}" :key="'breaditem'+index"
                          :to="item.path ? {path: item.path, query: item.params} : null">{{ item.name }}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
  export default {
    name: "top-breadcrumb",

    computed: {
      breadcrumbData() {
        return this.$store.state.Public.breadcrumbData
      }
    }
  }
</script>
