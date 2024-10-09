<script setup>
import router from "@/router/index.js";
import Search from "@/components/search/Search.vue";

const moreCity = (val) => {
  console.log(val)
  router.push({path: `/city/more`,query: {city: val}});
}


</script>

<template>
<div class="container">
  <Search />
  <div class="hotcity">
    <div class="hotcity_header">
      <span class="hot_name">热门目的地</span>
      <span class="more">更多</span>
    </div>
    <div class="hotcity_list">
      <div class="hotcity_item">
        <van-image width="100%" height="100%" radius="5px" src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg">
          <template v-slot:loading>
            <van-loading type="spinner" size="20" />
          </template>
        </van-image>
        <div class="item_name">景点名称1</div>
      </div>
      <div class="hotcity_item">
        <van-image height="100%" radius="5px" src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg">
          <template v-slot:loading>
            <van-loading type="spinner" size="20" />
          </template>
        </van-image>
        <div class="item_name">景点名称1</div>
      </div>
      <div class="hotcity_item">
        <van-image height="100%" radius="5px" src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg">
          <template v-slot:loading>
            <van-loading type="spinner" size="20" />
          </template>
        </van-image>
        <div class="item_name">景点名称1</div>
      </div>
      <div class="hotcity_item">
        <van-image height="100%" radius="5px" src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg">
          <template v-slot:loading>
            <van-loading type="spinner" size="20" />
          </template>
        </van-image>
        <div class="item_name">景点名称1</div>
      </div>
    </div>
  </div>
  <div class="city_list">
    <van-index-bar>
      <van-index-anchor index="A">
        <span>河北</span>
        <span @click="moreCity('hot')" class="more">更多</span>
      </van-index-anchor>
      <van-cell title="文本" />
      <van-cell title="文本" />
      <van-cell title="文本" />
    </van-index-bar>
  </div>
</div>
</template>

<style scoped lang="less">
.container{
  box-sizing: border-box;
  width: 100%;
  .hotcity{
    width: 100%;
    height: 580px;
    overflow: hidden;
    padding: 0 36px;
    box-sizing: border-box;
    margin-top: 20px;
    transition: all 1s ease-in-out;
    &_header{
      display: flex;
      justify-content: space-between;
      height: 50px;
      .hot_name{
        font-size: 36px;
        font-weight: bold;
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
    &_list{
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      height: 520px;
      transition: all 1s ease-in-out;
      .hotcity_item{
        width: 48%;
        height: 250px;
        padding-top: 10px;
        position: relative;
        .item_name{
          position: absolute;
          bottom: 0;
          width: 100%;
          height: 60px;
          font-size: 30px;
          font-weight: bold;
          color: #fff;
          padding-left: 20px;
          font-family: "Microsoft YaHei UI",serif;        }
      }
    }
  }
  .city_list{
    width: 100%;
    padding: 0 36px;
    box-sizing: border-box;
    :deep(.van-index-anchor){
      padding: 0 10px;
      .more{
        float: right;
        font-weight: normal;
        color: #029db8;
        font-size: 25px;
      }
    }
  }
}

</style>
