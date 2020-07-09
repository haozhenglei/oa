// 矩阵

export default [
  {
    // 工会矩阵 - 推送设置
    path: '/laborMatrixMessage',
    component: resolve => require(['@/components/matrix/push-settings/push-settings'], resolve)
  }, {
    // 工单报警设置
    path: '/laborMatrixMonitorSetting',
    component: resolve => require(['@/components/matrix/work-order-manage/manage-alarm-set.vue'], resolve)
  }, {
    // 文章管理-文章列表
    path: '/laborMatrixArticleList',
    component: resolve => require(['@/components/matrix/article-manage/article-list.vue'], resolve)
  }, {
    // 文章管理-文章列表(管理)
    path: '/laborMatrixArticlePlatformList',
    component: resolve => require(['@/components/matrix/article-manage/article-manage-list.vue'], resolve)
  }, {
    // 文章管理-文章列表-新增文章
    path: '/laborMatrixArticleNew',
    component: resolve => require(['@/components/matrix/article-manage/article-add.vue'], resolve)
  }, {
    // 文章管理-文章列表-修改文章
    path: '/articleList/updateArticle',
    component: resolve => require(['@/components/matrix/article-manage/article-update.vue'], resolve)
  }, {
    // 咨询管理-咨询列表
    path: '/laborMatrixActivityIssue',
    component: resolve => require(['@/components/matrix/consult-manage/consult-list.vue'], resolve)
  }, {
    //服务中心处理 - 客服页面
    path: '/laborMatrixServiceIssue',
    component: resolve => require(['@/components/matrix/work-order-manage/manage-service-dispose-list-service'], resolve)
  }, {
    //服务中心处理 - 客服上级页面
    path: '/laborMatrixServiceAdminIssueMessage',
    component: resolve => require(['@/components/matrix/work-order-manage/manage-service-dispose-list-service-lead'], resolve)
  }, {
    //服务中心处理 - 处理人页面
    path: '/laborMatrixUnionIssue',
    component: resolve => require(['@/components/matrix/work-order-manage/manage-service-dispose-list-operator'], resolve)
  }, {
    //服务中心处理 - 处理人上级页面
    path: '/laborMatrixAdminIssue',
    component: resolve => require(['@/components/matrix/work-order-manage/manage-service-dispose-list-operator-lead'], resolve)
  }, {
    //服务中心处理 - 工单详情页面
    path: '/manageServiceDispose/manage-service-dispose-details',
    component: resolve => require(['@/components/matrix/work-order-manage/manage-service-dispose-details'], resolve)
  }, {
    //工单统计 - 工单统计报表
    path: '/laborMatrixStatistics',
    component: resolve => require(['@/components/matrix/work-order-manage/manage-work-order-report'], resolve)
  }, {
    //工单管理 - 工单管理页面
    path: '/laborMatrixPlatformIssue',
    component: resolve => require(['@/components/matrix/work-order-manage/manage-work-order-manage'], resolve)
  }, {
    //标签管理
    path: '/laborMatrixArticleTag',
    component: resolve => require(['@/components/matrix/label-manage/label-list'], resolve)
  }
  , {
    //区域链接管理
    path: '/laborMatrixRegion',
    component: resolve => require(['@/components/matrix/region-link-manage/region-link-list'], resolve)
  }
  , {
    //矩阵管理 - 添加矩阵
    path: '/unionList/addUnion',
    component: resolve => require(['@/components/matrix/matrix-manage/matrix-add'], resolve)
  }
  , {
    //矩阵管理 - 编辑矩阵
    path: '/unionList/updateUnion',
    component: resolve => require(['@/components/matrix/matrix-manage/matrix-update'], resolve)
  }
  , {
    //矩阵管理 - 矩阵列表
    path: '/laborMatrixAdmin',
    component: resolve => require(['@/components/matrix/matrix-manage/union-list'], resolve)
  }
  , {
    // 设置回复语管理
    path: '/laborMatrixReplyLanguage',
    component: resolve => require(['@/components/matrix/work-order-manage/manage-service-reply-list'], resolve)
  }
  // , {
  //   // 发表答疑
  //   path: '/laborMatrixPublish',
  //   component: resolve => require(['@/components/matrix/work-order-manage/manage-service-publish-list'], resolve)
  // }
  , {
    // 答疑说明
    path: '/laborMatrixExplain',
    component: resolve => require(['@/components/matrix/work-order-manage/manage-service-explain-list'], resolve)
  }
  , {
    // 区市县信息
    path: '/laborMatrixInfo',
    component: resolve => require(['@/components/matrix/matrix-manage/manage-service-matrix-info-list'], resolve)
  }
  , {
    // 模块管理
    path: '/laborMatrixModule',
    component: resolve => require(['@/components/matrix/module-manage/manage-service-module-list'], resolve)
  }
  , {
    // 答疑管理 发表答疑
    path: '/laborMatrixPublish',
    component: resolve => require(['@/components/matrix/question-manage/manage-service-publish-list'], resolve)
  }
  , {
    // 答疑管理 答疑列表
    path: '/laborMatrixQuestion',
    component: resolve => require(['@/components/matrix/question-manage/manage-serice-question-list'], resolve)
  }, {
    //先锋信息导入
    path: '/laborMatrixPioneerInfo',
    component: resolve => require(['@/components/matrix/pioneer-info-import/pioneerInfo-import'], resolve)
  }
]
