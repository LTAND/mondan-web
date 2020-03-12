// 本地储存的封装
class Cache{
  constructor(key, type = "local", def = ""){
    this.Storage = type == "local"|"localStorage" ? window.localStorage : window.sessionStorage; // 选择不同储存方式
    this.key = key
    this.def = def;
  }
  setCache(val) {
    return this.Storage.setItem(this.key, JSON.stringify(val))
  }
  getCache() {
    return this.Storage.getItem(this.key) ? JSON.parse(this.Storage.getItem(this.key)) : this.def
  }
  removeCache() {
    this.Storage.removeItem(this.key)
  }
  clearStorage(){
    this.Storage.clear();
  }
}

// 购物车          
const CART_KEY = "__cart__"
export let cartStorage = new Cache(CART_KEY, "sessionStorage", [])

// 用户信息
const USER_KEY = "user"
export let userStorage = new Cache(USER_KEY)