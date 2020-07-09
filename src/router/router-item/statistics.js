// 统计

export default [
  {
    // 线上支付统计
    path: '/onlinePayStatistics',
    component: resolve => require(['@/components/statistics/online-sell-statistics'], resolve)
  }, {
    // 线下工会券支付统计
    path: '/offlineLaborPayStatistics',
    component: resolve => require(['@/components/statistics/offline-coupon-statistics'], resolve)
  }, {
    // 线下钱包支付统计
    path: '/offlinePayStatistics',
    component: resolve => require(['@/components/statistics/offline-wallet-statistics'], resolve)
  }
]
