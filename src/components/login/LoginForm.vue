<template>
  <div class="loginWrapper">
    <el-form :model="loginForm" :rules="rules" ref="loginForm">
      <!-- 用户名输入框 -->
      <el-form-item prop="username">
        <el-input placeholder="请输入用户名" v-model="loginForm.username"></el-input>
      </el-form-item>
      <!-- 密码输入框 -->
      <el-form-item prop="password">
        <el-input placeholder="密码" type="password" v-model="loginForm.password"></el-input>
      </el-form-item>
      <div>
        <el-link target="_blank" @click="loginWithWechat">微信登陆</el-link>
      </div>
    </el-form>
    <!-- 登陆按钮 -->
    <el-button
      type="primary"
      @click="handleSubmit('loginForm')"
      class="button"
      v-loading.fullscreen.lock="fullscreenLoading"
    >登陆</el-button>
  </div>
</template>
<script>
import Account from "@/api/Account.js";
export default {
  mounted() {
    console.log(this.$store);
  },
  data() {
    return {
      fullscreenLoading: false,
      loginForm: {
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
          this.fullscreenLoading = true;
          Account.userLogin(this.loginForm, user => {
            console.log(user);
            localStorage.setItem("user", JSON.stringify(user));
            this.$store.store.dispatch("setUser", JSON.stringify(user));
            console.log(this.$store.store.state);
          });
          setTimeout(() => {
            if (this.$store.store.state.isLogin) {
              this.fullscreenLoading = false;
              this.$message.success("登录成功");
              this.$router.push("/");
            } else {
              this.fullscreenLoading = false;
              this.$message.error("登录失败 用户名或密码错误");
            }
          }, 500);
        } else {
          console.log("error submit");
          return false;
        }
      });
    },

    //微信登陆
    loginWithWechat() {}
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