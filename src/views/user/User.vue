<script setup>
import { onBeforeMount, onMounted, reactive, ref } from "vue";
import { showConfirmDialog, showToast, showDialog } from 'vant';
import { user } from '@/apis';
import { useUserStore } from '@/stores';
import { useRouter } from "vue-router";
import TxDefault from '@/assets/default-tx.jpg';
import LoginComp from "@/components/login/Login.vue";

// 初始化必要变量
const hasLogged = ref(false);
const loginSheet = ref(false);
const initialVariable = reactive({
  name: "",
  headImg: TxDefault,
  phone: "",
  currPosition: "",
});
const router = useRouter();

/**
 * 头部信息：姓名和头像
 * @type {UnwrapNestedRefs<{headImg: *, phone: string, name: string}>}
 */
const findInfoByToken = async (token) => {
  const { code, data } = await user.findInfoByToken(token);
  if (code === 0 && data) {
    initialVariable.name = data["name"];
    initialVariable.headImg = data["head_img"];
    initialVariable.phone = data["phone"];
  }
}

const clickOverlay = () => {
  if (!hasLogged.value) {
    loginSheet.value = true;
  }
}

const goToSetPage = () => {
  router.push({
    path: '/user/set',
    // query: {
    //   type: "123"
    // }
  })
}

/**
 * 立即通话
 * @returns {Promise<DialogAction | undefined>}
 */
const getCall = () => {
  return showConfirmDialog({
    title: '联系官方（official）',
    message: '遇到麻烦，并且周边人员无法给与帮助，\n现在联系管理人员？',
  }).then(() => {
    window.location.href = 'tel://' + 17777858251;
  }).catch(() => {
    console.log("点击了 cancel 按钮")
  });
}

// 智能辅助
const showActionSheet = ref(false);
const actionsStatic = [
  { name: '浏览地图' },
  { name: '语音讲解' },
];

// 优惠券部分
const coupon = {
  available: 1,
  condition: '无门槛\n最多优惠12元',
  reason: '',
  value: 150,
  name: '优惠券名称',
  startAt: 1489104000,
  endAt: 1514592000,
  valueDesc: '1.5',
  unitDesc: '元',
};
const unCoupon = {
  available: 1,
  condition: '无门槛\n最多优惠222元',
  reason: '',
  value: 1350,
  name: '优惠券名称2',
  startAt: 23234,
  endAt: 234234,
  valueDesc: '100.5',
  unitDesc: '元',
};
const coupons = ref([coupon]);
const disabledCoupons = [unCoupon];
const showCouponList = ref(false);
const chosenCoupon = ref(-1);
const onCouponChange = (index) => {
  showCouponList.value = false;
  chosenCoupon.value = index;
};
const onCouponExchange = (code) => {
  coupons.value.push(coupon);
};

// 分享部分
const showShare = ref(false);
const shareOptions = [
  { name: '微信', icon: 'wechat' },
  { name: '微博', icon: 'weibo' },
  { name: '复制链接', icon: 'link' },
  { name: '分享海报', icon: 'poster' },
  { name: '二维码', icon: 'qrcode' },
];
const onShareSelect = (option) => {
  // showToast(option.name);
  showShare.value = false;
};

/**
 * 初始化调用接口
 */
const init = () => {
  if (useUserStore().getLogged()) {
    const token = useUserStore().getToken();
    findInfoByToken(token);
    hasLogged.value = true;
  }
}

// 生命周期部分
onMounted(() => {
  init();
})
</script>

<template>
  <div class="container">
    <header>
      <div class="content">
        <van-image round width="70px" height="70px" :src="initialVariable.headImg" />
        <div class="info">
          <div class="title">{{ !hasLogged ? "注册登录" : "Hello," + initialVariable.name }}</div>
        </div>
      </div>
      <div class="login-out" @click="goToSetPage">
        <van-icon name="setting-o" size="24" />
        <span>设置</span>
      </div>
    </header>
    <main>
      <div class="hot-wrap">
        <div class="flex-div integration">
          <div class="title">我的积分</div>
          <div class="nums">0</div>
        </div>
        <div class="flex-div coupon" @click="showCouponList = true">
          <div class="title">我的优惠券</div>
          <div class="nums">1张可用</div>
        </div>
      </div>
      <div class="list">
        <van-cell is-link icon="todo-list-o" title="门票凭证" @click="router.push('/user/tickets')" />
        <van-cell is-link icon="comment-circle-o" @click="router.push('/user/publish')">
          <template #title>
            <span class="custom-title">我的发布</span>
            <van-tag type="primary">赢积分</van-tag>
          </template>
        </van-cell>
        <van-cell is-link icon="star-o" title="我的收藏" @click="router.push('/user/collect')" />
        <van-cell is-link icon="coupon-o" title="获得优惠" @click="router.push('/user/discount')" />
        <van-cell is-link icon="info-o" title="帮助中心" @click="router.push('/user/help')" />
        <van-cell is-link icon="service-o" title="在线咨询" @click="router.push('/user/publish')" />
      </div>
      <!-- 优惠券列表 -->
      <van-popup v-model:show="showCouponList" round position="bottom" style="height: 90%; padding-top: 4px;" >
        <van-coupon-list :coupons="coupons" :chosen-coupon="chosenCoupon" :disabled-coupons="disabledCoupons" @change="onCouponChange" @exchange="onCouponExchange" />
      </van-popup>
    </main>
    <van-action-sheet v-model:show="loginSheet" duration="0.2" :round="false" title="登录" class="my-action-sheet">
      <LoginComp />
    </van-action-sheet>
  </div>
</template>

<style scoped lang="less">
.container {
  width: 100%;
  z-index: 1;
  box-sizing: border-box;
  header {
    background: url("../../assets/user.jpg") no-repeat;
    background-size: cover;
    padding: 0 30px;
    height: 350px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    .content {
      width: 100%;
      display: flex;
      .van-image {
        margin-right: 20px;
      }
      .info {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        padding: 10px 0;
        .title {
          font-size: 32px;
        }
      }
    }
    .login-out {
      display: flex;
      align-items: center;
      min-width: 110px;
      justify-content: space-between;
      span {
        font-size: 28px;
      }
    }
  }
  main {
    .hot-wrap {
      width: 100%;
      height: 165px;
      padding: 0 30px;
      background: #fff;
      display: flex;
      align-items: center;
      justify-content: space-between;
      box-sizing: border-box;
      .flex-div {
        flex: 1;
        height: 150px;
        border-radius: 25px;
        background-size: cover;
        background-repeat: no-repeat;
        padding: 20px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        box-sizing: border-box;
        font-size: 32px;
        color: white;
        .nums {
          font-size: 28px;
          font-weight: 600;
        }
      }
      .integration {
        margin-right: 15px;
        background-image: url("../../assets/integration.jpg");
      }
      .coupon {
        margin-left: 15px;
        background-image: url("../../assets/coupon.jpg");
      }
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
    }
    .list {
      margin-top: 40px;
      .van-cell {
        /deep/i {
          font-size: 34px;
          margin-right: 15px;
        }
        /deep/.van-cell__title {
          font-size: 30px;
          .van-tag {
            height: 42px;
            line-height: 40px;
            margin-left: 15px;
            border-radius: 8px;
            top: -2px;
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
