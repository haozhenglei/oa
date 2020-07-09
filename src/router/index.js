import Vue from 'vue'
import Router from 'vue-router'
import configRouters from './router-item'

// import activityHome from './router-item/activity-home'
// import convenience from './router-item/convenience'
// import cooperationMall from './router-item/cooperation-mall'
// import customer from './router-item/customer'
// import goods from './router-item/goods'
// import onlineUnion from './router-item/online-union'
// import operation from './router-item/operation'
// import order from './router-item/order'
// import pay from './router-item/pay'
// import settings from './router-item/settings'
// import shop from './router-item/shop'
// import statistics from './router-item/statistics'
// import verification from './router-item/verification'
// import welfare from './router-item/welfare'
// import matrix from './router-item/matrix'
// import flightTicket from './router-item/flightTicket'
// import noticePushManager from './router-item/notice-push-manager'
Vue.use(Router);
export default new Router({
  // mode:'history',
  // base:'shopAdmin',
  routes: [
    // {
    // path: '/',
    // component: resolve => require(['@/components/home/home'], resolve)
    // },
    // 考勤设置
    {
      path: '/attendanceSettings',
      component: resolve => require(['@/components/attendanceSettings/attendanceSettings'], resolve)
    },
    // 考勤统计
    {
      path: '/attendance',
      component: resolve => require(['@/components/attendance/attendance'], resolve)
    },
    // 绩效管理
    {
      path: '/performanceManagement',
      component: resolve => require(['@/components/performanceManagement/performanceManagement'], resolve)
    },
    // 绩效详情
    {
      path: '/performanceDetail',
      name:'performanceDetail',
      component: resolve => require(['@/components/performanceManagement/performanceDetail'], resolve)
    },
    // 员工管理
    {
      path: '/staff',
      component: resolve => require(['@/components/staff/staff'], resolve)
    },
    // 合同管理
    {
      path: '/contract',
      component: resolve => require(['@/components/administrative/contract'], resolve)
    },
    // 固定资产
    {
      path: '/fixedAssets',
      component: resolve => require(['@/components/administrative/fixedAssets'], resolve)
    },
    // 文档资料
    {
      path: '/document',
      component: resolve => require(['@/components/administrative/document'], resolve)
    },
    // 审批流程管理
    {
      path: '/approval',
      component: resolve => require(['@/components/approval/approval'], resolve)
    },
    // 审批列表
    {
      path: '/approvalList',
      component: resolve => require(['@/components/approval/approvalList'], resolve)
    },
    // 流程类别
    {
      path: '/approvalType',
      component: resolve => require(['@/components/approval/approvalType'], resolve)
    },
    // 部门管理
    {
      path: '/department',
      component: resolve => require(['@/components/department/department'], resolve)
    },
    // 公司信息
    {
      path: '/company',
      component: resolve => require(['@/components/system/company'], resolve)
    },
    // 账号管理
    {
      path: '/account',
      component: resolve => require(['@/components/account/account'], resolve)
    },
    // 角色管理
    {
      path: '/role',
      component: resolve => require(['@/components/role/role'], resolve)
    },
    // 登录日志
    {
      path: '/loginLog',
      component: resolve => require(['@/components/system/loginLog'], resolve)
    },
    // 商家管理
    {
      path: '/businessManage',
      component: resolve => require(['@/components/customerRelationship/businessManage'], resolve)
    },
    // 渠道管理
    {
      path: '/channelManage',
      component: resolve => require(['@/components/customerRelationship/channelManage'], resolve)
    },
    // 客户拜访
    {
      path: '/visitRecord',
      component: resolve => require(['@/components/customerRelationship/visitRecord'], resolve)
    },
    // 项目管理列表
    {
      path: '/projectManage',
      component: resolve => require(['@/components/projectManage/projectManage'], resolve)
    },
    // 项目详情
    {
      path: '/projectDetail',
      name:'projectDetail',
      component: resolve => require(['@/components/projectManage/projectDetail'], resolve)
    },
    // 任务详情
    {
      path: '/taskDetail',
      name:'taskDetail',
      component: resolve => require(['@/components/projectManage/taskDetail'], resolve)
    },
    // 工单管理列表
    {
      path: '/workOrder',
      component: resolve => require(['@/components/workOrderManage/workOrder'], resolve)
    },
    // 工单详情
    {
      path: '/workOrderDetail',
      name:'workOrderDetail',
      component: resolve => require(['@/components/workOrderManage/workOrderDetail'], resolve)
    },

    ]
});

