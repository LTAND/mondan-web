<template>
  <div class="test">
    <h1>test page</h1>
    <product-list></product-list>
  </div>
</template>

<script>
import { showHErrorMsg } from "../utils/util.js"; // 根据错误码返回信息
import { config } from "../utils/config.js"; // 配置密钥
import ProductList from "../components/Product-list"

import Product from "../api/Product";
import AddressApi from "../api/Address"


export default {
  data() {
    return {
      user: null,
      productList:[],
      book:{
        user_id: 1,     // 用户id
        contact: "阿斯顿撒",          // 收货人姓名
      }
    };
  },
  components:{
    ProductList,
  },
  created() {
    // BookApi.addBook(this.book,data=>{
    //   console.log("data:",data)
    // })
    // AddressApi.addAddressRecord(this.book,data=>{
    //   console.log(data)
    // })
    Product.findProductList(data => {
      this.productList = data
    });
    // Product.addProductRecord(data => {
    //   console.log('data: ', data);
    // });

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