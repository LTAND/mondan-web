import BaaS from 'minapp-sdk';
import { showHErrorMsg } from "../utils/util"; // 根据错误码返回信息
import { config } from "../utils/config"
BaaS.init(config.clientID)

let auth = BaaS.auth

//----注册----
//username、phone、email三种方式
function userRegister(opt, callback) {
  auth.register(opt).then(user => {
    callback(user);
  }).catch(err => {
    showHErrorMsg("注册", err)
  })
}

//手机号短信验证码
// function smsCode(opt){
//   BaaS.sendSmsCode({phone, signatureID})
// }


//----登录----
//username、phone、email三种方式
function userLogin(opt, callback) {
  auth.login(opt).then(user => {
    callback(user);
  }).catch(err => {
    showHErrorMsg("登录", err);
  })
}


//获取用户信息
function getUserInfo(callback){
  auth.getCurrentUser().then(user => {
    // user 为 currentUser 对象
    callback(user)
  }).catch(err => {
    // HError
    if (err.code === 604) {
      console.log('用户未登录')
      // this.$message.error("用户未登录")
    }
  })
}

//设置用户名
function setUserName(_username,callback) {
  auth.getCurrentUser()
    .then(user => {
      return user.setUsername(_username)
    }).then(user => {
      callback(user);
    }).catch(err => {
      showHErrorMsg("设置用户名", err);
    })
}

//设置手机号
function setPhone(_phone) {
  auth.getCurrentUser()
    .then(user => {
      return user.setMobilePhone(_phone)
    }).then(user => {
      callback(user);
    }).catch(err => {
      showHErrorMsg("设置手机号", err);
    })
}

//修改密码
function setPassword(psw,callback){
  auth.getCurrentUser()
  .then(user => {
    return user.updatePassword(psw)
  }).then(user => {
    console.log(user);
    callback(true);
  }).catch(err => {
    showHErrorMsg("修改密码", err);
    callback(false);
  })
}

export default {
  userRegister,
  userLogin,
  getUserInfo,
  setUserName,
  setPhone,
  setPassword,
}