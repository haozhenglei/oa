// 商家管理

export default [
  {
    // 商家列表
    path: '/shopList',
    component: resolve => require(['@/components/management/business'], resolve)
  }, {
    // 增加/修改商铺
    path: '/addShop',
    component: resolve => require(['@/components/management/addorupdate'], resolve)
  }, {
    // 商家审核列表
    path: '/shopAuditList',
    component: resolve => require(['@/components/management/examine'], resolve)
  }, {
    // 查看商户
    path: '/management/look-examine',
    component: resolve => require(['@/components/management/look-examine'], resolve)
  }, {
    // 商铺信息查看
    path: '/management/settled-apply',
    component: resolve => require(['@/components/management/settled-apply'], resolve)
  }, {
    // 店铺列表
    path: '/shop/shopList',
    component: resolve => require(['@/components/management/shop/shop-list'], resolve)
  }, {
    // 我要推荐 - 商家列表
    path: '/recommendMerchant',
    component: resolve => require(['@/components/management/recommend/merchant/merchant-list'], resolve)
  }, {
    // 我要推荐 - 商家审批
    path: '/recommendMerchantCheck',
    component: resolve => require(['@/components/management/recommend/merchant-check/merchant-check-list'], resolve)
  }, {
    // 我要推荐 - 票数设置
    path: '/recommendSettings',
    component: resolve => require(['@/components/management/recommend/vote-settings'], resolve)
  }
];
