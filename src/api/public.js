import withAxios from "./withAxios";

export default {
  /**
   * 获取上传文件的临时凭证
   */
  getWebUploadPolicy(params, success_callback, fail_callback) {
    // withAxios.requestData('GET', 'base', "labor-user/cdn/webUploadPolicy", '', cb);
    withAxios.requestData('POST', 'base', "fileUpload/upload", params, success_callback, fail_callback);
  },


  /**
   * 登录
   */
  login(params, success_callback, fail_callback) {
    withAxios.requestData('POST', 'base', 'account/login', params, success_callback, fail_callback);
  },
  /**
   * 获取导航
   */
  authMenu(params, success_callback, fail_callback) {
    withAxios.requestData('GET', 'base', 'menu/authMenu', params, success_callback, fail_callback);
  },

  // 图片上传
  uploadPic(params, success_callback, fail_callback) {
    withAxios.requestData('POST', 'imgUrl', 'pic/uploadPic', params, success_callback, fail_callback);
  },
  // 公司信息
  // 查询公司信息
  findCompany(params, success_callback, fail_callback) {
    withAxios.requestData('GET', 'base', 'oaadmin/findCompany', params, success_callback, fail_callback);
  },
  // 查询公司信息
  editCompany(params, success_callback, fail_callback) {
    withAxios.requestData('POST', 'base', 'oaadmin/editCompany', params, success_callback, fail_callback);
  },
  // 职位管理列表
  findGroupList(params, success_callback, fail_callback) {
    withAxios.requestData('GET', 'base', 'oaadmin/findGroupList', params, success_callback, fail_callback);
  },
  // 添加分组
  addGroup(params, success_callback, fail_callback) {
    withAxios.requestData('POST', 'base', 'oaadmin/addGroup', params, success_callback, fail_callback);
  },
  // 添加角色
  addRole(params, success_callback, fail_callback) {
    withAxios.requestData('POST', 'base', 'role/addRole', params, success_callback, fail_callback);
  },
  // 职位下拉
  listDrop(params, success_callback, fail_callback) {
    withAxios.requestData('GET', 'base', 'role/listDrop', params, success_callback, fail_callback);
  },
  // 分組下拉
  dropGroupList(params, success_callback, fail_callback) {
    withAxios.requestData('GET', 'base', 'oaadmin/dropGroupList', params, success_callback, fail_callback);
  },
  // 组织架构
  findCompanyTreet(params, success_callback, fail_callback) {
    withAxios.requestData('GET', 'base', 'oaadmin/findCompanyTree', params, success_callback, fail_callback);
  },
  // 新增部门
  addBranch(params, success_callback, fail_callback) {
    withAxios.requestData('POST', 'base', 'oaadmin/addBranch', params, success_callback, fail_callback);
  },
  // 部门下拉框
  findCompanyList(params, success_callback, fail_callback) {
    withAxios.requestData('GET', 'base', 'oaadmin/findCompanyList', params, success_callback, fail_callback);
  },
  // 调整部门
  updateDepartment(params, success_callback, fail_callback) {
    withAxios.requestData('POST', 'base', 'oaadmin/updateDepartment', params, success_callback, fail_callback);
  },
  // 编辑部门(设置主管)
  appointLeader(params, success_callback, fail_callback) {
    withAxios.requestData('POST', 'base', 'oaadmin/appointLeader', params, success_callback, fail_callback);
  },
  // 设置主管下拉框
  userListDrow(params, success_callback, fail_callback) {
    withAxios.requestData('GET', 'base', 'user/userListDrow', params, success_callback, fail_callback);
  },
  // 账号管理
  // 账号列表
  findAccount(params, success_callback, fail_callback) {
    withAxios.requestData('POST', 'base', 'account/findAccount', params, success_callback, fail_callback);
  },
  // 账号启用停用
  accountOpen(params, success_callback, fail_callback) {
    withAxios.requestData('POST', 'base', 'account/openAccount', params, success_callback, fail_callback);
  },
  // 重置密码
  accountReset(params, success_callback, fail_callback) {
    withAxios.requestData('POST', 'base', 'account/resetAccount', params, success_callback, fail_callback);
  },
  // 新增账号
  accountAdd(params, success_callback, fail_callback) {
    withAxios.requestData('POST', 'base', 'account/addAccount', params, success_callback, fail_callback);
  },
  // 角色列表
  accountRoleList(params, success_callback, fail_callback) {
    withAxios.requestData('POST', 'base', 'accountRole/accountRoleList', params, success_callback, fail_callback);
  },
  // 删除账户
  deleteAccount(params, success_callback, fail_callback) {
    withAxios.requestData('POST', 'base', 'account/deleteAccount', params, success_callback, fail_callback);
  },
  // 角色管理
  // 新增角色
  roleAdd(params, success_callback, fail_callback) {
    withAxios.requestData('POST', 'base', 'accountRole/addRole', params, success_callback, fail_callback);
  },
  // 修改角色
  updAccountRole(params, success_callback, fail_callback) {
    withAxios.requestData('POST', 'base', 'accountRole/updAccountRole', params, success_callback, fail_callback);
  },
  // 菜单树形
  menuTree(params, success_callback, fail_callback) {
    withAxios.requestData('GET', 'base', 'menu/tree', params, success_callback, fail_callback);
  },
  // 角色详情
  accountRole(params, success_callback, fail_callback) {
    withAxios.requestData('GET', 'base', 'accountRole/'+params.id, '', success_callback, fail_callback);
  },
  // 删除角色
  delRole(params, success_callback, fail_callback) {
    withAxios.requestData('GET', 'base', 'accountRole/del/'+params.id, '', success_callback, fail_callback);
  },
  // 登录日志
  loginLogs(params, success_callback, fail_callback) {
    withAxios.requestData('POST', 'base', 'account/loginLogs', params, success_callback, fail_callback);
  },
}
