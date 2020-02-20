<template>
  <div class="product-detail">
    <h1>product-detail</h1>
    <h1>{{product_id}}</h1>
  </div>
</template>

<script>
import ProductApi from "../api/Product"
export default {
  data(){
    return{
      product_id:this.$route.params.id,
    }
  },
  created(){
  },
  methods:{

  }
}
</script>

<style>

</style>