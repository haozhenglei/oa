// 机票
export default [
    {
      // 机场src\components\flightTicket\airport.vue
      path: '/airport',
      component: resolve => require(['@/components/flightTicket/airport'], resolve)
     },
     {
      // 航司_舱位
      path: '/aircabin',
      component: resolve => require(['@/components/flightTicket/aircabin'], resolve)
    },
    {
      // 航司
      path: '/aircompany',
      component: resolve => require(['@/components/flightTicket/aircompany'], resolve)
    },
    {
      // 舱位
      path: '/aircabin_cabin',
      component: resolve => require(['@/components/flightTicket/aircabin_cabin'], resolve)
    },
    {
      // 机型
      path: '/aircraftModel',
      component: resolve => require(['@/components/flightTicket/aircraftModel'], resolve)
    },
    {
      // 参数配置
      path: '/airParameterConfig',
      component: resolve => require(['@/components/flightTicket/parameterConfig/airParameterConfig'], resolve)
     },
      // 订单管理
      {
      path: '/airOrderConfig',
      component: resolve => require(['@/components/flightTicket/parameterConfig/airOrderConfig'], resolve)
     },
     //订单详情
     {
      path: '/airOrderConfig_details',
      component: resolve => require(['@/components/flightTicket/parameterConfig/airOrderConfig_details'], resolve)
     },
     {
      //公务卡(支付方式管理)
      path: '/officialcard',
      component: resolve => require(['@/components/flightTicket/officialcard'], resolve)
    } ,
     //航餐管理
     {
      path: '/airFlightfood',
      component: resolve => require(['@/components/flightTicket/parameterConfig/airFlightfood'], resolve)
     },
    {
     //证件类型
     path: '/certificatetype',
     component: resolve => require(['@/components/flightTicket/certificatetype'], resolve)
   },
   {
    //机票退票明细
    path: '/airCancelTicketDetailed',
    component: resolve => require(['@/components/flightTicket/airCommercialManagement/airCancelTicketDetailed'], resolve)
  },
  {
    //商务部统计
    path: '/businessCheck',
    component: resolve => require(['@/components/flightTicket/businessCheck'],resolve)
  }
  ]
