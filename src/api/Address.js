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

// 编辑地址
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

// 设置默认地址
async function setDefaultAddress(userId, recordId, callback){
  try{
    let query = new BaaS.Query()
    query.compare('user_id', '=', userId)
    let { data: { objects: addressList } }  = await AddressTable.setQuery(query).find()  // 用户所有地址
    // 表单设置默认地址时, 重置用户所有地址的默认状态为0
    addressList.forEach(ele => {
      if(ele.status == 1){
        let record = AddressTable.getWithoutData(ele.id)
        record.set({ status: 0 })
        record.update()
      }
    });

    // 设置地址默认状态
    let record = AddressTable.getWithoutData(recordId)
    record.set({ status: 1 })
    record.update().then(res => {
      callback(res);
    })
  }
  catch(err){
    showHErrorMsg("设置默认地址", err)
  }
}

export default {
  addAddressRecord,
  findList,
  deleteRecord,
  updateRecord,
  setDefaultAddress
}