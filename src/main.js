import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from '@/vuex/store'
import "./assets/css/reset.css"    // css格式化
import "./assets/css/common.css"  // 公共css
import './plugins/BaaS.js'     // 知晓云sdk
import './plugins/element.js'  // 饿了么

Vue.config.productionTip = false

new Vue({
  router,
  store,
  // created() {
  //   if (sessionStorage.getItem("isLogin") === null){
  //     sessionStorage.setItem("isLogin","false");
  //   }
  //   this.$store.store.state.isLogin = sessionStorage.getItem("isLogin");
  // },
  render: h => h(App)
}).$mount('#app')
