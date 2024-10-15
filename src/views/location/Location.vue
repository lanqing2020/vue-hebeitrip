<script setup>
import { useRouter } from "vue-router";
import SearchComp from "@/components/search/Search.vue";
import {computed, onMounted, reactive, ref} from "vue";

const router = useRouter();
const hotLocations = reactive([
  { id: 0, title: "华清宫", src: "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg" },
  { id: 1, title: "陕西历史博物馆", src: "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg" },
  { id: 2, title: "华山", src: "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg" },
  { id: 3, title: "城墙", src: "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg" },
  { id: 4, title: "大雁塔", src: "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg" },
  { id: 5, title: "法门寺", src: "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg" },
])
// 想要首次展示的数据量
const numbersOfItems = ref(4);
// 计算属性 缓存热门目的地数组数据
const hotLocationsComputed = computed(() => {
  return hotLocations.slice(0, numbersOfItems.value);
})

// 通过切换要循环的箱数控制前台的更多或折叠
const switchLocations = () => {
  numbersOfItems.value = numbersOfItems.value === 4 ? hotLocations.length : 4;
}

const differentPartsData = reactive([
  {
    title: "冀中",
    name: "center",
    data: [
      { id: 0, title: "河间府署" },
      { id: 1, title: "直隶总督府" },
      { id: 2, title: "天下第一城" },
      { id: 3, title: "白石山地质公园" },
      { id: 4, title: "野三坡" },
      { id: 5, title: "狼牙山" },
      { id: 6, title: "胜芳古镇" }
    ]
  },
  {
    title: "冀北",
    name: "north",
    data: [
      { id: 0, title: "避暑山庄" },
      { id: 1, title: "张北草原" },
      { id: 3, title: "暖泉古镇" },
      { id: 5, title: "鸡鸣驿古城" },
      { id: 6, title: "飞狐峪" },
      { id: 7, title: "张家口地址博物馆" },
      { id: 8, title: "普宁寺" },
      { id: 9, title: "金山岭长城" },
      { id: 10, title: "木兰围场" },
      { id: 11, title: "千松坝国家森林公园" },
    ]
  },
  {
    title: "冀东",
    name: "east",
    data: [
      { id: 0, title: "北戴河鸽子窝" },
      { id: 1, title: "和头老街" },
      { id: 2, title: "凤凰山公园" },
      { id: 3, title: "南湖开滦旅游区" },
      { id: 4, title: "清东陵" },
      { id: 5, title: "黄金海岸" },
      { id: 6, title: "乐道海洋公园" },
      { id: 7, title: "李大钊故居" },
      { id: 8, title: "菩提岛景区" },
      { id: 9, title: "南戴河仙螺岛" },
      { id: 10, title: "碣石山" },
    ]
  },
  {
    title: "冀南",
    name: "south",
    data: [
      { id: 0, title: "广府古城" },
      { id: 1, title: "娲皇宫" },
      { id: 2, title: "响堂山风景区" },
      { id: 3, title: "京娘湖" },
      { id: 4, title: "东太行景区" },
      { id: 5, title: "扁鹊庙" },
      { id: 6, title: "天河山" },
      { id: 7, title: "西柏坡" },
      { id: 8, title: "正定古城" },
      { id: 9, title: "赵州桥" },
      { id: 10, title: "正定荣国府" },
    ]
  },
])

</script>

<template>
  <SearchComp />
  <main>
    <div class="hotLocation">
      <div class="title">
        <span class="hot_name">热门目的地</span>
        <span class="more" @click="switchLocations">{{ numbersOfItems === 4 ? "更多" : "收起" }}</span>
      </div>
      <div class="hotLocation_list">
        <div class="hotLocation_list_item" v-for="(item, index) in hotLocationsComputed" :key="index" @click="router.push(`/location/detail?id=${ item.id }`)">
          <van-image height="100%" :src="item.src">
            <template v-slot:loading>
              <van-loading type="spinner" size="20" />
            </template>
          </van-image>
          <div class="item_name">{{ item.title }}</div>
        </div>
      </div>
    </div>
    <div class="hotLocation-text" v-for="item in differentPartsData" :key="item.name">
      <div class="title">
        <span class="hot_name">{{ item.title }}</span>
        <span class="more" @click="() => router.push({ path: `/location/${item.name}` })">探索</span>
      </div>
      <div class="text-span">
        <div v-for="(itemInner, index) in item.data" :key="index" @click="router.push(`/location/${item.name}/detail?id=${ itemInner.id }`)">
          {{ itemInner.title }}
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped lang="less">
main {
  width: 100%;
  padding: 0 30px 140px 30px;
  box-sizing: border-box;
  border-top: 1px solid #ebedf0;
  .hotLocation{
    transition: all .3s ease-in-out;
    overflow: hidden;
    &_list{
      display: flex;
      flex-wrap: wrap;
      transition: all .3s ease-in-out;
      justify-content: space-between;
      &_item{
        width: 48%;
        margin-top: 25px;
        position: relative;
        height: 250px;
        .item_name{
          background: rgba(0, 0, 0, 0.08);
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          width: 100%;
          height: 60px;
          line-height: 60px;
          font-size: 30px;
          font-weight: bold;
          color: #fff;
          padding: 0 20px;
          box-sizing: border-box;
        }
      }
    }
  }
  .hotLocation-text {
    margin-top: 50px;
    height: auto;
    overflow: hidden;
    .text-span {
      div {
        font-size: 28px;
        padding: 0 20px;
        display: inline-block;
        height: 70px;
        line-height: 70px;
        border: 1px solid #ddd;
        border-radius: 10px;
        margin-right: 25px;
        margin-top: 25px;
        position: relative;
      }
    }
  }
  .title{
    display: flex;
    justify-content: space-between;
    height: 50px;
    margin-top: 25px;
    .hot_name{
      font-size: 32px;
      font-weight: 700;
      line-height: 50px;
      display: inline-block;
      height: 50px;
      color: #323233;
    }
    .more{
      font-size: 28px;
      line-height: 50px;
      display: inline-block;
      height: 50px;
      color: #029db8;
    }
  }
}

</style>
