<script setup>
import { onBeforeMount, reactive, ref } from "vue";
import { showConfirmDialog } from 'vant';
import { useRouter } from "vue-router";
import { order } from "@/apis";
import { useUserStore } from '@/stores';

/**
 * 静态变量
 * @type {string[]}
 */
const staticArrEN = ["payment", "paid", "complete"];
const staticArrCN = ["待付款", "已付款，待核销", "已完成"];

/**
 * 初始化必要变量
 * @type {UnwrapNestedRefs<{activeName: string, paid: *[], payment: *[], complete: *[]}>}
 */
const initialVariable = reactive({
  activeName: "payment",
  payment: [],
  paid: [],
  complete: []
});
const router = useRouter();

/**
 * 获取订单列表
 * @param token
 * @returns {Promise<void>}
 */
const getListOrder = async (token) => {
  const { code, data } = await order.getListOrder(token);
  if (code === 0 && data) {
    initialVariable.paid = data;
  }
}

const init = () => {
  const token = useUserStore().getToken();
  getListOrder(token);
}

onBeforeMount(() => {
  init();
})

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
  <van-tabs v-model:active="initialVariable.activeName">
    <div v-for="(item, index) in staticArrEN">
      <van-tab :title="staticArrCN[index]" :name="staticArrEN[index]" :badge="initialVariable[staticArrEN[index]].length === 0 ? null : initialVariable[staticArrEN[index]].length">
        <div v-if="initialVariable[staticArrEN[index]].length === 0">
          <van-empty image-size="100" :description="'暂无' + staticArrCN[index] + '订单'" />
        </div>
        <div v-else>
          <div v-for="itemInner in initialVariable[staticArrEN[index]]" :key="itemInner.id" class="goods-wrap">
            <van-swipe-cell :before-close="beforeClose">
              <van-card class="goods-card" :price="parseInt(itemInner.total_fee) / 100 + '.00'" :title="itemInner.video_title" :thumb="itemInner.video_img" />
              <template #right>
                <van-button square text="删除" type="danger" class="delete-button" />
              </template>
            </van-swipe-cell>
          </div>
        </div>
      </van-tab>
    </div>
  </van-tabs>
</template>

<style scoped lang="less">
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