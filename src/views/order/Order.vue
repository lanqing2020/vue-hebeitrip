<script setup>
import {onBeforeMount, onMounted, reactive, ref} from "vue";
import { showConfirmDialog } from 'vant';
import { useRouter } from "vue-router";
import { order } from "@/apis";
import { useUserStore } from '@/stores';
import notLoginImg from "@/assets/order-default.png";
import LoginComp from "@/components/login/Login.vue";

// 初始化必要变量
const hasLogged = ref(false);
const loginSheet = ref(false);
const activeName = ref("all");  // 默认显示的tab
const ordersData = reactive([
  { type: "all", title: "全部", list: [] },
  { type: "payment", title: "待付款", list: [] },
  { type: "paid", title: "待使用", list: [] },
  { type: "reviews", title: "待评价", list: [] },
  { type: "refund", title: "退款/售后", list: [] }
]);
const router = useRouter();

/**
 * 获取订单列表
 * @param token
 * @param method
 * @returns {Promise<void>}
 */
const getListOrder = async (token, method) => {
  const { code, data } = await order.getListOrder(token, method);
  if (code === 0 && data) {
    ordersData.map((item) => {
      if (item.type === method) {
        item.list = data
      }
    })
    console.log("ordersData===>", ordersData)
  }
}

const init = () => {
  if (useUserStore().getLogged()) {
    getListOrder(useUserStore().getToken(), "all");
    hasLogged.value = true;
  }
}

const onClickTab = ({ title, name }) => {
  console.log(title, name)
  getListOrder(useUserStore().getToken(), name);
}

// position 为关闭时点击的位置
const beforeClose = ({ position }) => {
  switch (position) {
    case 'left':
    case 'cell':
    case 'outside':
      return true;
    case 'right':
      return new Promise((resolve) => {
        showConfirmDialog({
          title: '确定删除吗？',
        }).then(() => resolve(true)).catch(() => resolve(false));
      });
  }
};

const pullUpLoginSheet = () => {
  if (!loginSheet.value) {
    loginSheet.value = true;
  }
}

// 生命周期部分
onMounted(() => {
  init();
})

</script>

<template>
  <div class="container">
    <div v-if="!hasLogged">
      <div class="not-login-wrap">
        <div class="not-login-img">
          <img :src="notLoginImg" alt="notLogin" />
        </div>
        <div class="not-login-text">
          <p>我的订单</p>
          <div>登录后，可以查看订单和离线使用凭证</div>
          <van-button @click="pullUpLoginSheet" class="login-button" round type="success">登录</van-button>
        </div>
      </div>
    </div>
    <div v-else>
      <van-nav-bar title="我的订单" />
      <van-tabs v-model:active="activeName" @click-tab="onClickTab">
        <div v-for="(item, index) in ordersData">
          <van-tab :title="ordersData[index]['title']" :name="ordersData[index]['type']">
            <div v-if="ordersData[index]['list'].length === 0">
              <van-empty image-size="100" :description="'暂无' + ordersData[index]['title'] + '订单'" />
            </div>
            <div v-else>
              <div v-for="itemInner in ordersData[index]['list']" :key="itemInner.id" class="goods-wrap">
                <van-swipe-cell :before-close="beforeClose" :disabled="index !== 0">
                  <van-card class="goods-card" :price="parseInt(itemInner.total_fee) / 100 + '.00'" :title="itemInner.video_title" :thumb="itemInner.video_img" @click="() => router.push(`/detail?productId=${itemInner.video_id}`)" />
                  <template #right>
                    <van-button square text="删除" type="danger" class="delete-button" />
                  </template>
                </van-swipe-cell>
              </div>
            </div>
          </van-tab>
        </div>
      </van-tabs>
    </div>
    <van-action-sheet v-model:show="loginSheet" duration="0.2" :round="false" title="登录" class="my-action-sheet">
      <LoginComp />
    </van-action-sheet>
  </div>
</template>

<style scoped lang="less">
.container {
  .not-login-wrap {
    width: 100%;
    position: absolute;
    left: 0;
    right: 0;
    top: 50%;
    margin-top: -350px;
    .not-login-img {
      width: 240px;
      height: 278px;
      margin: 0 auto;
      img {
        width: 100%;
      }
    }
    .not-login-text {
      width: 100%;
      margin-top: 100px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      p {
        font-size: 48px;
        font-weight: bold;
        margin: 0;
        color: #0f294d;
      }
      div {
        margin-top: 20px;
        font-size: 26px;
        color: #9da6b5;
      }
      .login-button {
        width: 260px;
        margin-top: 30px;
        background: linear-gradient(90deg, #fe7b21, #fe5010);
        border: none;
        /deep/ div {
          .van-button__text {
            font-size: 32px;
          }
        }
      }
    }
  }
  .van-tabs {
    .van-tabs__wrap {}
    /deep/.van-tabs__content {
      margin-top: 30px;
      .van-swipe-cell {
        .van-swipe-cell__wrapper {
          .goods-card {
            margin: 0;
            background-color: #ffffff;
            .van-card__header {
              border-bottom: 1px solid #ededed;
              .van-card__thumb {
                .van-image {
                  padding: 10px;
                  box-sizing: border-box;
                }
              }
              .van-card__content {
                padding: 10px 0;
                .van-card__title {
                  font-size: 26px;
                  color: #2c3e50;
                }
                .van-card__bottom {
                  .van-card__price {
                    color: #ee0a24;
                    .van-card__price-integer {
                      font-size: 34px;
                    }
                  }
                  .van-card__num {

                  }
                }
              }
            }
          }
          .van-swipe-cell__right {
            .delete-button {
              height: 100%;
            }
          }
        }
      }
    }
  }
  /deep/ .my-action-sheet {
    height: 100%;
    max-height: 100%;
    .van-action-sheet__header {
      color: transparent;
      font-size: 0;
      i {
        right: auto;
        left: 0;
      }
    }
  }
}
</style>
