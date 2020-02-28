<template>
  <div id="app">
    <!-- 4. 在页面上使用 -->
    <Header></Header>
    <LoginTab></LoginTab>
    <Footer></Footer>
  </div>
</template>

<script>
// 2. 在页面中引用组件
import Footer from "@/components/Footer.vue";
import LoginTab from "@/components/LoginTab.vue"
import Header from "@/components/Header.vue";
export default {
  beforeRouteEnter:(to,from,next)=>{
    //组件内守卫
    next(vm =>{
      vm.$store.store.dispatch("setUser",null);
    })
  },
  name: "app",
  // 3. 在components中声明组件
  components: {
    Header,
    Footer,
    LoginTab,
  }
};
</script>

<style>

</style>