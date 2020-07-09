import withAxios from "./withAxios";

export default{

    // 固定资产查询
    fixedAssetsFind(params, success_callback, fail_callback) {
        withAxios.requestData('POST', 'base', 'propertyManage/finds', params, success_callback, fail_callback);
      },
    // 固定资产更改
    fixedAssetsUpdate(params, success_callback, fail_callback) {
      withAxios.requestData('POST', 'base', 'propertyManage/update', params, success_callback, fail_callback);
    },
    // 查询某一个
    fixedAssetsFindOne(params, success_callback, fail_callback) {
      withAxios.requestData('POST', 'base', 'propertyManage/find/'+params, '', success_callback, fail_callback);
    },
    // 新增
    fixedAssetsAdd(params, success_callback, fail_callback) {
      withAxios.requestData('POST', 'base', 'propertyManage/insert', params, success_callback, fail_callback);
    },
    // 转移
    fixedAssetsShift(params, success_callback, fail_callback) {
      withAxios.requestData('POST', 'base', 'propertyManage/propertyShift', params, success_callback, fail_callback);
    },
    // 设置领用人
    fixedAssetsSetReceiveUser(params, success_callback, fail_callback) {
        withAxios.requestData('POST', 'base', 'propertyManage/setReceiveUser', params, success_callback, fail_callback);
      },
     //删除 
     fixedAssetsDel(params, success_callback, fail_callback) {
      withAxios.requestData('POST', 'base', 'propertyManage/delete/'+params, '', success_callback, fail_callback);
    },
}