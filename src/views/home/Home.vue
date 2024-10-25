<script setup>
import { home } from '@/apis';
import { onBeforeMount, onMounted, ref } from "vue";
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
const hotTagsList = ref([]);
const loading = ref(false);
const finished = ref(false);

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
const getHotTagsList = async () => {
  const params = {
    tagId: 1
  }
  const { code, data } = await home.getHotTagsList(params);
  hotTagsList.value = [
    {
      id: 1,
      title: "北戴河",
      data: [
        {
          sortId: 0,
          title: "暑假来西安不看演出可不行，9大人气演出出行指南来啦！",
          coverImg: "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg",
          tip: "非遗 战国",
          publisher: "三國戰記",
          publisherAvatar: "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg",
          views: "329",
          includeVideo: false
        },
        {
          sortId: 1,
          title: "藏在华清宫内的庆山寺珍宝馆，你确定不去看看？",
          coverImg: "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg",
          tip: "长城 金山岭",
          publisher: "金駿眉",
          publisherAvatar: "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg",
          views: "124",
          includeVideo: false
        },
        {
          sortId: 2,
          title: "人少又出片的宝藏村落—黄良村！体验慢时光",
          coverImg: "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg",
          tip: "避坑 性价比低",
          publisher: "青衫",
          publisherAvatar: "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg",
          views: "432",
          includeVideo: true
        },
        {
          sortId: 3,
          title: "天桥湖的多8安岛，不出西安就能体验三亚度假的快",
          coverImg: "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg",
          tip: "",
          publisher: "火星",
          publisherAvatar: "",
          views: "432",
          includeVideo: false
        },
      ]
    },
    {
      id: 2,
      title: "打卡",
      data: [
        {
          sortId: 0,
          title: "暑假来西安不看演出可不行，9大人气演出出行指南来啦！",
          coverImg: "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg",
          tip: "非遗 传统技艺",
          publisher: "月亮",
          publisherAvatar: "",
          views: "329",
          includeVideo: false
        },
      ]
    },
    {
      id: 3,
      title: "非遗",
      data: [
        {
          sortId: 0,
          title: "暑假来西安不看演出可不行，9大人气演出出行指南来啦！",
          coverImg: "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg",
          tip: "打卡 周末露营",
          publisher: "太陽",
          publisherAvatar: "",
          views: "329",
          includeVideo: false
        },
      ]
    },
    {
      id: 4,
      title: "攻略",
      data: [
        {
          sortId: 0,
          title: "暑假来西安不看演出可不行，9大人气演出出行指南来啦！",
          coverImg: "ttps://q6.itc.cn/images01/20241012/4d4255aeb3c6424494c7e3bc6a594d17.png",
          tip: "",
          publisher: "飛機",
          publisherAvatar: "",
          views: "329",
          includeVideo: false
        },
      ]
    },
    {
      id: 5,
      title: "美食",
      data: [
        {
          sortId: 0,
          title: "暑假来西安不看演出可不行，9大人气演出出行指南来啦！",
          coverImg: "https://p2.itc.cn/images01/20230304/cd8938262a85419a93a07333dab374e2.jpeg",
          tip: "打卡 一睹大唐盛世",
          publisher: "",
          publisherAvatar: "",
          views: "329",
          includeVideo: false
        },
      ]
    },
    {
      id: 6,
      title: "避坑",
      data: [
        {
          sortId: 0,
          title: "暑假来西安不看演出可不行，9大人气演出出行指南来啦！",
          coverImg: "https://q5.itc.cn/q_70/images03/20241013/6f8607a156ef44368922bded8ce99495.jpeg",
          tip: "打卡 有点像厦门",
          publisher: "",
          publisherAvatar: "",
          views: "329",
          includeVideo: false
        },
      ]
    },
    {
      id: 7,
      title: "长城",
      data: [
        {
          sortId: 0,
          title: "暑假来西安不看演出可不行，9大人气演出出行指南来啦！",
          coverImg: "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg",
          tip: "攻略 河间攻略",
          publisher: "chris",
          publisherAvatar: "",
          views: "329",
          includeVideo: false
        },
      ]
    },
    {
      id: 8,
      title: "博物馆",
      data: [
        {
          sortId: 0,
          title: "暑假来西安不看演出可不行，9大人气演出出行指南来啦！",
          coverImg: "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg",
          tip: "免门票 找美食",
          publisher: "",
          publisherAvatar: "",
          views: "326",
          includeVideo: true
        },
      ]
    },
  ]
}

const init = () => {
  getBannerList();
  getHotTagsList();
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
      <van-tabs v-model:active="active">
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
                <van-image :src="itemInner.publisherAvatar" round />
                <span>{{ itemInner.publisher }}</span>
              </div>
              <div class="views"><van-icon name="eye-o" size="16" color="#9da6b5" />{{ itemInner.views }}</div>
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
