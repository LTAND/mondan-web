<template>
  <div v-if="addressFlag" class="address-form-wrapper">
    <div class="header clearfix">
      <span class="title-second">{{title}}</span>
      <span @click="close" class="close fl-right"><i class="iconfont iconclose"></i></span>
    </div>
    <div class="container">
      <el-form ref="addressForm" :rules="addressFormRules" :model="addressForm">
        <el-form-item label="收货人：" prop="contact">
          <el-input v-model="addressForm.contact" placeholder="请输入名字"></el-input>
        </el-form-item>
        <el-form-item label="手机号码：" prop="phone">
          <el-input v-model="addressForm.phone" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item label="所在地区：" prop="area">
          <el-cascader
            :options="options"
            v-model="addressForm.area"
            @change="handleChange"
            :separator="' '"
            clearable
          >
          </el-cascader>      
        </el-form-item>
        <el-form-item label="详细地址：" prop="address">
          <el-input v-model="addressForm.address" placeholder="请输入详细地址"></el-input>
        </el-form-item>
        <el-form-item label="设置默认地址">
          <el-switch v-model="addressForm.status"></el-switch>
        </el-form-item>
        <el-form-item v-if ="formType=='save_form'">
          <el-button type="primary" @click="onSubmit">保存地址</el-button>
        </el-form-item>
        <el-form-item v-if ="formType=='edit_form'">
          <el-button type="primary" @click="onSubmit">编辑完成</el-button>
        </el-form-item>
      </el-form>    
    </div>
  </div>
</template>

<script>
import options from "../assets/area_format_user.json";
import AddressApi from "../api/Address"

export default {
  props:{
    title:{
      type:String,
      default:"默认标题"
    },
    userId:{
      type:Number,
      default: 0
    },
    addressForm:{
      type:Object,
      default:{}
    },
    formType:{
      type:String,
      default:"save_form" // save_form || edit_form
    }
  },
  data() {
    return {
      addressFlag: false,    // 显隐地址表单
      options,               // 存放城市数据
      // addressForm: {
      //   status: 0,           // 地址状态，1默认地址
      //   contact: "",         // 收货人姓名
      //   phone: "",           // 收货人手机号
      //   address: "",         // 详细地址
      //   area: [],            // 存放城市默认值

      //   zipcode: "",         // 邮政编码
      //   country: "中国",     // 国家
      //   province: "",        // 省份
      //   city: "",            // 市
      //   district: "",        // 区
      // },
      addressFormRules:{
        contact: [
          // 收货人姓名
          { required: true, message: '请输入名字', trigger: 'change' },
          { 
            pattern: /^(?:[\u3400-\u4DB5\u4E00-\u9FEA\uFA0E\uFA0F\uFA11\uFA13\uFA14\uFA1F\uFA21\uFA23\uFA24\uFA27-\uFA29]|[\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879][\uDC00-\uDFFF]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0])+$/, 
            message: '请输入正确中文名字',
            trigger:'change'
          }
        ],         
        phone: [
          // 收货人手机号
          { required: true, message: '请输入手机号', trigger: 'change' },
          { pattern: /^(?:(?:\+|00)86)?1\d{10}$/, message: '目前只支持中国大陆的手机号码',trigger:'change'}
        ],                  
        area:[
          { required: true, message: "请选择区域", trigger: "change" }
        ],            
        address: [
           // 详细地址
          { required: true, message: "请输入详细地址", trigger: "change" }
        ],        
      },
    };
  },
  created() {
  },
  methods: {
    show(){
      this.addressFlag = true
    },
    close(){
      this.$refs.addressForm.resetFields()
      this.addressFlag = false
    },
    handleChange(arr) {
      if(arr.length){
        // 找到 省 市 区名字
        let a = this.options.find(item=>{return item.value == arr[0]})
        let b = a["children"].find(item=>{return item.value == arr[1]})
        let c = b["children"].find(item=>{return item.value == arr[2]})
        this.addressForm.province = a.label
        this.addressForm.city = b.label
        this.addressForm.district = c.label
        // this.addressForm.province = arr[0]
        // this.addressForm.city = arr[1]
        // this.addressForm.district = arr[2]

      }else{
        // 用户选择区域
        this.addressForm.province = ""
        this.addressForm.city = ""
        this.addressForm.district = ""
      }
    },
    onSubmit() {
      this.$refs.addressForm.validate((isVal, obj)=>{
        // 是否校验成功 和 未通过校验的字段
        if(isVal){
          switch(this.formType){
            case "save_form":
              this._addAddressRecord()
              break;
            case "edit_form":
              this._updateRecord();
              break;
            default:
              console.log("组件参数formType未知", this.formType)
          }
        }else{
          alert("表单填写失败")
        }
      })
    },
    _addAddressRecord(){
      // 增加地址接口
      AddressApi.addAddressRecord(this.userId, this.addressForm, data=>{
        this.$emit("save",this.addressForm)
        this.close()
        alert("表单填写成功")
      })
    },
    _updateRecord(){
      // 修改地址接口
      let recordId = this.addressForm._id
      let form = JSON.parse(JSON.stringify(this.addressForm))
      form.id && delete form["id"]
      form.user_id && delete form["user_id"]
      AddressApi.updateRecord(this.userId, recordId, form, data=>{
        this.$emit("save",this.addressForm)
        this.close()
        alert("地址保存成功")
      })
    }
  }
};
</script>
<style lang='scss' scoped >
.address-form-wrapper {
  margin: 50px auto 0 auto;
  width: 770px;
  height: 550px;
  border: 1px solid #ccc;
  .header{
    padding: 10px 20px;
    line-height: 25px;
    background: #F3F3F3;
    .title-second{
      font-size:16px;
    }
    .close{
      cursor: pointer;
    }
  }
  .container{
    padding: 10px 20px;
    background: #fff;
  }

}
</style>
