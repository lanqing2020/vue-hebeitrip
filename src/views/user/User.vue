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
const clickedAddOrEdit = ref(-1);  // add-0 edit-1
const contactFull = ref(false);
let contactList = ref([
  {
    id: 0,
    tel: '13000000000',
    name: '张三',
    isDefault: true,
  },
  {
    id: 1,
    tel: '13100000000',
    name: '李四',
  },
]);
const editingContact = ref({
  tel: '',
  name: ''
});
/**
 * 点击和编辑的 分流
 * @param key
 * @param info
 */
const contactManage = (key, info) => {
  switch (key) {
    case "add": {
      if (contactFull.value) {
        showToast("联系人已满~")
        return;
      }
      console.log("info===>", info)
      isEdit.value = false;
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

/**
 * 查找引用类型的数组（也叫数组对象）中item中最大的id 那一项
 * @param arr
 * @returns {*[]}
 */
const findMaxId = (arr) => {
  const sorted = [];
  for (const item of arr) {
    sorted.push(item.id)
  }
  sorted.sort((a, b) => {
    return b - a;
  })
  console.log("排序后", sorted)
  return sorted[0];
}

/**
 * 保存联系人
 * @param val
 */
const onContactSave = (val) => {
  const list = contactList.value;
  // 引用数组类型超过4个，vue3出现无法正确渲染的bug
  isSaving.value = true;
  // 查重
  let isExist;
  for (let i=0; i<list.length; i++) {
    const item = list[i];
    if (item.tel === val.tel && item.name === val.name) {
      isExist = true;
      break;
    }
    if (val.isDefault) {
      item.isDefault = false;
    }
  }
  switch (clickedAddOrEdit.value) {
    // add
    case 0: {
      setTimeout(() => {
        if (isExist) {
          // 已存在相同联系人
          showToast("已存在相同联系人，请重试~");
          isSaving.value = false;
          return;
        }
        let appendText = "";
        if (list.length > 2) {
          contactFull.value = true;
          appendText = "，最多保存4位联系人~";
        }
        // 否则正常保存
        list.push({
          id: findMaxId(list) + 1, ...val
        });
        contactList.value = list;
        showToast("新增成功" + appendText);
        showContactManage.value = false;
        isSaving.value = false;
      }, 600)
      console.log("新增后的数组是", contactList.value)

      break;
    }
    // edit
    case 1: {
      if (val.isDefault) {
        contactList.value.forEach(item => {
          if (item.isDefault) {
            item.isDefault = false
          }
        })
      }
      setTimeout(() => {
        contactList.value.splice(+val.id, 1, { ...val });
        showToast("保存成功");
        showContactManage.value = false;
        isSaving.value = false;
      }, 600)
      break;
    }
    default: {
      return;
    }
  }
}
const onContactDelete = (val) => {
  console.log("点击删除", val)
  setTimeout(() => {
    contactList.value.splice(contactList.value.findIndex(item => item.id === +val.id), 1);
    console.log("删除后的数组", contactList.value)
    showToast("删除联系人成功");
    contactFull.value = false;
    isSaving.value = false;
    showContactManage.value = false;
  }, 600)
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
            :list="contactList"
            default-tag-text="默认"
            @add="() => contactManage('add', {})"
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
    background: url("../../assets/user.jpg") no-repeat;
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
                  display: none;
                }
              }
            }
          }
        }
      }
    }
  }

</style>