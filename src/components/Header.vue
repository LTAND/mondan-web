<template>
  <div class="header">
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      router
      @select="handleSelect"
    >
      <el-menu-item
        v-for="(item, index) in navList"
        :index="item.path"
        :route="item.path"
        :key="index"
      >{{item.text}}</el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: "/home",
      navList: [
        { path: "/home", text: "主页" },
        { path: "/test", text: "测试" }
      ]
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>

<style>
</style>