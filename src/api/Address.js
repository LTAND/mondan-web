import BaaS from 'minapp-sdk';
import { showHErrorMsg } from "../utils/util"; // 根据错误码返回信息
import { config } from "../utils/config"
BaaS.init(config.clientID);

let AddressTable = new BaaS.TableObject('address')

function addAddressRecord(userId, form, callback) {
  //如果表单设置默认地址，将其他地址status设置为0
  if (form.status !== 0) {
    let query = new BaaS.Query()
    query.compare('user_id', '=', userId)
    //设置所有对象的status为0
    AddressTable.setQuery(query).find().then(res => {
      res.data.objects.forEach(item => {
        let recordID = item.id // 数据行 id    
        let address = AddressTable.getWithoutData(recordID)
        address.set('status', 0)
        address.update().then(res => {
          // success
          console.log(res)
        }, err => {
          // err
          showHErrorMsg("更改所有地址的Status", err)
        })
      })
    })
  }
  //
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
  //设置该对象status为1
  form.status = 1
  record.set(form).save().then(res => {
    callback(res)
  }).catch(err => {
    showHErrorMsg("增加用户收货地址", err)
  })
}

function findList(userId, callback) {
  let query = new BaaS.Query()
  query.compare('user_id', '=', userId)

  AddressTable.setQuery(query).find().then(res => {
    callback(res)
  }).catch(err => {
    showHErrorMsg("获取用户所有地址", err)
  })
}

function deleteRecord(recordId, callback) {
  AddressTable.delete(recordId).then(res => {
    callback(res)
  }).catch(err => {
    showHErrorMsg("删除用户一条地址记录", err)
  })
}

function updateRecord(recordId, params, callback) {
  let record = AddressTable.getWithoutData(recordId)
  record.set(params)

  record.update().then(res => {
    callback(res.data.objects)
  }).catch(err => {
    showHErrorMsg("修改用户地址", err)
  })
}



function setDefaultAddress(userId, recordID) {
  let query = new BaaS.Query()
  query.compare('user_id', '=', userId)
  //设置所有对象的status为0
  AddressTable.setQuery(query).find().then(res => {
    //
    res.data.objects.forEach(item => {    
      let address = AddressTable.getWithoutData(item.id)
      address.set('status', 0)
      address.update().then(() => {
        // success
      }, err => {
        // err
        showHErrorMsg("更改所有地址的Status", err)
      })
    })
  })
  //设置此条对象地址status为1
  setTimeout(() => {
    let address = AddressTable.getWithoutData(recordID)
    address.set('status', 1)
    address.update().then(res => {
      // success
      alert("修改成功")
    }, err => {
      // err
      showHErrorMsg("更改此条地址的Status", err)
    })
  }, 300)
}

export default {
  addAddressRecord,
  findList,
  deleteRecord,
  updateRecord,
  setDefaultAddress
}