<template>
  <div class="registerWrapper">
    <el-form :model="registerForm" :rules="rules" ref="registerForm">
      <!-- 用户名输入框 -->
      <el-form-item prop="username">
        <el-input placeholder="请输入用户名" v-model="registerForm.username"></el-input>
      </el-form-item>
      <!-- <el-form-item placeholder="验证码"></el-form-item> -->
      <!-- 密码输入框 -->
      <el-form-item prop="password">
        <el-input
          placeholder="请输入密码"
          type="password"
          v-model="registerForm.password"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <!-- 确认密码输入框 -->
      <el-form-item prop="checkPassword">
        <el-input
          placeholder="确认密码"
          type="password"
          v-model="registerForm.checkPassword"
          autocomplete="off"
        ></el-input>
      </el-form-item>
    </el-form>
    <!-- 注册按钮 -->
    <el-button type="primary" @click="handleRegister('registerForm')" class="button">注册</el-button>
    <!-- 表单重置按钮 -->
    <el-button @click="resetForm('registerForm')" class="button">重置</el-button>
  </div>
</template>
<script>
import Account from "@/api/Account.js";
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (value.length >= 15 && value.length <= 6) {
          callback(new Error("长度在 6 到 15 个字符"));
        } else {
          this.$refs.registerForm.validateField("checkPassword");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.registerForm.password) {
        callback(new Error("两次输入密码不一致"));
      } else {
        callback();
      }
    };
    return {
      registerForm: {
        username: "",
        password: "",
        checkPassword: "",
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 4, max: 12, message: "长度在 4 到 12 个字符", trigger: "blur" }
        ],
        password: [{ validator: validatePass, trigger: "blur" }],
        checkPassword: [{ validator: validatePass2, trigger: "blur" }]
      }
    };
  },
  methods: {
    //提交注册表单
    handleRegister(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log(valid);
          console.log(this.registerForm);
          Account.userRegister(this.registerForm);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>
<style lang="scss">
.registerWrapper {
  padding: 25px;
  button {
    width: 48%;
    // margin-top: 20px;
  }
}
</style>