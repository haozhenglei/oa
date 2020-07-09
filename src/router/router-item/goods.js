// 商品管理

export default [
  {
    // 商品列表
    path: '/goodsList',
    component: resolve => require(['@/components/commodity/commodityList/commodity-list'], resolve)
  }, {
    // 商品审核列表
    path: '/goodsAuditList',
    component: resolve => require(['@/components/commodity/examineList/examine-list'], resolve)
  }, {
    // 商品属性列表
    path: '/goodsProperties',
    component: resolve => require(['@/components/commodity/attribute/attribute-list'], resolve)
  }, {
    // 商品分类列表
    path: '/goodsCategory',
    component: resolve => require(['@/components/commodity/classify/classify-list'], resolve)
  }, {
    // 新增分类商品
    path: '/commodity/classify-form',
    component:  resolve => require(['@/components/commodity/classify/classify-form'], resolve)
  }, {
    // 商品评价列表
    path: '/goodsComment',
    component: resolve => require(['@/components/commodity/evaluate/evaluate'], resolve)
  }, {
    // 商品评价详情
    path: '/goodsComment/evaluateContend',
    component: resolve => require(['@/components/commodity/evaluate/evaluate-contend'], resolve)
  }, {
    // 商品详情
    path: '/commodity/commodity-detail',
    component: resolve => require(['@/components/commodity/commodity-detail'], resolve)
  }, {
    // 品牌管理
    path: '/brandList',
    component: resolve => require(['@/components/commodity/brand/brand-list'], resolve)
  }
]
