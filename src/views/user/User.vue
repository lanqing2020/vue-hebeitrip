<script setup>
import {onBeforeMount, onMounted, reactive, ref} from "vue";
import { showConfirmDialog, showToast, showDialog } from 'vant';
import { user } from '@/apis';
import { useUserStore } from '@/stores';
import { useRouter } from "vue-router";
import TxDefault from '@/assets/default-tx.jpg';
import { clearLogged } from "@/utils/checkLogged.js";

/**
 * 初始化必要变量
 * @type {UnwrapNestedRefs<{headImg: *, phone: string, name: string}>}
 */
const initialVariable = reactive({
  name: "",
  headImg: TxDefault,
  phone: "",
  currPosition: "",
  clickedSignOut: false,
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
  } else {
    console.log("停止")
    clearLogged();
    return false;
  }
}

/**
 * 当前游览位置
 * @type {Ref<UnwrapRef<string>>}
 */
const getCurrPosition = async (token) => {
  const { code, data } = await user.queryCurrPosition(token);
  if (code === 0 && data) {
    initialVariable.currPosition = data;
  }
}

/**
 * 检查是否已登录
 * @returns {boolean}
 */
const isLoginIn = () => {
  const token = useUserStore().getToken();
  if (!token) {
    showDialog({
      title: '还未登陆',
      message: '遇到麻烦，检车到您还未登录本站，是否现在跳转登录页？',
      closeOnPopstate: false,
    }).then(() => {
      router.push({ path: "/login", query: { } })
    });
    return false;
  }
  return token;
}

/**
 * 初始化调用接口
 */
const init = () => {
  const token = isLoginIn();
  if (token) {
    findInfoByToken(token).then(() => {
      getCurrPosition(token);
    });
  }
}

/**
 * 退出登录
 */
const loginOut = () => {
  useUserStore().setToken("");
  initialVariable.clickedSignOut = true;
  showToast({
    type: "success",
    message: "您已退出",
    onClose: () => {
      router.push({path: "/login"});
    }
  });
}

onMounted(() => {
  init();
})

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

</script>

<template>
  <header>
    <h1>我的</h1>
    <div class="content">
      <van-image round width="70px" height="70px" :src="initialVariable.headImg" />
      <div class="info">
        <div class="title">Hello，{{ initialVariable.name }}</div>
        <div class="route">
          <div>已游览至 {{ initialVariable.currPosition }} 点</div>
          <van-icon name="arrow" />
        </div>
      </div>
    </div>
    <div class="login-out" @click="loginOut">
      <van-icon name="setting-o" />
      <span>退出</span>
    </div>
  </header>
  <main>
    <div class="sos">
      <div>是否现在联系景区管理人员</div>
      <van-button round type="success" size="small" @click="getCall">立即通话</van-button>
    </div>
    <div class="list">
      <van-cell is-link title="智能辅助" @click="showActionSheet = true" />
      <van-action-sheet
          v-model:show="showActionSheet"
          :actions="actionsStatic"
          cancel-text="取消"
          description="您可能需要"
          close-on-click-action
      />

      <van-coupon-cell :coupons="coupons" :chosen-coupon="chosenCoupon" @click="showCouponList = true" />
      <!-- 优惠券列表 -->
      <van-popup v-model:show="showCouponList" round position="bottom" style="height: 90%; padding-top: 4px;" >
        <van-coupon-list :coupons="coupons" :chosen-coupon="chosenCoupon" :disabled-coupons="disabledCoupons" @change="onCouponChange" @exchange="onCouponExchange" />
      </van-popup>

      <van-cell is-link title="分享景区" @click="showShare = true" />
      <van-share-sheet v-model:show="showShare" title="立即分享给好友" :options="shareOptions" @select="onShareSelect" />

    </div>
    <div v-if="initialVariable.clickedSignOut" class="loading" />
  </main>
</template>

<style scoped lang="less">
  header {
    background: url("../../assets/user.jpg") no-repeat;
    background-size: cover;
    padding: 0 30px;
    height: 350px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    h1 {
      position: absolute;
      left: 50%;
      top: 5px;
      margin-left: -20px;
      font-size: 34px;
      text-align: center;
      font-weight: 500;
    }
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
          font-size: 34px;
          font-weight: 600;
        }
        .route {
          font-size: 24px;
          display: flex;
          justify-content: center;
          align-items: center;
          border: 1px solid #07c160;
          border-radius: 30px;
          height: 38px;
          width: 210px;
          div {
            color: #07c160;
            letter-spacing: 2px;
            margin-right: 10px;
          }
          i {
            color: #07c160;
            font-size: 20px;
          }
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
    padding: 0 30px;
    .sos {
      height: 60px;
      background: #eedfbe;
      border-radius: 35px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 30px;
      div {
        font-size: 28px;
      }
    }
    /deep/.list {
      margin-top: 30px;
      .van-popup {
        .van-action-sheet__content {
          .van-contact-list {
            .van-radio-group {
              .van-cell {
                .van-radio {
                  display: none;
                }
              }
            }
          }
        }
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
  }

</style>