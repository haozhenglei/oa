import withAxios from "./withAxios";

export default{

    // 工单列表查询
    workOrderFind(params, success_callback, fail_callback) {
        withAxios.requestData('POST', 'base', 'workorder/finds', params, success_callback, fail_callback);
    },
    // 工单列表新增
    workOrderAdd(params, success_callback, fail_callback) {
        withAxios.requestData('POST', 'base', 'workorder/add', params, success_callback, fail_callback);
    },
     // 工单列表关闭
     workOrderClose(params, success_callback, fail_callback) {
        withAxios.requestData('POST', 'base', 'workorder/closeWorkOrder', params, success_callback, fail_callback);
    },
    // 工单列表详情
    workOrderDetail(params, success_callback, fail_callback) {
        withAxios.requestData('GET', 'base', 'workorder/find/'+params, '', success_callback, fail_callback);
    },
    // 工单处理
    workOrderDeal(params, success_callback, fail_callback) {
        withAxios.requestData('POST', 'base', 'workorder/doWorkOrder', params, success_callback, fail_callback);
    },
    // 删除指派人
    assignDel(params, success_callback, fail_callback) {
        withAxios.requestData('POST', 'base', 'workorder/deleteAssign', params, success_callback, fail_callback);
    },
    // 添加指派人
    assignAdd(params, success_callback, fail_callback) {
        withAxios.requestData('POST', 'base', 'workorder/addAssign', params, success_callback, fail_callback);
    },
    // 工单更新
    workOrderUpdate(params, success_callback, fail_callback) {
        withAxios.requestData('POST', 'base', 'workorder/update', params, success_callback, fail_callback);
    },
}