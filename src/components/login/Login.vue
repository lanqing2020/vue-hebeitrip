<script setup>
import { onUnmounted, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { user } from '@/apis';
import { useUserStore } from '@/stores';
import { showToast } from "vant";
import LogoImg from "@/assets/logo.png";

const router = useRouter();
const loginType = ref(0); // 0-手机号登录 1-账号密码登录 2-游客登录
const btnCanClick = ref({
  0: false,
  1: false,
  2: false
}); // 不同登录状态下，用户是否可点击登录按钮
const loginLoading = ref(false); // 正在登录
// 提交给接口的数据
const submitData = reactive({
  phone: "",  // 登录手机号
  yzm: "",  // 发送的验证码
  pwd: "",  // 登录密码
})

// 检查手机号格式
const isNumberLegal = ref(false); // 手机号输入是否合法，默认不合法
const inputBlur = () => {
  const regex = /^1[3-9]\d{9}$/;  // 手机号的格式
  isNumberLegal.value = regex.test(submitData.phone) && submitData.phone.length === 11;
  console.log("isNumberLegal===>", isNumberLegal.value)
  // isNumberLegal = false;  // test
}

const countdown = ref(60);
// 更新倒计时
const updateCountdown = () => {
  countdown.value--;
  if (countdown.value <= 0) {
    clearInterval(interval.value);  // 倒计时结束时清除定时器
    clickedSMS.value = false;
    countdown.value = 60;
  }
}
// 用ref保存intervalId，确保可以再需求的时候清除定时器
const interval = ref(null);
const clickedSMS = ref(false);
const handleSMS = () => {
  clickedSMS.value = true;
  // 触发接口 未作
  // 接口正常返回后 开启定时器更新
  interval.value = setInterval(updateCountdown, 1000);
}

// 切换登录方式
const switchLoginType = (type) => {
  loginType.value = type;
  loginLoading.value = false;
}

// 检查当前所有输入是否合法
const checkAllInputs = () => {
  if (loginType.value === 0) {
    btnCanClick.value[0] = submitData.yzm.length === 4;
  }
  if (loginType.value === 1) {
    btnCanClick.value[1] = submitData.pwd !== "";
  }
}

// 点击登录按钮
const handleLogin = async () => {
  if (loginType.value !== 2) {
    if (submitData.phone === "") {
      showToast("手机号不能为空，请重试~");
      return;
    }
    if (!isNumberLegal.value) {
      showToast("手机号输入有误，请重试~");
      return;
    }
  }
  const params = {};
  // 验证登录方式
  switch (loginType.value) {
    case 0: {
      // 接口检查验证码是否正确
      if (submitData.yzm !== "1234") {
        showToast("验证码错误，请重试~");
        return;
      }
      params.phone = submitData.phone;
      params.yzm = submitData.yzm;
      break;
    }
    case 1: {
      params.phone = submitData.phone;
      params.pwd = submitData.pwd;
      break;
    }
    case 2: {
      break;
    }
    default: {}
  }
  // 执行登录
  loginLoading.value = true;
  const { code, data } = await user.doLogin(params);
  if (code === 0 && data) {
    // 登录成功，转入上一页，以后再说。统一到user页
    useUserStore().setToken(data);
    useUserStore().setLogged(true);
    showToast({
      type: "loading",
      message: "登录成功\n跳转个人中心",
      onClose: () => {
        router.push({path: "/user"});
      }
    });
  } else {
    // 登录失败
    loginLoading.value = false;
  }
}

/**
 * 点击注册按钮
 */
// const handleRegister = async () => {
//   if (initialVariable.phone === "" || initialVariable.pwd === "" || initialVariable.name === "") {
//     showToast("账号密码或手机号不能为空，请重试~");
//     return;
//   }
//   if (!initialVariable.isValid) {
//     initialVariable.beforeRegisterLoading = true;
//     const params = {
//       name: initialVariable.name,
//       phone: initialVariable.phone,
//       pwd: initialVariable.pwd
//     }
//     const { code } = await user.doRegister(params);
//     if (code === 0) {
//       // 注册成功，到登录页
//       showToast({
//         type: "loading",
//         message: "注册成功\n跳转登录页",
//         onClose: () => {
//           router.push({path: "/login"});
//         }
//       });
//     } else {
//       // 注册失败，有bug。按钮的loading状态无法关闭
//       initialVariable.beforeLoginLoading = false;
//     }
//   }
// }

// 生命周期部分
// 在组件卸载时清除定时器，避免内存泄露
onUnmounted(() => {
  if (interval.value) {
    clearInterval(interval.value);
  }
})
</script>

<template>
  <main>
    <div class="login-wrap">
      <div v-if="loginType === 0">
        <div class="login-title">手机号登录</div>
        <div class="label" style="margin-top: 50px;margin-bottom: 20px;">
          <van-field v-model="submitData.phone" required maxlength="11" :clearable="true" placeholder="请输入手机号" @update:model-value="inputBlur" />
        </div>
        <div class="label">
          <van-field v-model="submitData.yzm" type="password" required placeholder="请输入验证码" @update:model-value="checkAllInputs" />
          <van-button round type="primary" size="mini" :disabled="!isNumberLegal" :loading="clickedSMS" :loading-text="countdown + ' s'" loading-size="10" @click="handleSMS">发送验证码</van-button>
        </div>
        <div class="button-wrap">
          <van-button round :disabled="!btnCanClick[0]" type="primary" color="linear-gradient(to right, #ff6034, #ee0a24)" block @click="handleLogin" :loading="loginLoading" loading-text="正在登录...">登录</van-button>
          <!--      <van-button color="#722b00" block plain style="margin-top: 30px;" @click="() => router.push('/register')">注册用户</van-button>-->
          <div class="other-login">
            <div @click="() => switchLoginType(1)">账号密码登录</div>
            <span>|</span>
            <div @click="() => switchLoginType(2)">游客登录</div>
          </div>
        </div>
      </div>
      <div v-else-if="loginType === 1">
        <div class="login-title">账号密码登录</div>
        <div class="label" style="margin-top: 50px;margin-bottom: 20px;">
          <van-field v-model="submitData.phone" required maxlength="11" :clearable="true" placeholder="请输入手机号" @update:model-value="inputBlur" />
        </div>
        <div class="label">
          <van-field v-model="submitData.pwd" type="password" required placeholder="请输入密码" @update:model-value="checkAllInputs" />
          <van-button round type="default" size="mini" class="findPwd">找回密码</van-button>
        </div>
        <div class="button-wrap">
          <van-button round :disabled="!btnCanClick[1]" type="primary" color="linear-gradient(to right, #ff6034, #ee0a24)" block @click="handleLogin" :loading="loginLoading" loading-text="正在登录...">登录</van-button>
          <div class="other-login">
            <div @click="() => switchLoginType(0)">手机号登录</div>
            <span>|</span>
            <div @click="() => switchLoginType(2)">游客登录</div>
          </div>
        </div>
      </div>
      <div v-else>
        <div class="login-box">
          <img :src="LogoImg" alt="logo-img" />
        </div>
        <div class="button-wrap">
          <van-button round type="primary" color="linear-gradient(to right, #ff6034, #ee0a24)" block @click="handleLogin" :loading="loginLoading" loading-text="正在登录...">游客登录</van-button>
          <div class="other-login">
            <div @click="() => switchLoginType(0)">手机号登录</div>
            <span>|</span>
            <div @click="() => switchLoginType(1)">账号密码登录</div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped lang="less">
  main {
    width: 100%;
    padding: 0 !important;
    .login-wrap {
      padding: 0 80px;
      margin-top: 100px;
      .login-title {
        font-size: 48px;
        color: #565656;
        font-family: PingFangSC;
        font-weight: 500;
        text-align: center;
      }
      .label {
        position: relative;
        .van-cell {
          padding: 0;
          border-bottom: 1px solid #ededed;
          font-size: 28px;
          /deep/input {
            line-height: 80px;
          }
        }
        button {
          position: absolute;
          right: 0;
          top: 10px;
          padding: 0 20px;
        }
        .findPwd {
          border: 0;
          color: #b0b0b0;
        }
        .van-button--loading {
          opacity: 0.5;
        }
      }
      .login-box {
        display: flex;
        align-items: center;
        justify-content: center;
        img {
          width: 580px;
          height: 128px;
        }
      }
      .button-wrap {
        width: 100%;
        height: auto;
        box-sizing: border-box;
        margin-top: 100px;
        button {
          /deep/ .van-button__content {
            font-size: 32px;
          }
        }
        .van-button--disabled {
          background: #cfcfcf !important;
          opacity: 1;
        }
        .other-login {
          margin-top: 80px;
          font-size: 24px;
          color: #676f9c;
          display: flex;
          align-items: center;
          justify-content: center;
          span {
            margin: 0 20px;
          }
        }
      }
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
