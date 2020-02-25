<template>
  <div id="home">
    <!-- 4. 在页面上使用 -->
    <Sliders></Sliders>
  </div>
</template>
 
<script>
// 2. 在页面中引用组件
import Sliders from "@/components/Sliders.vue";
export default {
  name: "home",
  // 3. 在components中声明组件
  components: {
    Sliders,
  }
};
</script>

<style>

</style>