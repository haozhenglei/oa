/**
 * 全局公用表单验证方法
 */

/**
 * 验证姓名
 */
let checkName = (rule, value, callback) => {
  let reg = new RegExp("[`~!@#$%^&*()_=+|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】《》‘；：”“'。，、？-]");
  let regFont = new RegExp("[A-Za-z\u4e00-\u9fa5]");
  if (value.length > 20) {
    callback(new Error('请输入不超过20个字符的姓名'));
  } else if (reg.test(value) || /[0-9]/.test(value)) {
    callback(new Error('请输入不含有特殊符号的姓名'));
  } else if (!regFont.test(value)) {
    callback(new Error('请输入含有中文或英文的姓名'));
  } else {
    callback();
  }
};


/**
 * 验证身份证号码
 */
let checkIDNumber = (rule, value, callback) => {
  // 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X
  let reg = /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|[xX])$/;
  if(reg.test(value)) {
    callback();
  } else {
    callback(new Error('请输入正确的身份证号码'));
  }
};

/**
 * 验证手机号码
 */
let checkPhone = (rule, value, callback) => {
  let reg = /^1[0-9][0-9]\d{8}$/;
  if(reg.test(value)) {
    callback();
  } else {
    callback(new Error('请输入正确的手机号码'));
  }
};

/**
 * 验证搜索条件手机号码
 */
let checkSearchPhone = (rule, value, callback) => {
  if(value) {
    let reg = /^[0-9]\d{0,10}$/;
    if(reg.test(value)) {
      callback();
    } else {
      callback(new Error('请输入不超过11位的数字'));
    }
  } else {
    callback();
  }
};

let validator = {
  checkName: checkName,
  checkIDNumber: checkIDNumber,
  checkPhone: checkPhone,
  checkSearchPhone: checkSearchPhone
};

const install = function (Vue, opts = {}) {
  Vue.prototype.$validator = validator;
};

export default install
