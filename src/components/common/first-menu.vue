<template>
  <div class="first-menu">
    <h1 class="system-name">
      <img src="../../assets/img/system-logo.png"/>
      职工普惠办公系统
    </h1>
    <el-scrollbar :wrapStyle="[{maxHeight:bodyHeight - 43 + 'px'}]" style="height:80%">
      <div style="padding-bottom: 17px;">
        <el-menu :default-active="firstMenuActive" background-color="#3A415C" text-color="#fff"
                 active-text-color="#fff">
          <div v-for="item in menuList" :key="item.id">
          <el-submenu :index="item.id" v-if="item.children.length">
            <template slot="title">
              <span>{{item.name}}</span>
            </template>
            <div v-for="item2 in item.children" :key="item2.id">
              <el-submenu :index="item2.id" v-if="item2.children.length" >
                <template slot="title">
                  <span>{{item2.name}}</span>
                </template>
                <el-menu-item :class="{'active-first-menu': firstMenuActive===item3.target}" :index="item3.id" :key="item3.id" v-for="item3 in item2.children" @click="handleSelect(item3)" >{{item3.name}}</el-menu-item>
              </el-submenu>
            </div>           
            <el-menu-item-group>
              <div v-for="item2 in item.children" :key="item2.id">
                <el-menu-item :class="{'active-first-menu': firstMenuActive===item2.target}" :index="item2.id" :key="item2.id" v-if="item2.children.length===0" @click="handleSelect(item2)">
                  {{item2.name}}
                </el-menu-item>
              </div>             
            </el-menu-item-group>
            
          </el-submenu>
            <el-menu-item  :index="item.target" :key="item.id" v-else
            style=""
            :class="{'active-first-menu': firstMenuActive===item.target}"
            @click="handleSelect(item)">
              <!--<i class="el-icon-location"></i>-->
            <span slot="title">{{item.name}}</span>
            </el-menu-item>
          </div>
        </el-menu>
      </div>
    </el-scrollbar>
  </div>
</template>

<script>
  export default {
    name: "first-menu",
    computed: {
      menuList() {
        return this.$store.state.Public.menuList;
      },
      bodyHeight() {
        return this.$store.state.Public.bodyHeight
      },
      //页面内点击按钮跳转页面,导航栏选中
      // firstMenuActive(){
      //   return this.$route.path;
      // }
    },
    watch:{
      '$route'(to,from){
        this.firstMenuActive=to.path
      }
    },
    data() {
      return {
        firstMenuActive: this.$route.path
      }
    },
    created() {
      if (sessionStorage.getItem('firstMenuActive')) {
        this.firstMenuActive = sessionStorage.getItem('firstMenuActive');
      }
    },
    methods: {
      handleSelect(item) {       
        this.firstMenuActive = item.target;
        // sessionStorage.setItem('firstMenuActive', this.firstMenuActive);
        // this.$store.dispatch('loadAsideMenu', item.children);
        setTimeout(() => {
          if (item.children.length > 0 && item.children[0].children && item.children[0].children.length > 0 && item.children[0].children[0].children && item.children[0].children[0].children.length > 0) {
            this.$router.push({path: item.children[0].children[0].children[0].target});
          } else if (item.children.length > 0 && item.children[0].children && item.children[0].children.length > 0) {
            this.$router.push({path: item.children[0].children[0].target});
          } else if (item.children && item.children.length > 0) {
            this.$router.push({path: item.children[0].target});
          } else {
            this.$router.push({path: item.target});
          }
        }, 100);
      },
    }
  }
</script>

<style lang="less">
  .first-menu {
    width: 64px;
    height: 100%;
    background-color: #3A415C;
    overflow: hidden;
    .el-menu {
      border: 0px solid transparent;
    }
    .menu-icon {
      margin-right: 21px;
      float: left;
    }
    .el-menu-item {
      border-left: 1px solid #3A415C;
    }
    .active-first-menu {
      border-left: 1px solid #fff;
      background-color: rgb(46, 52, 74) !important;
    }
    .system-name {
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
      background-color: #3A415C;
      color: #FFF;
      line-height: 60px;
      font-size: 18px;
      font-weight: 500;
      padding-left: 12px;
      white-space: nowrap;
      overflow: hidden;
      img {
        margin-right: 7px;
        margin-bottom: -13px;
      }
    }
  }
</style>
