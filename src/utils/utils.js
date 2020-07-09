/**
 * 全局公用方法
 */
import {Message} from "element-ui"
import baseUrl from "../assets/js/baseurl";

/**
 * 判断数字
 */
let isNumber = function (value) {
  let patten = /^(-)?\d+(\.\d+)?$/;
  return !(patten.exec(value) === null || value === "");
}

/**
 * 判断小数长度
 */
let checkDecimal = function (value) {
  let arr = value.toString().split(".");
  if (arr.length > 1) {
    return arr[1].length;
  } else {
    return 0;
  }
}

/**
 * 判断为空
 */
let isEmpty = function (e) {
  if (!e) {
    return false;
  }

  if (e instanceof Array && e.length !== 0) {
    return true;
  }

  let t;
  for (t in e)
    return !1;
  return !0
};

/**
 * 判断数组是否包含某个值
 */
let arrayContains = function (array, value) {
  for (let i in array) {
    if (array[i] === value) return true;
  }
  return false;
};

/**
 * 日期格式化
 * 返回当前时间并转换为指定格式： new Date().pattern('yyyy-MM-dd HH:mm:ss')
 * 连接符可自定义： new Date().pattern('yyyy/MM/dd HH:mm:ss')
 * 格式化长度可自定义： new Date().pattern('yyyy-MM-dd') 或 new Date().pattern('HH:mm')
 */
const datePattern = function (fmt) {
  let o = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "h+": this.getHours() % 12 === 0 ? 12 : this.getHours() % 12, //小时
    "H+": this.getHours(), //小时
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    "S": this.getMilliseconds() //毫秒
  };
  let week = {
    "0": "/u65e5", "1": "/u4e00", "2": "/u4e8c", "3": "/u4e09", "4": "/u56db", "5": "/u4e94", "6": "/u516d"
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  }
  if (/(E+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "/u661f/u671f" : "/u5468") : "") + week[this.getDay() + ""]);
  }
  for (let k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    }
  }
  return fmt;
};

let hasPermission = function (permissionList = [], perms = [], operate = 'AND') {
  let matchAmount = 0;
  if (localStorage.getItem('superMaster')) {
    return true;
  }
  for (let i = 0; i < permissionList.length; i++) {
    for (let j = 0; j < perms.length; j++) {
      if (permissionList[i] === perms[j]) {
        matchAmount++;
        if (operate === 'OR' || (operate === 'AND' && matchAmount === perms.length)) {
          return true;
        }
      }
    }
  }
  return false;
};

let beforeAvatarUpload = function (file, size, width, height) {
  if (size && file.size / 1024 / 1024 > size) {
    Message.warning('上传图片大小不能超过 ' + size + 'MB');
    return false;
  }

  if (width || height) {
    const isSize = new Promise(function (resolve, reject) {
      let _URL = window.URL || window.webkitURL;
      let img = new Image();
      img.onload = function () {
        let valid = img.width == width || img.height == height;
        if (width && height) {
          valid = img.width == width && img.height == height;
        }
        valid ? resolve() : reject();
      }
      img.src = _URL.createObjectURL(file);
    }).then(() => {
      return file;
    }, () => {
      Message.warning('上传的图片尺寸应为' + width + ' * ' + height);
      return Promise.reject();
    });
    return isSize;
  }
};

// 判断对象的数据类型 Null Undefined Object Array
const isClass = (o) => {
  if (o === null) return 'Null';
  if (o === undefined) return 'Undefined';
  return Object.prototype.toString.call(o).slice(8, -1);
};

// 深度拷贝一个对象
const deepClone = (obj) => {
  let result;
  const oClass = isClass(obj);
  if (oClass === 'Object') {
    result = {};
  } else if (oClass === 'Array') {
    result = [];
  } else {
    return obj;
  }
  for (const key in obj) { // eslint-disable-line
    const copy = obj[key];
    if (isClass(copy) === 'Object') {
      result[key] = deepClone(copy);// 递归调用
    } else if (isClass(copy) === 'Array') {
      result[key] = deepClone(copy);
    } else {
      result[key] = obj[key];
    }
  }
  return result;
};
/**
 * 计算两个字符串yyyy-MM-dd hh:mm:ss时间的时间差 返回 hh:mm:ss 的字符串
 * @param bigTime 较大的时间
 * @param smallTime 较小的时间
 * @returns {string} hh:mm:ss
 */
let calculateTime = function (bigTime, smallTime) {
  let end_str = (bigTime).replace(/-/g, "/");//一般得到的时间的格式都是：yyyy-MM-dd hh24:mi:ss，所以我就用了这个做例子，是/的格式，就不用replace了。
  let end_date = new Date(end_str);//将字符串转化为时间
  let sta_str = (smallTime).replace(/-/g, "/");
  let sta_date = new Date(sta_str);
  let num = (end_date - sta_date) / (1000);//求出两个时间的时间差，这个是秒
  let second = parseInt(Math.ceil(num));

  return secondToHSM(second)
};

/**
 * 把秒转换为 时分秒
 * @param second
 * @returns {string}
 */
let secondToHSM = function (second) {

  let h = Math.floor(second / 3600) < 10 ? '0' + Math.floor(second / 3600) : Math.floor(second / 3600);
  let m = Math.floor((second / 60 % 60)) < 10 ? '0' + Math.floor((second / 60 % 60)) : Math.floor((second / 60 % 60));
  let s = Math.floor((second % 60)) < 10 ? '0' + Math.floor((second % 60)) : Math.floor((second % 60));
  return h + ":" + m + ":" + s;

}

let formatSeconds = value => {
  return value ? new Date(value).pattern('yyyy-MM-dd HH:mm:ss') : '';
};

let getUrlQuery = function (name) {
  let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  let arr = window.location.href.split('?');
  if (arr && arr.length > 1) {
    let r = arr[1].match(reg);
    if (r != null) return unescape(r[2]);
  }
  return null;
};

let getCookieQuery = function (name) {
  let arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
  if (arr = document.cookie.match(reg)) {
    return unescape(arr[2]);
  } else {
    return null;
  }
}


let utils = {
  isNumber: isNumber,
  isEmpty: isEmpty,
  checkDecimal: checkDecimal,
  arrayContains: arrayContains,
  datePattern: datePattern,
  hasPermission: hasPermission,
  calculateTime: calculateTime,
  formatSeconds: formatSeconds,
  secondToHSM: secondToHSM,
  getUrlQuery: getUrlQuery,
  getCookieQuery: getCookieQuery,
  deepClone: deepClone
};
const install = function (Vue, opts = {}) {
  Vue.prototype.$utils = utils;
  Date.prototype.pattern = datePattern;
};

export default install
