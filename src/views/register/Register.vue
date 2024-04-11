<script setup>
import {onMounted, reactive, ref} from "vue";
import {useRouter} from "vue-router";

/**
 * 初始化必要变量
 * @type {Ref<UnwrapRef<string>>}
 */
const initialVariable = reactive({
  name: "",
  phone: "",
  pwd: "",
});
const router = useRouter();

const init = () => {

}

onMounted(() => {
  init();
})
</script>

<template>
  <main>
    <div class="login-wrap">
      <div class="label">
        <div class="title">用户名</div>
        <van-field v-model="initialVariable.name" required placeholder="请输入用户名" />
      </div>
      <div class="label" style="margin-top: 30px;">
        <div class="title">手机号</div>
        <van-field v-model="initialVariable.phone" required placeholder="请输入手机号" />
      </div>
      <div class="label" style="margin-top: 30px;">
        <div class="title">密码</div>
        <van-field v-model="initialVariable.pwd" required placeholder="请输入密码" />
      </div>
    </div>
    <div class="button-wrap">
      <van-button type="primary" color="#0683e9" block @click="handleRegister">注册</van-button>
      <van-button color="#070c15" block plain style="margin-top: 30px;" @click="() => router.push('/login')">返回登录</van-button>
    </div>
  </main>
</template>

<style scoped lang="less">
main {
  background: url("../../assets/register.jpg") no-repeat #000;
  width: 100%;
  min-height: 100vh;
  background-size: contain;
  .login-wrap {
    padding-top: 613px;
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