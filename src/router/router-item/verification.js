// 核销

export default [
  {
    // 核销管理
    path: '/verificationList',
    component: resolve => require(['@/components/verification/member-management/member-list'], resolve)
  }, {
    // 核销统计
    path: '/verificationStatistics',
    component:  resolve => require(['@/components/verification/verification-statistics/statistics-index'], resolve)
  }, {
    // 核销人员管理
    path: '/verificationUser',
    component: resolve => require(['@/components/verification/member-management/verificationUser'], resolve)
  }
]
