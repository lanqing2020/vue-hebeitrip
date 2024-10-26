<script setup>
import { home } from '@/apis';
import { onBeforeMount, onMounted, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import SearchComp from "@/components/search/Search.vue";
import picList1 from "@/assets/pic-list-1.jpg";
import picMLogo from "@/assets/m-logo.png";
import icon1 from "@/assets/icon-1.png";
import icon2 from "@/assets/icon-2.png";
import icon3 from "@/assets/icon-3.png";
import icon4 from "@/assets/icon-4.png";

const router = useRouter();
const bannerList = ref([]);
const productList = ref([]);
const hotTagsList = reactive([
  { id: 0, title: "打卡", data: [] },
  { id: 1, title: "古城", data: [] },
  { id: 2, title: "非遗", data: [] },
  { id: 3, title: "攻略", data: [] },
  { id: 4, title: "美食", data: [] },
  { id: 5, title: "避坑", data: [] },
  { id: 6, title: "人气", data: [] },
  { id: 7, title: "溜娃", data: [] },
  { id: 8, title: "博物馆", data: [] }
]);
const loading = ref(false);
const finished = ref(false);
const tabsActive = ref(0);

// 轮播图
const getBannerList = async () => {
  const { code, data } = await home.getBannerList();
  if (code === 0 && data) {
    bannerList.value = data;
  }
}

// 异步更新数据，需要后端配合，分步返回数据
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

// 热门标签
const getHotTagsList = async (number) => {
  const params = {
    tagId: number
  }
  const { code, data } = await home.getHotTagsList(params);
  // 动态构建对象
  if (code === 0) {
    hotTagsList.map((item, index) => {
      if (item.id === number) {
        item.data = data;
      }
    })
  }
}

const onTabChange = (number) => {
  getHotTagsList(number);
  return true;
}

const init = () => {
  getBannerList();
  getHotTagsList(0);
}

onMounted(() => {
  init();
})

</script>

<template>
  <header>
    <van-image :src="picMLogo" class="logo" width="80" />
    <div class="search-wrap">
      <SearchComp />
    </div>
    <div class="footprints">
      <van-icon name="flag-o" size="20" />
      <span>足迹</span>
    </div>
  </header>
  <div class="entry">
    <div class="item">
      <van-image :src="icon1" />
      <span>门票/凭证</span>
    </div>
    <div class="item">
      <van-image :src="icon2" />
      <span>礼品卡</span>
    </div>
<!--    <div class="item">-->
<!--      <van-image :src="icon4" />-->
<!--      <span>租车</span>-->
<!--    </div>-->
    <div class="item">
      <van-image :src="icon3" />
      <span>旅程策划</span>
    </div>
  </div>
  <div class="collect">
    <div class="collect-l flex-item">
      <van-icon name="label-o" size="20" color="#ffb400"/>
      <span>查目的地</span>
    </div>
    <div class="collect-r flex-item">
      <van-icon name="other-pay" size="20" color="#2446ff"/>
      <span>收藏 HebeiTrip.com</span>
    </div>
  </div>
  <main>
    <van-swipe class="my-swipe" :autoplay="4000" indicator-color="white">
      <div v-for="item in bannerList" :key="item.id">
        <van-swipe-item @click="() => router.push(item.url)">
          <van-image :src="item.img" alt="swiper-1" width="381" height="120" radius="10" :lazy-load="true" />
        </van-swipe-item>
      </div>
    </van-swipe>
    <div class="tips">
      <div class="tips-top">
        <div class="flex-row"><van-icon name="discount-o" size="16"/><span>短途更划算</span></div>
        <div class="flex-row"><van-icon name="flower-o" size="16"/><span>旅程无忧</span></div>
      </div>
      <div class="tips-down flex-row"><van-icon name="balance-o" size="16"/><span>旅行积分奖励</span></div>
    </div>
    <div class="list">
      <div class="title">您下一站去哪儿？</div>
      <van-tabs v-model:active="tabsActive" :before-change="onTabChange">
        <van-tab v-for="(item, index) in hotTagsList" :key="index" :title="item.title">
          <div v-for="itemInner in item.data" :key="item.id" class="item-inner">
            <div class="img-wrap">
              <van-image :src="itemInner.coverImg" />
              <span v-if="itemInner.tip">{{ itemInner.tip }}</span>
              <van-icon v-if="itemInner.includeVideo" name="play-circle-o" size="22" />
            </div>
            <div class="text-intro">{{ itemInner.title }}</div>
            <div class="user-intro">
              <div class="avatar">
                <van-image :src="itemInner.userAvatar" round />
                <span>{{ itemInner.userName }}</span>
              </div>
              <div class="views"><van-icon name="eye-o" size="16" color="#9da6b5" />{{ itemInner.viewedNumber }}</div>
            </div>
          </div>
        </van-tab>
      </van-tabs>
    </div>
  </main>
</template>

<style scoped lang="less">
header {
  width: 100%;
  height: 92px;
  padding: 0 30px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .search-wrap {
    .van-search {
      margin: 0;
    }
  }
  .footprints {
    width: 120px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    color: #0f294d;
    i {
      top: 1px;
    }
    span {
      margin-left: 6px;
      font-size: 28px;
    }
  }
}
.entry {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-top: 30px;
  .item {
    box-sizing: border-box;
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 0 0 30px;
    /deep/.van-image {
      width: 102px;
      height: 102px;
      background: linear-gradient(-180deg, #1e54f9, #517bff);
      border-radius: 50%;
      margin-bottom: 20px;
      display: flex;
      justify-content: center;
      img {
        width: 90%;
        height: 90%;
      }
    }
    span {
      font-size: 26px;
      color: #455873;
    }
  }
}
.collect {
  margin-top: 30px;
  padding: 0 30px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  .flex-item {
    flex: 1;
    border-radius: 10px;
    height: 88px;
    padding: 0 26px;
    display: flex;
    align-items: center;
    i {
      top: 1px;
      margin-right: 10px;
    }
    span {
      font-size: 24px;
      color: #455873;
    }
  }
  .collect-l {
    margin-right: 10px;
    background-color: rgba(255, 180, 0, .08);
  }
  .collect-r {
    margin-left: 10px;
    background-color: rgba(50, 100, 255, .08);
  }
}
main {
  margin-top: 30px;
  padding: 0 30px 180px;
  .van-swipe {
    border-radius: 15px;
    .van-swipe-item {
      color: #fff;
      font-size: 20px;
      height: 220px;
      text-align: center;
    }
  }
  .tips {
    margin-top: 20px;
    width: 100%;
    line-height: 1;
    .flex-row {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      margin: 0 20px;
      color: #9da6b5;
      i {
        margin-right: 10px;
        background: linear-gradient(to right, #ffb508, #06aebd);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
      span {
        font-size: 24px;
      }
    }
    .tips-top {
      width: 100%;
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }
    .tips-down {
      width: 100%;
      margin: 0 auto 0;
    }
  }
  .list {
    margin-top: 40px;
    .title {
      font-size: 32px;
      color: #0f294d;
      font-weight: 600;
    }
    /deep/.van-tabs {
      margin-top: 10px;
      .van-tabs__wrap {
        margin-bottom: 20px;
        .van-tab {
          span {
            color: #455873;
            font-size: 26px;
          }
        }
      }
      .van-tabs__content {
        .van-tab__panel {
          display: flex;
          flex-wrap: wrap;
        }
        .item-inner {
          width: 48%;
          height: auto;
          margin-bottom: 50px;
          .img-wrap {
            position: relative;
            height: 320px;
            width: 100%;
            .van-image {
              width: 100%;
              height: 320px;
              img {
                border-radius: 15px 15px 0 0;
              }
            }
            span {
              position: absolute;
              bottom: 20px;
              right: 20px;
              left: auto;
              padding: 0 20px;
              height: 42px;
              line-height: 42px;
              color: #e3e3ea;
              background: rgba(0,0,0,0.35);
              font-size: 24px;
              border-radius: 20px;
            }
            i {
              position: absolute;
              right: 20px;
              top: 20px;

            }
          }
          .text-intro {
            margin-top: 10px;
            width: 100%;
            height: 80px;
            font-size: 28px;
            color: #0f294d;
            font-weight: 500;
            overflow: hidden;
            line-height: 40px;
          }
          .user-intro {
            margin-top: 10px;
            width: 100%;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            .avatar {
              display: flex;
              align-items: center;
              .van-image {
                width: 40px;
                height: 40px;
                margin-right: 10px;
              }
              span {
                font-size: 24px;
                color: #9da6b5;
                line-height: 1;
              }
            }
            .views {
              display: flex;
              align-items: center;
              font-size: 24px;
              color: #455873;
              i {
                margin-right: 10px;
              }
            }
          }
          &:nth-child(2n) {
            margin-left: 4%;
          }
        }
      }
    }
  }
}
</style>
