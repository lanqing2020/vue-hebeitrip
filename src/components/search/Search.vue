<script setup>
import {ref} from "vue";

const searchVal = ref("");

const doSearch = (val) => {
  searchVal.value = val;  // 记录当前搜索的值
  console.log("val===>", val)
}
</script>

<template>
  <van-search v-model="searchVal" placeholder="搜索关键词" background="transparent" shape="round" clearable @search="doSearch"/>
</template>

<style scoped lang="less">
.van-search {
  margin: 6px 0;
}
</style>
