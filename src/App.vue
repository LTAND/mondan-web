<template>
  <div id="app">
    <el-container>
      <el-header><Header></Header></el-header>
      <el-main>
        <router-view />
      </el-main>
      <el-footer>
        <Footer></Footer>
      </el-footer>
    </el-container>
  </div>
</template>
<script>
import Header from "./components/Header.vue"
import Footer from "./components/Footer"

export default {
  components:{
    Header,
    Footer
  }
};
</script>

<style lang="scss" scoped>
#app{
  margin: auto;
  el-container{
    width: 100%;
    margin: auto;
  }
}
</style>
