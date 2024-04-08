<script setup>
import coverImg from '@/assets/cover-img.jpg';
import {ref} from "vue";

const pointValue = ref(3.5);
const text = ref("          万里长城是中华民族的象征和骄傲，也是世界上最宏伟的古代军事防御工程。始建于战国时期，直到明代。八达岭长城是明代长城的精华，是明代长城最杰出的代表地段，其地位之显要，名声远大，景色之壮观，是其他任何地段的长城所不能替代的。\n" +
    "          早在1961年八达岭长城就被国务院列为“全国首批重点文化保护单位”；1990年八达岭代表万里长城接受了联合国颁发的人类文化遗产证书。\n" +
    "          八达岭长城历史悠久，风光也这边独好。登上八达岭长城饱览长城雄姿，脚下的长城依山就势，扶摇而上，蜿蜒起伏，宛若一条腾飞的巨龙，气势磅礴，雄伟壮观，而自然风光也独具特色，四时皆有佳景，赵朴初先生曾赋诗曰：“…最是春花锦锦，夏绿叠云，漫道秋春，风光尽收方寸…”\n" +
    "          此外，八达岭长城景区还建有大型中国长城博物馆和长城全国影院，置游人于历史与现实交叉的空间，以全新的感受去领略长城的风姿及沿途的历史文化，民族风情。1995年10月1日，八达岭长城万盏明灯一齐点亮，它那威武雄浑的身姿如同一条灿烂辉煌的巨龙，飞腾在崇山峻岭与苍松翠柏之间，从此开创了长城旅游的历史新纪元。\n" +
    "          “不到长城非好汉”。迄今，八达岭长城已接待包括尼克松、里根、伊丽莎白、撒切尔夫人在内的中外游人8000万，年接待游人50万人，成为令人向往的世界级旅游观光之胜地。\n")
const onSubmit = () => {

}
</script>

<template>
  <main>
    <div class="title">这是景区的标题介绍这是景区</div>
    <div class="create-time">编辑：2024-04-01 18:00:20</div>
    <div class="img-wrap">
      <img :src="coverImg" alt="cover-img" />
    </div>
    <div class="introduce-wrap">
      <div class="point-wrap">
        <div class="label">评分：</div><van-rate v-model="pointValue" readonly allow-half />
      </div>
      <div class="introduce">
        <p>
          <van-text-ellipsis rows="8" :content="text" expand-text="展开" collapse-text="收起" />
        </p>
      </div>
    </div>
    <van-submit-bar :price="3050" button-text="提交订单" @submit="onSubmit" />
  </main>
</template>

<style scoped lang="less">
  main {
    width: 100%;
    min-height: 100vh;
    padding: 0 30px 50px 30px;
    box-sizing: border-box;
    .title {
      font-size: 32px;
      line-height: 48px;
      width: auto;
      text-align: center;
      margin-bottom: 20px;
      color: #222222;
      font-weight: 500;
    }
    .create-time {
      font-size: 24px;
      color: #999;
      margin-top: 10px;
      margin-bottom: 30px;
      text-align: center;
    }
    .img-wrap {
      img {
        width: 100%;
        height: auto;
        border-radius: 25px;
        border: 1px solid #ffffff;
        box-shadow: 0 10px 0 rgba(0,0,0,0.15);
      }
    }
    .introduce-wrap {
      .point-wrap {
        margin-top: 30px;
        display: flex;
        align-items: center;
        .label {
          font-size: 32px;
        }
      }
      .introduce {
        margin-top: 40px;
        padding-bottom: 100px;
        p {
          font-size: 28px;
          line-height: 48px;
          width: 100%;
          height: auto;
          text-align: justify;
          color: #2c3e50;
          margin-top: 15px;
          //padding-bottom: 100px;
        }
      }
    }
    .van-submit-bar {
      border-top: 1px solid #eee;
    }
  }
</style>