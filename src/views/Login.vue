<template>
  <div id="login">
    <!-- 4. 在页面上使用 -->
    <LoginTab></LoginTab>
  </div>
</template>

<script>
// 2. 在页面中引用组件
import LoginTab from "@/components/LoginTab.vue"
export default {
  name: "login",
  // 3. 在components中声明组件
  components: {
    LoginTab,
  }
};
</script>

<style>

</style>