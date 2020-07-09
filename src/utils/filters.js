/**
 * 全局公用过滤器
 */

let formatDate = value => {
  return value ? new Date(value).pattern('yyyy-MM-dd') : '';
};

let formatDate2 = value => {
  return value ? new Date(value).pattern('yyyy.MM.dd') : '';
};

let formatMinutes = value => {
  return value ? new Date(value).pattern('yyyy-MM-dd HH:mm') : '';
};

let formatSeconds = value => {
  return value ? new Date(value).pattern('yyyy-MM-dd HH:mm:ss') : '';
};

let formatMoney = value => {
  if (isNumber(value)) {
    let val = value * 0.01;
    val = val.toFixed(2);
    return val;
  }
  return '';
};

function isNumber(value) {
  let patten = /^(-)?\d+(\.\d+)?$/;
  return !(patten.exec(value) === null || value === "");
}

const filters = {
  formatDate,
  formatDate2,
  formatMinutes,
  formatSeconds,
  formatMoney
}

const install = function (Vue, opts = {}) {
  Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
  })
};

export default install
