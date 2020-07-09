<template>
  <div class="login">
    <div class="login-content">
    <div class="login-form-box">
    <div class="title">OA平台</div>
    <el-form :model="formData" :rules="formRules" ref="submitForm" size="small">
    <el-form-item prop="account">
    <el-input v-model="formData.account" placeholder="用户名" clearable @keyup.enter.native="handleLogin"></el-input>
    </el-form-item>
    <el-form-item prop="password">
    <el-input v-model="formData.password" type="password" placeholder="密码" clearable @keyup.enter.native="handleLogin"></el-input>
    </el-form-item>
    </el-form>
    <!--<div style="height:36px;padding-top:10px;">-->
    <!--<el-checkbox v-model="formData.keepLogin">记住密码</el-checkbox>-->
    <!--</div>-->
    <el-button type="primary" class="login-btn" @click="handleLogin">登录</el-button>
    </div>
    </div>

  </div>
</template>

<script>
  import publicServer from '../../api/public'
  import baseUrl from '../../assets/js/baseurl'

  export default {
    name: "login",

    data() {
      return {
        loginLoading: true,
        // integrationUrl: baseUrl.integrationUrl(),
        formData: {

        },
        formRules: {
          account: {required: true, message: '请输入用户名'},
          password: {required: true, message: '请输入密码'}
        }
      }
    },
    created() {
      // if (localStorage.getItem('keepLoginToken')) {
      //   this.formData.keepLogin = true;
      // } else {
      //   this.formData.keepLogin = false;
      // }
      // setTimeout(() => {
      //   this.loginLoading = false;
      // }, 1000);
    },
    methods: {
      handleLogin() {
        this.$refs['submitForm'].validate(valid => {
          if (valid) {
            // var obj = {};
            // obj.name = this.formData.name;
            // obj.timestamp = this.formData.timestamp;
            // let a = this.$md5(this.formData.pwd);
            // obj.pwd = this.$md5(a+this.formData.timestamp);
            publicServer.login(this.formData, res => {
              // this.$store.dispatch('loadLoginUser', res.data);
              console.log(1)
              this.$emit('login-success', res);
            }, () => {

            });
          }
        })
      }
    }
  }
</script>

<style lang="less">
  @import url("../../assets/style/variable");

 /* .login {
    width: 100%;
    height: 100%;
    position: relative;
    .remind-box {
      width: 600px;
      position: absolute;
      top: 50%;
      left: 50%;
      .transform(translate(-50%, -50%));
    }
    .remind {
      border: 1px solid #2BCAF6;
      .border-radius(4px);
      padding: 50px;
      background: rgba(240, 250, 255, 1);
      .title {
        color: rgba(0, 0, 0, 0.85);
        font-size: 14px;
        line-height: 26px;
      }
      .detail, .phone {
        margin-top: 12px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 12px;
        line-height: 20px;
      }
    }
    .handle-btn {
      padding-top: 50px;
      text-align: center;
      .el-button {
        background-color: #1890FF;
        color: #fff;
        border: none;
      }
    }
  } */

  .login {
    width: 100%;
    height: 100%;
    /*background-image: url("../../assets/img/bj.png");*/
    background-repeat: no-repeat;
    background-position: center;
    background-size: 100% 100%;
    position: relative;
    .login-content {
      width: 45.05%;
      min-width: 745px;
      position: absolute;
      top: 50%;
      left: 50%;
      .transform(translate(-50%, -50%));
      background-image: url("../../assets/img/login_img.png");
      background-repeat: no-repeat;
      background-position: left bottom;
      &:after, &:before {
        display: table;
        content: "";
      }
      &:after {
        clear: both;
      }
    }
    .login-form-box {
      float: right;
      width: 352px;
      padding: 38px;
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
      background-color: #fff;
      border-top: 5px solid #3253A4;
      .border-radius(2px);
      .title {
        padding-bottom: 20px;
        font-size: 22px;
        font-weight: bold;
        color: #3253A4;
        line-height: 23px;
        text-align: center;
      }
      .el-form-item .el-input__inner {
        padding: 0;
        .border-radius(0);
        border-top: 1px solid #fff;
        border-left: 1px solid #fff;
        border-right: 1px solid #fff;
        border-bottom: 1px solid #EBEBEB;
      }
      .el-form-item--small .el-form-item__error {
        padding-top: 5px;
      }
      .el-form-item--small.el-form-item {
        margin-bottom: 25px;
      }
    }
    .login-btn {
      width: 100%;
      background-color: #2D63E7;
      border: none;
      height: 44px;
      color: #fff;
      .border-radius(22px);
    }
    .send-btn {
      padding: 8px 0;
      color: #2D63E7;
      &:hover {
        color: rgba(51, 101, 222, 0.9);
      }
    }
    input:-webkit-autofill {
      -webkit-box-shadow: 0 0 0 1000px white inset;
    }
  }
</style>
