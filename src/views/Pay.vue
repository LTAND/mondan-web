<template>
  <div class="wxpay-wrapper">
    <h1>订单提交成功, 请您及时付款！</h1>
    <div class="order-title">
      <div>
        <p>订单编号：{{trade_no}}</p>
        <p>订单类型：1231231231</p>
      </div>
      <div>应付金额：￥{{ totalCost |NumFormat(2)}}</div>
    </div>
    <div class="order-pane">
      <ul class="tabs">
        <li class="tab" :class="{'active': tabActive==index?true:false}" @click="onTabPane(index)" v-for="(tab, index) in tabs" :key="index">{{tab.label}}</li>
        <li style="flex-grow:1;border-bottom:1px solid #ccc;"></li>
      </ul>
      <div class="tabs-pane">
        <div class="pane-item">
          <img class="wepaylogo" src="../assets//img/wxpay/WePayLogo.png" alt="">
          <div class="paycode-wrapper" v-show="ishow">
            <div class="qrcode" ref="qrcode"></div>
            <img class="codetip" src="../assets//img/wxpay/codetip.png" alt="">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import QRCode from 'qrcodejs2'
import axios from "axios"
export default {
  created(){
    this.getQrcodeLink()
  },
  data(){
    return {
      tabs:[
        {
          label:"微信支付",
          value:"wxpay_native"
        },
        {
          label:"支付宝支付",
          value:"2222"
        },
        {
          label:"第三方支付",
          value:"3333"
        },
      ],
      tabActive: 0,
      ishow: true,  // 二维码显示隐藏

      // 支付接口参数
      gatewayType: 'weixin_tenpay_native',
      merchandiseDescription: '矿机订单总价1',  // 商品描述
      totalCost: 1,     // 元
      trade_no:0
    }
  },
  methods:{
    // 点击tab，切换面板内容
    onTabPane(index){
      console.log(index)
    },
    // 关闭弹框,清除已经生成的二维码
    closeCode() {
      this.ishow = false
      this.$refs.qrcode.innerHTML = ''
    },

    // 请求二维码链接
    getQrcodeLink() {
      axios.get(`http://pay.yeahyeahyeah.cn/api/v1/unifiedorder?total=${this.totalCost}`).then(response=> {
        if (response.data.error == 10001 ) {
          // handle success
          this.closeCode()
          this.crateQrcode(response.data.code_url)
          this.trade_no =response.data.trade_no
        }
        console.log('response: ', response);
      }).catch(err=>{
        // handle fail
        console.log('err: ', err);
      })
    },

    // 生成二维码
    crateQrcode(code_url) {
      let qrcode = new QRCode(this.$refs.qrcode, {
        width: 174,
        height: 174,           // 高度
        text: code_url,         // 二维码内容
        render: 'canvas',       // 设置渲染方式（有两种方式 table和canvas，默认是canvas）
        background: '#f0f',   // 背景色
        foreground: '#ff0',    // 前景色
      })
      this.ishow = true
    },
  }
}
</script>

<style lang="scss" scoped>
.wxpay-wrapper{
  padding: 0 50px;
  h1{
    font-size: 22px;
    font-weight: bold;
    margin: 20px 0;
  }
  .order-title{
    padding: 40px 80px 40px 40px;
    display: flex;
    justify-content:space-between;
    align-items: center;
    background: #F2F2F2;
    p{
      padding: 10px
    }
  }
  .order-pane{
    margin:50px 40px 0 40px;
    .tabs{
      display: flex;
      .tab{
        padding: 10px 50px;
        border:1px solid #A1A1A1;
        border-radius: 2px;
        background: #E4E4E4;
        cursor: pointer;
        &.active{
          border-bottom: 0px solid #fff;
          background: #fff;
        }
      }
    }
    .tabs-pane{
      border-radius: 2px; 
      border:1px solid #A1A1A1;
      border-top: none;
      .pane-item{
        padding: 50px 50px;
        display: flex;
        .wepaylogo{
          width: 120px;
          height: 32px;
        }
        .paycode-wrapper{
          margin-left: 50px;
          .qrcode{
            width: 174px;
            height: 174px;
          }
          .codetip{
            margin-top:15px; 
            width: 174px;
            height: 58px;
          }
        }
      }
    }
  }
}
</style>