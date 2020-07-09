// 合作商城管理

export default [
  {
    // 云端农庄 - 商品列表
    path: '/cloudFarmGoods',
    component: resolve => require(['@/components/cooperation-mall/cloud-farm/goods/goods-list'], resolve)
  }, {
    // 云端农庄 - 商品详情
    path: '/cloudFarmGoodsDetail',
    component: resolve => require(['@/components/cooperation-mall/cloud-farm/goods/goods-detail'], resolve)
  }, {
    // 云端农庄 - 商户列表
    path: '/cloudFarmMerchant',
    component: resolve => require(['@/components/cooperation-mall/cloud-farm/merchant/merchant-list'], resolve)
  }, {
    // 云端农庄 - 广告管理
    path: '/cloudFarmAd',
    component: resolve => require(['@/components/cooperation-mall/cloud-farm/advertising/advertising-list'], resolve)
  }, {
    // 云端农庄 - 员工管理
    path: '/cloudFarmEmployee',
    component: resolve => require(['@/components/cooperation-mall/cloud-farm/staff/staff-list'], resolve)
  }, {
    // 云端农庄 - 分类管理
    path: '/cloudFarmCategory',
    component: resolve => require(['@/components/cooperation-mall/cloud-farm/classify/classify-list'], resolve)
  },


  {
    // 电脑城 - 商品列表
    path: '/computerGoods',
    component: resolve => require(['@/components/cooperation-mall/computer/goods/goods-list'], resolve)
  }, {
    // 电脑城 - 商品详情
    path: '/computerGoodsDetail',
    component: resolve => require(['@/components/cooperation-mall/computer/goods/goods-detail'], resolve)
  }, {
    // 电脑城 - 商户列表
    path: '/computerMerchant',
    component: resolve => require(['@/components/cooperation-mall/computer/merchant/merchant-list'], resolve)
  }, {
    // 电脑城 - 广告管理
    path: '/computerAd',
    component: resolve => require(['@/components/cooperation-mall/computer/advertising/advertising-list'], resolve)
  }, {
    // 电脑城 - 员工管理
    path: '/computerEmployee',
    component: resolve => require(['@/components/cooperation-mall/computer/staff/staff-list'], resolve)
  }, {
    // 电脑城 - 分类管理
    path: '/computerCategory',
    component: resolve => require(['@/components/cooperation-mall/computer/classify/classify-list'], resolve)
  }, {
    // 电脑城 - 订单管理
    path: '/computerOrder',
    component: resolve => require(['@/components/cooperation-mall/computer/order/order_list'], resolve)
  }, {
    // 电脑城 - 订单详情
    path: '/computerOrderDetails',
    component: resolve => require(['@/components/cooperation-mall/computer/order/order_details'], resolve)
  }, {
    // 电脑城 - 订单跟踪
    path: '/computerOrderTracks',
    component: resolve => require(['@/components/cooperation-mall/computer/order/tracks'], resolve)
  }
]
