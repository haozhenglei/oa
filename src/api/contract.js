import withAxios from "./withAxios";

export default{

    // 合同列表查询
    constractListFind(params, success_callback, fail_callback) {
        withAxios.requestData('POST', 'base', 'packLog//findList', params, success_callback, fail_callback);
    },
    // 合同文件预览
    constractView(params, success_callback, fail_callback) {
        withAxios.requestData('GET', 'imgUrl', 'pic/downLoadImage', params, success_callback, fail_callback);
    },
    // 合同删除
    constractDel(params, success_callback, fail_callback) {
        withAxios.requestData('GET', 'base', 'packLog/delete/'+ params, '', success_callback, fail_callback);
    },
    // 合同新增
    constractAdd(params, success_callback, fail_callback) {
        withAxios.requestData('POST', 'base', 'packLog/add', params, success_callback, fail_callback);
    },
}