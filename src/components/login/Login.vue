<script setup>
import {onBeforeMount, onMounted, onUnmounted, reactive, ref} from "vue";
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
const loginType = ref(0); // 0-手机号登录 1-账号密码登录 2-游客登录
const pageParameter = reactive({
  isNumberLegal: false, // 手机号输入是否合法
  beforeLoginLoading: false,
  alreadyLoggedIn: false,
})
/**
 * 提交给接口的数据
 * @type {UnwrapNestedRefs<{phone: string, pwd: string, yzm: string}>}
 */
const submitData = reactive({
  phone: "",  // 登录手机号
  yzm: "",  // 发送的验证码
  pwd: "",  // 登录密码
})

/**
 * 检查手机号格式
 */
const inputBlur = () => {
  const regex = /^1[3-9]\d{9}$/;  // 手机号的格式
  pageParameter.isNumberLegal = regex.test(submitData.phone);
  // console.log("pageParameter.isNumberLegal===>", pageParameter.isNumberLegal)
  // pageParameter.isNumberLegal = false;  // test
}

/**
 * 验证码部分
 */
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
  // 触发接口
  // 接口正常返回后 开启定时器更新
  interval.value = setInterval(updateCountdown, 1000);
}

// 切换登录方式
const switchLoginType = (type) => {
  loginType.value = type;
}

/**
 * 点击登录按钮
 */
const handleLogin = async () => {
  if (submitData.phone === "" || submitData.pwd === "") {
    showToast("账号密码不能为空，请重试~");
    return;
  }
  if (!pageParameter.isNumberLegal) {
    pageParameter.beforeLoginLoading = true;
    const params = {
      phone: submitData.phone,
      pwd: submitData.pwd
    }
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
      pageParameter.beforeLoginLoading = false;
    }
  }
}

/**
 * 生命周期部分
 */
onBeforeMount(() => {
  if (checkLogged()) {
    pageParameter.alreadyLoggedIn = true;
  }
})
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
          <van-field v-model="submitData.phone" required maxlength="11" :clearable="true" placeholder="请输入手机号" @update:model-value="inputBlur"/>
        </div>
        <div class="label">
          <van-field v-model="submitData.pwd" type="password" required placeholder="请输入验证码" />
          <van-button round type="primary" size="mini" :disabled="!pageParameter.isNumberLegal" :loading="clickedSMS" :loading-text="countdown + ' s'" loading-size="10" @click="handleSMS">发送验证码</van-button>
        </div>
        <div class="button-wrap">
          <van-button round disabled type="primary" color="linear-gradient(to right, #ff6034, #ee0a24)" block @click="handleLogin" :loading="pageParameter.beforeLoginLoading" loading-text="正在登录...">登录</van-button>
          <!--      <van-button color="#722b00" block plain style="margin-top: 30px;" @click="() => router.push('/register')">注册用户</van-button>-->
          <div class="other-login">
            <div @click="() => switchLoginType(1)">账号密码登录</div>
            <span>|</span>
            <div>游客登录</div>
          </div>
        </div>
      </div>
      <div v-else-if="loginType === 1">
        <div class="login-title">账号密码登录</div>
        <div class="label" style="margin-top: 50px;margin-bottom: 10px;">
          <van-field v-model="submitData.phone" required placeholder="请输入手机号" :error-message="pageParameter.isNumberLegal ? '手机号格式错误' : ''" @blur="inputBlur"/>
        </div>
        <div class="label">
          <van-field v-model="submitData.pwd" type="password" required placeholder="请输入密码" />
        </div>
      </div>
      <div v-else>

      </div>

    </div>

    <div v-if="pageParameter.alreadyLoggedIn" class="loading" />
  </main>
</template>

<style scoped lang="less">
  main {
    width: 100%;
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
        .van-button--loading {
          opacity: 0.5;
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
