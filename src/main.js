import Vue from 'vue'
import App from './App.vue'
import router from './router'
import "./assets/css/reset.css"    // css格式化
import "./assets/css/common.css"  // 公共css
import './plugins/BaaS.js'     // 知晓云sdk
import './plugins/element.js'  // 饿了么

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
