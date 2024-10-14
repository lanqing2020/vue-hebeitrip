<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { generateQRCode } from "@/utils/generateQRCode.ts";

const router = useRouter();
const showShare = ref(false);
const inviteCode = ref("");
const options = [
  { name: '微信', icon: 'wechat' },
  { name: '复制链接', icon: 'link' },
  { name: '二维码', icon: 'qrcode' },
];
const onSelect = (option) => {
  showShare.value = false;
  const shareURL = `https://m.hebeitrip.com/login?inviteCode=${inviteCode.value}`;
  switch (option.icon) {
    case "wechat": {
      break;
    }
    case "link": {
      // 复制链接到用户粘贴板
      break;
    }
    case "qrcode": {
      generateQRCode(shareURL);
      break;
    }
    default: {}
  }
};
onMounted(() => {
  // 获取专属邀请码 api
  inviteCode.value = "054HWM";
})
</script>

<template>
  <van-nav-bar title="获得优惠" left-arrow @click-left="() => router.push({ path: '/user' })">
    <template #right>
      <van-icon name="wap-home-o" size="20" @click="() => router.push({ path: '/' })" />
    </template>
  </van-nav-bar>
  <main>
    <div class="forward">
      <h2>邀请好友体验“河北旅途网”</h2>
      <van-cell-group inset>
        <van-field label="您的邀请码" :model-value="inviteCode" disabled />
      </van-cell-group>
      <van-button type="primary" block round color="linear-gradient(to right, #ff6034, #ee0a24)" @click="showShare = true">分享好友</van-button>
    </div>
    <div class="info">
      <div class="title">获得奖励的说明</div>
      <span>通过微信分享您的链接给其他用户，该积分可以用来直接购物。</span>
      <div class="item">
        <van-icon name="after-sale" size="20" color="#646566"/>
        <div class="text">当其他用户通过此链接成功注册后，对方将获得10积分奖励！</div>
      </div>
      <div class="item">
        <van-icon name="contact-o" size="20" color="#646566"/>
        <div class="text">当对方用户完成首次活动后，您也将获得20积分奖励！</div>
      </div>
    </div>
  </main>
  <van-share-sheet v-model:show="showShare" :options="options" @select="onSelect" />
</template>

<style scoped lang="less">
main {
  padding: 30px 30px 140px 30px;
  .forward {
    margin-top: 30px;
    h2 {
      font-size: 32px;
      font-weight: 700;
      margin: 0;
      text-align: center;
    }
    /deep/.van-cell-group {
      border: 1px solid #ebedf0;
      margin-top: 30px;
      margin-left: 0;
      margin-right: 0;
      label, input {
        font-size: 30px;
      }
    }
    /deep/button {
      margin-top: 30px;
      div {
        span {
          font-size: 32px;
        }
      }
    }
  }
  .info {
    margin-top: 80px;
    .title {
      font-size: 32px;
      background: linear-gradient(to right, #ce0101, #fe5010); /*设置渐变的方向从左到右 颜色从ff0000到ffff00*/
      -webkit-background-clip: text;/*将设置的背景颜色限制在文字中*/
      -webkit-text-fill-color: transparent;/*给文字设置成透明*/
    }
    span {
      font-size: 28px;
      color: #999;
      line-height: 42px;
      display: inline-block;
      margin-top: 20px;
      margin-bottom: 30px;
    }
    .item {
      display: flex;
      align-items: flex-start;
      i {
        top: 6px;
      }
      .text {
        font-size: 30px;
        margin-left: 15px;
        color: #646566;
      }
    }
  }
}
</style>
