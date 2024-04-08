<script setup>
import { reactive, ref } from "vue";
import { showConfirmDialog } from 'vant';

const activeName = ref("payment");
const payment = reactive([
  {
    id: "0",
    productId: "",
    productTitle: "全新elementUI项目实战教程Vue整合Echarts后台权限",
    productImg: "https://xd-video-pc-img.oss-cn-beijing.aliyuncs.com/xdclass_pro/video/2019_frontend/element/elementui.png",
    productPrice: "20.00",
    num: "2"
  },
  {
    id: "1",
    productId: "",
    productTitle: "全新elementUI项目实战2222",
    productImg: "https://xd-video-pc-img.oss-cn-beijing.aliyuncs.com/xdclass_pro/video/2019_frontend/element/elementui.png",
    productPrice: "30.00",
    num: "4"
  }
])
const paid = reactive([
  {
    id: "0",
    productId: "",
    productTitle: "全新elementUI项目实战已购买",
    productImg: "https://xd-video-pc-img.oss-cn-beijing.aliyuncs.com/xdclass_pro/video/2019_frontend/element/elementui.png",
    productPrice: "30.00",
    num: "4"
  },
])
const complete = reactive([
  {
    id: "0",
    productId: "",
    productTitle: "全新elementUI项目实战已完成",
    productImg: "https://xd-video-pc-img.oss-cn-beijing.aliyuncs.com/xdclass_pro/video/2019_frontend/element/elementui.png",
    productPrice: "30.00",
    num: "1"
  }
])
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
</script>

<template>
  <van-tabs v-model:active="activeName">
    <van-tab title="待付款" name="payment" badge="2">
      <div v-for="item in payment" :key="item.id" class="goods-wrap">
        <van-swipe-cell :before-close="beforeClose">
            <van-card class="goods-card" :num="item.num" :price="item.productPrice" :title="item.productTitle" :thumb="item.productImg" />
          <template #right>
            <van-button square text="删除" type="danger" class="delete-button" />
          </template>
        </van-swipe-cell>
      </div>
    </van-tab>
    <van-tab title="已付款，待核销" name="paid" badge="1">
      <div v-for="item in paid" :key="item.id" class="goods-wrap">
        <van-swipe-cell disabled>
          <van-card class="goods-card" :num="item.num" :price="item.productPrice" :title="item.productTitle" :thumb="item.productImg" />
          <template #right>
            <van-button square text="删除" type="danger" class="delete-button" />
          </template>
        </van-swipe-cell>
      </div>
    </van-tab>
    <van-tab title="已完成" name="complete">
      <div v-for="item in complete" :key="item.id" class="goods-wrap">
        <van-swipe-cell disabled>
          <van-card class="goods-card" :num="item.num" :price="item.productPrice" :title="item.productTitle" :thumb="item.productImg" />
          <template #right>
            <van-button square text="删除" type="danger" class="delete-button" />
          </template>
        </van-swipe-cell>
      </div>
    </van-tab>
  </van-tabs>
</template>

<style scoped lang="less">
.van-tabs {
  .van-tabs__wrap {

  }
  /deep/.van-tabs__content {
    margin-top: 30px;
    .van-swipe-cell {
      .van-swipe-cell__wrapper {
        .goods-card {
          margin: 0;
          background-color: #ffffff;
          .van-card__header {
            .van-card__thumb {
              .van-image {
                padding: 10px;
                box-sizing: border-box;
              }
            }
            .van-card__content {
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
</style>