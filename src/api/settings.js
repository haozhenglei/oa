import withAxios from "./withAxios";

export default {
  /**
   * 获取角色列表
   */
  loadRoleList(params, success_callback, fail_callback) {
    withAxios.requestData('POST', 'base', 'settings/role/find', params, success_callback, fail_callback);
  },
  /**
   * 获取角色详情
   */
  loadRoleDetail(params, success_callback, fail_callback) {
    withAxios.requestData('GET', 'base', 'settings/role/detail/' + params.id, '', success_callback, fail_callback);
  },
  /**
   * 获取角色类型
   */
  loadRoleType(success_callback, fail_callback) {
    withAxios.requestData('GET', 'base', 'settings/role/findRoleType', '', success_callback, fail_callback);
  },
  /**
   * 创建 / 修改角色
   */
  updateRole(params, success_callback, fail_callback) {
    withAxios.requestData('POST', 'base', 'settings/role/saveOrUpdate', params, success_callback, fail_callback);
  },
  /**
   * 获取角色下拉列表
   */
  loadRoleSelect(params, success_callback, fail_callback) {
    withAxios.requestData('POST', 'base', 'settings/role/findSimple ', params, success_callback, fail_callback);
  },
  /**
   * 删除角色
   */
  deleteRole(params, success_callback, fail_callback) {
    withAxios.requestData('GET', 'base', 'settings/role/delete/' + params.id, '', success_callback, fail_callback);
  },
  /**
   * 获取资源树
   */
  loadResourceTree(success_callback, fail_callback) {
    withAxios.requestData('POST', 'base', 'settings/resource/findTree', '', success_callback, fail_callback);
  },
  /**
   * 获取组织架构树
   */
  loadOrganizationTree(params, success_callback, fail_callback) {
    withAxios.requestData('GET', 'base', 'settings/organization/findTree/' + params.typeId, '', success_callback, fail_callback);
  },
  /**
   * 创建组织架构
   */
  addOrganization(params, success_callback, fail_callback) {
    withAxios.requestData('POST', 'base', 'settings/organization/save', params, success_callback, fail_callback);
  },
  /**
   * 编辑组织架构
   */
  updateOrganization(params, success_callback, fail_callback) {
    withAxios.requestData('POST', 'base', 'settings/organization/update', params, success_callback, fail_callback);
  },
  /**
   * 删除组织架构
   */
  deleteOrganization(params, success_callback, fail_callback) {
    withAxios.requestData('GET', 'base', 'settings/organization/delete/' + params.id, '', success_callback, fail_callback);
  },
  /**
   * 获取工会组织架构列表
   */
  loadUnionOrganizationList(success_callback, fail_callback) {
    withAxios.requestData('GET', 'base', 'settings/organization/findUnionList' , '', success_callback, fail_callback);
  },
  /**
   * 获取工会组织架构树
   */
  loadUnionOrganizationTree(success_callback, fail_callback) {
    withAxios.requestData('GET', 'base', 'settings/organization/findUnionTree' , '', success_callback, fail_callback);
  },
  /**
   * 获取管理员列表
   */
  loadEmployeeList(params, success_callback, fail_callback) {
    withAxios.requestData('POST', 'base', 'settings/employee/find', params, success_callback, fail_callback);
  },
  /**
   * 添加管理员
   */
  addEmployee(params, success_callback, fail_callback) {
    withAxios.requestData('POST', 'base', 'settings/employee/save', params, success_callback, fail_callback);
  },
  /**
   * 编辑管理员
   */
  updateEmployee(params, success_callback, fail_callback) {
    withAxios.requestData('POST', 'base', 'settings/employee/update', params, success_callback, fail_callback);
  },
  /**
   * 删除管理员
   */
  deleteEmployee(params, success_callback, fail_callback) {
    withAxios.requestData('GET', 'base', 'settings/employee/delete/' + params.id, '', success_callback, fail_callback);
  },
  /**
   * 重置管理员密码
   */
  resetEmployeePassword(params, success_callback, fail_callback) {
    withAxios.requestData('GET', 'base', 'settings/employee/resetPassword/' + params.id, '', success_callback, fail_callback);
  },
  /**
   * 修改管理员自己密码
   */
  updateEmployeeSelfPassword(params, success_callback, fail_callback) {
    withAxios.requestData('POST', 'base', 'settings/employee/updatePassword', params, success_callback, fail_callback);
  },
  /**
   * 修改管理员自己密码(通过一体化更改)
   */
  updateEmployeeSelfPasswordByIntegration(params, success_callback, fail_callback) {
    withAxios.requestData('POST', 'base', 'account/changePwd', params, success_callback, fail_callback);
  },
  /**
   * 获取默认头像列表
   */
  loadDefaultHead(params, success_callback, fail_callback) {
    withAxios.requestData('POST', 'base', 'customer/defaultHead/getPageHead', params, success_callback, fail_callback);
  },
  /**
   * 添加默认头像
   */
  addDefaultHead(params, success_callback, fail_callback) {
    withAxios.requestData('POST', 'base', 'customer/defaultHead/add', params, success_callback, fail_callback);
  },
  /**
   * 编辑默认头像
   */
  updateDefaultHead(params, success_callback, fail_callback) {
    withAxios.requestData('POST', 'base', 'customer/defaultHead/update', params, success_callback, fail_callback);
  },
  /**
   * 删除默认头像
   */
  deleteDefaultHead(params, success_callback, fail_callback) {
    withAxios.requestData('POST', 'base', 'customer/defaultHead/delete', params, success_callback, fail_callback);
  },
  /**
   * 排序默认头像
   */
  sortDefaultHead(params, success_callback, fail_callback) {
    withAxios.requestData('POST', 'base', 'customer/defaultHead/updateSort', params, success_callback, fail_callback);
  },
  /**
   * 获取敏感词列表
   */
  loadSensitiveWordsList(params, success_callback, fail_callback) {
    withAxios.requestData('POST', 'base', 'cms/list', params, success_callback, fail_callback);
  },
  /**
   * 添加敏感词
   */
  addSensitiveWords(params, success_callback, fail_callback) {
    withAxios.requestData('POST', 'base', 'cms/add', params, success_callback, fail_callback);
  },
  /**
   * 编辑敏感词
   */
  updateSensitiveWords(params, success_callback, fail_callback) {
    withAxios.requestData('POST', 'base', 'cms/update', params, success_callback, fail_callback);
  },
  /**
   * 删除敏感词
   */
  deleteSensitiveWords(params, success_callback, fail_callback) {
    withAxios.requestData('POST', 'base', 'cms/delete', params, success_callback, fail_callback);
  },
  /**
   * 获取版本控制列表
   */
  loadAppVersionList(params, success_callback, fail_callback) {
    withAxios.requestData('POST', 'base', 'version/getPage', params, success_callback, fail_callback)
  },
  /**
   * 新增版本控制
   */
  addAppVersion(params, success_callback, fail_callback) {
    withAxios.requestData('POST', 'base', 'version/add', params, success_callback, fail_callback)
  },
  /**
   * 编辑版本控制
   */
  updateAppVersion(params, success_callback, fail_callback) {
    withAxios.requestData('POST', 'base', 'version/update', params, success_callback, fail_callback)
  },
  /**
   * 删除版本控制
   */
  deleteAppVersion(params, success_callback, fail_callback) {
    withAxios.requestData('POST', 'base', 'version/delete', params, success_callback, fail_callback)
  },
}
