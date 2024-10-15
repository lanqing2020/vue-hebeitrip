<script setup>
import { useRoute, useRouter } from "vue-router";
import ImgBanner1 from "@/assets/test-banner1.jpg";
import ImgBanner2 from "@/assets/test-banner2.jpg";
import ImgBanner3 from "@/assets/test-banner3.jpg";
import { onMounted, reactive, ref } from "vue";
import {location} from '@/apis';

const route = useRoute();
const router = useRouter();
const locationBannerListData = ref([]);
const locationBasicInfo = ref({});
const locationTicketsList = ref([]);

// 请求轮播图
const getLocationBannerList = async () => {
  const { code, data } = await location.getLocationBannerList();
  console.log("data===>", data)
  locationBannerListData.value = [ImgBanner1, ImgBanner2, ImgBanner3];
}

// 请求基本信息
const getLocationBasicInfo = async () => {
  const { code, data } = await location.getLocationBasicInfo();
  console.log("data===>", data)
  locationBasicInfo.value = {
    title: "河间府署",
    desc: "华清宫景区位于西安城东30公里，与“世界第八大奇迹”兵马俑相毗邻。为国家5A级旅游景区、风景名胜区、文物保护单位、文化产业示范基地。周，秦、汉、隋、唐等历代帝王在此建有离宫别苑。因其亘古不变的温泉资源、烽火戏诸侯的历史典故、唐明皇与杨贵妃的爱情故事、“西安事变”发生地而享誉海内外，成为中国唐宫文化旅游标志性景区。",
    latitudeAndLongitude: "116.683999,39.537601",
    // 温馨提示：kingTips 预定时间：scheduledTime 运营时间：operatingTime 使用说明：instructions
    kingTips: "该产品为华清宫门票+香凝池白天足浴套票（华清宫景区实行实名制，如因个人原因录入预定身份证号码错误导致的无法入园，后果自负，请下单时谨慎检查录入）" ,
    scheduledTime: "游玩当天16:30前可分时段下单。",
    operatingTime: "自9月13日起，景区营业时间为：7:00-18:00，17:30停止售票，17:40停止入园，18:00清园，请务必合理安排入园、参观时间。",
    instructions: "1、请您凭本人身份证至景区闸机口直接刷身份证入园参观。2、在津阳门香凝池足浴处凭下单身份证进行产品核销（温泉足浴一人一票，当日有效，无需预约，消费高峰可能需要排队等候。3、如需打印纸质门票，请在入园参观前在景区售票窗口出票。",
    tags: ["人文", "民国", "历史"], // 不要超过3个
    score: "5.0",
    address: "华清路33号",
    phone: "400-800-9999"
  }
}

// 请求门票列表
const getLocationTicketsList = async () => {
  const { code, data } = await location.getLocationTicketsList();
  locationTicketsList.value = [
    {
      id: 0,
      title: "拼团 景区门票+讲解（含耳机）",
      originalPrice: "160",
      currentPrice: "140",
    },
    {
      id: 1,
      title: "成人实名门票",
      originalPrice: "120",
      currentPrice: "120",
    },
    {
      id: 2,
      title: "实名儿童票",
      originalPrice: "60",
      currentPrice: "60",
    }
  ]
}

const clickMarkBtn = () => {
  console.log(111)
}

const init = () => {
  getLocationBannerList();
  getLocationBasicInfo();
  getLocationTicketsList();
}

onMounted(() => {
  init();
})

</script>

<template>
  <div class="container">
    <header>
      <van-nav-bar left-arrow fixed safe-area-inset-top @click-left="router.back()" :title="locationBasicInfo.title">
        <template #right>
          <van-icon name="star-o" size="20" color="white" @click="clickMarkBtn" />
        </template>
      </van-nav-bar>
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white" :show-indicators="false">
        <van-swipe-item v-for="item in locationBannerListData">
          <van-image :src="item" width="100%" />
        </van-swipe-item>
      </van-swipe>
      <div class="info">
        <div class="info-desc">{{ locationBasicInfo.desc }}</div>
        <van-button color="white" plain size="small">了解一下</van-button>
      </div>
    </header>
    <div class="header-desc">
      <div class="up flex-row">
        <div class="tags">
          <van-tag v-for="(item, index) in locationBasicInfo.tags" :key="index" :type="index === 0 ? 'primary' : index === 1 ? 'success' : 'warning'">{{ item }}</van-tag>
        </div>
        <div class="score">{{ `${locationBasicInfo.score} 分` }}</div>
      </div>
      <div class="down flex-row">
        <div class="address van-ellipsis">{{ locationBasicInfo.address }}</div>
        <div class="right">
          <div><van-icon name="location" size="18" />导航</div>
          <div><van-icon name="phone" size="18" />电话</div>
        </div>
      </div>
    </div>
    <div class="space" />
    <main>
      <div class="entry">
        <van-button plain icon="shop-o" type="default">文创商品</van-button>
        <van-button plain icon="fire-o" type="default">预定演出</van-button>
        <van-button plain icon="music-o" type="default">导游讲解</van-button>
      </div>
      <div class="tickets">
        <van-tabs v-model:active="active" shrink class="title">
          <van-tab title="门票预定">
            <div class="item" v-for="(item, index) in locationTicketsList" :key="index">
              <div class="text-title van-ellipsis">{{ item.title }}</div>
              <div class="text-flex">
                <div class="text-l">
                  <div class="l-sub">可随时预定</div>
                  <div class="l-people">912人已参与</div>
                </div>
                <div class="text-r">
                  <div class="price">
                    <div class="original">原价￥{{ item.originalPrice }}</div>
                    <div class="current"><b>￥</b><span>{{ item.currentPrice }}</span> 起</div>
                  </div>
                  <van-button type="danger" round size="small" color="#ff7c1c">预定</van-button>
                </div>
              </div>
            </div>
          </van-tab>
          <van-tab title="游客点评">
            内容 2222
          </van-tab>
        </van-tabs>

      </div>
    </main>
  </div>
</template>

<style scoped lang="less">
.container {
  box-sizing: border-box;
  width: 100vw;
  height: 100vh;
  header{
    z-index: 1;
    position: relative;
    height: 567px;
    /deep/.van-nav-bar {
      background-color: transparent;
      box-sizing: border-box;
      .van-nav-bar__content {
        background-color: transparent;
        .van-nav-bar__left {
          i {
            color: white;
          }
        }
        .van-nav-bar__title {
          font-size: 40px;
          font-weight: 700;
          color: white;
        }
      }
      &:after {
        border: none;
      }
    }
    /deep/.van-swipe {
      z-index: 0;
      .van-swipe__track {
        width: 100% !important;
      }
    }
    .info {
      z-index: 1;
      position: absolute;
      bottom: 65px;
      left: 0;
      right: 0;
      width: 100%;
      height: 200px;
      box-sizing: border-box;
      padding: 0 50px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      color: white;
      .info-desc {
        font-size: 26px;
        line-height: 42px;
        font-weight: normal;
        display: block;
        height: 120px;
        overflow: hidden;
        text-align: justify;
      }
      button {
        background-color: transparent;
        height: 50px;
      }
    }
  }
  .header-desc {
    width: 100%;
    height: 200px;
    box-sizing: border-box;
    margin-top: -30px;
    background-color: white;
    border-radius: 15px 15px 0 0;
    display: flex;
    flex-direction: column;
    position: relative;
    z-index: 2;
    padding: 0 30px;
    .up {
      border-bottom: 1px solid #ebedf0;
      width: 100%;
      box-sizing: border-box;
      flex: 1;
      .tags {
        span {
          margin-right: 10px;
        }
      }
      .score {
        font-size: 32px;
        color: #ff4621;
        font-weight: 700;
      }
    }
    .down {
      flex: 1;
      font-size: 28px;
      color: #646566;
      .address {
        width: 75%;
      }
      .right {
        width: 20%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        div {
          margin-left: 10px;
          display: flex;
          flex-direction: column;
          align-items: center;
          font-size: 24px;
        }
      }
    }
  }
  main{
    padding: 30px 30px 140px;
    .entry {
      width: 100%;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: space-around;
      button {
        padding: 20px 0;
        width: 180px;
        height: 130px;
        border-radius: 15px;
        font-size: 30px;
        color: #323233;
        /deep/.van-button__content {
          display: flex;
          flex-direction: column;
          align-items: center;
          i {
            margin-bottom: 15px;
          }
          span {
            margin-left: 0;
          }
        }
      }
    }
    .tickets {
      margin-top: 30px;
      /deep/.van-tabs {
        .van-tabs__wrap {
          margin-bottom: 30px;
          .van-tabs__nav {
            padding-left: 0;
            padding-right: 0;
            div {
              span {
                font-size: 30px;
                font-weight: normal;
                line-height: 50px;
                display: inline-block;
                height: 50px;
              }
            }
            .van-tab--active {
              span {
                font-size: 32px;
                font-weight: 600;
              }
            }
          }
        }
        .item {
          width: 100%;
          border-bottom: 1px solid #ebedf0;
          margin-bottom: 30px;
          padding-bottom: 30px;
          .text-title {
            font-size: 30px;
            color: #646566;
          }
          .text-flex {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            .text-l {
              font-size: 26px;
              .l-sub {
                color: #00beae;
                margin-bottom: 10px;
              }
              .l-people {
                color: #999;
              }
            }
            .text-r {
              display: flex;
              align-items: flex-end;
              flex-direction: column;
              justify-content: space-between;
              .price {
                display: flex;
                align-items: center;
                margin-bottom: 10px;
                .original {
                  margin-right: 10px;
                  font-size: 24px;
                  color: #999;
                  text-decoration: line-through;
                }
                .current {
                  font-size: 28px;
                  color: #999;
                  span {
                    font-weight: 700;
                    font-size: 34px;
                    color: #ff7c1c;
                  }
                }
              }
              button {
                height: 58px;
                line-height: 58px;
                border-radius: 12px;
                width: 100px;
                font-size: 26px;
              }
            }
          }
        }
      }
    }
  }
  .flex-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .space {
    width: 100%;
    height: 15px;
    background-color: #f7f8fa;
  }
}
</style>
