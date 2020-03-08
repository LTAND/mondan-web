import BaaS from 'minapp-sdk';
import { showHErrorMsg } from "../utils/util"; // 根据错误码返回信息
import { config } from "../utils/config"
BaaS.init(config.clientID);

let AddressTable = new BaaS.TableObject('address')

function addAddressRecord(userId, form, callback) {
  let record = AddressTable.create()

  // let item = {
  //   user_id: 1,                   // 用户id
  //   contact: "阿斯顿撒",          // 收货人姓名
  //   phone: "123123123",          // 收货人手机号
  //   zipcode: "123123",           // 邮政编码
  //   country: "中国",             // 国家
  //   province: "广东",            // 省份
  //   city: "深圳",                    // 市
  //   district: "南山区",              // 区
  //   address: "啊实打实大师大师大师",  // 详细地址
  //   status: 0,                      // 地址状态，1默认地址
  //   priority: 0,                           
  // }

  form["user_id"] = userId

  record.set(form).save().then(res => {
    callback(res)
  }).catch(err => {
    showHErrorMsg("增加用户收货地址", err)
  })
}

function findList(userId,callback) {
  let query = new BaaS.Query()
  query.compare('user_id','=', userId)

  AddressTable.setQuery(query).find().then(res => {
    callback(res)
  }).catch(err => {
    showHErrorMsg("获取用户所有地址",err)
  })
}

function deleteRecord(recordId,callback){
  AddressTable.delete(recordId).then(res=>{
    callback(res)
  }).catch(err=>{
    showHErrorMsg("删除用户一条地址记录", err)
  })
}

function updateRecord(recordId, params, callback){
  let record = AddressTable.getWithoutData(recordId)
  record.set(params)

  record.update().then(res => {
    callback(res.data.objects)
  }).catch(err => {
    showHErrorMsg("修改用户地址", err)
  })
}

export default{
  addAddressRecord,
  findList,
  deleteRecord,
  updateRecord,
}