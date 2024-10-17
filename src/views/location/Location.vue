<script setup>
import { useRouter } from "vue-router";
import SearchComp from "@/components/search/Search.vue";
import {computed, onMounted, reactive, ref} from "vue";
import { useLocationStore } from "@/stores";

const router = useRouter();
const hotLocations = reactive([
  { id: 1, title: "华清宫", coverImg: "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg", partsName: "center" },
  { id: 2, title: "陕西历史博物馆", coverImg: "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg", partsName: "south" },
  { id: 3, title: "华山", coverImg: "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg", partsName: "north" },
  { id: 4, title: "城墙", coverImg: "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg", partsName: "east" },
  { id: 5, title: "大雁塔", coverImg: "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg", partsName: "north" },
  { id: 6, title: "法门寺", coverImg: "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg", partsName: "center" },
])
const differentPartsData = reactive([
  {
    title: "冀中",
    name: "center",
    data: [
      { id: 1, title: "河间府署", coverImg: "https://q6.itc.cn/images01/20241012/4d4255aeb3c6424494c7e3bc6a594d17.png", desc: "欢迎进入 百度一下，你就知道，盲人用户进入读屏幕模式请按快捷键Ctrl加Alt加R；阅读详细操作说明请按快捷键Ctrl加Alt加问号键。", tag: "group" },
      { id: 2, title: "直隶总督府", coverImg: "https://p2.itc.cn/images01/20230304/cd8938262a85419a93a07333dab374e2.jpeg", desc: "'新的git提交和标签。这有助于版本控制和发布管理。 10. npm config 功能:管理npm的配置信息。 常用子" },
      { id: 3, title: "天下第一城", coverImg: "https://q5.itc.cn/q_70/images03/20241013/6f8607a156ef44368922bded8ce99495.jpeg", desc: "陕西历史博物馆位于西安大雁塔的西北侧，是西安的名片性景点之一。博物馆筹建于1983年，1986年夏天动工，1997年6月20日正式建成开放，并定名陕西历史博物馆。2016年，陕西历史博物馆被中国文物学会、中国建筑学会评选入“中国20世纪建筑遗产”。", tag: "small" },
      { id: 4, title: "白石山地质公园", coverImg: "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg", desc: "陕西历史博物馆是大型现代化博物馆，它的建成标志着中国博物馆事业迈入了新的发展里程。这座馆舍为“中央殿堂、四隅崇楼”的唐风建筑群，主次井然有序，高低错落有致，气势庄重，融合了民族传统、地方特色和时代精神于一体。", tag: "" },
      { id: 5, title: "野三坡", coverImg: "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg", desc: "馆区占地 65000平方米，收藏着上起远古人类初始阶段使用的简单石器，下至1840年前社会生活中的各类器物38万余件文物，时间跨度长达一百多万年。文物不仅数量多、种类全，而且品位高、价值广，馆中藏品可谓琳琅满目、精品荟萃", tag: "" },
      { id: 6, title: "狼牙山", coverImg: "https://q5.itc.cn/q_70/images03/20241013/6f8607a156ef44368922bded8ce99495.jpeg", desc: "是展示陕西历史文化和中国古代文明的艺术殿堂，被誉为“古都明珠，华夏宝库”。博物馆内有许多珍品，商周时期的青铜器、历代陶俑、汉唐的金银器具和唐墓壁画等珍品文物，而且大多为汉、唐盛世时期的珍宝，其中不乏国家禁止出境的精品。", tag: "group" },
      { id: 7, title: "胜芳古镇", coverImg: "https://p2.itc.cn/images01/20230304/cd8938262a85419a93a07333dab374e2.jpeg", desc: "照金香山位于耀州区西北部，地跨庙湾、照金、柳林三镇，规划面积312平方公里，是1999年5月省政府公布的第四批省级风景名胜区。", tag: "small" }
    ]
  },
  {
    title: "冀北",
    name: "north",
    data: [
      { id: 1, title: "避暑山庄", coverImg: "", tag: "" },
      { id: 2, title: "张北草原", coverImg: "" },
      { id: 3, title: "暖泉古镇", coverImg: "" },
      { id: 4, title: "鸡鸣驿古城", coverImg: "" },
      { id: 5, title: "飞狐峪", coverImg: "" },
      { id: 6, title: "张家口地址博物馆", coverImg: "" },
      { id: 7, title: "普宁寺", coverImg: "" },
      { id: 8, title: "金山岭长城", coverImg: "" },
      { id: 9, title: "木兰围场", coverImg: "" },
      { id: 10, title: "千松坝国家森林公园", coverImg: "" },
    ]
  },
  {
    title: "冀东",
    name: "east",
    data: [
      { id: 1, title: "北戴河鸽子窝", coverImg: "" },
      { id: 2, title: "和头老街", coverImg: "" },
      { id: 3, title: "凤凰山公园", coverImg: "" },
      { id: 4, title: "南湖开滦旅游区", coverImg: "" },
      { id: 5, title: "清东陵", coverImg: "" },
      { id: 6, title: "黄金海岸", coverImg: "" },
      { id: 7, title: "乐道海洋公园", coverImg: "" },
      { id: 8, title: "李大钊故居", coverImg: "" },
      { id: 9, title: "菩提岛景区", coverImg: "" },
      { id: 10, title: "南戴河仙螺岛", coverImg: "" },
      { id: 11, title: "碣石山", coverImg: "" },
    ]
  },
  {
    title: "冀南",
    name: "south",
    data: [
      { id: 1, title: "广府古城", coverImg: "" },
      { id: 2, title: "娲皇宫", coverImg: "" },
      { id: 3, title: "响堂山风景区", coverImg: "" },
      { id: 4, title: "京娘湖", coverImg: "" },
      { id: 5, title: "东太行景区", coverImg: "" },
      { id: 6, title: "扁鹊庙", coverImg: "" },
      { id: 7, title: "天河山", coverImg: "" },
      { id: 8, title: "西柏坡", coverImg: "" },
      { id: 9, title: "正定古城", coverImg: "" },
      { id: 10, title: "赵州桥", coverImg: "" },
      { id: 11, title: "正定荣国府", coverImg: "" },
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
const routerTo = (name) => {
  // 当想要通过router传递比较大的对象时，没有太好的办法，这里使用pinia进行发送
  useLocationStore().updatePartsList(differentPartsData.filter(item => item.name === name)[0]);
  router.push({ name: "locationList", params: { name } })
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
          <van-image height="100%" :src="item.coverImg">
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
        <span class="more" @click="routerTo(item.name)">探索</span>
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
        color: #455873;
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
      color: #0f294d;
    }
    .more{
      font-size: 28px;
      line-height: 50px;
      display: inline-block;
      height: 50px;
      color: #2446ff;
    }
  }
}

</style>
