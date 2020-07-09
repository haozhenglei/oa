import withAxios from "./withAxios";

export default{

    // 考勤月度汇总查询
    attendanceMonthFind(params, success_callback, fail_callback) {
        withAxios.requestData('POST', 'base', 'checkWork/findMonthCount', params, success_callback, fail_callback);
      },

}