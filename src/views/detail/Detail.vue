<script setup>
import {onBeforeMount, reactive, ref} from "vue";
import { useRoute, useRouter } from 'vue-router';
import { product, order, user } from '@/apis';
import { useUserStore } from '@/stores';

const router = useRouter();
const route = useRoute();

const initialState = reactive({
  loading: false,
  showDialog: false
})

const initialUser = reactive({
  name: "",
  phone: "",
  validPhoneNumber: false
})

const initialProduct = reactive({
  productTitle: "",
  productCreateTime: "",
  productCoverImg: "",
  smallImg: "",
  productPoint: 0,
  productPrice: 0,
  productText: "",
  productSummary: "",
  productId: ""
})

const handleSubmit = () => {
  initialState.loading = true;
  // 检查提交订单前的信息，拦截，校验，登录
  setTimeout(() => {
    initialState.showDialog = true;
    initialState.loading = false;
  }, 600)
}

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
  initialUser.validPhoneNumber = !regex.test(initialUser.phone);
}

/**
 * 获取用户信息
 * @type {UnwrapNestedRefs<{headImg: *, phone: string, name: string}>}
 */
const findInfoByToken = async (token) => {
  const { code, data } = await user.findInfoByToken(token);
  if (code === 0 && data) {
    initialUser.name = data.name;
    initialUser.phone = data.phone;
  }
}

/**
 * 下单接口
 */
const saveOrder = async () => {
  const token = useUserStore().getToken();
  const params = {
    "video_id": initialProduct.productId + ""
  }
  order.saveOrder(token, params).then(res => {
    router.push({
      path: '/detail/result',
      query: {
        type: res.code + ""
      }
    })
  }).catch(err => {
    console.log("err===>", err)
  })
}

const submitConfirm = () => {
  initialState.loading = true;
  // 接口处理
  saveOrder();
}

/**
 * 请求详情接口
 * @returns {Promise<void>}
 */
const getProductDetail = async () => {
  const { productId } = route.query;
  if (productId) {
    const { code, data } = await product.getProductDetail(productId);
    if (code === 0 && data) {
      initialProduct.productId = data["id"];
      initialProduct.productTitle = data["title"];
      initialProduct.productCreateTime = data["create_time"];
      initialProduct.productCoverImg = data["cover_img"];
      initialProduct.smallImg = data["small_img"];
      initialProduct.productPoint = data["point"] / 2;
      initialProduct.productPrice = data["price"];
      initialProduct.productText = data["description"];
      initialProduct.productSummary = data["summary"];
    }
  }
}

const init = () => {
  const token = useUserStore().getToken();
  findInfoByToken(token);
  getProductDetail();
}

onBeforeMount(() => {
  init();
})
</script>

<template>
  <main>
    <div class="title">{{ initialProduct.productTitle }}</div>
    <div class="create-time">编辑：{{ initialProduct.productCreateTime }}</div>
    <div class="img-wrap">
      <img :src="initialProduct.productCoverImg" alt="cover-img" />
    </div>
    <div class="introduce-wrap">
      <div class="point-wrap">
        <div class="label">评分：</div><van-rate v-model="initialProduct.productPoint" readonly allow-half />
      </div>
      <div class="introduce">
        <h2>文字简介</h2>
        <p>
          <van-text-ellipsis rows="8" :content="initialProduct.productText" expand-text="展开" collapse-text="收起" />
        </p>
      </div>
    </div>
    <div class="summary-wrap">
      <h2>其他相关</h2>
      <img :src="initialProduct.productSummary" alt="summary-img" />
    </div>
    <van-submit-bar :price="initialProduct.productPrice" button-text="提交订单" @submit="handleSubmit" />
    <div v-if="initialState.loading" class="loading">
      <van-loading type="spinner" color="#1989fa" />
    </div>
    <van-dialog v-model:show="initialState.showDialog" title="确认订单" show-cancel-button @confirm="submitConfirm" :confirmButtonDisabled="initialUser.validPhoneNumber">
      <div class="order-wrap">
        <div class="order-info">
          <img class="order-img" :src="initialProduct.smallImg" width="50" height="50" alt="cover-img-small" />
          <div class="flex">
            <div class="order-title">{{ initialProduct.productTitle }}</div>
            <div class="order-time">创建日期：{{ getNowTime() }}</div>
          </div>
        </div>
        <van-cell-group inset>
          <van-field v-model="initialUser.name" label="姓名" />
          <van-field v-model="initialUser.phone" type="tel" label="手机号" :error-message="initialUser.validPhoneNumber ? '手机号格式错误' : ''" @blur="inputBlur"/>
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
      position: fixed;
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