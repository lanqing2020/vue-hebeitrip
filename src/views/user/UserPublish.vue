<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const travelNotesData = ref([
  {
    id: 0,
    title: "安徽省十大小吃，征服无数吃货的心",
    src: [
      { sortId: 0, img: "https://q7.itc.cn/images01/20241014/22cc5d7356574be485fa09a2b71f6bfc.jpeg" },
      { sortId: 1, img: "https://p2.itc.cn/images01/20230304/cd8938262a85419a93a07333dab374e2.jpeg" },
      { sortId: 2, img: "https://q6.itc.cn/images01/20241012/4d4255aeb3c6424494c7e3bc6a594d17.png" },
      { sortId: 2, img: "https://q6.itc.cn/images01/20241012/4d4255aeb3c6424494c7e3bc6a594d17.png" },
    ],
    praise: "12", // 赞
    comment: "243", // 评论
    publishDate: "2024-10-10",
    content: "缤纷互动演艺连番登场300+颜值NPC欢乐助力\n" +
      "\n" +
      "为了丰富游客们的游玩体验，济南方特精心打造了“人形兵器站舞蹈”“曼陀妖市鬼新娘出嫁”“鲛族走秀”和“翼族魔幻秀”等一系列精彩演艺。当“血月”升起，各式各样的鬼魅角色将开始精彩的表演。"
  },
  {
    id: 1,
    title: "儿童免费入园！济南方特山海奇幻夜10月18日启幕",
    src: [
      { sortId: 0, img: "https://q3.itc.cn/q_70/images03/20241013/790276a54ca04cf8bf91ad2856f9e126.jpeg" },
      { sortId: 1, img: "https://q5.itc.cn/q_70/images03/20241013/6f8607a156ef44368922bded8ce99495.jpeg" },
      { sortId: 2, img: "https://q6.itc.cn/q_70/images03/20241013/8a2f9093d62a435792db1367f996a708.jpeg" },
      { sortId: 2, img: "https://q0.itc.cn/q_70/images03/20241013/9abc69d6243b4d47a0e8e74928a0f05c.jpeg" },
    ],
    praise: "92", // 赞
    comment: "891", // 评论
    publishDate: "2024-05-21",
    content: "在“九尾狐”“饕餮”等王牌NPC的阵容基础上，济南方特还邀请到“黑神话悟空”“宝青坊主”等近期大热的NPC加入“山海奇幻夜”。他们将以精美的妆造亮相，和游客们见面互动，带来恐怖与惊喜并存的难忘体验。\n" +
      "\n" +
      "此外，济南方特将连开24天夜场，并打造了诚意满满的万圣限时夜场演艺。届时，四大方阵将携手数百名NPC，带游客共赏“奇幻夜大巡游”的壮观场景，并在奇幻演艺广场准时上演“夜灵对决”，带游客们共度欢乐之旅。与此同时，《极地快车》《雷峰塔》等30+主题游乐项目，游客们也能随心畅玩。"
  },
])

const IParticipated = ref([
  { id: 0, city: "蔚县", subject: "三天2晚张家口之行", commentDate: "2024-10-10", myComment: "这个景点不错，感谢博主的推荐，下次还来！" },
  { id: 1, city: "河间府属", subject: "河间·任丘一日游", commentDate: "2024-04-23", myComment: "请问五一时候人多吗？请问五一时候人多吗？请问五一时候人多吗？请问五一时候人多吗？请问五一时候人多吗？请问五一时候人多吗？" },
  { id: 2, city: "小五台山", subject: "任丘渤海酒店住宿情况", commentDate: "2024-09-12", myComment: "请问房间里有烟味吗？" },
])


</script>

<template>
  <van-nav-bar title="我的发布" left-arrow @click-left="router.push({ path: '/user' })">
    <template #right>
      <van-icon name="wap-home-o" size="20" @click="router.push({ path: '/' })" />
    </template>
  </van-nav-bar>
  <van-tabs v-model:active="active" sticky>
    <van-tab title="旅行笔记">
      <div v-if="travelNotesData.length === 0" class="not-published">
        <van-empty image-size="100" description="还未发布任何笔记" />
        <van-button round type="primary" size="small" icon="plus" @click="router.push('/user/publish-edit')">去发布</van-button>
      </div>
      <div v-else>
        <div class="publish-button" @click="router.push('/user/publish-edit')">
          <div class="flex-left">
            <div class="main-button">
              <van-icon name="plus" size="28" color="#c5c8cd" />
            </div>
            <van-button type="primary" round class="main-click" size="small">立即发布</van-button>
          </div>
          <div class="flex-right">
            <div class="right-title">开启创作之旅</div>
            <div class="right-list">
              <div class="list-item">
                <van-icon name="point-gift" size="18" color="#9da6b5" />
                <span>每篇奖励</span>
                <em>100积分</em>
              </div>
              <div class="list-item">
                <van-icon name="point-gift" size="18" color="#9da6b5" />
                <span>流量曝光</span>
                <em>+100</em>
              </div>
            </div>
          </div>
        </div>
        <div v-for="item in travelNotesData" :key="item.id" class="travel-wrap">
          <div class="title van-ellipsis">{{ item.title }}</div>
          <div class="content">
            <van-image :src="item.src[0]['img']">
              <van-icon name="photo" color="#ffffff"/>
              <em>{{ item.publishDate }}</em>
            </van-image>
            <div class="content-right">
              <span>{{ item.content }}</span>
              <div class="icon-wrap">
                <div class="praise">
                  <van-icon name="like" color="#ff8583" />
                  <span>{{ item.praise }}</span>
                </div>
                <div class="comment">
                  <van-icon name="comment-circle" color="#ff8583" />
                  <span>{{ item.comment }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </van-tab>
    <van-tab title="我参与的">
      <div v-if="IParticipated.length === 0" class="not-published">
        <van-empty image-size="100" description="还未参与任何评论" />
      </div>
      <div v-else v-for="item in IParticipated" :key="item.id" class="comment-wrap">
        <div class="title">
          <div class="location" @click="router.push(`/location/center/${item.id}`)">
            <van-icon name="location-o" size="18" />
            {{ item.city }}
          </div>
          <div class="subject van-ellipsis">{{ item.subject }}</div>
        </div>
        <div class="text">
          <div class="my-comment">
            <van-icon name="chat-o" size="18" />
            {{ item.myComment }}
          </div>
          <div class="comment-date">评论日期：{{ item.commentDate }}</div>
        </div>
      </div>
    </van-tab>
  </van-tabs>
</template>

<style scoped lang="less">
/deep/.van-tabs__content{
  padding: 30px 30px 140px 30px;
}
.not-published {
  button {
    width: 180px;
    margin: 0 auto;
    display: block;
    /deep/.van-button__content {
      i {
        top: -1px;
      }
    }
  }
}
.publish-button {
  width: 100%;
  height: 206px;
  border-radius: 15px;
  border: 1px solid #ebedf0;
  margin-bottom: 45px;
  box-shadow: 0 0 30px rgba(0,0,0,0.02) inset;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 30px;
  box-sizing: border-box;
  .flex-left {
    flex: 0.6;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    height: 100%;
    .main-button {
      width: 100px;
      height: 100px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: white;
      border-radius: 15px;
      border: 1px solid #ebedf0;
    }
    .main-click {
      width: 120px;
      font-size: 20px;
      height: 38px;
      line-height: 1;
    }
  }
  .flex-right {
    flex: 2.5;
    margin-left: 30px;
    height: 100%;
    .right-title {
      font-size: 32px;
      color: #6c6d73;
      background: linear-gradient(to right, #0006ff, #b48cff); /*设置渐变的方向从左到右 颜色从ff0000到ffff00*/
      -webkit-background-clip: text;/*将设置的背景颜色限制在文字中*/
      -webkit-text-fill-color: transparent;/*给文字设置成透明*/
    }
    .right-list {
      margin-top: 20px;
      .list-item {
        display: flex;
        align-items: center;
        font-size: 26px;
        margin-bottom: 10px;
        i {
          left: -3px;
        }
        span {
          color: #9da6b5;
          margin-left: 10px;
        }
        em {
          font-style: normal;
          font-weight: 700;
          color: #151771;
          margin-left: 20px;
        }
      }
    }
  }
}
.travel-wrap {
  width: 100%;
  height: auto;
  margin-bottom: 55px;
  .title {
    font-size: 30px;
    font-weight: 600;
    margin-bottom: 15px;
    color: #0f294d;
    padding: 0 5px;
  }
  .content {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    height: 239px;
    overflow: hidden;
    .van-image {
      //flex: 1;
      margin-right: 15px;
      width: 280px;
      height: 212px;
      position: relative;
      /deep/img {
        border-radius: 15px;
        border: 3px solid #fff;
        padding: 3px;
        box-sizing: border-box;
      }
      i {
        position: absolute;
        right: 15px;
        top: 10px;
        font-size: 33px;
      }
      em {
        width: 90%;
        height: 40px;
        line-height: 40px;
        font-size: 24px;
        color: white;
        font-style: normal;
        display: inline-block;
        position: absolute;
        bottom: 5px;
        left: 15px;
        right: 0;
        text-shadow: 0 0 #222222;
      }
    }
    .content-right {
      flex: 1;
      height: 100%;
      display: flex;
      flex-direction: column;
      position: relative;
      span {
        flex: 2;
        font-size: 28px;
        font-weight: normal;
        width: 100%;
        height: 100%;
        overflow: hidden;
        text-indent: 2em;
        line-height: 46px;
        text-align: justify;
        color: #455873;
      }
      .icon-wrap {
        flex: 0.65;
        display: flex;
        align-items: center;
        width: 100%;
        height: 20px;
        .praise {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          margin-right: 20px;
        }
        .comment {
          display: flex;
          align-items: center;
          justify-content: flex-start;
        }
        i {
          font-size: 28px;
          margin-right: 8px;
        }
        span {
          margin-bottom: 0;
          text-indent: 0;
        }
      }
    }
  }
}
.comment-wrap {
  width: 100%;
  margin-bottom: 40px;
  padding-bottom: 40px;
  border-bottom: 1px solid #ebedf0;
  .title {
    font-size: 30px;
    font-weight: 600;
    margin-bottom: 15px;
    color: #0f294d;
    display: flex;
    height: 50px;
    line-height: 50px;
    width: 100%;
    .location {
      width: auto;
      display: flex;
      align-items: center;
      height: 100%;
      border: 1px solid #ebedf0;
      padding: 0 10px;
      border-radius: 10px;
      font-size: 26px;
      color: #455873;
      margin-right: 20px;
      i {
        top: -1px;
        margin-right: 5px;
      }
    }
    .subject {
      max-width: 80%;
      width: auto;
    }
  }
  .text {
    font-size: 30px;
    margin-top: 15px;
    .my-comment {
      color: #455873;
      line-height: 50px;
      width: 100%;
      max-height: 200px;
      height: auto;
      overflow: hidden;
      i {
        top: 2px;
      }
    }
    .comment-date {
      margin-top: 15px;
      font-size: 24px;
      color: #9da6b5;
    }
  }
}
</style>
