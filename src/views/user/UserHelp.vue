<script setup>
import { ref } from "vue";
import { showConfirmDialog } from "vant";
import ImgLogo from "@/assets/default-logo.jpg";
import {useRouter} from "vue-router";

const router = useRouter();
const activeNames = ref(["1"]);
const officialHotline = ref("400-800-8888");
const workingHours = ref("09:00-17:30");

// 立即通话
const getCall = () => {
  return showConfirmDialog({
    title: '联系官方（official）',
    message: '遇到麻烦，并且周边人员无法给与帮助，\n现在联系管理人员？',
  }).then(() => {
    window.location.href = 'tel://' + officialHotline.value;
  }).catch(() => {
    console.log("点击了 cancel 按钮")
  });
}

</script>

<template>
  <van-nav-bar title="帮助中心" left-arrow @click-left="router.push({ path: '/user' })">
    <template #right>
      <van-icon name="wap-home-o" size="20" @click="router.push({ path: '/' })" />
    </template>
  </van-nav-bar>
  <div class="title"><van-icon name="info-o" /><span>常见问题</span></div>
  <van-collapse v-model="activeNames">
    <van-collapse-item title="如何预订活动？" name="1">选定您喜好的活动 - 套餐 - 日期 - 预订数量 - 支付，即可完成您的预订流程！</van-collapse-item>
    <van-collapse-item title="如果预订之后一直没有收到使用凭证，该怎么办？" name="2">如在注明的时限内，没有收到预定成功短信，请及时通过“在线咨询”联系我们以获取进一步的协助。</van-collapse-item>
    <van-collapse-item title="为何无法付款？" name="3">
      如您遇到无法支付，或支付不成功，有可能是以下问题引起：<br/>
      a. 网络链接或手机信号不顺畅，您可以尝试刷新页面或者稍后再支付。<br/>
      b. 默认支付方式被拒绝，请尝试使用另一种支付方式。我们支持大部分付款方式。<br/>
      如您还是无法支付，请及时通过 "河北旅途网" 中的 在线客服 联系我们以获取进一步的协助。
    </van-collapse-item>
  </van-collapse>
  <div class="space" />
  <div class="title"><van-icon name="todo-list-o" /><span>信息说明</span></div>
  <van-cell-group>
    <van-cell title="用户协议" is-link @click="router.push('/user/protocol')" />
    <van-cell title="隐私政策" is-link @click="router.push('/user/privacy')" />
    <van-cell title="关于我们" is-link @click="router.push('/user/about')" />
  </van-cell-group>
  <div class="space" />
  <div class="logo">
    <van-image :src="ImgLogo" width="120" height="120" />
    <div>河北旅途网：{{ officialHotline }}</div>
    <span>服务时间：{{ workingHours }}</span>
  </div>
</template>

<style scoped lang="less">
.title {
  padding: 0 30px;
  display: flex;
  align-items: center;
  font-size: 30px;
  font-weight: 700;
  line-height: 80px;
  height: 80px;
  span{
    margin-left: 15px;
  }
}
.space {
  width: 100%;
  height: 15px;
  background-color: #f7f8fa;
}
.logo {
  margin-top: 40px;
  padding: 0 30px 180px 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  img {
    opacity: 0.8;
  }
  div {
    font-size: 34px;
    margin-top: 10px;
    margin-bottom: 15px;
    color: #2446ff;
    font-weight: 700;
  }
  span {
    font-size: 26px;
    color: #9da6b5;
  }
}
</style>
