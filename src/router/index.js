import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home'
import Login from '../views/Login'
import Test from "../views/Test"
import ProductDetail from "../views/Product-detail.vue"
Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    component: Home
  },
  {
    path:"/login",
    component:Login
    // redirect:"/home"
  },
  // {
  //   name:"home",
  //   path: "/home",
  //   component: Home,
  // },
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
