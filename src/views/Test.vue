<template>
  <div class="test">
    <h1>test router</h1>
  </div>
</template>

<script>
import { showHErrorMsg } from "../utils/util.js"; // 根据错误码返回信息
import { config } from "../utils/config.js"; // 配置密钥
import Product from "../api/Product";

export default {
  data() {
    return {
      user: null,
      productList:[]
    };
  },
  created() {
    // 初始化 BaaS 对象
    this.$BaaS.init(config.clientID);
    
    Product.findProductList(data => {
      this.productList = data
    });

  },
  methods: {

    // 获取当前用户
    getCurrentUser() {
      this.$BaaS.auth
        .getCurrentUser()
        .then(user => {
          // user 为 currentUser 对象
          this.user = user;
          return user;
        })
        .catch(err => {
          // HError
          showHErrorMsg(err);
        });
    },

    // 匿名登录
    anonymousLogin() {
      this.$BaaS.auth
        .anonymousLogin()
        .then(user => {
          this.user = user;
        })
        .catch(err => {
          // HError
         showHErrorMsg(err);
        });
    }
  }
};
</script>

<style>
</style>