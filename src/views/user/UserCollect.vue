<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const collectData = ref([
  {
    id: 0,
    title: "昌黎·碣石山",
    coverImg: "https://q6.itc.cn/images01/20241012/4d4255aeb3c6424494c7e3bc6a594d17.png",
    description: "为了丰富游客们的游玩体验，济南方特精心打造了“人形兵器站舞蹈”“曼陀妖市鬼新娘出嫁”“鲛族走秀”和“翼族魔",
    // relatedNotes: [ { id: 11, title: "北京出发，感受京南第一府" } ], // 每个用户发布的笔记都会有一个唯一id，这里可以链接 迁移至内页
    score: "4.3"
  },
  {
    id: 1,
    title: "正定古城",
    coverImg: "https://p2.itc.cn/images01/20230304/cd8938262a85419a93a07333dab374e2.jpeg",
    description: "在“九尾狐”“饕餮”等王牌NPC的阵容基础上，济南方特还邀请到“黑神话悟空”“宝青坊主”等近期大热的NPC加入“山海奇幻夜”。他们将以精美的妆造亮相",
    score: "4.6"
  },
  {
    id: 2,
      title: "暖泉古镇",
    coverImg: "https://q5.itc.cn/q_70/images03/20241013/6f8607a156ef44368922bded8ce99495.jpeg",
    description: "南方特将连开24天夜场，并打造了诚意满满的万圣限时夜场演艺。届时，四大方阵将携手数百名NPC，带游客共赏“奇幻夜大巡游”的壮观场景",
    score: "3.9"
  }
]);
</script>

<template>
  <van-nav-bar title="我的收藏" left-arrow @click-left="router.push({ path: '/user' })">
    <template #right>
      <van-icon name="wap-home-o" size="20" @click="router.push({ path: '/' })" />
    </template>
  </van-nav-bar>
  <main>
    <div v-if="collectData.length === 0">
      <van-empty image-size="100" description="还未收藏任何目的地" />
    </div>
    <div v-else class="collect-data" v-for="item in collectData" :key="item.id" @click="router.push(`/location/detail?id=${item.id}`)">
      <van-image :src="item.coverImg" radius="5" />
      <div class="content">
        <div class="title ellipsis">
          {{ item.title }}
          <van-tag type="warning">{{ item.score }}</van-tag>
        </div>
        <div class="desc">{{ item.description }}</div>
      </div>
    </div>
  </main>
</template>

<style scoped lang="less">
main {
  padding: 30px 30px 140px 30px;
  .collect-data {
    margin-bottom: 30px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 140px;
    overflow: hidden;
    .van-image {
      flex: 1;
      width: 184px;
      height: 139px;
      margin-right: 20px;
    }
    .content {
      flex: 3;
      height: 100%;
      overflow: hidden;
      .title {
        font-size: 30px;
        font-weight: 600;
        color: #323233;
        margin-bottom: 10px;
        display: flex;
        align-items: center;
        span {
          margin-left: 20px;
        }
      }
      .desc {
        font-size: 26px;
        line-height: 42px;
        text-align: justify;
        color: #646566;
        max-height: 84px;
        overflow: hidden;
      }
    }
  }
}
</style>
