import withAxios from "./withAxios";

export default{

    // 绩效目标列表查询
    performanceTargetFind(params, success_callback, fail_callback) {
        withAxios.requestData('POST', 'base', 'performance/perList', params, success_callback, fail_callback);
    },
    // 绩效目标条件查询
    performanceSearchFind(params, success_callback, fail_callback) {
      withAxios.requestData('POST', 'base', 'performance/searchList', params, success_callback, fail_callback);
  },
    //删除目标
    performanceTargetDel(params, success_callback, fail_callback) {
      withAxios.requestData('GET', 'base', 'performance/delete/'+params, '', success_callback, fail_callback);
    },
    //新增目标
    performanceTargetAdd(params, success_callback, fail_callback) {
      withAxios.requestData('POST', 'base', 'performance/add', params, success_callback, fail_callback);
    },
    //目标详情
    performanceTargetDetail(params, success_callback, fail_callback) {
      withAxios.requestData('POST', 'base', 'performance_target/list', params, success_callback, fail_callback);
    },
    //目标编辑
    performanceTargetUpdate(params, success_callback, fail_callback) {
      withAxios.requestData('POST', 'base', 'performance_target/update', params, success_callback, fail_callback);
    },
    //删除子目标
    performanceTargetChildDel(params, success_callback, fail_callback) {
      withAxios.requestData('GET', 'base', 'performance_target/delete', params, success_callback, fail_callback);
    },
    //导出
    performanceTargetExport(params, success_callback, fail_callback) {
      withAxios.exportData('GET', 'base', 'performance_target/export/'+params, '', success_callback, fail_callback);
    },
    //新增子目标
    performanceTargetChildAdd(params, success_callback, fail_callback) {
      withAxios.requestData('POST', 'base', 'performance_target/addper', params, success_callback, fail_callback);
    },
}