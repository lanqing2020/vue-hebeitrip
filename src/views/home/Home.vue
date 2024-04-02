<script setup>
import swiper1 from "@/assets/swiper-1.jpg";
import swiper2 from "@/assets/swiper-2.jpg";
import swiper3 from "@/assets/swiper-3.jpg";
import {ref} from "vue";

const searchVal = ref("");
const doSearch = (val) => {
  searchVal.value = val;  // 记录当前搜索的值
  console.log("val===>", val)
}
</script>

<template>
  <header>
    <van-search v-model="searchVal" placeholder="请输入搜索关键词" background="transparent" shape="round" clearable @search="doSearch"/>
  </header>
  <main>
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item>
        <img :src="swiper1" alt="swiper-1" width="381" height="166" />
      </van-swipe-item>
      <van-swipe-item>
        <img :src="swiper2" alt="swiper-2" width="381" height="166" />
      </van-swipe-item>
      <van-swipe-item>
        <img :src="swiper3" alt="swiper-3" width="381" height="166" />
      </van-swipe-item>
    </van-swipe>
  </main>
</template>

<style scoped lang="less">
header {
  .van-search {
    margin: 6px 0;
  }
}
main {
  margin: 0 30px;
  .van-swipe {
    .van-swipe-item {
      color: #fff;
      font-size: 20px;
      height: 300px;
      text-align: center;
      img {
        border-radius: 10px;
      }
    }
  }
}
</style>