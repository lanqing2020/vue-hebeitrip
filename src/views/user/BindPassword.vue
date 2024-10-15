<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const btnStatus = ref(false);

const onClickBindBtn = () => {
  // 保存信息接口
}
</script>

<template>
  <van-nav-bar
    title="修改密码"
    left-arrow
    @click-left="() => router.push({ path: '/user/set-bind' })"
  >
    <template #right>
      <van-icon name="wap-home-o" size="20" @click="router.push({ path: '/' })" />
    </template>
  </van-nav-bar>
  <van-cell-group>
    <van-field v-model="phone" label-align="top" label="旧密码" placeholder="请输入旧密码" />
    <van-field v-model="smsCode" label-align="top" label="新密码" placeholder="请输入新密码" />
  </van-cell-group>
  <div class="btn-wrap">
    <van-button :disabled="!btnStatus" round type="success" class="save-button" @click="onClickBindBtn">确定修改</van-button>
  </div>
</template>

<style scoped lang="less">
.btn-wrap {
  width:  100%;
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
