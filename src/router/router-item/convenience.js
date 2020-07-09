// 便民

export default [
  {
    // 淘票票 - 电影列表
    path: '/movieReview',
    component: resolve => require(['@/components/convenience/movie/movie'], resolve)
  }, {
    // 淘票票 - 电影评论
    path: '/movieReview/movieCommentsList',
    component: resolve => require(['@/components/convenience/movie/movieCommentsList'], resolve)
  }, {
    // 淘票票 - 电影回复
    path: '/movieReview/movieCommentsList/moviereply',
    component: resolve => require(['@/components/convenience/movie/movieReply'], resolve)
  }, {
    // 享动体育 - 会员卡查询
    path: '/enjoyFitnessCards',
    component: resolve => require(['@/components/convenience/sport/sport-card/card-list'], resolve)
  }, {
    // 享动体育 - 会员预约查询
    path: '/enjoyFitnessBooking',
    component: resolve => require(['@/components/convenience/sport/sport-card-book/book-list'], resolve)
  }, {
    // 模板单车 - 订单统计
    path: '/mobikeOrder',
    component: resolve => require(['@/components/convenience/mobike/mobike-order'], resolve)
  }, {
    // 模板单车 - 订单统计
    path: '/mobikePayOrder',
    component: resolve => require(['@/components/convenience/mobike/mobike-pay-order'], resolve)
  }, {
    // 机票 - 预算单位管理
    path: '/airTicketBudgetUnit',
    component: resolve => require(['@/components/convenience/air-ticket/budget-unit/budget-unit-list'], resolve)
  }
]
