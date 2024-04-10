<script setup>
import picList1 from "@/assets/pic-list-1.jpg";
import { home } from '@/apis';
import {onBeforeMount, onMounted, ref} from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const searchVal = ref("");
const doSearch = (val) => {
  searchVal.value = val;  // 记录当前搜索的值
  console.log("val===>", val)
}

/**
 * 轮播图
 * @returns {Promise<void>}
 */
const swipeList = ref([])
const getListBanner = async () => {
  const { code, data } = await home.getListBanner();
  if (code === 0 && data) {
    swipeList.value = data;
  }
}

/**
 * 跳转详情页
 * @type {Ref<UnwrapRef<*[]>>}
 */
const goDetailPage = (url) => {
  router.push(url)
}

/**
 * 产品列表
 * @type {Ref<UnwrapRef<*[]>>}
 */
const productList = ref([]);
const getListProduct = async () => {
  const { code, data } = await home.getListProduct();
  if (code === 0 && data) {
    productList.value = data;
  }
}
const loading = ref(false);
const finished = ref(false);
/**
 * 异步更新数据，需要后端配合，分步返回数据
 */
const listOnLoad = () => {
  // setTimeout 仅做示例，一般为 ajax 请求
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
  getListProduct();
}
onBeforeMount(() => {
  init();
})
</script>

<template>
  <header>
    <van-search v-model="searchVal" placeholder="请输入搜索关键词" background="transparent" shape="round" clearable @search="doSearch"/>
  </header>
  <main>
    <van-swipe class="my-swipe" :autoplay="4000" indicator-color="white">
      <div v-for="item in swipeList" :key="item.id">
        <van-swipe-item @click="() => goDetailPage(item.url)">
          <van-image :src="item.img" alt="swiper-1" width="381" height="166" radius="15" :lazy-load="true" />
        </van-swipe-item>
      </div>
    </van-swipe>
    <div class="list">
<!--      <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="listOnLoad">-->
        <van-card v-for="item in productList" :key="item.title" :price="+item.price / 100 + '.00'" :desc="item.description" :title="item.title" :thumb="item.cover_img" :lazy-load="true" :thumb-link="'/detail?productId=' + item.id">
          <template #num>
            <van-tag type="warning">{{ item.point }} 分</van-tag>
          </template>
        </van-card>
<!--      </van-list>-->
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