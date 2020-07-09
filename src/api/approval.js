import withAxios from "./withAxios";

export default {
  /**
   * 流程列表
   */
  models(params, success_callback, fail_callback) {
    withAxios.requestData('POST', 'base', 'model/models', params, success_callback, fail_callback);
  },
  /**
   * 编辑流程列表
   */
  updateModel(params, success_callback, fail_callback) {
    withAxios.requestData('POST', 'base', 'model/updateModel', params, success_callback, fail_callback);
  },
  /**
   * 编辑流程列表
   */
  repeat(params, success_callback, fail_callback) {
    withAxios.requestData('GET', 'base', 'model/repeat', params, success_callback, fail_callback);
  },
  /**
   * 审批列表
   */
  instanceList(params, success_callback, fail_callback) {
    withAxios.requestData('POST', 'base', 'model/list', params, success_callback, fail_callback);
  },
  /**
   * 审批详情
   */
  getStartFromValue(params, success_callback, fail_callback) {
    withAxios.requestData('GET', 'base', 'flow/query/getStartFromValue', params, success_callback, fail_callback);
  },
  /**
   * 审批流程图
   */
  getBpmnPNG(params, success_callback, fail_callback) {
    withAxios.requestData('GET', 'base', 'flow/query/getBpmnPNG', params, success_callback, fail_callback);
  },
  /**
   * 流程类别列表查询
   */
  liuChengTypeList(params, success_callback, fail_callback) {
    withAxios.requestData('GET', 'base', 'dic/list', params, success_callback, fail_callback);
  },
  /**
   * 流程类别新增
   */
  liuChengTypeAdd(params, success_callback, fail_callback) {
    withAxios.requestData('POST', 'base', 'dic/add', params, success_callback, fail_callback);
  },
  /**
   * 流程类别修改
   */
  liuChengTypeUpdate(params, success_callback, fail_callback) {
    withAxios.requestData('POST', 'base', 'dic/update', params, success_callback, fail_callback);
  },
  /**
   * 流程类别删除
   */
  liuChengTypeDelete(params, success_callback, fail_callback) {
    withAxios.requestData('GET', 'base', 'dic/delete/'+params, '', success_callback, fail_callback);
  },

}
