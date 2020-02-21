<template>
  <div class="product-detail">
    <div class="detail-top">
      <div class="gallery">
        <div class="avatar"><img :src="avatar_url"></div>
        <ul class="thumbs">
          <li @mouseover="showAvatarImage(index)" :class="{'thumbs-active':img.active}" class="thumbs-item" v-for="(img,index) in images" :key="index"><img :src="img.url"></li>
        </ul>
      </div>
      <div class="summary">
        <div class="info">
          <h1><span class="title">MODAN家庭矿机 基础版</span><span class="futures">预售</span></h1>
          <div class="dimensions">
            <p><i class="iconfont iconfahuo"></i><span>发货时间：2020.03.15-2020.06.01</span></p>
            <p><i class="iconfont iconbanben"></i><span>版本：基础版</span></p>
          </div>
        </div>
        <div class="price-value clearfix">
          <div class="price text-primary">¥6000.00</div>
          <div class="stepper-radio">
            <button ><i class="iconfont iconminus"></i></button>
            <input class="deal" type="number" v-model="count">
            <button @click="addCount()"><i class="iconfont iconadd"></i></button>
          </div>
        </div>
        <div class="action">
          <button class="bt-button bt-primary">加入购物车</button>
          <button class="bt-button bt-driving">立即购买</button>
        </div>
      </div>
    </div>
    <div class="detail-bottom"></div>
  </div>
</template>

<script>
import ProductApi from "../api/Product";

export default {
  data() {
    return {
      product: null,
      count:1,      // 商品数量
      images:[],  // 轮播小图
      // 大图地址
      avatar_url:"https://file.bitmain.com/shop-image-storage/product/2019/10/09/16/07da91be-c9a8-429f-81d0-c6d75832a8b9_240.png",
    };
  },
  created() {
    ProductApi.getProductItem(this.$route.params.id, data => {
      this.product = data

      // 格式化轮播数据
      data.images.forEach((ele,index)=>{
        if(index == 0){
          // 默认选择第一张图片
          this.images.push({url:ele,active:true})
        }else{
          this.images.push({url:ele,active:false})
        }
      })
    });
  },
  methods: {
    addCount(){
      // TODO 
      if(this.count == this.product.limited_count){
        this.$message(`每人限购${this.product.limited_count}`)
        return
      }
      this.count++
    },
    showAvatarImage(index){
      // 大图 与 轮播图
      this.images.forEach(ele => {
        ele.active = false
      });
      this.images[index].active = true
      this.avatar_url = this.images[index].url
    }
  }
};
</script>

<style lang="scss" scoped>
.product-detail{ 
  font-size: 0;
  width: 100%;
  margin: 0 auto;
  .detail-top{
    margin-top:60px; 
    .gallery{
      // 商品左边
      vertical-align: top;
      display: inline-block;
      .avatar{
        height: 507px;
        width: 540px;
      }
      .thumbs{
        margin-top:50px; 
        .thumbs-item{
          box-sizing: border-box;
          display: inline-block;
          margin-left: 10px;
          width: 64px;
          height: 48px;
          border: 1px #ddd solid;
          &:nth-child(1){
            margin-left: 0px;
          }
          &.thumbs-active{
            border-color: #3581ff;
            box-shadow: 0 0 0 1px #3581ff;
          }
        }
      }
    }
    .summary{
      // 商品右边属性
      display: inline-block;
      h1{
        font-size: 30px;
        font-weight: 500;
        line-height: 42px;
        span{
          display: inline-block;
          vertical-align: middle;
          &.futures{
            background: #00c867;
            border-radius: 3px;
            color: #fff;
            font-size: 14px;
            font-weight: 400;
            line-height: 32px;
            margin-left: 5px;
            padding: 0 16px;        
          }
        }
      }
        // 发货 版本 
      .dimensions{
        margin-top:50px; 
        width: 100%;
        padding: 10px;
        p{
          height: 36px;
          margin-bottom:20px; 
          line-height: 18px;
          font-size: 18px;
          .iconfont{
            font-size: 25px;
            margin-right:20px; 
          } 
        }
      }
      // 价格 数量
      .price-value{
        text-align: center;
        padding:40px 0;
        font-size: 24px;
        .price{
          line-height: 33px;
          float: left;
        }
        .stepper-radio{
          float: right;
          input{
            width: 53px;
            height: 30px;
            border: 1px solid #eee;
            border-width: 0;  // input边框
            outline: none;   // input蓝边框
            color: #666;
            font-size: 14px;
            text-align: center;
          }
          & > button{
            border-radius: 50%;
            width: 36px;
            height: 36px;
            color: #666;
            font-size: 18px;
            background-color: #fff;
            border: 1px solid #ddd;
            outline: none;
            user-select: none;
            cursor: pointer;
          }
          & > button:disabled{
            background-color: #f9f9f9;
            border-color: #ddd;
            box-shadow: none;
            color: #888;
            cursor: not-allowed;
          }
        }
      }
      // 购物按钮
      .action{
        margin-top:50px; 
        .bt-button{
          display: inline-block;
          height: 70px;
          width: 260px;
          font-size: 16px;
          border: 1px solid transparent;
          border-radius: 4px;
          cursor: pointer;
          padding: 12px 20px;
          text-align: center;
          transition: .2s;
          &:nth-child(2){
            margin-left: 20px
          }
        }
      }
    }
  }
}
</style>