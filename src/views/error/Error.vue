<script setup>
import {useRouter} from "vue-router";
const router = useRouter();
</script>

<template>
  <div class="main">
    <div class="center">
      <van-empty description="这里什么都没有" />
      <van-button type="primary" @click="() => router.push({ path: '/' })">返回首页</van-button>
    </div>
  </div>
</template>

<style scoped lang="less">
  .main {
    .center {
      padding-top: 50%;
      margin-left: 30px;
      margin-right: 30px;
      display: flex;
      flex-direction: column;
      align-items: center;
      img {
        margin-bottom: 200px;
      }
    }
  }
</style>
