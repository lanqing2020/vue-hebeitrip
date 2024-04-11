<script setup>
import {RouterView, useRoute, useRouter} from 'vue-router';
import {ref, watch, watchEffect} from "vue";
import Home from "@/views/home/Home.vue";
import Order from "@/views/order/Order.vue";
import User from "@/views/user/User.vue";

const active = ref(0);
const router = useRouter();
const change = (curr) => {
  console.log("curr===>", curr)
  active.value = curr;

}
/**
 * vue3: vue-router刷新获取不到路由路径
 */
watch(() => router.currentRoute.value.path, (path, oldPath) => {
  // 至少会渲染两次，选择new-path保证这是最后一次的正确渲染
  if (path) {
    router.getRoutes().map((item, index) => {
      if(item.path === router.currentRoute.value.path){
        active.value = index
      }
    })
  }
})

</script>

<template>
  <!-- 顶部安全区 -->
<!--  <van-nav-bar safe-area-inset-top />-->
  <RouterView />
  <footer>
    <van-tabbar route v-model="active" @change="change" active-color="#ffa43f">
        <van-tabbar-item icon="home-o" to="/index">首页</van-tabbar-item>
        <van-tabbar-item icon="coupon-o" to="/order">我的订单</van-tabbar-item>
        <van-tabbar-item icon="friends-o" to="/user">个人中心</van-tabbar-item>
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