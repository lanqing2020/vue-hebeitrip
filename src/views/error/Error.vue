<script setup>
import ErrorPic from '@/assets/404.jpg';
import {useRouter} from "vue-router";
const router = useRouter();
</script>

<template>
  <div class="main">
    <div class="center">
      <img :src="ErrorPic" alt="error-pic" width="200" height="138" />
      <van-button type="primary" @click="() => router.push({ path: '/index' })">返回首页</van-button>
    </div>
  </div>
</template>

<style scoped lang="less">
  .main {
    min-height: 100vh;
    width: 100%;
    background: #f3f3f3;
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