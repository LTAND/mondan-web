<template>
  <div>
    <div class="header">
      <span class="el-icon-finished">收货地址</span>
    </div>
    <div class="address-wrap">
      <div v-if="isHave" style="text-align:center;line-height:500px;font-size:30px">
        目前您还没有填写收货地址哦，
        <a style="font-size:30px" @click="addForm">点此填写</a>
      </div>
      <div v-else style="margin-top:10px">
        <el-card>
          <div slot="header">
            <span>我的地址</span>
            <el-button style="float: right; padding: 3px 0" type="text" @click="addForm">新增</el-button>
          </div>
          <div class="address-item" v-for="(item,index) in addressList" :key="index">
            <el-card>
              <div slot="header">
                <span>我的地址{{index+1}}</span>
                <el-button style="float: right; padding: 3px 0" type="text" @click="editAddress">编辑</el-button>
              </div>
              <div class="address-item-info">
                <p>{{item.province}}{{item.city}}{{item.district}}{{item.address}}</p>
                <p>{{item.contact}}</p>
                <p>{{item.phone}}</p>
              </div>
              <div class="info-bottom">
                <el-button
                  style="float: right; margin: 4px 2px"
                  @click="deleteAddress(item.id,index)"
                >删除</el-button>
              </div>
            </el-card>
          </div>
        </el-card>
      </div>
    </div>
    <div class="address-form-wrapper">
      <address-form
        :formType="formType"
        :userId="userId"
        :title="addressTitle"
        :addressForm="addressFormData"
        @save="savaAddress"
        ref="addressFormRef"
      ></address-form>
    </div>
  </div>
</template>

<script>
import Account from "@/api/Account.js";
import Address from "@/api/Address.js";
import AddressForm from "@/components/Address-form.vue";
export default {
  data() {
    return {
      addressList: [],
      isHave: false,
      userId: JSON.parse(this.$store.store.state.userInfo).id, // 传入$store状态用户id
      formType: "save_form", // 地址表单类型 save_form || edit_form
      addressTitle: "", // 传入地址表单标题
      addressFormData: {
        // 传入地址表单数据结构
        status: 0, // 地址状态，1默认地址
        contact: "", // 收货人姓名
        phone: "", // 收货人手机号
        address: "", // 详细地址
        area: [], // 存放城市默认值
        zipcode: "", // 邮政编码
        country: "中国", // 国家
        province: "", // 省份
        city: "", // 市
        district: "" // 区
      }
    };
  },
  created() {
    Address.findList(this.userId, res => {
      this.addressList = res.data.objects;
      if (res.data.objects == undefined || res.data.objects.length == 0) {
        this.isHave = true;
      }
    });
  },
  components: {
    AddressForm
  },
  methods: {
    addForm() {
      if (this.addressList.length < 3) {
        this.addressTitle = "新增收货地址";
        this.formType = "save_form";
        this.$refs.addressFormRef.show();
      } else {
        alert("每个用户最多三条地址");
      }
    },

    deleteAddress(recordId, index) {
      Address.deleteRecord(recordId, res => {
        if (res) {
          this.addressList.splice(index, 1);
          //检测用户是否有地址数据
          if (this.addressList.length == 0) {
            this.isHave = true;
          }
        } else {
          alert("删除失败，稍后再试");
        }
      });
    },
    savaAddress(form) {
      // 保存完地址表单，通知重新请求
      Address.findList(this.userId, res => {
        this.addressList = res.data.objects;
        //显示有地址
        this.isHave = false;
      });
    },
    editAddress(record) {
      // TODO 编辑地址
      this.addressTitle = "编辑收货地址";
      this.formType = "edit_form";
      this.addressFormData = JSON.parse(JSON.stringify(record));
      this.$refs.addressFormRef.show();
    }
  }
};
</script>

<style lang="scss" scoped>
.header {
  font-size: 18px;
  margin-top: 16px;
  padding: 16px 16px;
  background-color: rgb(149, 219, 224);
}
.address-form-wrapper {
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.address-wrap {
  .address-item {
    @media screen and (max-width: 768px) {
      width: 96%;
      margin: 20px 0;
    }
    width: 31%;
    height: 400px;
    display: inline-block;
    margin: 0 10px;
    .address-item-info {
      height: 250px;
      p {
        font-size: 18px;
        margin: 20px 0;
      }
    }
  }
}
</style>