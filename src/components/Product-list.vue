<template>
  <div class="poduct">
    <ul>
      <router-link tag="li" class="product-item" :to="{ name:'product-detail', params:{id:item.id} }" v-for="item in productList" :key="item._id">
        {{item.name}}{{item}}
      </router-link>
    </ul>
  </div>
</template>

<script>
import ProductApi from "../api/Product.js"
import { config } from "../utils/config.js";  // 配置密钥

export default {
  data(){
    return{
      productList:[]
    }
  },
  created(){
    this.$BaaS.init(config.clientID);

    ProductApi.findProductList(data => {
      this.productList = data
      console.log(data)
    });
  },
  methods:{

  }
}
</script>

<style lang="scss" scoped>
.product-item{
  width: 450px;
  background: red;
  margin-bottom: 10px;
}
</style>