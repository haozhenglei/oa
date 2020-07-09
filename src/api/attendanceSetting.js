import withAxios from "./withAxios";

export default{

    // 考勤设置查询
    attendanceSettingFind(params, success_callback, fail_callback) {
        withAxios.requestData('GET', 'base', 'checkWork/find', params, success_callback, fail_callback);
      },
    // 考勤设置更改
    attendanceSettingUpdate(params, success_callback, fail_callback) {
      withAxios.requestData('POST', 'base', 'checkWork/update', params, success_callback, fail_callback);
    },
    // 节假日查询
    holidayFind(params, success_callback, fail_callback) {
      withAxios.requestData('GET', 'base', 'holiday/list', params, success_callback, fail_callback);
    },
    // 节假日新增
    holidayAdd(params, success_callback, fail_callback) {
      withAxios.requestData('POST', 'base', 'holiday/add', params, success_callback, fail_callback);
    },
    // 节假日修改
    holidayUpdate(params, success_callback, fail_callback) {
      withAxios.requestData('POST', 'base', 'holiday/update', params, success_callback, fail_callback);
    },
     // 节假日删除
     holidayDel(params, success_callback, fail_callback) {
      withAxios.requestData('GET', 'base', 'holiday/delete/'+params, '', success_callback, fail_callback);
    },
}