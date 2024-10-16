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
    <div class="item" v-for="(item, index) in partsData.data" :key="index" @click="router.push({ path: `/location/${partsData.name}/${item.id}` })">
      <van-image :src="item.coverImg" />
      <div class="text">
        <div class="title van-ellipsis">
          {{ item.title }}
          <van-tag v-if="item.tag && item.tag === 'group'" plain type="warning">团购</van-tag>
          <van-tag v-if="item.tag && item.tag === 'small'" plain type="primary">小众</van-tag>
        </div>
        <div class="desc">{{ item.desc }}</div>
      </div>
    </div>
  </main>

</template>

<style scoped lang="less">
.van-dropdown-menu {
  margin-bottom: 30px;
}
main {
  padding: 30px 30px 140px;
  .item {
    width: 100%;
    height: 212px;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 30px;
    .van-image {
      margin-right: 30px;
      /deep/img {
        width: 260px;
        height: 197px;
        border-radius: 10px;
      }
    }
    .text {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 100%;
      padding: 10px 0;
      box-sizing: border-box;
      .title {
        font-size: 32px;
        color: #323233;
        font-weight: 500;
        width: 100%;
        display: inline-flex;
        align-items: center;
        height: 40px;
        line-height: 40px;
        margin-bottom: 15px;
        span {
          margin-left: 10px;
        }
      }
      .desc {
        font-size: 28px;
        color: #646566;
        line-height: 46px;
        width: 100%;
        height: 138px;
        overflow: hidden;
      }
    }
  }
}
</style>
