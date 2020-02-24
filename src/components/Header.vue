<template>
  <div class="header">
<<<<<<< HEAD
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
          v-for="(item, index) in navList"
          :index="item.path"
          :to="item.path"
          :key="index"
          @click="handleSelect"
        >{{item.text}}</router-link>
      </el-row>
      <!-- 登录/注册 -->
      <div class="login">
        <div v-if="true">
          <el-dropdown>
            <span class="el-dropdown-link">
              <img src="../assets/img/logo.png" />
              用户名
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>个人信息</el-dropdown-item>
              <el-dropdown-item divided>
                <div @click="handleClick">退出登录</div>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <div v-else class="login-link">登录/注册</div>
      </div>
    </el-row>
=======
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      router
      @select="handleSelect"
    >
      <el-menu-item
        v-for="(item, index) in navList"
        :index="item.path"
        :route="item.path"
        :key="index"
      >{{item.text}}</el-menu-item>
    </el-menu>
>>>>>>> 5538dbc810430aa749baf77feb460cb496df475d
  </div>
</template>

<script>
export default {
<<<<<<< HEAD
  // mounted(){
  //   console.log(this.$store.state)
  // },

  methods: {
    handleClick() {
      alert(123);
    },
    handleSelect(key, keyPath) {
      console.log(key);
    }
  },

  data() {
    return {
      activeIndex: "/",
      navList: [
        { path: "/", text: "首页" },
        { path: "/", text: "关于" },
        { path: "/", text: "其他" },
        { path: "/", text: "更多" }
      ]
    };
=======
  data() {
    return {
      activeIndex: "/home",
      navList: [
        { path: "/home", text: "主页" },
        { path: "/test", text: "测试" }
      ]
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
>>>>>>> 5538dbc810430aa749baf77feb460cb496df475d
  }
};
</script>

<<<<<<< HEAD
<style lang="scss" scoped>
//超链接
a {
  &:link {
    color: black;
  }
  &:visited {
    color: black;
  }
  &:active {
    color: white;
  }
}

.header {
  height: 80px;
  line-height: 80px;
  border-bottom: 1px solid #ddd;
  box-shadow: 0 2px 2px #eee;
  //导航栏
  .nav {
    height: 80px;
    width: 1000px;
    margin: 0 auto;
    //logo部分
    .logo {
      a {
        display: block;
        padding-right: 30px;
      }
      img {
        margin-top: 13px;
        display: block;
        height: 54px;
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
=======
<style>
</style>
>>>>>>> 5538dbc810430aa749baf77feb460cb496df475d
