import Vue from "vue"

/** 价格格式化 6001 => 6001.00
 * @param {*金额} value 
 * @param {*小数位数} num 
 */
function NumFormat(value, num) {
  let n = 1;
  for (let j = 0; j < num; j++) {
    n = n * 10;
  }
  value = Math.round(value * n) / n;
  let valueArray = String(value).split(".");
  let len = valueArray.length == 2 ? valueArray[1].toString().length : 0;
  let lws = num - len;
  let str = value;
  if (lws > 0) {
    if (len == 0) {
      str = str + '.';
    }
    for (let i = 0; i < lws; i++) {
      str = str + '0';
    }
  }
  return str;
}

Vue.filter("NumFormat", NumFormat)

export default Vue