<script setup>
import { useRouter } from "vue-router";
import SearchComp from "@/components/search/Search.vue";
import {computed, onMounted, reactive, ref} from "vue";
import { useLocationStore } from "@/stores";

const router = useRouter();
const hotLocations = reactive([
  { id: 1, title: "华清宫", src: "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg", partsName: "center" },
  { id: 2, title: "陕西历史博物馆", src: "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg", partsName: "south" },
  { id: 3, title: "华山", src: "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg", partsName: "north" },
  { id: 4, title: "城墙", src: "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg", partsName: "east" },
  { id: 5, title: "大雁塔", src: "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg", partsName: "north" },
  { id: 6, title: "法门寺", src: "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg", partsName: "center" },
])
const differentPartsData = reactive([
  {
    title: "冀中",
    name: "center",
    data: [
      { id: 1, title: "河间府署", src: "https://q6.itc.cn/images01/20241012/4d4255aeb3c6424494c7e3bc6a594d17.png" },
      { id: 2, title: "直隶总督府", src: "https://p2.itc.cn/images01/20230304/cd8938262a85419a93a07333dab374e2.jpeg" },
      { id: 3, title: "天下第一城", src: "https://q5.itc.cn/q_70/images03/20241013/6f8607a156ef44368922bded8ce99495.jpeg" },
      { id: 4, title: "白石山地质公园", src: "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg" },
      { id: 5, title: "野三坡", src: "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg" },
      { id: 6, title: "狼牙山", src: "https://q5.itc.cn/q_70/images03/20241013/6f8607a156ef44368922bded8ce99495.jpeg" },
      { id: 7, title: "胜芳古镇", src: "https://p2.itc.cn/images01/20230304/cd8938262a85419a93a07333dab374e2.jpeg" }
    ]
  },
  {
    title: "冀北",
    name: "north",
    data: [
      { id: 1, title: "避暑山庄" },
      { id: 2, title: "张北草原" },
      { id: 3, title: "暖泉古镇" },
      { id: 4, title: "鸡鸣驿古城" },
      { id: 5, title: "飞狐峪" },
      { id: 6, title: "张家口地址博物馆" },
      { id: 7, title: "普宁寺" },
      { id: 8, title: "金山岭长城" },
      { id: 9, title: "木兰围场" },
      { id: 10, title: "千松坝国家森林公园" },
    ]
  },
  {
    title: "冀东",
    name: "east",
    data: [
      { id: 1, title: "北戴河鸽子窝" },
      { id: 2, title: "和头老街" },
      { id: 3, title: "凤凰山公园" },
      { id: 4, title: "南湖开滦旅游区" },
      { id: 5, title: "清东陵" },
      { id: 6, title: "黄金海岸" },
      { id: 7, title: "乐道海洋公园" },
      { id: 8, title: "李大钊故居" },
      { id: 9, title: "菩提岛景区" },
      { id: 10, title: "南戴河仙螺岛" },
      { id: 11, title: "碣石山" },
    ]
  },
  {
    title: "冀南",
    name: "south",
    data: [
      { id: 1, title: "广府古城" },
      { id: 2, title: "娲皇宫" },
      { id: 3, title: "响堂山风景区" },
      { id: 4, title: "京娘湖" },
      { id: 5, title: "东太行景区" },
      { id: 6, title: "扁鹊庙" },
      { id: 7, title: "天河山" },
      { id: 8, title: "西柏坡" },
      { id: 9, title: "正定古城" },
      { id: 10, title: "赵州桥" },
      { id: 11, title: "正定荣国府" },
    ]
  },
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

// 跳转到list页
const routerTo = (name, title) => {
  // 当想要通过router传递比较大的对象时，没有太好的办法，这里使用pinia进行发送
  useLocationStore().updatePartsList(differentPartsData.filter(item => item.name === name)[0]);
  router.push({ name: "locationList", params: { name, title } })
}


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
        <div class="hotLocation_list_item" v-for="(item, index) in hotLocationsComputed" :key="index" @click="router.push(`/location/${item.partsName}/${ item.id }`)">
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
        <span class="more" @click="routerTo(item.name, item.title)">探索</span>
      </div>
      <div class="text-span">
        <div v-for="(itemInner, index) in item.data" :key="index" @click="router.push(`/location/${item.name}/${ itemInner.id }`)">
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
