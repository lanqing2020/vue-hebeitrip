<script setup>
import { onMounted, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { user } from '@/apis';
import { useUserStore } from '@/stores';
import { showToast } from "vant";
import { checkLogged } from "@/utils/checkLogged.js";

/**
 * 初始化必要变量
 * @type {Ref<UnwrapRef<string>>}
 */
const router = useRouter();
const initialVariable = reactive({
  phone: "",
  pwd: "",
  isValid: false,
  beforeLoginLoading: false,
})

/**
 * 检查手机号格式
 */
const inputBlur = () => {
  const regex = /^1\d{10}$/;
  initialVariable.isValid = !regex.test(initialVariable.phone);
}

/**
 * 点击登录按钮
 */
const handleLogin = async () => {
  if (initialVariable.phone === "" || initialVariable.pwd === "") {
    showToast("账号密码不能为空，请重试~");
    return;
  }
  initialVariable.beforeLoginLoading = true;
  const params = {
    phone: initialVariable.phone,
    pwd: initialVariable.pwd
  }
  const { code, data } = await user.doLogin(params);
  if (code === 0 && data) {
    // 登录成功，转入上一页，以后再说。统一到user页
    useUserStore().setToken(data);
    showToast({
      type: "loading",
      message: "登录成功\n跳转个人中心",
      onClose: () => {
        router.push({path: "/user"});
      }
    });
  } else {
    // 登录失败
    initialVariable.beforeLoginLoading = false;
  }
}
</script>

<template>
  <main>
    <div class="login-wrap">
      <div class="label">
        <div class="title">手机号</div>
<!--        <van-field v-model="initialVariable.phone" required placeholder="请输入手机号" :error-message="initialVariable.isValid ? '手机号格式错误' : ''" @blur="inputBlur"/>-->
        <van-field v-model="initialVariable.phone" required placeholder="请输入手机号" :error-message="initialVariable.isValid ? '手机号格式错误' : ''"/>
      </div>
      <div class="label" style="margin-top: 30px;">
        <div class="title">密码</div>
        <van-field v-model="initialVariable.pwd" type="password" required placeholder="请输入密码" />
      </div>
    </div>
    <div class="button-wrap">
      <van-button type="primary" color="#cd4204" block @click="handleLogin" :loading="initialVariable.beforeLoginLoading" loading-text="正在登录...">登录</van-button>
      <van-button color="#722b00" block plain style="margin-top: 30px;" @click="() => router.push('/register')">注册用户</van-button>
    </div>
    <div v-if="checkLogged()" class="loading" />
  </main>
</template>

<style scoped lang="less">
  main {
    background: url("../../assets/login.jpg") no-repeat;
    width: 100%;
    min-height: 100vh;
    background-size: contain;
    .login-wrap {
      padding-top: 800px;
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
    .loading {
      position: fixed;
      left: 0;
      right: 0;
      top: 0;
      width: 100%;
      height: 100%;
      z-index: 10;
      background: rgba(255, 255, 255, 0.35);
    }
  }
</style>