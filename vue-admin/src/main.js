import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 引入交互
import axios from 'axios'
Vue.prototype.$http= axios

// 引入elementui 
import './utils/element.js'

//设置全局样式
import '@/assets/styles/index.scss' 

// 引入阿里巴巴矢量库图标
import '@/assets/iconfont/iconfont.css';



Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
