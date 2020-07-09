// 运营

export default [
  {
    // 联系方式
    path: '/platformInfo',
    component: resolve => require(['@/components/operation/platform-settings'], resolve)
  }, {
    // 意见反馈
    path: '/cmsFeedback',
    component: resolve => require(['@/components/operation/feedback/feedback-list'], resolve)
  }, {
    // 用户注册服务协议
    path: '/serviceProtocol',
    component: resolve => require(['@/components/operation/agreement/service-agreement'], resolve)
  }, {
    // 隐私声明
    path: '/servicePrivacy',
    component: resolve => require(['@/components/operation/agreement/privacy-statement'], resolve)
  }, {
    // 常见问题
    path: '/commonProblem',
    component: resolve => require(['@/components/operation/agreement/common-problem'], resolve)
  }, {
    // 付款协议
    path: '/secretPaymentAgreement',
    component: resolve => require(['@/components/operation/agreement/pay-agreement'], resolve)
  }, {
    // 钱包协议
    path: '/walletAgreement',
    component: resolve => require(['@/components/operation/agreement/wallet-agreement'], resolve)
  }, {
    // 通讯录信息
    path: '/phoneAddressAgreement',
    component: resolve => require(['@/components/operation/agreement/address-books'], resolve)
  }, {
    // 线上商家管理制度
    path: '/onlineShopAgreement',
    component: resolve => require(['@/components/operation/agreement/business'], resolve)
  }, {
    // 访问相机
    path: '/cameraAgreement',
    component: resolve => require(['@/components/operation/agreement/camera'], resolve)
  }, {
    // 法律声明
    path: '/legalNotice',
    component: resolve => require(['@/components/operation/agreement/legal'], resolve)
  }, {
    // 位置信息
    path: '/positionAgreement',
    component: resolve => require(['@/components/operation/agreement/location-info'], resolve)
  }, {
    // 订单共享与安全
    path: '/orderSafeAgreement',
    component: resolve => require(['@/components/operation/agreement/order-share'], resolve)
  }, {
    // 福利券发放及使用规则
    path: '/welfareAgreement',
    component: resolve => require(['@/components/operation/agreement/welfare'], resolve)
  }, {
    // 图片与视频
    path: '/photoAgreement',
    component: resolve => require(['@/components/operation/agreement/picture-and-video'], resolve)
  }, {
    // 经营证照
    path: '/businessLicense',
    component: resolve => require(['@/components/operation/agreement/business-license'], resolve)
  }, {
    // 平台资质
    path: '/platformLicense',
    component: resolve => require(['@/components/operation/agreement/platform-license'], resolve)
  }, {
    // banner设置
    path: '/banner',
    component: resolve => require(['@/components/operation/banner-settings/banner-index'], resolve)
  }, {
    // 模块管理
    path: '/cmsMoudle',
    component: resolve => require(['@/components/operation/module-manage/module-index'], resolve)
  }, {
    // 商城广告管理
    path: '/shopAd',
    component: resolve => require(['@/components/advertisement/advertisement-list'], resolve)
  }, {
    // 商城限时秒杀 - 秒杀列表
    path: '/shopSpikeList',
    component: resolve => require(['@/components/operat/seckill/seckkillList/seckkill-list'], resolve)
  }, {
    // 商城限时秒杀 - 秒杀审核
    path: '/shopSpikeAudit',
    component: resolve => require(['@/components/operat/seckill/seckkillExamine/examine-list'], resolve)
  }, {
    // 商城限时秒杀 - 秒杀设置
    path: '/addShopSpike',
    component: resolve => require(['@/components/operat/seckill/seckkillInstall/install-list'], resolve)
  }, {
    // 商城团购管理 - 团购列表
    path: '/shopGroupBuyList',
    component: resolve => require(['@/components/operat/groupBuying/groupList/group-list'], resolve)
  }, {
    // 商城团购管理 - 团购审核
    path: '/shopGroupBuyAudit',
    component: resolve => require(['@/components/operat/groupBuying/groupExamine/examine-list'], resolve)
  }, {
    // 商城团购管理 - 团购设置
    path: '/addShopGroupBuy',
    component: resolve => require(['@/components/operat/groupBuying/groupInstall/install-list'], resolve)
  }, {
    // 猜你喜欢推荐
    path: '/lovely',
    component: resolve => require(['@/components/operat/lovely/lovely-list'], resolve)
  }, {
    // 福利商城店铺管理
    path: '/recommendShop',
    component: resolve => require(['@/components/operat/recommendShop/recommendShop-list'], resolve)
  }, {
    // 福利商城店铺详情
    path: '/recommendShop/contend',
    component: resolve => require(['@/components/operat/recommendShop/recommendShop-contend'], resolve)
  }, {
    // 站内消息
    path: '/stationMessage',
    component: resolve => require(['@/components/operation/station-message/station-message-list'], resolve)
  }, {
    // 推送模块
    path: '/jpushModule',
    component: resolve => require(['@/components/operation/jpush/jpush-module'], resolve)
  }, {
    // 推送模板管理
    path: '/jpushTemplate',
    component: resolve => require(['@/components/operation/jpush/jpush-template'], resolve)
  }
]
