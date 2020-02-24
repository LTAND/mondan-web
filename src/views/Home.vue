<template>
  <div id="app">
    <!-- 4. 在页面上使用 -->
    <Header></Header>
    <Sliders></Sliders>
    <Footer></Footer>
  </div>
</template>
 
<script>
// 2. 在页面中引用组件
import Footer from "@/components/Footer.vue";
import Sliders from "@/components/Sliders.vue";
import Header from "@/components/Header.vue";
export default {
  name: "app",
  // 3. 在components中声明组件
  components: {
    Header,
    Footer,
    Sliders,
  }
};
</script>

<style>

</style>