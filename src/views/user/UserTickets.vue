<script setup>
import { ref } from "vue";
import ImgWriteOff from "@/assets/write-off.png";
import {useRouter} from "vue-router";

const router = useRouter();
const tickets = ref([
  { id: 0, status: 0, title: "昌黎·碣石山", coverImg: "https://r1.visitbeijing.com.cn/vbj-s/2016/0530/20160530115232516.jpg", qrCode: "https://www.west.cn/images2016/west_wx_qrcode.jpg", createDate: "2024-10-10", transactionNum: "SF23as8f9s8d7f2" },
  { id: 1, status: 1, title: "洪湖·乌林寨", coverImg: "https://p8.itc.cn/q_70/images03/20220107/38a41a775278495a944edd93bbf92ce8.jpeg", qrCode: "https://www.west.cn/images2016/west_wx_qrcode.jpg", createDate: "2023-10-1", transactionNum: "P2dfa45fa8s7d9f7" },
  { id: 2, status: 1, title: "黄州文赤壁", coverImg: "https://p6.itc.cn/q_70/images03/20220107/836bb9c132154a1cb7f2c2b2ecac3a40.jpeg", qrCode: "https://www.west.cn/images2016/west_wx_qrcode.jpg", createDate: "2023-06-19", transactionNum: "PL8798sdf79saf98" },
])
</script>

<template>
  <van-nav-bar title="门票凭证" left-arrow @click-left="router.push({ path: '/user' })">
    <template #right>
      <van-icon name="wap-home-o" size="20" @click="router.push({ path: '/' })" />
    </template>
  </van-nav-bar>
  <div v-if="tickets.length === 0">
    <van-empty image-size="100" description="还没有购买过任何门票" />
    <div class="button-wrap">
      <van-button round size="small" type="warning" @click="router.push('/')">去购买</van-button>
    </div>
  </div>
  <div v-else class="tickets-wrap">
    <div v-for="item in tickets" class="tickets-item">
      <div class="title">
        <van-icon name="location-o" />
        {{ item.title }}
      </div>
      <div class="content">
        <div class="left">
          <van-image width="100%" height="100%" radius="5" :src="item.coverImg" />
        </div>
        <div class="right">
          <van-image width="100%" height="100%" :src="item.qrCode" />
        </div>
      </div>
      <div class="foot">
        <span class="date">创建日期：{{ item.createDate }}</span>
        <span class="num">流水号：{{ item.transactionNum }}</span>
      </div>
      <div v-if="item.status === 1" class="write-off">
        <van-image :src="ImgWriteOff" width="70" height="70" fit="cover" position="center" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.button-wrap {
  width: 100%;
  display: flex;
  justify-content: center;
  button {
    width: 200px;
    line-height: 1;
  }
}
.tickets-wrap {
  width: 100%;
  height: auto;
  margin-top: 30px;
  .tickets-item {
    margin-bottom: 30px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    box-sizing: border-box;
    padding: 0 30px 20px 30px;
    border-bottom: 1px dashed #ebedf0;
    position: relative;
    .title {
      font-size: 32px;
      font-weight: 700;
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      line-height: 50px;
      height: 50px;
      margin-bottom: 10px;
    }
    .content {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      height: 200px;
      .left {
        flex: 2;
        height: inherit;
        margin-right: 20px;
      }
      .right {
        //flex: 1;
        width: 202px;
        height: inherit;
        border: 1px solid #ebedf0;
        border-radius: 10px;
      }
    }
    .foot {
      font-size: 26px;
      color: #999999;
      margin-top: 20px;
      width: 100%;
      .date {
        margin-right: 30px;
      }
    }
    .write-off {
      position: absolute;
      right: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background: rgb(255 255 255 / 75%);
      .van-image {
        position: absolute;
        right: 65px;
        top: 90px;
      }
    }
  }
}
</style>
