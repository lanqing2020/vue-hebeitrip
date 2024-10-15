<script setup>
import {useUserStore} from "@/stores/index.js";
import {useRouter} from "vue-router";

const router = useRouter();
const afterRead = (file) => {
  // 文件上传完毕后会触发 after-read 回调函数，获取到对应的 file 对象。
  // 此时可以自行将文件上传至服务器
  console.log("file===>", file)
}
</script>

<template>
  <van-nav-bar title="编辑账户" left-arrow @click-left="router.push({ path: '/user' })"
  >
    <template #right>
      <van-icon name="wap-home-o" size="20" @click="router.push({ path: '/' })" />
    </template>
  </van-nav-bar>
  <main>
    <van-cell-group>
      <van-cell title="更换头像" class="change-tx">
        <template #right-icon>
          <van-uploader :after-read="afterRead" />
        </template>
      </van-cell>
      <van-cell title="账户详情" is-link to="/user/set-account" />
      <van-cell title="账户绑定与设置" is-link to="/user/set-bind" />
      <van-cell title="退出" @click="useUserStore().loginOut()"/>
    </van-cell-group>
  </main>
</template>

<style scoped lang="less">
main {
  .change-tx {
    align-items: center;
    .van-uploader {
      width: 80px;
      height: 80px;
      /deep/.van-uploader__wrapper {
        height: 100%;
        .van-uploader__upload {
          width: 100%;
          height: 100%;
          margin: 0;
          border-radius: 50%;
          i {
            margin-top: -2px;
          }
        }
      }
    }
  }
}
</style>
