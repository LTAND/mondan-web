let HErrorObj = {
  400: "Bad Request 参数错误",
  401: "Unauthorized 未授权",
  402: "Payment Required 应用欠费",
  403: "Forbidden 禁止访问",
  404: "Not Found 服务器找不到给定的资源",
  500: "Internal Server Error 内部服务器错误",
  600: "network disconnected 网络已断开",
  601: "request timeout 请求超时",
  602: "uninitialized 未调用 BaaS.init() 进行初始化",
  603: "unauthorized 用户尚未授权",
  604: "session missing 用户尚未登录",
  605: "incorrect parameter type 不正确的参数类型",
  607: "payment cancelled 用户取消支付",
  608: "payment failed 支付失败",
  609: "wxExtend function should be executed to allow plugin use wx.login, wx.getUserInfo, wx.requestPayment 使用小程序插件版本的 sdk，需先调用 wx.BaaS.wxExtend 方法完成初始化配置",
  610: "errorTracker uninitialized errorTracker 未初始化",
  611: "unsupported function 不支持该方法",
  612: "anonymous user is not allowed 临时匿名用户不支持调用该方法",
  613: "third party auth denied 用户拒绝第三方授权",
  614: "third party auth failed 第三方授权失败",
  615: "gateway type weixin_tenpay_js works in WeChat builtin browser only 支付类型 weixin_tenpay_js 只能在微信内置浏览器用使用",
} 

// 数据库
// 400	1. 提交的 ACL 权限不合法 、2. 提交的数据的字段类型不匹配、 3. 提交的数据中没有包含必填项 4. 重复创建数据（设置了唯一索引）
// 403	没有权限写入数据
// 404	写入的数据表不存在


export function showHErrorMsg(title="",err) {
  // 根据错误码返回信息
  let code = err.code || err.status
  console.log(title+" "+code + ": " + HErrorObj[code])
  return 
}
