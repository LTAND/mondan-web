import BaaS from 'minapp-sdk';
import { showHErrorMsg } from "../utils/util"; // 根据错误码返回信息

let ProductTable = new BaaS.TableObject('product')

// 添加商品
function addProductRecord(callback) {
  let Record = ProductTable.create()
  let item = {
    model: "智能路由器",
    name:"MODAN家庭矿机 基础版",
    description: "MODAN是一款可以挖FIL的智能路由器。通过远程集群部署，MODAN家庭矿机可接入MODOPOOL矿池，完成Filecoin的文件存储与封装，并向主节点提交证明，从而获得奖励。MODAN采用服务器级的主板及CPU，64GB DDR3内存及8TB的企业级存储盘，完全满足Filecoin的挖矿标准，是目前市面上唯一的家庭FIL矿机。",
    status: "0",
    now_price: 6000,
    orginal_price: 10000,
    limited_count: 1000,
    sold_count: 0,
    stock: 1000,
    param: {
      "name": "基础版",
      "detail": "CPU：英特尔至强E5-2660 V3 8核心16线程,存储：8TB希捷企业级氦气盘,内存：32G DDR3,尺寸：150mm（长）*150mm（宽）*200mm（高）,网络：1*1000Mbps WAN口 3*1000Mbps LAN口,USB：2*USB 3.0,WI-FI：双频千兆"
    },
  }
  let item2 = {
    model: "智能路由器",
    name:"MODAN家庭矿机 高级版",
    description: "MODAN是一款可以挖FIL的智能路由器。通过远程集群部署，MODAN家庭矿机可接入MODOPOOL矿池，完成Filecoin的文件存储与封装，并向主节点提交证明，从而获得奖励。MODAN采用服务器级的主板及CPU，64GB DDR3内存及8TB的企业级存储盘，完全满足Filecoin的挖矿标准，是目前市面上唯一的家庭FIL矿机。",
    status: "0",
    now_price: 6000,
    orginal_price: 10000,
    limited_count: 1000,
    sold_count: 0,
    stock: 1000,
    param: {
      "name": "高级版",
      "detail": "CPU：英特尔至强E5-2660 V3 8核心16线程,存储：8TB希捷企业级氦气盘,内存：额外32GB DDR3（共64GB,尺寸：150mm（长）*150mm（宽）*200mm（高）,网络：1*1000Mbps WAN口 3*1000Mbps LAN口,USB：2*USB 3.0,接口：1*HDMI 4K（机顶盒功能）,大功率WI-FI信号天线,游戏加速芯片"
    },
  }

  Record.set(item).save().then(res => {
    callback(res);
  }).catch(err => {
    showHErrorMsg("添加商品", err)
  })
}

// 获取所有商品
function findProductList(callback) {
  ProductTable.find().then(res => {
    callback(res.data.objects)
  }).catch(err => {
    showHErrorMsg("获取所有商品",err)
  })
}

// 获取单个商品
function getProductItem(id, callback) {
  ProductTable.get(id).then(res => {
    callback(res.data)
  }).catch(err => {
    showHErrorMsg("获取单个商品", err)
  })
}



function test() {
  console.log(1111)
}

export default {
  addProductRecord,
  findProductList,
  getProductItem,
  test,
}

