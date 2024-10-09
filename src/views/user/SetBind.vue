<script setup>
import router from "@/router/index.js";

</script>

<template>
  <van-nav-bar
    title="账户绑定"
    left-arrow
    @click-left="() => router.push({ path: '/user/set' })"
  >
    <template #right>
      <van-icon name="wap-home-o" size="20" @click="() => router.push({ path: '/' })" />
    </template>
  </van-nav-bar>
  <van-cell-group>
    <van-cell title="177****7777" icon="phone-o">
      <template #right-icon>
        <van-button round type="default" size="small" @click="() => router.push({ path: '/user/bind-phone' })">去绑定</van-button>
      </template>
    </van-cell>
    <van-cell title="修改密码" icon="records-o" to="/user/bind-password" is-link/>
  </van-cell-group>

</template>

<style scoped lang="less">

</style>
