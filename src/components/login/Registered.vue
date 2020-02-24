<template>
  <div class="registerWrapper">
    <el-form :model="registerForm" :rules="rules" ref="registerForm">
      <!-- 手机号输入框 -->
      <el-form-item prop="username">
        <el-input placeholder="请输入用户名" v-model="registerForm.username"></el-input>
      </el-form-item>
      <!-- <el-form-item placeholder="验证码"></el-form-item> -->
      <!-- 密码输入框 -->
      <el-form-item prop="pass">
        <el-input
          placeholder="请输入密码"
          type="password"
          v-model="registerForm.pass"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <!-- 确认密码输入框 -->
      <el-form-item prop="checkPass">
        <el-input
          placeholder="确认密码"
          type="password"
          v-model="registerForm.checkPass"
          autocomplete="off"
        ></el-input>
      </el-form-item>
    </el-form>
    <!-- 注册按钮 -->
    <el-button type="primary" @click="handleRegister('registerForm')" class="button">注册</el-button>
    <el-button @click="resetForm('registerForm')" class="button">重置</el-button>
  </div>
</template>
<script>
// export default {
//   data() {
//     return {
//       form: {
//         username: "",
//         password: "",
//         passwordConfirm: ""
//       },
//       rules: {
//         username: [
//           { required: true, message: "请输入用户名", trigger: "blur" },
//           { min: 4, max: 12, message: "长度在 4 到 12 个字符", trigger: "blur" }
//         ],
//         password: [
//           { required: true, message: "请输入密码", trigger: "blur" },
//           { min: 6, max: 15, message: "长度在 6 到 15 个字符", trigger: "blur" }
//         ]
//       }
//     };
//   },
//   methods: {
//     handleRegister() {}
//   }
// };
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (value.length <= 15 && value.length >= 6) {
          this.$refs.registerForm.validateField("checkPass");
        }else{
          callback(new Error("长度在 6 到 15 个字符"));
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.registerForm.pass) {
        callback(new Error("两次输入密码不一致"));
      } else {
        callback();
      }
    };
    return {
      registerForm: {
        username: "",
        pass: "",
        checkPass: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 4, max: 12, message: "长度在 4 到 12 个字符", trigger: "blur" }
        ],
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }]
      }
    };
  },
  methods: {
    handleRegister(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
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