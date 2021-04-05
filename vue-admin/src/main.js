import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 引入全局可使用的 service
import service from '@/utils/request'
Vue.prototype.$service= service

// 引入elementui 
import './utils/element.js'

//设置全局样式
import '@/assets/styles/index.scss' 

// 引入阿里巴巴矢量库图标
import '@/assets/iconfont/iconfont.css';

// 引入echarts
import * as echarts from "echarts"
Vue.prototype.$echarts = echarts


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
