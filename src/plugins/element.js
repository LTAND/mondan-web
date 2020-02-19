import Vue from 'vue'
import { Message } from 'element-ui'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)

Vue.prototype.$message = Message

export default Vue
