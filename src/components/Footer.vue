<template>
  <div class="footer">
    <div class="footer-wrap">
      <el-row class="info-list">
        <el-col :span="12" class="scan">
          <h5>MODAN</h5>
          <p>123</p>
          <p>456</p>
          <p>789</p>
        </el-col>
        <el-col :span="12" class="scan">
          <h5>关于我们</h5>
          <p>123</p>
          <p>456</p>
          <p>789</p>
        </el-col>
      </el-row>
      <div class="licence">
        备案号：xxxxx
      </div>
    </div>
  </div>
</template>
<script>

</script>

<style lang="scss" scoped>
  .footer{
    margin-top: 10px;
    background: #333;
    color: #ccc;
    // min-width: 1000px;
  }
  .footer-wrap{
    padding-top: 30px;
    margin: 0 auto;
    // width: 1000px;
  }
  .info-list{
    h5{
      font-weight: normal;
      font-size: 16px;
      margin-bottom: 10px;
    }
    p{
      font-size: 12px;
      line-height: 1.8;
    }
  }
  .scan{
    text-align: center;
    font-size: 12px;
    img{
      width: 140px;
      height: 140px;
    }
  }
  .licence{
    border-top: 1px #666 solid;
    margin-top: 20px;
    padding: 20px 0;
    text-align: center;
    font-size: 12px;
  }
</style>