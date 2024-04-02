<script setup>
import { RouterLink, RouterView } from 'vue-router';
import {ref} from "vue";

const active = ref(0);
const tabBarOnChange = (curr) => {
  active.value = curr;
}
</script>

<template>
  <!-- 顶部安全区 -->
  <van-nav-bar safe-area-inset-top />
  <RouterView />
  <footer>
    <van-tabbar v-model="active" @change="tabBarOnChange" active-color="#ffa43f">
        <van-tabbar-item icon="home-o">
          <RouterLink to="/">首页</RouterLink>
        </van-tabbar-item>
        <van-tabbar-item icon="coupon-o">
          <RouterLink to="/order">我的订单</RouterLink>
        </van-tabbar-item>
        <van-tabbar-item icon="friends-o">
          <RouterLink to="/user">个人中心</RouterLink>
        </van-tabbar-item>
    </van-tabbar>
  </footer>
  <!-- 底部安全区 -->
  <van-number-keyboard safe-area-inset-bottom />
</template>

<style scoped lang="less">
footer {
  .van-tabbar {
    .van-tabbar-item--active {
      .van-tabbar-item__text {
        a {
          color: #ffa43f;
        }
      }
    }
  }
}
</style>