<script setup>
import {onBeforeMount, ref} from "vue";
import {useRoute, useRouter} from 'vue-router';
import { product } from '@/apis';

const router = useRouter();
const route = useRoute();

const loading = ref(false);
const showDialog = ref(false);
const handleSubmit = () => {
  loading.value = true;
  // 检查提交订单前的信息，拦截，校验，登录
  setTimeout(() => {
    showDialog.value = true;
    loading.value = false;
  }, 600)
}
const orderName = ref("王先生");
const orderTel = ref("18033339125");
const validPhoneNumber = ref(false);
const getNowTime = () => {
  return new Date().toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });
}
const inputBlur = () => {
  // 正则表达式匹配中国大陆手机号（11位数字，以1开头）
  const regex = /^1\d{10}$/;
  validPhoneNumber.value = !regex.test(orderTel.value);
}

const submitConfirm = () => {
  loading.value = true;
  // 接口处理
  console.log("接口处理")
  setTimeout(() => {
    router.push({
      path: '/detail/result',
      query: {
        result: "0"
      }
    })
  }, 600)
}

/**
 * 请求详情接口
 * @returns {Promise<void>}
 */
const productTitle = ref("");
const productCreateTime = ref("");
const productCoverImg = ref("");
const smallImg = ref("");
const productPoint = ref(0);
const productPrice = ref(0);
const productText = ref("");
const productSummary = ref("");
const getProductDetail = async () => {
  const { productId } = route.query;
  if (productId) {
    const { code, data } = await product.getProductDetail(productId);
    if (code === 0 && data) {
      productTitle.value = data["title"];
      productCreateTime.value = data["create_time"];
      productCoverImg.value = data["cover_img"];
      smallImg.value = data["small_img"];
      productPoint.value = data["point"] / 2;
      productPrice.value = data["price"];
      productText.value = data["description"];
      productSummary.value = data["summary"];
    }
  }
}

const init = () => {
  getProductDetail();
}

onBeforeMount(() => {
  init();
})
</script>

<template>
  <main>
    <div class="title">{{ productTitle }}</div>
    <div class="create-time">编辑：{{ productCreateTime }}</div>
    <div class="img-wrap">
      <img :src="productCoverImg" alt="cover-img" />
    </div>
    <div class="introduce-wrap">
      <div class="point-wrap">
        <div class="label">评分：</div><van-rate v-model="productPoint" readonly allow-half />
      </div>
      <div class="introduce">
        <h2>文字简介</h2>
        <p>
          <van-text-ellipsis rows="8" :content="productText" expand-text="展开" collapse-text="收起" />
        </p>
      </div>
    </div>
    <div class="summary-wrap">
      <h2>其他相关</h2>
      <img :src="productSummary" alt="summary-img" />
    </div>
    <van-submit-bar :price="productPrice" button-text="提交订单" @submit="handleSubmit" />
    <div v-if="loading" class="loading">
      <van-loading type="spinner" color="#1989fa" />
    </div>
    <van-dialog v-model:show="showDialog" title="确认订单" show-cancel-button @confirm="submitConfirm" :confirmButtonDisabled="validPhoneNumber">
      <div class="order-wrap">
        <div class="order-info">
          <img class="order-img" :src="smallImg" width="50" height="50" alt="cover-img-small" />
          <div class="flex">
            <div class="order-title">{{ productTitle }}</div>
            <div class="order-time">创建日期：{{ getNowTime() }}</div>
          </div>
        </div>
        <van-cell-group inset>
          <van-field v-model="orderName" label="姓名" />
          <van-field v-model="orderTel" type="tel" label="手机号" :error-message="validPhoneNumber ? '手机号格式错误' : ''" @blur="inputBlur"/>
        </van-cell-group>
      </div>
    </van-dialog>
  </main>
</template>

<style scoped lang="less">
  main {
    width: 100%;
    min-height: 100vh;
    padding: 0 30px 50px 30px;
    box-sizing: border-box;
    h2 {
      font-size: 32px;
    }
    .title {
      font-size: 32px;
      line-height: 48px;
      width: auto;
      text-align: center;
      margin-bottom: 20px;
      color: #222222;
      font-weight: 500;
    }
    .create-time {
      font-size: 24px;
      color: #999;
      margin-top: 10px;
      margin-bottom: 30px;
      text-align: center;
    }
    .img-wrap {
      img {
        width: 100%;
        height: auto;
        border-radius: 25px;
        border: 1px solid #ffffff;
        box-shadow: 0 10px 0 rgba(0,0,0,0.15);
      }
    }
    .introduce-wrap {
      .point-wrap {
        margin-top: 30px;
        display: flex;
        align-items: center;
        .label {
          font-size: 32px;
        }
      }
      .introduce {
        margin-top: 40px;
        padding-bottom: 30px;
        p {
          font-size: 28px;
          width: 100%;
          height: auto;
          text-align: justify;
          color: #2c3e50;
          margin-top: 15px;
          text-indent: 2em;
          .van-text-ellipsis {
            line-height: 54px;
          }
        }
      }
    }
    .summary-wrap {
      width: 100%;
      height: auto;
      padding-bottom: 100px;
      img {
        width: 100%;
        height: auto;
        border: 1px solid #ededed;
        border-radius: 10px;
      }
    }
    .van-submit-bar {
      border-top: 1px solid #eee;
    }
    .loading {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      width: 100%;
      height: 100%;
      z-index: 10;
      background: rgba(255, 255, 255, 0.35);
      .van-loading {
        position: absolute;
        left: 50%;
        top: 50%;
        margin-left: -20px;
        margin-top: -20px;
      }
    }
    /deep/.van-dialog {
      .van-dialog__header {
        padding-top: 25px;
        padding-bottom: 20px;
      }
      .van-dialog__content {
        .order-wrap {
          background: #f3f3f3;
          padding: 20px;
          .order-info {
            display: flex;
            align-items: center;
            margin-bottom: 20px;
            padding-top: 15px;
            padding-bottom: 15px;
            .order-img {
              border-radius: 10px;
              margin-right: 15px;
            }
            .flex {
              .order-title {
                font-size: 28px;
                color: #2c3e50;
                margin-bottom: 10px;
              }
              .order-time {
                font-size: 24px;
                color: #999999;
              }
            }
          }
          .van-cell-group {
            margin: 0;
          }
        }
      }
    }
  }
</style>