import withAxios from "./withAxios";

export default{

    // 商家管理查询
    businessFind(params, success_callback, fail_callback) {
        withAxios.requestData('POST', 'base', 'merchants/list', params, success_callback, fail_callback);
    },
    // 商家管理新增
    businessAdd(params, success_callback, fail_callback) {
        withAxios.requestData('POST', 'base', 'merchants/addUpdate', params, success_callback, fail_callback);
    },
    // 商家管理详情
    businessDetail(params, success_callback, fail_callback) {
        withAxios.requestData('GET', 'base', 'merchants/'+params, '', success_callback, fail_callback);
    },
    // 商家管理删除
    businessDel(params, success_callback, fail_callback) {
        withAxios.requestData('POST', 'base', 'merchants/delete/'+params, '', success_callback, fail_callback);
    },
    // 拜访记录查询
    visitRecordFind(params, success_callback, fail_callback) {
        withAxios.requestData('POST', 'base', 'visitRecord/list', params, success_callback, fail_callback);
    },
    // 拜访记录新增
    visitRecordAdd(params, success_callback, fail_callback) {
        withAxios.requestData('POST', 'base', 'visitRecord/addUpdate', params, success_callback, fail_callback);
    },
    // 拜访记录详情
    visitRecordDetail(params, success_callback, fail_callback) {
        withAxios.requestData('GET', 'base', 'visitRecord/'+params, '', success_callback, fail_callback);
    },
    // 拜访记录删除
    visitRecordDel(params, success_callback, fail_callback) {
        withAxios.requestData('POST', 'base', 'visitRecord/delete/'+params, '', success_callback, fail_callback);
    },
}