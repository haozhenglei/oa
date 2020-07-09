// 设置

export default [
  {
    // 角色管理
    path: '/role',
    component: resolve => require(['@/components/settings/role/role-index'], resolve)
  }, {
    // 组织架构管理
    path: '/organization',
    component: resolve => require(['@/components/settings/organization/organization-index'], resolve)
  }, {
    // 管理员设置
    path: '/employee',
    component: resolve => require(['@/components/settings/employee/employee-index'], resolve)
  }, {
    // 操作日志
    path: '/log',
    component: resolve => require(['@/components/settings/operation-log/operation-log'], resolve)
  }, {
    // 敏感词
    path: '/sensitiveWord',
    component: resolve => require(['@/components/settings/sensitive-word/sensitive-word-list'], resolve)
  }, {
    // 版本控制
    path: '/appVersion',
    component: resolve => require(['@/components/settings/app-version/app-version-list'], resolve)
  }
]
