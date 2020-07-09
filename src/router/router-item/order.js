// 订单

export default [
  {
    // 淘票票 - 订单列表
    path: "/taopiaopiaoOrder",
    component: resolve => require(['@/components/order/taopiaopiao/order/order-list'], resolve)
  }, {
    // 淘票票 - 订单详情
    path: "/movieOrderDetail",
    component: resolve => require(['@/components/order/taopiaopiao/order/order-detail'], resolve)
  }, {
    // 商城订单 - 订单列表
    path: '/shopOrderList',
    component: resolve => require(['@/components/order/order-list'], resolve)
  }, {
    // 商城订单 - 订单详情
    path: '/order/order-details',
    component: resolve => require(['@/components/order/order-details'], resolve)
  }, {
    // 商城订单 - 订单跟踪
    path: '/order/track',
    component: resolve => require(['@/components/order/track'], resolve)
  }, {
    // 商城订单 - 退款列表
    path: '/shopRefundOrderList',
    component: resolve => require(['@/components/order/refund/refund-list'], resolve)
  }, {
    // 商城订单 - 退款详情
    path: '/refund/contend',
    component: resolve => require(['@/components/order/refund/refund-contend'], resolve)
  }, {
    // 商城订单 - 退货列表
    path: '/returnGoodsList',
    component: resolve => require(['@/components/order/returnGoods/returnGoods-list'], resolve)
  },{
    // 商城订单 - 退货详情
    path: '/returnGoodsContend',
    component: resolve => require(['@/components/order/returnGoods/returnGoods-contend'], resolve)
  }
]
