<template>
  <div class="page-cart">
    <el-row>
      <el-col
        v-if="cart.length" :span="24" class="m-cart">
        <cart-list @select="changeItemCount" @select-delete="handleDelete" :cart-list-data="cart"/>
        <p> 应付金额：<em class="money">￥{{total}}</em> </p>
        <el-button type="primary">提交订单</el-button>
      </el-col>
      <el-col v-else class="empty">购物车为空</el-col>
    </el-row>
  </div>
</template>

<script>
import CartList from "../components/Cart-list"
import {cartStorage} from "../utils/cache.js"

export default {
  data () {
    return {
      cart:cartStorage.getCache()
    };
  },

  components: {
    CartList,
  },
  created(){
  },
  computed: {

    total(){
      // 应付金额
      let total = 0
      this.cart.forEach(item=>{
        total+= item.now_price * item.count
      })
      return total
    }
  },

  methods: {
    changeItemCount(item){
      cartStorage.setCache(this.cart)
    },
    handleDelete(index){
      // let index = this.cart.findIndex(p=>{return p.id == item.id})
      this.cart.splice(index, 1)
      cartStorage.setCache(this.cart)
    }
  }
}

</script>
<style lang='scss' scoped>
</style>
