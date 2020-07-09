import withAxios from "./withAxios";

export default {
  /**
   * 获取首页头部内容
   */

  headLine(params, success_callback, fail_callback) {
    withAxios.requestData('GET', 'base', 'adminHomePage/headLine', params, success_callback, fail_callback);
  },
  /**
   * 获取首页代办事项
   */

  toBeDoneCount(params, success_callback, fail_callback) {
    withAxios.requestData('GET', 'base', 'adminHomePage/toBeDoneCount', params, success_callback, fail_callback);
  },
  /**
   * 获取商品统计
   */
  goodsCount(params, success_callback, fail_callback) {
    withAxios.requestData('GET', 'base', 'adminHomePage/goodsCount', params, success_callback, fail_callback);
  },

  /**
   * 退款原因Top5
   */
  toreRundAmount(params, success_callback, fail_callback) {
    withAxios.requestData('POST', 'base', 'adminHomePage/toreRundAmount', params, success_callback, fail_callback);
  },
  /**
   * 退款金额
   */
  toreRundAmountTrendChart(params, success_callback, fail_callback) {
    withAxios.requestData('POST', 'base', 'adminHomePage/toreRundAmountTrendChart', params, success_callback, fail_callback);
  },
  /**
   * 销售Top5
   */
  salesAmountCountTopFive(params, success_callback, fail_callback) {
    withAxios.requestData('POST', 'base', 'adminHomePage/salesAmountCountTopFive', params, success_callback, fail_callback);
  },
  /**
   * 销售额统计
   */
  salesAmountCount(params, success_callback, fail_callback) {
    withAxios.requestData('POST', 'base', 'adminHomePage/salesAmountCount', params, success_callback, fail_callback);
  },
  /**
   * 退款总计
   */
  toAnnualRefundAmount(params, success_callback, fail_callback) {
    withAxios.requestData('POST', 'base', 'adminHomePage/toAnnualRefundAmount', params, success_callback, fail_callback);
  },
  /**
   * 销售额总计
   */
  salesAmountCountAllYear(params, success_callback, fail_callback) {
    withAxios.requestData('POST', 'base', 'adminHomePage/salesAmountCountAllYear', params, success_callback, fail_callback);
  },
}
