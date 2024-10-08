<script setup>

import router from "@/router/index.js";
</script>

<template>
  <van-nav-bar
    title="账户详情"
    left-arrow
    @click-left="() => router.push({ path: '/user/set' })"
  >
    <template #right>
      <van-icon name="wap-home-o" size="20" @click="() => router.push({ path: '/' })" />
    </template>
  </van-nav-bar>
  <van-cell-group inset>
    <van-field v-model="value" placeholder="姓名（需与证件保持一致）" />
    <van-field v-model="value" placeholder="电话（以便再紧急状态下联络）" />
    <van-field v-model="value" placeholder="邮箱（用于接收优惠消息）" />
  </van-cell-group>
  <div class="btn-wrap">
    <van-button round type="success" class="save-button">保存</van-button>
  </div>
</template>

<style scoped lang="less">
.btn-wrap {
  width: 100%;
  margin-top: 50px;
  padding: 0 35px;
  box-sizing: border-box;
  .save-button {
    width: 100%;
    background: linear-gradient(90deg, #fe7b21, #fe5010);
    border: none;
    /deep/ div {
      .van-button__text {
        font-size: 32px;
      }
    }
  }
}

</style>
