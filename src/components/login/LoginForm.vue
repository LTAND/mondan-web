<template>
  <div class="loginWrapper">
    <el-form :model="form" :rules="rules" ref="loginForm">
      <!-- 用户名输入框 -->
      <el-form-item prop="username">
        <el-input placeholder="请输入手机号" v-model="form.username"></el-input>
      </el-form-item>
      <!-- 密码输入框 -->
      <el-form-item prop="password">
        <el-input placeholder="密码" type="password" v-model="form.password"></el-input>
      </el-form-item>
      <div><el-link target="_blank" @click="loginWithWechat">微信登陆</el-link></div>
    </el-form>
    <!-- 登陆按钮 -->
    <el-button type="primary" @click="handleSubmit('loginForm')" class="button">登陆</el-button>
  </div>
</template>
<script>
import BaaS from 'minapp-sdk';
export default {
  data() {
    return {
      form: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    //提交登陆事件
    handleSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          //调用登陆接口
          console.log("ok")
        } else {
          
          return false;
        }
      });
      //console.log(this.form)
    },
    loginWithWechat(){

    }
  }
};
</script>
<style lang="scss">
.loginWrapper {
  padding: 25px;
  button {
    width: 100%;
    margin-top: 20px;
  }
}
</style>