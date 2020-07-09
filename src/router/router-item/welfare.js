// 福利

export default [
  {
    // 工会券发放 - 发放列表
    path: '/unionTicket',
    component: resolve => require(['@/components/welfare/union-coupon/company-member-list'], resolve)
  }, {
    // 工会券发放 - 发放明细
    path: '/unionCouponMemberDetail',
    component: resolve => require(['@/components/welfare/union-coupon/company-member-detail'], resolve)
  }, {
    // 工会券发放 - 个人发放日志
    path: '/unionCouponGrantLog',
    component: resolve => require(['@/components/welfare/union-coupon/person-log'], resolve)
  }, {
    // 福利 - 福利查询
    path: '/welfareGrantList',
    component: resolve => require(['@/components/welfare/welfare-grant-list'], resolve)
  }
]
