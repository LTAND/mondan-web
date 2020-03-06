<template>
  <div class="container">
    <el-row type="flex" justify="center" align="middle" class="main">
      <div class="form-wrapper">
        <el-row type="flex" justify="center" class="tabs">
          <span
            :class="{active:currentTab === index}"
            v-for="(item,index) in ['登录','注册']"
            :key="index"
            @click="handleChangeTab(index)"
          >{{item}}</span>
        </el-row>
        <!-- 登录表单组件 -->
        <LoginForm v-if="currentTab == 0"/>

        <!-- 注册表单组件 -->
        <Registered v-if="currentTab == 1"/>
      </div>
    </el-row>
  </div>
</template>

<script>
import LoginForm from "@/components/login/LoginForm";
import Registered from "@/components/login/Registered";
export default {
  data() {
    return {
      currentTab: 0 //初始化当前tab栏
    };
  },

  methods: {
    handleChangeTab(index) {
      //修改current
      this.currentTab = index;
    }
  },

  components: {
    LoginForm,
    Registered,
  }
};
</script>

<style lang="scss" scoped>
  .container{
    // background: url(@/assets/img/banner1.png) center 0;
    background: #ccc;
    height: 700px;
    .main{
      height: 100%;
      margin: 0 auto;
      position: relative;
      .form-wrapper{
        width: 400px;
        margin: 0 auto;
        background: #fff;
        box-shadow: 2px 2px 0 #ccc;
        overflow: hidden;
        .tabs{
          span{
            display: block;
            width: 50%;
            height: 50px;
            box-sizing: border-box;
            border-top: 2px #eee solid;
            background: #eee;
            line-height: 48px;
            text-align: center;
            cursor: pointer;
            color: #666;
            &.active{
              color: skyblue;
              border-top-color: skyblue;
              font-weight: bold;
            }
          }
        }
      }
    }
  }
</style>