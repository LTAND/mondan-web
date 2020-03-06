<template>
  <div class="registerWrapper">
    <!-- 用户名注册 -->
    <div class="byUsername" v-show="isture">
      <el-form :model="registerForm" :rules="rules" ref="registerForm">
        <!-- 用户名输入框 -->
        <el-form-item prop="username">
          <el-input placeholder="请输入用户名" v-model="registerForm.username" clearable></el-input>
        </el-form-item>
        <!-- <el-form-item placeholder="验证码"></el-form-item> -->
        <!-- 密码输入框 -->
        <el-form-item prop="password">
          <el-input
            placeholder="请输入密码"
            type="password"
            v-model="registerForm.password"
            autocomplete="off"
            show-password
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
      <div>
        <el-link @click="switchPhone">手机号注册</el-link>
      </div>
    </div>
    <!-- 手机号注册 -->
    <div class="byphone" v-show="!isture">
      <el-form :model="registerForm" :rules="rules" ref="registerForm">
        <!-- 用户名输入框 -->
        <el-form-item prop="phone">
          <el-input placeholder="请输入手机号" v-model="registerForm.phone" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-input placeholder="输入验证码" style="width:62%"></el-input>
          <el-button style="margin-left:5px;width:36%;float:right;margin:0">发送验证码</el-button>
        </el-form-item>
        <!-- <el-form-item placeholder="验证码"></el-form-item> -->
        <!-- 密码输入框 -->
        <el-form-item prop="password">
          <el-input
            placeholder="请输入密码"
            type="password"
            v-model="registerForm.password"
            autocomplete="off"
            show-password
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
      <div>
        <el-link @click="switchUsername">用户名注册</el-link>
      </div>
    </div>

    <!-- 注册按钮 -->
    <el-button type="primary" @click="handleRegister('registerForm')" class="button">注册</el-button>
    <!-- 表单重置按钮 -->
    <!-- <el-button @click="resetForm('registerForm')" class="button">重置</el-button> -->
  </div>
</template>
<script>
import Account from "@/api/Account.js";
export default {
  data() {
    //密码
    let validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (value.length > 15 && value.length < 6) {
          callback(new Error("长度在 6 到 15 个字符"));
        } else {
          this.$refs.registerForm.validateField("checkPassword");
        }
        callback();
      }
    };
    //确认密码
    let validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.registerForm.password) {
        callback(new Error("两次输入密码不一致"));
      } else {
        callback();
      }
    };
    //手机号验证
    let phoneReg = /(^1\d{10}$)|(^[0-9]\d{7}$)/;
    let validatePhone = (rule,value,callback)=>{
      if(value === ""){
        callback(new Error("请输入手机号"));
      }else if(!phoneReg.test(value)){
        callback(new Error("手机号格式有误"));
      }else{
        callback();
      }
    }


    return {
      isture:true,
      registerForm: {
        username: "",
        password: "",
        checkPassword: "",
        phone: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 4, max: 12, message: "长度在 4 到 12 个字符", trigger: "blur" }
        ],
        phone:[{validator: validatePhone, trigger: "blur"}],
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
          Account.userRegister(this.registerForm, user => {
            localStorage.setItem("user", JSON.stringify(user));
            this.$store.store.dispatch("setUser", JSON.stringify(user));
          });
          this.$message.success("注册成功");
          this.$router.push("/");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    //注册表单切换
    switchPhone(){
      this.isture = false
    },
    switchUsername(){
      this.isture = true
    }
  }
};
</script>
<style lang="scss">
.registerWrapper {
  padding: 25px;
  button {
    width: 100%;
    margin-top: 20px;
  }
}
</style>