<template>
  <div class="userInfo-wrap">
    <el-divider content-position="left">个人信息</el-divider>
    <div class="title-userInfo">
      <i>个人信息</i>
    </div>
    <div class="info-container">
      <div class="info-wrap">
        <ul>
          <li class="info-item">
            头像：
            <el-avatar :src="JSON.parse(this.$store.store.state.userInfo).avatar" shape="square"></el-avatar>
          </li>
          <li class="info-item">用户名：{{user.username}}</li>
          <li class="info-item">
            手机号：
            <b style="color:red;">{{user.phone}}</b>
          </li>
        </ul>
        <el-button icon="el-icon-edit" class="btn" @click="dialogPWVisible = true">修改登录密码</el-button>
        <!-- 修改密码弹出框 -->
        <el-dialog title="修改密码" :visible.sync="dialogPWVisible">
          <el-form :model="pswForm" :rules="rules" ref="pswForm">
            <el-form-item prop="expassword" label="旧密码：">
              <el-input
                placeholder="旧密码"
                type="password"
                v-model="pswForm.expassword"
                autocomplete="off"
              ></el-input>
            </el-form-item>

            <!-- 新密码输入框 -->
            <el-form-item prop="password" label="新密码：">
              <el-input
                placeholder="新密码"
                type="password"
                v-model="pswForm.password"
                autocomplete="off"
                show-password
              ></el-input>
            </el-form-item>
            <!-- 确认密码输入框 -->
            <el-form-item prop="checkPassword" label="确认密码：">
              <el-input
                placeholder="确认密码"
                type="password"
                v-model="pswForm.checkPassword"
                autocomplete="off"
              ></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer">
            <el-button @click="dialogPWVisible = false">取 消</el-button>
            <el-button type="primary" @click="pswSubmit">提 交</el-button>
          </div>
        </el-dialog>
        <br />
        <el-button icon="el-icon-edit" class="btn" @click="dialogInfoVisible = true">编辑用户信息</el-button>

        <!-- 编辑用户信息弹出框 -->
        <el-dialog title="基本信息" :visible.sync="dialogInfoVisible">
          <el-form :model="form" :rules="rules" ref="form">
            <el-form-item label="用户名:">
              <el-input v-model="form._username" autocomplete="off" style="width:200px"></el-input>
            </el-form-item>
            <el-form-item label="手机号:" prop="phone">
              <el-input v-model="form.phone" style="width:200px"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer">
            <el-button @click="dialogInfoVisible = false">取 消</el-button>
            <el-button type="primary" @click="infoSubmit">保 存</el-button>
          </div>
        </el-dialog>
      </div>

      <div class="info-qa">
        <QA></QA>
      </div>
    </div>
  </div>
</template>

<script>
import Account from "@/api/Account.js";
import QA from "@/components/Q&A.vue";
export default {
  components: {
    QA
  },
  created() {
    //用户手机号展示
    if (JSON.parse(this.$store.store.state.userInfo)._phone !== undefined) {
      if (JSON.parse(this.$store.store.state.userInfo)._phone !== "") {
        this.user.phone = JSON.parse(this.$store.store.state.userInfo)._phone;
      }
    }

    //获取用户信息
    Account.getUserInfo(callback => {
      this.form = callback;
    });
  },

  data() {
    //手机号验证
    let phoneReg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
    let validatePhone = (rule, value, callback) => {
      if (!phoneReg.test(value)) {
        callback(new Error("手机号格式有误"));
      } else {
        callback();
      }
    };

    //原密码
    let validateExPass = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error("密码长度有误"));
      } else if (value.length > 15) {
        callback(new Error("密码长度有误"));
      } else {
        callback();
      }
    };

    //密码
    let validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (value.length < 6) {
          callback(new Error("长度在 6 到 15 个字符"));
        } else if (value.length > 15) {
          callback(new Error("长度在 6 到 15 个字符"));
        } else {
          this.$refs.pswForm.validateField("checkPassword");
        }
        callback();
      }
    };
    //确认密码
    let validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.pswForm.password) {
        callback(new Error("两次输入密码不一致"));
      } else {
        callback();
      }
    };

    return {
      dialogInfoVisible: false,
      dialogPWVisible: false,

      rules: {
        phone: [{ validator: validatePhone, trigger: "blur" }],
        expassword: [{ validator: validateExPass, trigger: "blur" }],
        password: [{ validator: validatePass, trigger: "blur" }],
        checkPassword: [{ validator: validatePass2, trigger: "blur" }]
      },

      user: {
        username: JSON.parse(this.$store.store.state.userInfo)._username,
        phone: "你还没填写手机号"
      },

      form: {
        _username: "",
        _phone: "",
        phone: ""
      },

      pswForm: {
        expassword: "",
        password: "",
        checkPassword: ""
      }
    };
  },
  methods: {
    //修改个人信息提交
    infoSubmit() {
      alert("还不行");
    },

    //修改密码提交
    pswSubmit() {
      let psw = {
        password: this.pswForm.expassword,
        newPassword: this.pswForm.password
      };
      Account.setPassword(psw, callback => {
        if (callback == true) {
          this.$message.success("修改成功");
          this.dialogPWVisible = false;
          this.$refs.pswForm.resetFields();
        } else if (callback == false) {
          this.$refs.pswForm.resetFields();
          this.$message.error("修改失败 原密码错误");
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@media screen and (max-width: 768px) {
  .info-container {
    .info-wrap{
      width: 100%;
    }
    .info-qa {
      width: 100%;
    }
    .btn {
      width: 94%;
    }
  }
}

.info-wrap{
  width: 60%;
  float: left;
}
.info-qa {
  float: right;
  width: 30%;
  min-width: 240px;
  margin-top: 30px;
}

.btn {
  margin: 10px 20px;
  width: 300px;
}
.userInfo-wrap {
  margin: 0 auto;
  .title-userInfo {
    i {
      margin-left: 24px;
    }
    font-size: 18px;
    line-height: 48px;
    height: 48px;
    color: #fff;
    background-color: #aaa;
    margin: 30px 0;
  }
  .el-input {
    width: 160px;
  }
  .info-item {
    padding: 10px 20px;
    letter-spacing: 2px;
  }
}
</style>