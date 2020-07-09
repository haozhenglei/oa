// 会员

export default [
  {
    // 会员管理
    path: '/customerInfo',
    component: resolve => require(['@/components/customer/customer-management/customer-list'], resolve)
  }, {
    // 会员详情
    path: '/customerInfo/customer-detail',
    component: resolve => require(['@/components/customer/customer-management/customer-detail'], resolve)
  }, {
    // 劳模管理
    path: '/modelWorker',
    component: resolve => require(['@/components/customer/model-worker/model-worker-index'], resolve)
  }, {
    // 会员分析
    path: '/customerStatistics',
    component: resolve => require(['@/components/statistics/vip-statistics'], resolve)
  }, {
    // 头像库管理
    path: '/defaultHead',
    component: resolve => require(['@/components/settings/default-head/default-head-list'], resolve)
  }
]
