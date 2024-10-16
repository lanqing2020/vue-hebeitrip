<script setup>
import { useRoute, useRouter } from "vue-router";
import { useLocationStore } from "@/stores";
import { onMounted, reactive, ref } from "vue";

const route = useRoute();
const router = useRouter();
// 使用 reactive 管理从pinia中存储的对象类型数据
const partsData = reactive(useLocationStore().locationPartsList);
const menuRef = ref(null);
const switchGroup = ref(false);
const switchSmall = ref(false);

// console.log("useLocationStore().locationPartsList===>", useLocationStore().locationPartsList)

console.log("partsData===>", partsData)
const onConfirm = () => {
  menuRef.value.close();
};

onMounted(() => {


})
</script>

<template>
  <van-nav-bar :title="`探索${partsData.title}`" left-arrow @click-left="router.push({ path: '/location' })">
    <template #right>
      <van-icon name="wap-home-o" size="20" @click="router.push({ path: '/' })" />
    </template>
  </van-nav-bar>
  <van-dropdown-menu ref="menuRef">
    <van-dropdown-item title="默认排序">
      <van-cell center title="支持团购">
        <template #right-icon><van-switch v-model="switchGroup" /></template>
      </van-cell>
      <van-cell center title="小众旅游">
        <template #right-icon><van-switch v-model="switchSmall" /></template>
      </van-cell>
      <div style="padding: 15px 30px;">
        <van-button type="primary" block round @click="onConfirm">确认</van-button>
      </div>
    </van-dropdown-item>
  </van-dropdown-menu>
  <main>
<!--    <div class="item" v-for="(item, index) in useLocationStore().locationPartsList" :key="index">-->
<!--      <van-image :src="" />-->
<!--    </div>-->
  </main>

</template>

<style scoped lang="less">

</style>
