<script setup>
import router from "@/router/index.js";
import SearchComp from "@/components/search/Search.vue";
import {computed, reactive, ref} from "vue";

const hotCities = reactive([
  { id: 0, title: "华清宫", src: "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg" },
  { id: 1, title: "陕西历史博物馆", src: "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg" },
  { id: 2, title: "华山", src: "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg" },
  { id: 3, title: "城墙", src: "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg" },
  { id: 4, title: "大雁塔", src: "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg" },
  { id: 5, title: "法门寺", src: "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg" },
])
const numbersOfItems = ref(4);

// 计算属性 缓存数组数据
const hotCitiesComputed = computed(() => {
  return hotCities.slice(0, numbersOfItems.value);
})

// 通过切换要循环的箱数控制前台的更多或折叠
const switchCities = () => {
  numbersOfItems.value = numbersOfItems.value === 4 ? hotCities.length : 4;
}

const moreCity = (val) => {
  console.log(val)
  router.push({path: `/city/more`,query: {city: val}});
}

</script>

<template>
<div class="container">
  <SearchComp />
  <main>
    <div class="hotCity">
      <div class="title">
        <span class="hot_name">热门目的地</span>
        <span class="more" @click="switchCities">{{ numbersOfItems === 4 ? "更多" : "收起" }}</span>
      </div>
      <div class="hotCity_list">
        <div class="hotCity_list_item" v-for="(item, index) in hotCitiesComputed" :key="index" @click="router.push(`/city/detail?id=${ item.id }`)">
          <van-image height="100%" :src="item.src">
            <template v-slot:loading>
              <van-loading type="spinner" size="20" />
            </template>
          </van-image>
          <div class="item_name">{{ item.title }}</div>
        </div>
      </div>
    </div>
    <div class="hotCity-text">
      <div class="title">
        <span class="hot_name">河北</span>
        <span class="more">探索</span>
      </div>
      <div class="text-span">
        <span v-for="(item, index) in hotCities" :key="index" @click="router.push(`/city/detail?id=${ item.id }`)">{{ item.title }}</span>
      </div>
    </div>

  </main>
</div>
</template>

<style scoped lang="less">
.container{
  box-sizing: border-box;
  width: 100%;
  main {
    width: 100%;
    padding: 0 30px;
    box-sizing: border-box;
    border-top: 1px solid #ebedf0;
    .hotCity{
      overflow: hidden;
      &_list{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        &_item{
          width: 48%;
          margin-top: 25px;
          position: relative;
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
    .hotCity-text {
      margin-top: 50px;
      .text-span {
        span {
          font-size: 28px;
          padding: 0 20px;
          display: inline-block;
          height: 70px;
          line-height: 70px;
          border: 1px solid #ddd;
          border-radius: 10px;
          margin-right: 25px;
          margin-top: 25px;
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

}

</style>
