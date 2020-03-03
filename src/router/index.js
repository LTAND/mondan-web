import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/Home'
import Login from '../views/Login'
import Test from "../views/Test"
import Cart from "../views/Cart"
import Order from "../views/Order"
import ProductDetail from "../views/Product-detail.vue"

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    redirect:"/home"
  },
  {
    path:"/login",
    component:Login
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
    name: "cart",
    path: "/cart",
    component: Cart
  },
  {
    name:"order",
    path: "/order",
    component: Order
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
