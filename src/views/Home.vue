<template>
<<<<<<< HEAD
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
=======
  <div class="home">
    <h1>home page</h1>
    <product></product>
  </div>
</template>

<script>
import Product from "../components/Product"
export default {
  components:{
    Product,
  }
}
>>>>>>> 5538dbc810430aa749baf77feb460cb496df475d
</script>

<style>

</style>