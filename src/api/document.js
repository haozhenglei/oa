import withAxios from "./withAxios";

export default{

    // 发文收文管理列表查询
    sendFileListFind(params, success_callback, fail_callback) {
        withAxios.requestData('POST', 'base', 'sendFileManage//finds', params, success_callback, fail_callback);
    },
    // 发文收文管理新增
    sendFileListInsert(params, success_callback, fail_callback) {
        withAxios.requestData('POST', 'base', 'sendFileManage/insert', params, success_callback, fail_callback);
    },
    // 发文收文管理修改
    sendFileUpdate(params, success_callback, fail_callback) {
        withAxios.requestData('POST', 'base', 'sendFileManage/update', params, success_callback, fail_callback);
    },
    // 发文收文管理删除
    sendFiledel(params, success_callback, fail_callback) {
        withAxios.requestData('GET', 'base', 'sendFileManage/delete/'+params, '', success_callback, fail_callback);
    },
    // 资料新增
    dataAdd(params, success_callback, fail_callback) {
        withAxios.requestData('POST', 'base', 'file/add', params, success_callback, fail_callback);
    },
    // 资料详情
    dataDetail(params, success_callback, fail_callback) {
        withAxios.requestData('GET', 'base', 'file/find/'+params, '', success_callback, fail_callback);
    },
    // 资料列表查询
    dataListFind(params, success_callback, fail_callback) {
        withAxios.requestData('POST', 'base', 'file/findList', params, success_callback, fail_callback);
    },
    // 资料借阅
    dataBorrow(params, success_callback, fail_callback) {
        withAxios.requestData('POST', 'base', 'file/addLog', params, success_callback, fail_callback);
    },
    // 资料删除
    datadel(params, success_callback, fail_callback) {
        withAxios.requestData('GET', 'base', 'file/delete/'+params, '', success_callback, fail_callback);
    },
}