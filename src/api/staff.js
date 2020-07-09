import withAxios from "./withAxios";

export default {
  /**
   * 员工列表
   */
  queryUserList(params, success_callback, fail_callback) {
    withAxios.requestData('POST', 'base', 'user/queryUserList', params, success_callback, fail_callback);
  },
  /**
   * 新增员工
   */
  addStaff(params, success_callback, fail_callback) {
    withAxios.requestData('POST', 'base', 'user/add', params, success_callback, fail_callback);
  },
  /**
   * 删除员工
   */
  delStaff(params, success_callback, fail_callback) {
    withAxios.requestData('POST', 'base', 'user/del', params, success_callback, fail_callback);
  },
  /**
   * 编辑员工
   */
  updUserInfo(params, success_callback, fail_callback) {
    withAxios.requestData('POST', 'base', 'user/updUserInfo', params, success_callback, fail_callback);
  },
  /**
   * 员工头部
   */
  countUserNum(params, success_callback, fail_callback) {
    withAxios.requestData('GET', 'base', 'user/countUserNum', params, success_callback, fail_callback);
  },
  /**
   * 员工离职
   */
  userStatus(params, success_callback, fail_callback) {
    withAxios.requestData('POST', 'base', 'user/status', params, success_callback, fail_callback);
  },
  /**
   * 批量导入
   */
  excelAdd(params, success_callback, fail_callback) {
    withAxios.requestData('POST', 'base', 'user/excelAdd', params, success_callback, fail_callback);
  },
  /**
   * 下载模板
   */
  downMuBan(params, filename, fail_callback) {
    withAxios.exportData('GET', 'base', 'util/excelModel', params, filename, fail_callback);
  },
}
