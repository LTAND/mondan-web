import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/Home'
import Login from '../views/Login'
import Test from "../views/Test"
import Cart from "../views/Cart"
import Order from "../views/Order"
import User from "../views/User"
import ProductDetail from "../views/Product-detail.vue"

import { userStorage} from "../utils/cache"
Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    redirect: "/home"
  },
  {
    path: "/login",
    component: Login
  },
  {
    name: "home",
    path: "/home",
    component: Home,
  },
  {
    name: "product-detail",
    path: "/product-detail/:id",
    component: ProductDetail
  },
  {
    name: "cart",
    path: "/cart",
    component: Cart,
    meta:{
      requiredLogin: true    // 需要登录的页面
    }
  },
  {
    name:"order",
    path: "/order",
    component: Order,
    meta:{
      requiredLogin: true   // 需要登录的页面
    }
  },
  {
    name:"test",
    path: "/test",
    component: Test
  },
  {
    name: "user",
    path: "/user/:id",
    component: User
  }
]


let router = new VueRouter({
  routes
})

router.beforeEach((to,from,next)=>{
  let user = userStorage.getCache()
  if(user){
    // 已登录
    next()
  }else{
    // 未登录
    if(to.meta.requiredLogin){
      // 拦截要求登录的页面，跳转登录页
      next({path:"/login"})
    }
    next()
  }
  // if(!user && to.meta.requiredLogin){
  //   // 拦截要求登录的页面，跳转登录页
  //   next({path:"/login"})
  // }
  // next()
})


export default router
