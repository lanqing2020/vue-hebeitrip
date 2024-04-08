<script setup>
import swiper1 from "@/assets/swiper-1.jpg";
import swiper2 from "@/assets/swiper-2.jpg";
import swiper3 from "@/assets/swiper-3.jpg";
import picList1 from "@/assets/pic-list-1.jpg";
import { home } from '@/apis';
import {onMounted, ref} from "vue";

const searchVal = ref("");
const doSearch = (val) => {
  searchVal.value = val;  // 记录当前搜索的值
  console.log("val===>", val)
}

const getListBanner = async () => {
  const { code, data } = await home.getListBanner();
  if (code === 0 && data) {
    console.log("data===>", data)
  }
}

const productList = ref([]);
const loading = ref(false);
const finished = ref(false);
const listOnLoad = () => {
  // 异步更新数据
  // setTimeout 仅做示例，真实场景中一般为 ajax 请求
  setTimeout(() => {
    for (let i = 0; i < 5; i++) {
      const obj = {
        num: "13",
        price: "2.00",
        desc: "北京环球度假区是一个广受欢迎的主题公园旅游目的地，包括北京环球影城主题公园、北京环球城市大道",
        title: "北京环球度假区",
        thumb: picList1
      }
      productList.value.push(obj);
    }
    // 加载状态结束
    loading.value = false;
    // 数据全部加载完成
    if (productList.value.length >= 12) {
      finished.value = true;
    }
  }, 1000);
}

const init = () => {
  getListBanner();
}
onMounted(() => {
  init();
})
</script>

<template>
  <header>
    <van-search v-model="searchVal" placeholder="请输入搜索关键词" background="transparent" shape="round" clearable @search="doSearch"/>
  </header>
  <main>
    <van-swipe class="my-swipe" :autoplay="4000" indicator-color="white">
      <van-swipe-item>
        <van-image :src="swiper1" alt="swiper-1" width="381" height="166" radius="15" :lazy-load="true" />
      </van-swipe-item>
      <van-swipe-item>
        <van-image :src="swiper2" alt="swiper-2" width="381" height="166" radius="15" :lazy-load="true" />
      </van-swipe-item>
      <van-swipe-item>
        <van-image :src="swiper3" alt="swiper-3" width="381" height="166" radius="15" :lazy-load="true" />
      </van-swipe-item>
    </van-swipe>
    <div class="list">
      <van-list
          v-model:loading="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="listOnLoad">
        <van-card v-for="item in productList" :key="item.title" :num="item.num" :price="item.price" :desc="item.desc" :title="item.title" :thumb="item.thumb" :lazy-load="true" />
      </van-list>
    </div>
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
  padding-bottom: 140px;
  .van-swipe {
    border-radius: 15px;
    .van-swipe-item {
      color: #fff;
      font-size: 20px;
      height: 300px;
      text-align: center;
    }
  }
  .list {
    margin-top: 30px;
    /deep/.van-card {
      background: #fff;
      padding-left: 0;
      padding-right: 0;
      border-bottom: 1px solid #eee;
      .van-card__content {
        .van-card__title {
          font-size: 30px;
        }
        .van-card__desc {
          font-size: 28px;
        }
      }
    }
  }
}
</style>