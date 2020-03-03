import BaaS from 'minapp-sdk';
import { showHErrorMsg } from "../utils/util"; // 根据错误码返回信息
import { config } from "../utils/config"
BaaS.init(config.clientID);

let AddressTable = new BaaS.TableObject('address')

function addAddressRecord(callback) {
  let Record = AddressTable.create()
  let item = {
    user_id:00001,       // 用户id
    status: 0,           // 地址状态，1默认地址
    contact: "",         // 收货人姓名
    phone: "",           // 收货人手机号
    address: "",         // 详细地址
    area: [],            // 存放城市默认值

    zipcode: "",         // 邮政编码
    country: "中国",     // 国家
    province: "",        // 省份
    city: "",            // 市
    district: "",        // 区
  }
  Record.set(item).save().then(res => {
    callback(res);
  }).catch(err => {
    showHErrorMsg("添加用户地址", err)
  })
}

function findAddressList(callback) {
  AddressTable.find().then(res => {
    callback(res.data.objects)
  }).catch(err => {
    showHErrorMsg("获取用户所有地址",err)
  })
}

export default{
  addAddressRecord,
  findAddressList
}