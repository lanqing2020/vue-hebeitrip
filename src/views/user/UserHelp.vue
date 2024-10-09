<script setup>

import router from "@/router/index.js";
</script>

<template>
  <van-nav-bar
    title="帮助中心"
    left-arrow
    @click-left="() => router.push({ path: '/user' })"
  >
    <template #right>
      <van-icon name="wap-home-o" size="20" @click="() => router.push({ path: '/' })" />
    </template>
  </van-nav-bar>
</template>

<style scoped lang="less">

</style>
