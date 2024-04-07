<script setup>
  import {ref} from "vue";

  const activeName = ref("a");
</script>

<template>
  <van-tabs v-model:active="activeName">
    <van-tab title="待付款" name="a">内容 1</van-tab>
    <van-tab title="已付款，待核销" name="b">内容 2</van-tab>
    <van-tab title="已完成" name="c">内容 3</van-tab>
  </van-tabs>
</template>

<style scoped lang="less">

</style>