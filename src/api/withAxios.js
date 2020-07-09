import store from '../store/index'
import {Message} from "element-ui"
import baseUrl from "../assets/js/baseurl"

export default {
  /**
   * 请求API公用函数
   * @param httpMethod 请求方法（GET POST PUT PATCH DELETE）
   * @param urlType URL类型
   * @param path api路径
   * @param params 请求参数
   * @param success_callback
   * @param fail_callback
   */
  requestData(httpMethod, urlType, path, params, success_callback, fail_callback) {
    let token = localStorage.getItem('adminToken') || '';
    // let keepLoginToken = localStorage.getItem('keepLoginToken') || '';
    let reqUrl = '';
    let key = 'data';

    if (httpMethod === 'GET') {
      key = 'params';
    }
    if (urlType === 'wyc') {
      reqUrl = baseUrl.approvalUrl();
    }  else if (urlType === 'base') {
      reqUrl = baseUrl.dataUrl();
    }  else {
      reqUrl = baseUrl.imgUrl();
    }
    axios({
      url: path,
      method: httpMethod,
      baseURL: reqUrl,
      headers: {
        'token': token,
        'version': '1.0.0'
      },
      [key]: params || {}
    }).then(res => {
      if (res.data.code === 200) {
        success_callback && success_callback(res.data);
      } else if (res.data.code === 5002) {
        localStorage.setItem('adminToken', res.data.token);
        localStorage.setItem('userName', res.data.userName);
        localStorage.setItem('superMaster', res.data.superMaster);
        if (res.data.keepLoginToken) {
          localStorage.setItem('keepLoginToken', res.data.keepLoginToken);
        } else {
          localStorage.removeItem('keepLoginToken');
        }
        this.requestData(httpMethod, urlType, path, params, success_callback, fail_callback);
      } else if (res.data.code === 250) {

        Message.warning('登录失效，请重新登录');
        setTimeout(function () {
          store.dispatch('changeLoginStatus', false);
        }, 1000);
        return false;
      } else {
        Message.warning(res.data.msg);
        fail_callback && fail_callback(res.data);
      }
    }).catch(function (err) {

      if (err.response) {
        Message.warning('服务器异常');
        console.log('------响应错误------');
      } else if (err.request) {
        Message.warning('服务器未响应');
        console.log('------没有响应返回------');
      } else {
        console.log(err);
        
        console.log('------其他错误------');
      }

      fail_callback && fail_callback(err);
    });
  },

  exportData(method, urlType, exportUrl, params, filename, fail_callback) {
    let token = localStorage.getItem('adminToken') || '';
    let keepLoginToken = localStorage.getItem('keepLoginToken') || '';
    let reqUrl = '';
    if (urlType === 'medical') {
      reqUrl = baseUrl.medicalUrl();
    } else if (urlType === 'skill') {
      reqUrl = baseUrl.skillUrl();
    } else if (urlType === 'verification') {
      reqUrl = baseUrl.verificationUrl();
    } else if (urlType === 'pay') {
      reqUrl = baseUrl.payUrl();
    } else if (urlType === 'base') {
      reqUrl = baseUrl.dataUrl();
    } else if (urlType === 'push') {
      reqUrl = baseUrl.getPushModuel()
    } else if (urlType === 'site') {
      reqUrl = baseUrl.siteUrl()
    } else if (urlType === 'integration') {
      reqUrl = baseUrl.integrationAdminUrl()
    } else {
      reqUrl = baseUrl.dataUrl();
    }
    axios({
      url: reqUrl + exportUrl,
      responseType: 'blob',
      method: method,
      data: params || {},
      headers: {
        'token': token,
        'keepLoginToken': keepLoginToken
      },
    }).then(res => {
      if (res.data) {
        let blob = res.data;
        let reader = new FileReader();
        reader.readAsDataURL(blob); // 转换为base64，可以直接放入a标签href
        reader.onload = function (e) {
          let a = document.createElement('a');
          a.className = 'excel_box';
          a.download = filename + '.xlsx';
          a.href = e.target.result;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          window.URL.revokeObjectURL(e.target.result);
        }
      } else {
        let err = {
          code: 1,
          msg: "导出文件失败"
        };
        fail_callback && fail_callback(err);
      }
    }).catch(function (error) {
      let err = {
        code: -1,
        msg: "服务器异常"
      };
      fail_callback && fail_callback(err);
    });
  },

  exportDataWithForm(method, urlType, exportUrl, param) {
    let reqUrl = '';
    let params = '';
    let token = localStorage.getItem('adminToken') || '';
    if (param) {
      params = JSON.stringify(param);
    }

    if (urlType === 'medical') {
      reqUrl = baseUrl.medicalUrl();
    } else if (urlType === 'skill') {
      reqUrl = baseUrl.skillUrl();
    } else if (urlType === 'verification') {
      reqUrl = baseUrl.verificationUrl();
    } else if (urlType === 'pay') {
      reqUrl = baseUrl.payUrl();
    } else if (urlType === 'base') {
      reqUrl = baseUrl.dataUrl();
    } else if (urlType === 'push') {
      reqUrl = baseUrl.getPushModuel()
    } else if (urlType === 'site') {
      reqUrl = baseUrl.siteUrl()
    } else if (urlType === 'integration') {
      reqUrl = baseUrl.integrationAdminUrl()
    } else {
      reqUrl = baseUrl.dataUrl();
    }

    let turnForm = document.createElement("form");
    // 加入到body中
    document.body.appendChild(turnForm);
    turnForm.method = method;
    turnForm.action = reqUrl + exportUrl;
    // 创建隐藏表单
    let newdataParam = document.createElement("input");
    newdataParam.setAttribute("name", "dataParam");
    newdataParam.setAttribute("type", "hidden");
    newdataParam.setAttribute("value", params);
    turnForm.appendChild(newdataParam);
    turnForm.submit();
  }
}
