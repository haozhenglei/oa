<template>
  <div class="aside-menu">
    <el-scrollbar :wrapStyle="[{maxHeight:bodyHeight - 43 + 'px'}]">
      <div style="padding-bottom: 17px;">
        <el-menu :default-active="$route.path" active-text-color="#3551A2" router unique-opened>
          <template v-for="secondItem in asideMenuList">
            <el-submenu v-if="secondItem.children && secondItem.children.length > 0" :index="secondItem.target" :key="secondItem.target">
              <template slot="title">{{secondItem.name}}</template>
              <template v-for="thirdItem in secondItem.children">
                <el-submenu v-if="thirdItem.children && thirdItem.children.length > 0" :index="thirdItem.target" :key="thirdItem.target">
                  <template slot="title">{{thirdItem.name}}</template>
                  <el-menu-item v-for="fourthItem in thirdItem.children" :index="fourthItem.target" :key="fourthItem.target">
                    {{fourthItem.name}}
                  </el-menu-item>
                </el-submenu>
                <el-menu-item v-else :index="thirdItem.target" :key="thirdItem.target">{{thirdItem.name}}</el-menu-item>
              </template>
            </el-submenu>
            <el-menu-item v-else :index="secondItem.target" :key="secondItem.target">{{secondItem.name}}</el-menu-item>
          </template>
        </el-menu>
      </div>
    </el-scrollbar>
  </div>
</template>

<script>
  export default {
    name: "aside-menu",

    created() {
      let asideMenuArr = JSON.parse(sessionStorage.getItem('asideMenuList'));
      if (asideMenuArr && asideMenuArr.length > 0) {
        this.$store.dispatch('loadAsideMenu', asideMenuArr);
      }
    },

    computed: {
      asideMenuList() {
        sessionStorage.setItem('asideMenuList', JSON.stringify(this.$store.state.Public.asideMenuList));
        return this.$store.state.Public.asideMenuList;
      },
      bodyHeight() {
        return this.$store.state.Public.bodyHeight
      }
    }
  }
</script>

<style lang="less">
  .aside-menu {
    margin-top: 40px;
    .el-menu {
      border: 0px solid transparent;
    }
  }
</style>
