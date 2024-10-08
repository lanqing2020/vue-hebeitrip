<script setup>
import router from "@/router/index.js";
import { ref } from "vue";

const phone = ref(null);
const smsCode = ref(null);
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
</template>

<style scoped lang="less">

</style>
