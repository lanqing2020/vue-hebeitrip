<script setup>
import {reactive, ref} from "vue";
import {useRouter} from "vue-router";
import { user } from '@/apis';
import {doLogin} from "@/apis/user.js";

const userPhone = ref("");
const userPwd = ref("");
const router = useRouter();
const isValid = ref(false);
const inputBlur = () => {
  const regex = /^1\d{10}$/;
  isValid.value = !regex.test(userPhone.value);
}
const inputUpdate = () => {

}

/**
 * 点击登录按钮
 */
const beforeLoginLoading = ref(false);
const handleLogin = async () => {
  beforeLoginLoading.value = true;
  const params = {
    phone: userPhone.value,
    pwd: userPwd.value
  }
  const { code, data } = await user.doLogin(userPhone.value, userPwd.value);
  if (code === 0 && data) {
    console.log("登录成功")
    beforeLoginLoading.value = false;
  }
}
</script>

<template>
  <main>
    <div class="login-wrap">
      <div class="label">
        <div class="title">手机号</div>
<!--        <van-field v-model="userPhone" required placeholder="请输入手机号" :error-message="isValid ? '手机号格式错误' : ''" @blur="inputBlur"/>-->
        <van-field v-model="userPhone" required placeholder="请输入手机号" :error-message="isValid ? '手机号格式错误' : ''"/>
      </div>
      <div class="label" style="margin-top: 30px;">
        <div class="title">密码</div>
        <van-field v-model="userPwd" type="password" required placeholder="请输入密码" @update:model-value="inputUpdate" />
      </div>
    </div>
    <div class="button-wrap">
      <van-button type="primary" color="#cd4204" block @click="handleLogin" :loading="beforeLoginLoading" loading-text="正在登录...">登录</van-button>
      <van-button color="#722b00" block plain style="margin-top: 30px;" @click="() => router.push('/register')">注册用户</van-button>
    </div>
  </main>
</template>

<style scoped lang="less">
  main {
    background: url("../../assets/login.jpg") no-repeat;
    width: 100%;
    min-height: 100vh;
    background-size: contain;
    .login-wrap {
      padding-top: 110%;
      padding-left: 60px;
      padding-right: 60px;
      .label {
        .title {
          font-size: 24px;
          font-weight: 200;
          margin-bottom: 20px;
          color: #999999;
        }
        .van-cell {
          padding: 0;
          border-bottom: 1px solid #ededed;
          font-size: 32px;
          /deep/input {
            line-height: 80px;
          }
        }
      }
    }
    .button-wrap {
      width: 100%;
      height: auto;
      padding: 0 30px;
      box-sizing: border-box;
      margin-top: 100px;
    }
  }
</style>