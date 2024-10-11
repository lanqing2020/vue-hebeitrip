<script setup>
import {useRoute} from "vue-router";

const route = useRoute()
console.log(route.query.id)
</script>

<template>
  <div class="container">
    <main>
      <div class="header_bg">
        <van-image width="100%" height="100%" src="https://image.juntu.com/jt/uploads/20200827c287d213024590095d897f02783e8043.jpg">
          <template v-slot:loading>
            <van-loading type="spinner" size="20" />
          </template>
        </van-image>
        <div class="banner_content">
          <p class="title">西柏坡 <van-icon name="arrow-down" /></p>
          <p class="content">河北省石家庄市西柏坡景区，坐落于河北省石家庄市平山县迎宾路，位于太行山东麓，背靠京、津，距省会石家庄市90千米，景区总面积39万平方米，为国家AAAAA级旅游景区、中国革命纪念地之一。</p>
          <div class="button">认识西柏坡</div>
          <div class="summary"><span>不容错过：</span>河北省石家庄市西柏坡景区，坐落于河北省石家庄市平山县迎宾路，位于太行山东麓，背靠京、津，距省会石家庄市90千米，景区总面积39万平方米，为国家AAAAA级旅游景区、中国革命纪念地之一。</div>
        </div>
      </div>
      <div class="city_wapper">
        <div class="serch">
          查看西柏坡活动
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped lang="less">
.container {
  box-sizing: border-box;
  width: 100vw;
  height: 100vh;
  main{
    width: 100%;
    height: 100%;

    .header_bg{
      width: 100%;
      position: relative;
      height: 550px;
      overflow: hidden;
      .banner_content{
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        background: rgba(0, 0, 0, 0.35);
        color: #fff;
        padding: 40px;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        .title{
          font-size: 60px;
          text-align: center;
          margin: 20px 0;
        }
        .content{
          font-size: 24px;
          margin: 20px 0;
          /* 限制在一个容器内 */
          display: -webkit-box;
          /* 限制在2行以内 */
          -webkit-line-clamp: 2;
          /* 垂直方向上的距离 */
          -webkit-box-orient: vertical;
          /* 超出部分显示省略号 */
          overflow: hidden;
          /* 防止它影响行内元素的布局 */
          text-overflow: ellipsis;
        }
        .button{
          border: 1px solid #fff;
          border-radius: .075rem;
          color: #fff;
          font-size: 24px;
          margin-bottom: 20px;
          padding: 20px 30px;
        }
        .summary{
          background: hsla(0, 0%, 100%, .2);
          color: #fff;
          font-size: 24px;
          height: 50px;
          line-height: 50px;
          overflow: hidden;
          padding: 10px 20px;
          text-overflow: ellipsis;
          span{
            font-size: 28px;
          }
        }
      }
    }
    .city_wapper{
      box-sizing: border-box;
      width: 100%;
      height: calc(100% - 550px);
      padding: 50px 10px 0 10px;
      position: relative;
      .serch{
        box-sizing: border-box;
        width: 90%;
        height: 85px;
        border: 1px solid #fff;
        border-radius: 50px;
        position: absolute;
        top:-40px;
        right: 0;
        left: 0;
        margin:auto;
        background: #fff;
        box-shadow: 0 0 10px 1px rgba(0, 0, 0, 0.42);
        font-size: 30px;
        color: #bab9b9;
        line-height: 80px;
        padding-left: 90px;
      }
      .serch:after{
        background:url("https://m.juntu.com/_nuxt/img/search-ico-invert.54f0100.png") center no-repeat;
        background-size:100% 100%;
        content: "";
        height: 28px;
        width: 28px;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 40px;
        margin: auto;
      }
    }
  }

}
</style>