<template>
  <div class="header">
    <el-row class="nav" type="flex" justify="space-between">
      <!-- logo -->
      <div class="logo">
        <router-link to="/">
          <img src="../assets/img/MODANLogo.png" />
        </router-link>
      </div>
      <!-- 导航 -->
      <el-row type="flex" class="nav-item">
        <router-link
          :default-active="activeIndex"
          v-for="(item, index) in navList"
          :index="item.path"
          :to="item.path"
          :key="index"
        >{{item.text}}</router-link>
      </el-row>
      <!-- 登录/注册 -->
      <div class="login">
        <div v-if="isLogin">
          <el-dropdown>
            <span class="el-dropdown-link">
              <img :src="JSON.parse(this.$store.store.state.userInfo).avatar" />
              {{JSON.parse(this.$store.store.state.userInfo)._username}}
              <i
                class="el-icon-arrow-down el-icon--right"
              ></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <!-- <router-link to="/user">个人信息</router-link> -->
                <router-link
                  :to="{name:'user', params:{id:JSON.parse(this.$store.store.state.userInfo).id}}"
                >个人信息</router-link>
              </el-dropdown-item>
              <el-dropdown-item divided>
                <div @click="handleExit">退出登录</div>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <div v-else class="login-link">
          <router-link to="/login">登录 / 注册</router-link>
        </div>
      </div>
    </el-row>
  </div>
</template>

<script>
export default {
  mounted() {},
  computed: {
    isLogin() {
      if (
        localStorage.getItem("user") &&
        localStorage.getItem("ifx_baas_uid")
      ) {
        this.$store.store.commit(
          "setUserState",
          JSON.stringify(localStorage.getItem("user"))
        );
      } else {
        this.$store.store.commit("setUserState", null);
      }
      return this.$store.store.getters.isLogin;
    }
  },
  methods: {
    handleExit() {
      // localStorage.removeItem("user");
      localStorage.clear();
      // this.$router.push("/");
      this.$store.store.dispatch("setUser", null);
      this.$message.success("退出成功");
      console.log(this.$store.store.state);
      this.$router.push("/");
    },
    handleSelect(key, keyPath) {
      console.log(key);
    }
  },

  data() {
    return {
      activeIndex: "/",
      navList: [
        { path: "/home", text: "首页" },
        { path: "/test", text: "商品" },
        { path: "/cart", text: "购物车" }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
//超链接
a {
  text-decoration: none;
  &:link {
    color: black;
  }
  &:visited {
    color: black;
  }
  &:active {
    color: skyblue;
  }
}
@media screen and (max-width: 768px) {
  .nav {
    width: 100%;
    .nav-item {
      display: none;
    }
  }
}
@media screen and (min-width: 768px) {
  .nav {
    width: 88%;
  }
}
.header {
  line-height: 60px;
  
  // box-shadow: 0 2px 2px #eee;
  //导航栏
  .nav {
    height: 60px;
    margin: 0 auto;
    border-bottom: 1px solid #ddd;
    //logo部分
    .logo {
      a {
        display: block;
        padding-right: 30px;
      }
      img {
        margin-top: 9px;
        display: block;
        height: 42px;
        width: auto;
      }
    }
    //导航菜单部分
    .nav-item {
      flex: 1;
      a {
        padding: 0 20px;
        display: block;
        font-size: 18px;
        text-decoration: none;
        &:hover {
          border-bottom: 4px solid #5ce1e6;
        }
      }
    }
    //右侧登录注册部分
    .login {
      //个人信息下拉部分
      .el-dropdown-link {
        img {
          width: 36px;
          height: 36px;
          border-radius: 50px;
          vertical-align: middle;
        }
      }
    }
  }
}
</style>
