<template>
  <div id="userInfo">
    <div class="userbanner">
      <div class="u-title">欢迎，{{JSON.parse(this.$store.store.state.userInfo)._username}}</div>
    </div>
    <div class="user-wrap">
      <el-tabs>
        <el-tab-pane label="个人信息">
          <UserInfo></UserInfo>
        </el-tab-pane>
        <el-tab-pane label="地址管理">
          <UserAddress></UserAddress>
        </el-tab-pane>
        <el-tab-pane label="我的订单">
          <OrderShow></OrderShow>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import UserInfo from "../components/UserInfo.vue";
import OrderShow from "../components/OrderShow.vue";
import UserAddress from "../components/User-address.vue"
export default {
  name: "userInfo",
  components: {
    UserInfo,
    OrderShow,
    UserAddress
  }
};
</script>

<style lang="scss" scoped>
#userInfo {
  width: 88%;
  margin: 0 auto;
  .userbanner {
    margin-top: 1px;
    background-color: #8ec5fc;
    background-image: linear-gradient(62deg, #8ec5fc 0%, #e0c3fc 100%);
    height: 120px;
    line-height: 120px;
    text-align: center;
    font-size: 24px;
    color: #666;
    .u-title{
      border: 5px solid white;
      padding: 12px 18px;
      display: inline;
      box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1);
    }
  }
}
</style>