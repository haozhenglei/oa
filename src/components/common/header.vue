<template>
  <el-container class="header">
    <el-main>
      <div class="breadcrumb-box">
        <el-breadcrumb separator-class="el-icon-arrow-right" class="top-breadcrumb">
          <el-breadcrumb-item v-for="(item,index) in breadcrumbData" :class="{'enable': item.path}" :key="'breaditem'+index"
                              :to="item.path ? {path: item.path, query: item.params} : null">{{ item.name }}
          </el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </el-main>
    <el-aside width="200px">
      <el-dropdown placement="bottom" class="user-el-dropdown">
        <span class="user-dropdown">
          <i class="ex-icon-user"></i> {{ userName }}
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="openPasswordForm"><i class="ex-icon-lock"></i> 修改密码</el-dropdown-item>
          <el-dropdown-item @click.native="handleLogout"><i class="ex-icon-exit"></i> 退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-aside>
  </el-container>
</template>

<script>
  import publicServer from '../../api/public'

  export default {
    name: "top-header",

    computed: {
      breadcrumbData() {                
        return this.$store.state.Public.breadcrumbData
      },
      menuList() {
        return this.$store.state.Public.menuList;
      },
      userName() {
        if (localStorage.getItem('user_name')) {
          return localStorage.getItem('user_name');
        } else {
          return '';
        }
      }
    },

    methods: {
      openPasswordForm() {
        this.$emit('open-password-form');
      },

      // handleSelect(item) {
      //   this.$store.dispatch('loadAsideMenu', item.children);
      //   if (item.children.length && item.children.length > 0) {
      //     this.$router.push({path: item.children[0].target});
      //   }
      // },

      handleLogout() {
        this.$confirm('此操作将退出平台, 是否继续?', '退出', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // publicServer.logout();
          localStorage.clear();
          sessionStorage.clear();
          this.$router.push({path: '/'});
          this.$store.dispatch('changeLoginStatus', false);
        }).catch(() => {
        });
      }
    }
  }
</script>

<style scoped lang="less">
  .user-el-dropdown {
    padding-right: 30px;
    float: right;
  }
  .user-dropdown {
    line-height: 60px;
    height: 60px;
    display: inline-block;
    color: #4D4D4D;
    cursor: pointer;
  }
  .breadcrumb-box {
    padding: 13px 30px;
  }
</style>
