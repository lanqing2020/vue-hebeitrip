<script setup>
import router from "@/router/index.js";
import { ref } from "vue";

const phone = ref(null);
const smsCode = ref(null);
const btnStatus = ref(false);

const onClickBindBtn = () => {
  // 保存信息接口
}
</script>

<template>
  <van-nav-bar
    title="手机号绑定"
    left-arrow
    @click-left="() => router.push({ path: '/user/bind' })"
  >
    <template #right>
      <van-icon name="wap-home-o" size="20" @click="() => router.push({ path: '/' })" />
    </template>
  </van-nav-bar>
  <van-cell-group>
    <van-field v-model="phone" label="+86" placeholder="请输入手机号" />
    <van-field v-model="smsCode" center label="验证码" placeholder="请输入验证码">
      <template #button>
        <van-button size="small" type="primary">发送验证码</van-button>
      </template>
    </van-field>
  </van-cell-group>
  <div class="btn-wrap">
    <van-button :disabled="!btnStatus" round type="success" class="save-button" @click="onClickBindBtn">完成绑定</van-button>
  </div>
</template>

<style scoped lang="less">
.btn-wrap {
  width: 100%;
  margin-top: 50px;
  padding: 0 35px;
  box-sizing: border-box;
  .save-button {
    width: 100%;
    background: linear-gradient(90deg, #fe7b21, #fe5010);
    border: none;
    /deep/ div {
      .van-button__text {
        font-size: 32px;
      }
    }
  }
}
</style>
