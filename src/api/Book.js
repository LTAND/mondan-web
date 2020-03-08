import BaaS from 'minapp-sdk';
import { showHErrorMsg } from "../utils/util"; // 根据错误码返回信息
import { config } from "../utils/config"
BaaS.init(config.clientID);


let BookTable = new BaaS.TableObject('book')

function addBook(book,callback){
  let record = BookTable.create()
  record.set(book).save().then(res=>{
    callback(res)
  }).catch(err=>{
    showHErrorMsg(err)
  })
}

export default {
  addBook,
}