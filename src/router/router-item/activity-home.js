// 活动家

export default [
  {
    // 活动管理
    path: '/shopActivityManage',
    component: resolve => require(['@/components/activity-home/activity-management/activity-list'], resolve)
  },
  {
    // 活动审核
    path: '/shopActivityAudit',
    component: resolve => require(['@/components/activity-home/audit-activity/audit-activity-list'], resolve)
  },
  // 活动标签管理
  {
    path: '/nodeList',
    component: resolve => require(['@/components/activity-home/movableNote/note-list'], resolve)
  },
  // 添加活动商品
  {
    path: '/addActiveGoods',
    component: resolve => require(['@/components/activity-home/addActiveGoods/addActiveGoods'], resolve)
  },
  // 优惠券列表
  {
    path: '/couponList',
    component: resolve => require(['@/components/activity-home/couponList/coupon-list'], resolve)
  },

]
