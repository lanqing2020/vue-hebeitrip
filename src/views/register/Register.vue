<script setup>
import { onBeforeMount, onBeforeUpdate, onMounted, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import { user } from '@/apis';
import { showToast } from "vant";
import { checkLogged } from "@/utils/checkLogged.js";
import { useUserStore } from "@/stores/index.js";

/**
 * 初始化必要变量
 * @type {Ref<UnwrapRef<string>>}
 */
const initialVariable = reactive({
  name: "",
  phone: "",
  pwd: "",
  isValid: false,
  beforeRegisterLoading: false,
  hasLoggedPage: false,
});
const router = useRouter();
const route = useRoute()

onBeforeMount(() => {
  if (checkLogged()) {
    initialVariable.hasLoggedPage = true;
  }
})

/**
 * 检查手机号格式
 */
const inputBlur = () => {
  const regex = /^1\d{10}$/;
  // initialVariable.isValid = !regex.test(initialVariable.phone);
  initialVariable.isValid = false;  // test
}

/**
 * 点击注册按钮
 */
const handleRegister = async () => {
  if (initialVariable.phone === "" || initialVariable.pwd === "" || initialVariable.name === "") {
    showToast("账号密码或手机号不能为空，请重试~");
    return;
  }
  if (!initialVariable.isValid) {
    initialVariable.beforeRegisterLoading = true;
    const params = {
      name: initialVariable.name,
      phone: initialVariable.phone,
      pwd: initialVariable.pwd
    }
    const { code } = await user.doRegister(params);
    if (code === 0) {
      // 注册成功，到登录页
      showToast({
        type: "loading",
        message: "注册成功\n跳转登录页",
        onClose: () => {
          router.push({path: "/login"});
        }
      });
    } else {
      // 注册失败，有bug。按钮的loading状态无法关闭
      initialVariable.beforeLoginLoading = false;
    }
  }
}
</script>

<template>
  <main>
    <div class="register-wrap">
      <div class="label">
        <div class="title">用户名</div>
        <van-field v-model="initialVariable.name" required placeholder="请输入用户名" />
      </div>
      <div class="label" style="margin-top: 30px;">
        <div class="title">手机号</div>
        <van-field v-model="initialVariable.phone" required placeholder="请输入手机号" :error-message="initialVariable.isValid ? '手机号格式错误' : ''" @blur="inputBlur"/>
      </div>
      <div class="label" style="margin-top: 30px;">
        <div class="title">密码</div>
        <van-field v-model="initialVariable.pwd" required placeholder="请输入密码" type="password" />
      </div>
    </div>
    <div class="button-wrap">
      <van-button type="primary" color="#0683e9" block @click="handleRegister" :loading="initialVariable.beforeRegisterLoading" loading-text="正在注册...">注册</van-button>
      <van-button color="#070c15" block plain style="margin-top: 30px;" @click="() => router.push('/login')">返回登录</van-button>
    </div>
    <div v-if="initialVariable.hasLoggedPage" class="loading" />
  </main>
</template>

<style scoped lang="less">
main {
  background: url("../../assets/register.jpg") no-repeat #000;
  width: 100%;
  min-height: 100vh;
  background-size: contain;
  .register-wrap {
    padding-top: 490px;
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
        border-bottom: 1px solid #7d7d7d;
        font-size: 32px;
        background: transparent;
        /deep/input {
          line-height: 80px;
          color: #fff;
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