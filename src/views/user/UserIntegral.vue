<script setup>
import {onMounted, reactive, ref} from "vue";
import { useRouter } from "vue-router";
import { user } from '@/apis';
import {useUserStore} from "@/stores/index.js";

const router = useRouter();
const totalIntegral = ref({});
const inComeData = ref([]);
const consumeData = ref([]);

// 获取总的积分以及消耗
const getTotalIntegral = async (token) => {
  const { code, data } = await user.getTotalIntegral(token, {});
  console.log("data===>", data)
  totalIntegral.value = {
    totalGet: "56",
    totalConsume: "27"
  }
}

// 获取积分明细收支记录
const getIntegralIncomeRecord = async (token) => {
  const { code, data } = await user.getIntegralIncomeRecord(token, {});
  inComeData.value = [
    { id: 0, title: "消费购物", occurrenceDate: "2022.05.13 13:12:49", count: "+1" },
    { id: 1, title: "美食餐饮", occurrenceDate: "2022.05.02 12:32:24", count: "+3" },
    { id: 2, title: "交通出行", occurrenceDate: "2022.05.02 07:41:13", count: "+8" },
  ]
}

// 获取积分兑换支出记录
const getIntegralConsumeRecord = async (token) => {
  const { code, data } = await user.getIntegralConsumeRecord(token, {});
  consumeData.value = [
    { id: 0, title: "商城兑换", occurrenceDate: "2024.10.12 13:12:49", count: "-7" },
    { id: 1, title: "赠送好友", occurrenceDate: "2024.09.18 22:32:24", count: "-15" },
    { id: 2, title: "商城兑换", occurrenceDate: "2024.08.16 15:26:45", count: "-8" },
  ]
}

const init = () => {
  // if (useUserStore().getLogged()) {
  if (true) {
    const token = useUserStore().getToken();
    getTotalIntegral(token);
    getIntegralIncomeRecord(token);
    getIntegralConsumeRecord(token);
  }
}

onMounted(() => {
  init();
})
</script>

<template>
  <van-nav-bar title="我的积分" left-arrow @click-left="router.back()">
    <template #right>
      <van-icon name="wap-home-o" size="20" @click="router.push({ path: '/' })" />
    </template>
  </van-nav-bar>
  <main>
    <van-tabs v-model:active="active">
      <van-tab title="积分收支明细">
        <div v-if="inComeData.length === 0">
          <van-empty image-size="100" description="暂无任何记录" />
        </div>
        <div v-else class="content">
          <h2>已获取 <em>{{ totalIntegral.totalGet }}</em> 已消耗 <span>{{ totalIntegral.totalConsume }}</span></h2>
          <div v-for="item in inComeData" :key="item.id" class="item">
            <div class="item-left">
              <div class="title">{{ item.title }}</div>
              <span>{{ item.occurrenceDate }}</span>
            </div>
            <div class="item-right">{{ item.count }}</div>
          </div>
        </div>
      </van-tab>
      <van-tab title="积分兑换记录">
        <div v-if="consumeData.length === 0">
          <van-empty image-size="100" description="暂无任何记录" />
        </div>
        <div v-else class="content">
          <div v-for="item in consumeData" :key="item.id" class="item">
            <div class="item-left">
              <div class="title">{{ item.title }}</div>
              <span>{{ item.occurrenceDate }}</span>
            </div>
            <div class="item-right" style="color: #ff976a;">{{ item.count }}</div>
          </div>
        </div>
      </van-tab>
    </van-tabs>

  </main>

</template>

<style scoped lang="less">
main {
  padding: 0 30px 180px;
  .content {
    margin-top: 40px;
    h2 {
      margin: 0 0 30px;
      font-size: 30px;
      font-weight: 700;
      color: #0f294d;
      em {
        font-style: normal;
        color: #2446ff;
      }
      span {
        color: #ff976a;
      }
    }
    .item {
      width: 100%;
      border-bottom: 1px solid #ebedf0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-bottom: 15px;
      margin-bottom: 15px;
      .item-left {
        flex: 1;
        .title {
          font-size: 28px;
          color: #455873;
          margin-bottom: 5px;
        }
        span {
          font-size: 24px;
          color: #9da6b5;
        }
      }
      .item-right {
        flex: 1;
        display: flex;
        justify-content: flex-end;
        font-size: 32px;
        color: #2446ff;
        font-weight: 700;
      }
    }
  }
}
</style>
