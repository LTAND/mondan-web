<template>
  <div class="order">
    <div class="title">填写并核对订单信息</div>
    <div class="container">
      <div class="item address-list">
        <span class="add-address" @click="addAddress()">新增收货地址</span>
        <h3 class="head">收件人信息</h3>
        <ul class="body">
          <li class="address-row" v-for="(item, index) in addressList" :key="item.id">
            <p :class="{'btn-active': item.status==1?true:false}" class="body-btn">{{item.contact}}</p>
            <p class="body-info">{{item.province}} {{item.city}} {{item.district}} {{item.address}} {{item.phone}}</p>
            <p v-show="item.status == 1" class="default">默认地址</p>
            <p class="body-info"><span v-show="item.status == 0" class="address-edit">设为默认地址</span> <span @click="editAddress(item)" class="address-edit">编辑</span> <span @click="deleteAddress(item.id,index)" class="address-edit">删除</span></p>
          </li>
        </ul>
      </div>
      <div class="item">
        <h3 class="head">支付方式</h3>
        <ul class="body">
          <li>
            <p class="body-btn btn-active">在线支付</p>
          </li>
        </ul>
      </div>
      <div class="item">
        <h3 class="head">送货清单</h3>
        <ul class="body">
          <li class="delivery-list">
            <h3 class="head">配送方式: </h3>
            <ul class="body"><li><p class="body-btn btn-active">顺丰快递</p></li></ul>
          </li>
          <li class="goods-list">
            <h3 class="head">商品清单: </h3>
            <ul class="body">
              <li class="good" v-for="(good,index) in goods" :key="index">
                <span class="cover"><img :src="good.cover_image"></span>
                <span class="desc">{{good.name}}</span>
                <span class="price">￥{{good.now_price | NumFormat(2)}}</span>
                <span class="count">X {{good.count}}</span>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
    <div class="footer">
      <div class="clearfix">
        <div class="fl-right">
          <div class="desc clearfix"><span style="color:red">{{allCount}}</span>件商品, 总商品金额：<p class="money">￥{{total | NumFormat(2)}}</p></div>
          <div class="desc">运费：<p class="money">{{0 | NumFormat(2)}}</p></div>
        </div>
      </div>
      <div  class="make-sure clearfix">
        <div class="fl-right">
          <div class="desc clearfix">应付金额：<p class="money">￥{{total | NumFormat(2)}}</p></div>
          <div class="desc" style="color:#ada5a5">寄送至：广东省上海市普陀区金沙江路  收货人：张三 123456789</div>
        </div>
      </div>
      <div class="btn-order clearfix"><button class="fl-right">提交订单</button></div>
    </div>
    <div class="address-form-wrapper">
      <address-form :formType="formType" :userId="userId" :title="addressTitle" :addressForm="addressFormData" @save="savaAddress" ref="addressFormRef"></address-form>
    </div>
  </div>
</template>

<script>
import {cartStorage, userStorage} from "../utils/cache.js"
import AddressForm from "../components/Address-form"
import AccountApi from "../api/Account.js";
import AddressApi from "../api/Address"

export default {
  components:{
    AddressForm,
  },
  created(){
    AddressApi.findList(this.userId, res=>{
      this.addressList = res.data.objects
      console.log(res)
    })
    AccountApi.getUserInfo(data=>{
      console.log('user: ', data);
    })
  },
  computed:{ 
    allCount(){
      let count =0
      this.goods.forEach(ele => {
        count += ele.count
      });
     return count
    },
    total(){
      let total = 0
      this.goods.forEach(ele => {
        total += ele.now_price * ele.count
      });
      return total
    }  
  },
  data() {
    return {
      goods:cartStorage.getCache(),     // 购物车
      addressList:[],                   // 用户所有地址
      userId:(userStorage.getCache()).id, // 传入地址表单用户id
      formType:"save_form",             // 地址表单类型 save_form || edit_form
      addressTitle: "",                 // 传入地址表单标题
      addressFormData: {                // 传入地址表单数据结构
        status: 0,                       // 地址状态，1默认地址
        contact: "",                     // 收货人姓名
        phone: "",                       // 收货人手机号
        address: "",                     // 详细地址
        area: [],                        // 存放城市默认值
        zipcode: "",                     // 邮政编码
        country: "中国",                 // 国家
        province: "",                    // 省份
        city: "",                        // 市
        district: "",                    // 区
      },
    };
  },
  methods:{
    addAddress(){
      // 用户最大三条地址可添加
      if(this.addressList.length<3){
        this.addressTitle = "新增收货地址"
        this.formType = "save_form"
        this.$refs.addressFormRef.show()
      }else{
        alert("每个用户最多三条地址")
      }
    },
    /**
     * 删除地址
     * recordId 地址id
     */
    deleteAddress(recordId,index){
      AddressApi.deleteRecord(recordId, res=>{
        if(res.status == 204){
          this.addressList.splice(index, 1)
        }else{
          alert("删除失败，稍后再试")
        }
      })
    },
    savaAddress(form){
      // 保存完地址表单，通知重新请求
      AddressApi.findList(this.userId, res=>{
        this.addressList = res.data.objects
      })
    },
    editAddress(record){
      // TODO 编辑地址
      this.addressTitle = "编辑收货地址";
      this.formType = "edit_form"
      this.addressFormData = JSON.parse(JSON.stringify(record))
      this.$refs.addressFormRef.show()
    }
  }
};
</script>
<style lang='scss' scoped>
.desc{
  line-height: 28px;
  padding: 5px 10px;
  .money{
    float:right;
    margin-left:20px;
  }
}

.order{
  position: relative;
  width: 100%;
  font-size: 0;
  .address-form-wrapper{
    position: absolute;
    top:50%;
    left: 50%;
    transform: translate(-50%,-75%);
  }
  .title{
    font-size: 16px;
    font-weight: bold;
    padding: 25px 0 20px 0;
  }
  .container{
    border: 1px solid #ccc;
    font-size: 14px;
    padding: 45px 30px;
    .add-address{
      position: absolute;
      cursor: pointer;
      top:0;
      right:0;
      &:hover{
        color:#3581ff;
      }
    }    
    .address-list{
      position: relative;
      .address-row{
        &:hover{
          background: #eaf3ff;
        }
        .address-edit{
          cursor: pointer;
          &:hover{
            color:#3581ff;
          }
        }
      }
    }
    .item{
      border-bottom: 1px solid #ccc;
      padding-bottom:20px;
      margin-bottom: 40px;
      .head{
        font-weight: bold;
        padding-bottom: 20px;
      }
      .body{
        padding-left:30px; 
        li{
          margin-bottom:10px;
          &.delivery-list{
            background: #F2F4F2; 
            padding: 20px;
          }
          &.goods-list{
            background: #eaf3ff;  
            padding: 30px;
            .good{
              display: flex;
              justify-content:space-between;
              align-items:center;
              & >span{
                &.cover{
                  background:#fff;  
                  width: 100px;
                  height: 100px;
                }
                &.price{
                  font-weight: bold;
                  color:rgb(231, 28, 21);
                }
              }
            }
          }
          p{
            display: inline-block;
            margin-left:18px;
            &:first-child{
              margin-left:0;
            }
            &.body-btn{
              font-size: 14px;
              padding:8px 24px;
              border: 1px solid #ccc;
              &.btn-active{
                border: 1px solid #3581ff;
                box-shadow: 0 0 0 1px #3581ff;
              }
              &:hover{
                border: 1px solid #3581ff;
                box-shadow: 0 0 0 1px #3581ff;
              }
            }
            &.body-info{
              font-size: 14px;
            }
            &.default{
              padding:6px 8px;
              font-size: 14px;
              color: #fff;
              background: #858685;
            }
          }
        }
      }
    }
  }
  .footer{
    font-size: 14px;
    .make-sure{
      margin-top: 10px;
      background: #F2F4F2;
      .money{
        color:red;
        font-size: 18px;
        font-weight: bold;
      }
    }
    .btn-order{
      margin-top:20px;
      button{
        color: #fff;
        font-size: 18px;
        font-weight: bold;
        background: #3581ff;
        cursor: pointer;
        border: 1px solid transparent;
        padding: 20px 60px;
      }
    }
  }
}
</style>
