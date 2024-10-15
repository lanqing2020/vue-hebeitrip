<script setup>
import { useRoute, useRouter } from "vue-router";


const route = useRoute();
const router = useRouter();
console.log(route.query.id)
</script>

<template>
  <div class="container">
    <header>
      <van-nav-bar title="我的发布" left-arrow @click-left="router.back()">
        <template #right>
          <van-icon name="wap-home-o" size="20" @click="router.push({ path: '/' })" />
        </template>
      </van-nav-bar>
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item>1</van-swipe-item>
        <van-swipe-item>2</van-swipe-item>
        <van-swipe-item>3</van-swipe-item>
        <van-swipe-item>4</van-swipe-item>
      </van-swipe>

    </header>
    <main>

    </main>
  </div>
</template>

<style scoped lang="less">
.container {
  box-sizing: border-box;
  width: 100vw;
  height: 100vh;
  header{
    .my-swipe .van-swipe-item {
      color: #fff;
      font-size: 20px;
      height: 567px;
      text-align: center;
      background-color: #39a9ed;
    }

  }
  main{
    width: 100%;
    padding: 30px 30px 140px;
  }

}
</style>
