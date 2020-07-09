<template>
  <div id="app">
    <el-container v-if="logined">
    <!--<el-container>-->
      <el-aside :width="ishover ? '250px' : '64px'" class="aside-menu-box">
        <div class="menu-box">
          <first-menu :is-hover="ishover"
                      :class="{'is-hover': ishover}"></first-menu>
        </div>
      </el-aside>
      <el-aside v-show="asideMenuList && asideMenuList.length > 0" :width="ishover ? '0px' : '250px'"
                class="aside-menu-box">
        <div class="menu-box">
          <aside-menu></aside-menu>
        </div>
      </el-aside>

      <el-main>
        <el-container class="main-container">
          <el-header class="header-box">
            <top-header @open-password-form="passwordFormVisible=true"
                        @logout-success="beforeLogin=true"></top-header>
          </el-header>
          <el-main>
            <el-scrollbar :wrapStyle="[{maxHeight:bodyHeight - 45 + 'px'}]">
              <div class="main-content">
                <router-view/>
              </div>
            </el-scrollbar>
          </el-main>
        </el-container>
      </el-main>
    </el-container>

    <login v-else @login-success="loginSuccess"></login>
    <!--<login  @login-success="loginSuccess"></login>-->

    <password-form :dialog-visible="passwordFormVisible" @close-dialog="passwordFormVisible=false"></password-form>
  </div>
</template>

<script>
  import publicServer from './api/public'
  import TopHeader from "./components/common/header"
  import Breadcrumb from "./components/common/breadcrumb"
  import Login from './components/common/login'
  import PasswordForm from './components/common/password-form'
  import AsideMenu from './components/common/aside-menu'
  import FirstMenu from './components/common/first-menu'

  export default {
    name: 'App',
    components: {
      TopHeader, Breadcrumb, Login, PasswordForm, AsideMenu, FirstMenu
    },
    computed: {
      logined() {
        return this.$store.state.Public.logined;
      },
      bodyWidth() {
        return this.$store.state.Public.bodyWidth;
      },
      bodyHeight() {
        return this.$store.state.Public.bodyHeight;
      },
      menuList() {
        return this.$store.state.Public.menuList;
      },
      asideMenuList() {
        return this.$store.state.Public.asideMenuList;
      }
    },
    data() {
      return {
        passwordFormVisible: false,
        ishover: true,
      }
    },
    created() {
      console.log(this.logined)
      // this.loadBodySize();
      this.loadLoginStatus();
    },

    methods: {
      loginSuccess(res) {

        localStorage.setItem('adminToken', res.data.token);
        localStorage.setItem('user_name', res.data.name);
          this.$store.dispatch('changeLoginStatus', true);
          this.$router.push({path: '/'});
          this.loadLoginStatus()
      },

      loadLoginStatus() {
           if(localStorage.getItem('adminToken')){
             console.log(2);
             this.$store.dispatch('changeLoginStatus', true);
             publicServer.authMenu({}, res => {
               this.$store.dispatch('loadMenuList', res.data);
             }, () => {

             });
           }
      },

      loadBodySize() {
        this.$store.dispatch('loadbodySize').then(() => {
        });
        if (window.addEventListener) {
          window.addEventListener('resize', () => {
            this.$store.dispatch('loadbodySize').then(() => {
            });
          });
        } else {
          window.attachEvent('onresize', () => {
            this.$store.dispatch('loadbodySize');
          })
        }
      }
    }
  }
</script>

<style lang="less">
  @import "assets/style/public";
  @import "assets/style/variable";

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    .header-box {
      .box-shadow();
      z-index: 20;
      position: relative;
    }
    .aside-menu-box {
      -webkit-transition: all 0.3s;
      -moz-transition: all 0.3s;
      -ms-transition: all 0.3s;
      -o-transition: all 0.3s;
      transition: all 0.3s;
    }
    > .el-container {
      height: 100%;
      > .el-main {
        height: 100%;
        background-color: #F0F0F0;
      }
    }
    .main-container {
      height: 100%;
      background-color: #FFF;
      .el-menu {
        border-right: none;
      }
      > .el-main {
        height: 100%;
        background-color: #F0F0F0;
      }
      .main-content {
        background-color: #F0F0F0;
        padding: 30px;
        > div {
          padding: 30px;
          background-color: #fff;
          .box-shadow();
        }
      }
    }
    .menu-box {
      display: flex;
      display: -webkit-flex;
      height: 100%;
      overflow: hidden;
      .first-menu {
        flex: 0 0 84px;
        -webkit-flex: 0 0 84px;
        -webkit-transition: all 0.3s;
        -moz-transition: all 0.3s;
        -ms-transition: all 0.3s;
        -o-transition: all 0.3s;
        transition: all 0.3s;
        &.is-hover {
          flex: 0 0 250px;
          -webkit-flex: 0 0 250px;
        }
      }
      .aside-menu {
        flex: 1;
        -webkit-flex: 1;
      }
    }
    .third-menu {
      background-color: #fff;
      .el-tabs--left .el-tabs__nav-wrap.is-left::after, .el-tabs--left .el-tabs__nav-wrap.is-right::after, .el-tabs--right .el-tabs__nav-wrap.is-left::after, .el-tabs--right .el-tabs__nav-wrap.is-right::after {
        width: 0;
      }
    }
  }
</style>
