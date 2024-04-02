<script setup>
import { ref } from "vue";
import tx from "@/assets/tx.jpg";
import { showConfirmDialog } from 'vant';

// 头部信息：姓名和当前游览位置
const userName = ref("啄木鸟");
const currPosition = ref("C");

/**
 * 立即通话
 * @returns {Promise<DialogAction | undefined>}
 */
const getCall = () => {
  return showConfirmDialog({
    title: '标题',
    message: '如果解决方法是丑陋的，那就肯定还有更好的解决方法，只是还没有发现而已。',
  }).then(() => {
    console.log("触发1")
    // on confirm
  }).catch(() => {
    console.log("触发2")
    // on cancel
  });
}

// 联系人管理
const showContact = ref(false);
const contactActions = [
  { name: '选项一' },
  { name: '选项二' },
  { name: '选项三' },
];
const onContactSelect = (item) => {
  // 默认情况下点击选项时不会自动收起
  // 可以通过 close-on-click-action 属性开启自动收起
  console.log("item===>", item)
  showContact.value = false;
  // showToast(item.name);
}

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



</script>

<template>
  <header>
    <h1>我的</h1>
    <div class="content">
      <van-image round width="70px" height="70px" :src="tx" />
      <div class="info">
        <div class="title">Hello，{{ userName }}</div>
        <div class="route">
          <div>已游览至{{ currPosition }}点</div>
          <van-icon name="arrow" />
        </div>
      </div>
    </div>
  </header>
  <main>
    <div class="sos">
      <div>是否现在联系景区管理人员</div>
      <van-button round type="success" size="small" @click="getCall">立即通话</van-button>
    </div>
    <div class="list">
      <van-cell is-link title="联系人" @click="showContact = true" />
      <van-action-sheet v-model:show="showContact" :actions="contactActions" @select="onContactSelect" />

      <van-cell is-link title="分享景区" @click="showShare = true" />
      <van-share-sheet v-model:show="showShare" title="立即分享给好友" :options="shareOptions" @select="onShareSelect" />

      <van-coupon-cell :coupons="coupons" :chosen-coupon="chosenCoupon" @click="showCouponList = true" />
      <!-- 优惠券列表 -->
      <van-popup v-model:show="showCouponList" round position="bottom"style="height: 90%; padding-top: 4px;" >
        <van-coupon-list :coupons="coupons" :chosen-coupon="chosenCoupon" :disabled-coupons="disabledCoupons" @change="onCouponChange" @exchange="onCouponExchange" />
      </van-popup>
    </div>
  </main>
</template>

<style scoped lang="less">
  header {
    background: url("../../assets/user.jpg");
    background-repeat: no-repeat;
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
    .list {
      margin-top: 30px;
    }
  }

</style>