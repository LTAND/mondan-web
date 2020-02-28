import BaaS from 'minapp-sdk';
import { showHErrorMsg } from "../utils/util"; // 根据错误码返回信息
import { config } from "../utils/config"
BaaS.init(config.clientID)

let auth = BaaS.auth

//----注册----
//username、phone、email三种方式
function userRegister(opt) {
  auth.register(opt).then(user => {
    console.log(user)
  }).catch(err => {
    showHErrorMsg("注册", err)
  })
}



//----登录----
//username、phone、email三种方式
function userLogin(opt,callback) {
  auth.login(opt).then(user => {
    callback(user);
    
  }).catch(err => {
    showHErrorMsg("登录", err);
  })
}

//获取用户信息
function getUserInfo(){
  auth.getCurrentUser().then(user => {
    // user 为 currentUser 对象
  }).catch(err => {
    // HError
    if( err.code === 604 ){
      console.log('用户未登录')
      // this.$message.error("用户未登录")
    }
  })
}


export default {
  userRegister,
  userLogin,
  getUserInfo
}