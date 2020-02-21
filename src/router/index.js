import Vue from 'vue'
import VueRouter from 'vue-router'

import Test from "../views/Test"
import Home from "../views/Home"
import ProductDetail from "../views/Product-detail.vue"
Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    redirect:"/home"
  },
  {
    name:"home",
    path: "/home",
    component: Home,
  },
  {
    name:"product-detail",
    path:"/product-detail/:id",
    component:ProductDetail
  },
  {
    name:"test",
    path: "/test",
    component: Test
  }
]

const router = new VueRouter({
  routes
})

export default router
