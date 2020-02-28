import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    isLogin:false,
    userInfo:null,
    token:"",
  },
  mutations: {
    // 设置用户状态数据
    setUserState(state,data){
      if (data) {
        JSON.parse(data)
        state.userInfo =  JSON.parse(data);
        state.isLogin = true;
      }else if(data == null){
        localStorage.clear()
        state.userInfo = null;
        state.isLogin = false;
        state.token = "";
      }
    }
  },
  actions: {
    setUser({commit},data){
      commit("setUserState",data)
    }
  },
  getters:{
    userInfo: state => state.userInfo,
    isLogin: state => state.isLogin
  }
});

export default {
  store
}