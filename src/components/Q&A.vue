<template>
  <div class="qaa">
    <el-carousel :interval="4000" type="card" height="200px">
      <el-carousel-item v-for="item in qa" :key="item.index" class="qaa-item">
        <h4>{{ item.q }}</h4>
        <h4>{{ item.a }}</h4>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>
<script>
export default {
  data() {
    return {
      qa: [
        {
          q: "家庭矿机能挖矿么？",
          a:
            "Filecoin的初衷就是整合全球的零散存储资源成为一个去中心化的云，而非搭建专业的机房挖矿，那样很不去中心化。FIL挖矿中有两种矿工，一种是出块矿工，一种是工作矿工，相当于主仆的关系。MODAN参与的部分是存储与复制证明提交，出块的部分由性能强悍的MODOPOOL主节点机器完成。MODOPOOL主节点挖到矿后在分给所有提供贡献的矿工。"
        },
        {
          q: "家庭挖矿的优势在哪里？",
          a:
            "家庭挖矿的优势在于省去了托管费的成本，家庭带宽多半时间是闲置的，即便使用也不会占满所有的带宽。使用闲置带宽去挖矿，是一件非常划算的事情，而且这也更加符合Filecoin去中心化的宗旨。"
        },
        {
          q: "家庭挖矿的收益将如何计算，该如何提高挖矿效率？",
          a:
            "MODOPOOL将计算所有接入矿机的工作量（即提交的封装空间大小），按照比例发放。MODAN官方建议家庭需要有千兆网络。"
        },
        {
          q: "为何MODAN的形式是个路由器？",
          a:
            "家庭挖矿的难点在于内网穿透（NAT），MODAN内置了路由主板，并自行研发了NAT穿透硬件加速卡，保证客户不需要进行额外操作。MODO的路由功能将超越绝大部分市面上2000以内的路由器。你可放心将家庭原有的路由器替换成MODAN。"
        },
        {
          q: "家庭矿机需要我有技术么？",
          a:
            "完全不需要，MODAN甚至比一般的家庭路由器都更好安装。插上网线启动机器，通过MODAN APP可以轻松进行配置。开机即自动挖矿，MODAN APP会实时显示你的收益，并支持一秒提现。"
        },
        {
          q: "这个家庭矿机还能有什么功能",
          a:
            "基础版的功能有路由和挖矿，高级版的功能可以添加：智能家居、TV BOX、私有NAS云等。"
        }
      ]
    };
  }
};
</script>
<style lang="scss" scoped>
.qaa {
  margin-top: 30px;
  .qaa-item {
    background-color: #eee;
  }
}
</style>