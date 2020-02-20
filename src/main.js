import Vue from 'vue'
import App from './App.vue'
import router from './router'

import "./assets/css/rest.css"  // css格式化

import './plugins/BaaS.js'     // 知晓云sdk
import './plugins/element.js'  // 饿了么

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
