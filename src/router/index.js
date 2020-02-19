import Vue from 'vue'
import VueRouter from 'vue-router'
import Test from "../views/Test"
Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    component: Test
  }
]

const router = new VueRouter({
  routes
})

export default router
