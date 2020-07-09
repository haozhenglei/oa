// 消息推送管理
export default [
  {
    path: '/application-manager',
    component: resolve => require(['@/components/notice-push-manager/application-manager'], resolve)
  },
  {
    path: '/create-notice',
    component: resolve => require(['@/components/notice-push-manager/create-notice'], resolve)
  },
  {
    path: '/notice-history',
    component: resolve => require(['@/components/notice-push-manager/notice-history'], resolve)
  },
  {
    path: '/user-grounp',
    component: resolve => require(['@/components/notice-push-manager/user-grounp'], resolve)
  },
]