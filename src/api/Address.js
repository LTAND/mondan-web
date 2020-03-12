import BaaS from 'minapp-sdk';
import { showHErrorMsg } from "../utils/util"; // 根据错误码返回信息
import { config } from "../utils/config"
BaaS.init(config.clientID);

let AddressTable = new BaaS.TableObject('address')

async function addAddressRecord(userId, form, callback) {
  try{
    let query = new BaaS.Query()
    query.compare('user_id', '=', userId)
    let { data: { objects: addressList } }  = await AddressTable.setQuery(query).find()  // 用户所有地址
    if (addressList.length){
      // 已存在一条以上的用户地址
      if (form["status"] == true){
        // 表单设置默认地址时, 重置所有默认地址状态为0
        addressList.forEach(ele => {
          if(ele.status == 1){
            let record = AddressTable.getWithoutData(ele.id)
            record.set({ status: 0 })
            record.update()
          }
        });
      }
    }
     
    let record = AddressTable.create()
    form["user_id"] = userId
    record.set(form).save().then(res => {
      callback(res)
    })
  }
  catch(err){
    showHErrorMsg("增加用户收货地址", err)
  }
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

async function updateRecord(userId, recordId, form, callback){
  try{
    let query = new BaaS.Query()
    query.compare('user_id', '=', userId)
    let { data: { objects: addressList } }  = await AddressTable.setQuery(query).find()  // 用户所有地址
    if (form["status"] == true){
      // 表单设置默认地址时, 重置用户所有地址的默认状态为0
      addressList.forEach(ele => {
        if(ele.status == 1){
          let record = AddressTable.getWithoutData(ele.id)
          record.set({ status: 0 })
          record.update()
        }
      });
    }
    // 提交修改用户地址
    let record = AddressTable.getWithoutData(recordId)
    record.set(form)
    record.update().then(res => {
      callback(res.data)
    })
  }
  catch(err){
    showHErrorMsg("修改用户地址", err)
  }
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