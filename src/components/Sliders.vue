<template>
  <div class="slider">
    <div class="block">
      <el-carousel height="425px">
        <!-- 内容图片 -->
        <el-carousel-item v-for="(item, index) in banners" :key="index">
          <div
            class="banner-img"
            :style="`
          background:url(${item.url}) center center no-repeat;
          background-size:contain contain;
          `"
          ></div>
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //轮播图数据
      banners: [
        {
          url:
            "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1582283221939&di=ed77967991a0980cedc408f900be5a1a&imgtype=jpg&src=http%3A%2F%2Fimg2.imgtn.bdimg.com%2Fit%2Fu%3D3770062302%2C1485665606%26fm%3D214%26gp%3D0.jpg"
        },
        { url: "@/src/assets/img/banner1.png" }
      ]
    };
  }
};
</script>

<style lang="scss">
.slider {
  width:100%;
  height: 425px;
  .el-carousel {
    overflow: hidden;
    .el-carousel__item {
      .banner-img {
        width: 100%;
        height: 100%;
      }
    }
    .el-carousel__item h3 {
      color: #475669;
      font-size: 18px;
      opacity: 0.75;
      line-height: 300px;
      margin: 0;
    }

    .el-carousel__item:nth-child(2n) {
      background-color: #99a9bf;
    }

    .el-carousel__item:nth-child(2n + 1) {
      background-color: #d3dce6;
    }
  }
}
</style>