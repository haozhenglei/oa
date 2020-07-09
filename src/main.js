// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import "babel-polyfill"
import Vue from 'vue'
import App from './App'
import router from './router/index'
import store from './store/index'
import ElementUI from 'element-ui'
import VueClipboard from 'vue-clipboard2'
import Utils from './utils/utils'
import Filters from './utils/filters'
import Validator from './utils/validator'
import './assets/font-icon/iconfont.css';
import echarts from 'echarts'
import md5 from 'js-md5';
import moment from 'moment'
import Blob from './vendor/Blob'
import Export2Excel from './vendor/Export2Excel.js'
import $ from 'jquery'
// import VueJsonp from 'vue-jsonp'
// Vue.use(VueJsonp)


Vue.filter('dateFmt', (input, formatString = "YYYY-MM-DD") => {
    //es5函数参数设置默认值
    //const lastFormatString = formatString || ''
    
     // moment(input) 把时间字符串转成时间对象
     // format(formatString) 把时间对象，按照指定格式，格式化成符合条件的字符串
    return moment(input,'YYYY-MM-DD HH:mm:ss').format(formatString)
})

Vue.prototype.$md5 = md5;
Vue.prototype.$echarts = echarts
Vue.use(ElementUI)
Vue.use(VueClipboard)
Vue.use(Utils)
Vue.use(Filters)
Vue.use(Validator)
Vue.config.productionTip = false
VueClipboard.config.autoSetContainer = true

new Vue({
	el: '#app',
  store,
	router,
	template: '<App/>',
	components: {
		App
	}
});
