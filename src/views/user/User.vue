<script setup>
import {onBeforeMount, reactive, ref} from "vue";
import tx from "@/assets/tx.jpg";
import { showConfirmDialog, showToast } from 'vant';

// 头部信息：姓名和当前游览位置
const userName = ref("啄木鸟");
const currPosition = ref("C");

/**
 * 立即通话
 * @returns {Promise<DialogAction | undefined>}
 */
const getCall = () => {
  return showConfirmDialog({
    title: '联系官方（official）',
    message: '遇到麻烦，并且周边人员无法给与帮助，\n现在联系管理人员？',
  }).then(() => {
    window.location.href = 'tel://' + 17777858251;
  }).catch(() => {
    console.log("点击了 cancel 按钮")
  });
}

// 联系人管理
const showContactList = ref(false);
const showContactManage = ref(false);
const isEdit = ref(false);
const isSaving = ref(false);
const isDeleting = ref(false);
const chosenContactId = ref('1');
const clickedAddOrEdit = ref(-1);  // add-0 edit-1
let contactList = reactive([
  {
    id: '0',
    name: '张三',
    tel: '13000000000',
    isDefault: true,
  },
  {
    id: '1',
    name: '李四',
    tel: '13100000000',
  },
]);
const editingContact = ref({
  tel: '',
  name: ''
});
// const editingContact = { tel: '', name: '' };
const contactManage = (key, info) => {
  console.log("contactList===>", contactList)
  switch (key) {
    case "add": {
      isEdit.value = false;
      editingContact.value.tel = "";
      editingContact.value.name = "";
      showContactManage.value = true;
      clickedAddOrEdit.value = 0;
      break;
    }
    case "edit": {
      isEdit.value = true;
      showContactManage.value = true;
      editingContact.value = info;
      clickedAddOrEdit.value = 1;
      break;
    }
    default: return;
  }
}
const onContactSave = (val) => {
  let isExist;
  for (let i=0; i<contactList.length; i++) {
    const item = contactList[i];
    if (item.tel === val.tel && item.name === val.name) {
      isExist = true;
      break;
    }
  }
  // console.log("isExist===>", isExist)
  isSaving.value = true;

  // 新增时采用push方法，更新时采用重新赋值一个新数组

  // 先判断是通过新增过来的，还是编辑过来的
  if (clickedAddOrEdit.value === 0) { // add
    setTimeout(() => {
      if (isExist) {
        // 已存在相同联系人
        showToast("已存在相同联系人，请重试~")
        isSaving.value = false;
        return;
      }
      // 否则正常保存
      console.log("新增时的自增id是：", contactList.length)
      contactList.push({
        id: String(contactList.length), ...val
      })
      showContactManage.value = false;
      isSaving.value = false;
    }, 600)
  } else if(clickedAddOrEdit.value === 1) { // edit
    // 编辑时也需要查重
    if (isExist) {
      showToast("已存在相同联系人，请重试~")
      isSaving.value = false;
      return;
    }
    setTimeout(() => {

      // contactList.splice(+val.id, 1, { ...val });
      const listTemp = contactList;
      listTemp.splice(+val.id, 1, { ...val });
      contactList = listTemp

      // contactList[val.id] = { ...val };
      showToast("保存成功")
      showContactManage.value = false;
      isSaving.value = false;
    }, 600)
  } else {
    // 默认状态
    console.log("默认状态")
  }
}
const onContactDelete = (val) => {
  const { tel, name } = val;
  setTimeout(() => {
    const list = contactList.value;
    const rows = list.findIndex((item) => {
      return item.tel === tel && item.name === name
    })
    console.log("rows===>", rows)
    // console.log("contactList===>", contactList)
    // isSaving.value = false;
    // showContactManage.value = false;
  }, 3000)
}

// 分享部分
const showShare = ref(false);
const shareOptions = [
  { name: '微信', icon: 'wechat' },
  { name: '微博', icon: 'weibo' },
  { name: '复制链接', icon: 'link' },
  { name: '分享海报', icon: 'poster' },
  { name: '二维码', icon: 'qrcode' },
];
const onShareSelect = (option) => {
  // showToast(option.name);
  showShare.value = false;
};

// 优惠券部分
const coupon = {
  available: 1,
  condition: '无门槛\n最多优惠12元',
  reason: '',
  value: 150,
  name: '优惠券名称',
  startAt: 1489104000,
  endAt: 1514592000,
  valueDesc: '1.5',
  unitDesc: '元',
};
const unCoupon = {
  available: 1,
  condition: '无门槛\n最多优惠222元',
  reason: '',
  value: 1350,
  name: '优惠券名称2',
  startAt: 23234,
  endAt: 234234,
  valueDesc: '100.5',
  unitDesc: '元',
};
const coupons = ref([coupon]);
const disabledCoupons = [unCoupon];
const showCouponList = ref(false);
const chosenCoupon = ref(-1);
const onCouponChange = (index) => {
  showCouponList.value = false;
  chosenCoupon.value = index;
};
const onCouponExchange = (code) => {
  coupons.value.push(coupon);
};

</script>

<template>
  <header>
    <h1>我的</h1>
    <div class="content">
      <van-image round width="70px" height="70px" :src="tx" />
      <div class="info">
        <div class="title">Hello，{{ userName }}</div>
        <div class="route">
          <div>已游览至{{ currPosition }}点</div>
          <van-icon name="arrow" />
        </div>
      </div>
    </div>
  </header>
  <main>
    <div class="sos">
      <div>是否现在联系景区管理人员</div>
      <van-button round type="success" size="small" @click="getCall">立即通话</van-button>
    </div>
    <div class="list">
      <van-cell is-link title="联系人" @click="showContactList = true" />
      <van-action-sheet v-model:show="showContactList" title="联系人列表">
        <van-contact-list
            v-model="chosenContactId"
            :list="contactList"
            default-tag-text="默认"
            @add="() => contactManage('add')"
            @edit="(info) => contactManage('edit', info)"
        />
      </van-action-sheet>
      <van-action-sheet v-model:show="showContactManage" title="联系人管理">
        <van-contact-edit
            :contact-info="editingContact"
            :is-edit="isEdit"
            :is-saving="isSaving"
            :is-deleting="isDeleting"
            show-set-default
            set-default-label="设为默认联系人"
            @save="onContactSave"
            @delete="onContactDelete"
        />
      </van-action-sheet>



      <van-cell is-link title="分享景区" @click="showShare = true" />
      <van-share-sheet v-model:show="showShare" title="立即分享给好友" :options="shareOptions" @select="onShareSelect" />

      <van-coupon-cell :coupons="coupons" :chosen-coupon="chosenCoupon" @click="showCouponList = true" />
      <!-- 优惠券列表 -->
      <van-popup v-model:show="showCouponList" round position="bottom" style="height: 90%; padding-top: 4px;" >
        <van-coupon-list :coupons="coupons" :chosen-coupon="chosenCoupon" :disabled-coupons="disabledCoupons" @change="onCouponChange" @exchange="onCouponExchange" />
      </van-popup>
    </div>
  </main>
</template>

<style scoped lang="less">
  header {
    background: url("../../assets/user.jpg");
    background-repeat: no-repeat;
    background-size: cover;
    padding: 0 30px;
    height: 350px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    h1 {
      position: absolute;
      left: 50%;
      top: 5px;
      margin-left: -20px;
      font-size: 34px;
      text-align: center;
      font-weight: 500;
    }
    .content {
      width: 100%;
      display: flex;
      .van-image {
        margin-right: 20px;
      }
      .info {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        padding: 10px 0;
        .title {
          font-size: 34px;
          font-weight: 600;
        }
        .route {
          font-size: 24px;
          display: flex;
          justify-content: center;
          align-items: center;
          border: 1px solid #07c160;
          border-radius: 30px;
          height: 38px;
          width: 210px;
          div {
            color: #07c160;
            letter-spacing: 2px;
            margin-right: 10px;
          }
          i {
            color: #07c160;
            font-size: 20px;
          }
        }
      }
    }
  }
  main {
    padding: 0 30px;
    .sos {
      height: 60px;
      background: #eedfbe;
      border-radius: 35px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 30px;
      div {
        font-size: 28px;
      }
    }
    /deep/.list {
      margin-top: 30px;
      .van-popup {
        .van-action-sheet__content {
          .van-contact-list {
            .van-radio-group {
              .van-cell {
                .van-radio {
                  //display: none;
                }
              }
            }
          }
        }
      }
    }
  }

</style>