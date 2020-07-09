// 支付

export default [
  {
    // 个人账户
    path: '/personalAccount',
    component: resolve => require(['@/components/pay/private-account/private-account-index'], resolve)
  }, {
    // 银行卡绑定
    path: '/bankCard',
    component: resolve => require(['@/components/pay/bankcard-bind/bankcard-bind-index'], resolve)
  }, {
    // 银行卡bin管理
    path: '/bankCardBin',
    component: resolve => require(['@/components/pay/bankcard-bin/bankcard-bin-list'], resolve)
  }, {
    // 账单记录
    path: '/billing',
    component: resolve => require(['@/components/pay/bill/bill-index'], resolve)
  }, {
    // 充值记录
    path: '/recharge',
    component: resolve => require(['@/components/pay/recharge/recharge-index'], resolve)
  }, {
    // 提现记录
    path: '/withdraw',
    component: resolve => require(['@/components/pay/put-forward/put-forward-index'], resolve)
  }, {
    // 支付记录
    path: '/payRecord',
    component: resolve => require(['@/components/pay/payment/payment-index'], resolve)
  }, {
    // 退款记录
    path: '/refundRecord',
    component: resolve => require(['@/components/pay/refund/refund-index'], resolve)
  },  {
    // 商户支付信息管理
    path: '/payCompany',
    component: resolve => require(['@/components/pay/store-pay-management/pay-info-list'], resolve)
  }, {
    // 钱包白名单
    path: '/walletWhitelist',
    component: resolve => require(['@/components/pay/wallet-whitelist/whitelist-list'], resolve)
  }, {
    // 电子福利券支付订单
    path: '/electronicCouponPayRecord',
    component: resolve => require(['@/components/pay/deduction/deduction-index'], resolve)
  }, {
    // 钱包消费记录
    path: '/walletConsumption',
    component: resolve => require(['@/components/pay/wallet-records/wallet-records-index'], resolve)
  },
  {
    // 折扣分类
    path: '/discountCategory',
    component: resolve => require(['@/components/pay/discount/discount-category'], resolve)
  }, {
    // web收银折扣管理
    path: '/discountManagerWeb',
    component: resolve => require(['@/components/pay/discount/discount-manager-web'], resolve)
  }, {
    // 电子钱包折扣管理
    path: '/discountManagerCash',
    component: resolve => require(['@/components/pay/discount/discount-manager-cash'], resolve)
  },{
    // 平台领取返现统计
    path: '/platformCashReturn',
    component: resolve => require(['@/components/pay/discount/platform-cash-return'], resolve)
  }, {
    // web收银折扣总计
    path: '/discountStatistics',
    component: resolve => require(['@/components/pay/discount/discount-statistics'], resolve)
  }, {
    // 密钥管理
    path: '/keysManager',
    component: resolve => require(['@/components/pay/keys-manager/index'], resolve)
  }
]
