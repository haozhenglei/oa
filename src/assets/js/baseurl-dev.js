export default {
  // 职工平台基础
  dataUrl: function() {
    return "http://192.168.30.114:8101/";
  },

  // 医疗模块
  medicalUrl: function() {
    return "http://192.168.30.114:3111/";
  },

  // 技能大赛模块
  skillUrl: function() {
    return "http://192.168.30.114:3110/";
  },

  // 核销模块
  verificationUrl: function () {
    return "http://192.168.30.114:8391/";
  },

  // 支付模块
  payUrl: function () {
    return 'http://192.168.30.114:8410/';
  },

  // 消息推送
  getPushModuel:function () {
    return 'http://192.168.30.114:3193/'
  },

  // 一体化官网登录
  integrationUrl: function () {
    return 'http://test.cdzghome.com:3165/#/login'
  },

  // 一体化管理
  integrationAdminUrl: function () {
    return 'http://192.168.30.114:8110/'
  },

  // 百千万 - 场地管理
  siteUrl: function () {
    return 'http://192.168.30.114:8113/'
  }
}
