<script setup>
import router from "@/router/index.js";
import { ref } from "vue";

const tickets = ref([
  { id: 0, title: "大雁塔", coverImg: "", qrCode: "", createDate: "", transactionNum: "SF23as8f9s8d7f2" },
  { id: 1, title: "永年古城", coverImg: "", qrCode: "", createDate: "", transactionNum: "P2dfa45fa8s7d9f7" },
  { id: 2, title: "天下第一关", coverImg: "", qrCode: "", createDate: "", transactionNum: "PL8798sdf79saf98" },
])
</script>

<template>
  <van-nav-bar title="门票凭证" left-arrow @click-left="router.push({ path: '/user' })">
    <template #right>
      <van-icon name="wap-home-o" size="20" @click="router.push({ path: '/' })" />
    </template>
  </van-nav-bar>
  <div v-if="tickets.length === 0">
    <van-empty image-size="100" description="还没有购买过任何门票" />
    <div class="button-wrap">
      <van-button round size="small" type="warning" @click="router.push('/')">去购买</van-button>
    </div>
  </div>
  <div v-else class="tickets-wrap">
    <div v-for="item in tickets">
      <div class="title">{{ item.title }}</div>
      <div class="content">
        <div class="left">
          <img :src="item.coverImg" alt="title" />
        </div>
        <div class="right">
          <img :src="item.qrCode" alt="title" />
        </div>
      </div>
      <div class="foot">
        <span class="date">{{ item.createDate }}</span>
        <span class="num">{{ item.transactionNum }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.button-wrap {
  width: 100%;
  display: flex;
  justify-content: center;
  button {
    width: 200px;
    line-height: 1;
  }
}
</style>
