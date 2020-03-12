<template>
  <div id="app">
    <el-scrollbar style="height:100%">
      <el-container>
        <el-header>
          <Header></Header>
        </el-header>
        <el-main>
          <router-view />
        </el-main>
        <el-footer>
          <Footer></Footer>
        </el-footer>
      </el-container>
    </el-scrollbar>
  </div>
</template>
<script>
import Header from "./components/Header.vue";
import Footer from "./components/Footer";

export default {
  components: {
    Header,
    Footer
  }
};
</script>

<style lang="scss">
//清除element横向滚动条
body {
  .el-scrollbar__wrap {
    overflow-x: hidden;
  }
}
#app {
  margin: auto;
  el-container {
    width: 100%;
    margin: auto; 
    el-main{
      height: 100%;
      padding: 0;
    } 
  }
}
@media screen and (max-width: 768px) {
}
@media screen and (min-width: 768px) {
}
@media screen and (min-width: 1024px) {
}
@media screen and (min-width: 1200px) {
}
</style>
