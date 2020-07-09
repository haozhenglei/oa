export default {
  // 职工平台基础
  dataUrl: function() {
    return "https://preprod.cdzghome.com:8101/";
  },

  // 医疗模块
  medicalUrl: function() {
    return "https://preprod.cdzghome.com:3111/";
  },

  // 技能大赛模块
  skillUrl: function() {
    return "https://preprod.cdzghome.com:3110/";
  },

  // 核销模块
  verificationUrl: function () {
    return "https://preprod.cdzghome.com:8391/";
  },

  // 支付模块
  payUrl: function () {
    return 'https://preprod.cdzghome.com:8410/';
  },

  // 消息推送
  getPushModuel:function () {
    return 'http://preprod.cdzghome.com:3193/'
  },

  // 一体化官网登录
  integrationUrl: function () {
    return 'http://www.cdzghome.com/#/login'
  },

  // 一体化管理
  integrationAdminUrl: function () {
    return 'https://preprod.cdzghome.com:8110/'
  },

  // 百千万 - 场地管理
  siteUrl: function () {
    return 'https://preprod.cdzghome.com:8113/'
  }
}
