<script setup>
import {useRoute, useRouter} from "vue-router";

const route = useRoute();
const { type } = route.query;
console.log("route.query===>", route.query)
console.log("type===>", type, typeof type)
</script>

<template>
  <div v-if="type === '0'" class="success">
    <svg width="1em" height="1em" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="antd-mobile-icon" style="vertical-align: -0.125em;">
      <g id="CheckCircleFill-CheckCircleFill" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g id="CheckCircleFill-编组">
          <rect id="CheckCircleFill-矩形" fill="#FFFFFF" opacity="0" x="0" y="0" width="48" height="48"></rect>
          <path d="M24,2 C36.1502645,2 46,11.8497355 46,24 C46,36.1502645 36.1502645,46 24,46 C11.8497355,46 2,36.1502645 2,24 C2,11.8497355 11.8497355,2 24,2 Z M35.8202936,17 L32.7086692,17 C32.6025922,17 32.500859,17.0421352 32.4258461,17.1171378 L32.4258461,17.1171378 L21.3922352,28.1492247 L16.3591562,23.1163755 C16.2841422,23.0413649 16.1824034,22.9992247 16.0763199,22.9992247 L16.0763199,22.9992247 L12.9653996,22.9992247 C12.859342,22.9992247 12.7576259,23.0413445 12.6826161,23.1163228 C12.5263737,23.2724998 12.5263207,23.5257658 12.6824977,23.6820082 C12.8583452,23.8579294 13.0341927,24.0338505 13.2100402,24.2097716 C13.2577488,24.2575002 13.3065097,24.3063074 13.3562592,24.3561283 L13.6661084,24.6666997 C14.3074913,25.3100963 15.0728595,26.0807873 15.8520136,26.8666654 L16.4372421,27.4571699 C18.2552812,29.2922548 19.9983838,31.0574343 20.2666114,31.3285298 L20.301004,31.3632341 C20.8867904,31.9490205 21.8365379,31.9490205 22.4223243,31.3632341 L22.4223243,31.3632341 L36.1031319,17.6828471 C36.1781492,17.6078322 36.2202936,17.5060887 36.2202936,17.4 C36.2202936,17.1790861 36.0412075,17 35.8202936,17 L35.8202936,17 Z" id="CheckCircleFill-形状结合" fill="currentColor" fill-rule="nonzero"></path>
        </g>
      </g>
    </svg>
    <div class="text">操作成功</div>
    <div class="info">下单成功，请您前往入口扫码进站</div>
  </div>
  <div v-else class="fail">
    <svg width="1em" height="1em" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="antd-mobile-icon" style="vertical-align: -0.125em;">
      <g id="CloseCircleFill-CloseCircleFill" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g id="CloseCircleFill-编组">
          <rect id="CloseCircleFill-矩形" fill="#FFFFFF" opacity="0" x="0" y="0" width="48" height="48"></rect>
          <path d="M24,2 C36.1502645,2 46,11.8497355 46,24 C46,36.1502645 36.1502645,46 24,46 C11.8497355,46 2,36.1502645 2,24 C2,11.8497355 11.8497355,2 24,2 Z M18.6753876,16 L15.5637812,16 C15.4576916,16 15.3559474,16.0421451 15.2809323,16.1171635 C15.124726,16.2733766 15.1247316,16.5266426 15.2809447,16.6828489 L15.2809447,16.6828489 L22.299066,23.7006641 L14.6828159,31.3171619 C14.6078042,31.3921761 14.5656632,31.4939157 14.5656632,31.6 C14.5656632,31.8209139 14.7447493,32 14.9656632,32 L14.9656632,32 L18.0753284,32 C18.1814068,32 18.2831412,31.9578638 18.3581544,31.8828594 L18.3581544,31.8828594 L24.420066,25.8216641 L30.4818451,31.8828564 C30.5568585,31.9578626 30.6585942,32 30.7646741,32 L30.7646741,32 L33.8763476,32 C33.9824309,32 34.0841695,31.9578599 34.1591835,31.8828496 C34.315397,31.7266436 34.3154031,31.4733776 34.1591972,31.3171641 L34.1591972,31.3171641 L26.542066,23.6996641 L33.5591874,16.6828489 C33.6342057,16.6078338 33.6763508,16.5060896 33.6763508,16.4 C33.6763508,16.1790861 33.4972647,16 33.2763508,16 L33.2763508,16 L30.1637654,16 C30.0576705,16 29.9559218,16.0421493 29.8809058,16.1171741 L29.8809058,16.1171741 L24.420066,21.5786641 L18.9582218,16.1171488 C18.883208,16.0421394 18.7814701,16 18.6753876,16 L18.6753876,16 Z" id="CloseCircleFill-形状结合" fill="currentColor" fill-rule="nonzero"></path>
        </g>
      </g>
    </svg>
    <div class="text">无法完成操作</div>
    <div class="info">这里是具体错误原因，后端返回</div>
  </div>
</template>

<style scoped lang="less">
  .success {
    display: flex;
    flex-direction: column;
    align-items: center;
    .antd-mobile-icon {
      color: #1677ff;
      font-size: 100px;
      text-align: center;
      margin: 40px;
    }
  }
  .fail {
    display: flex;
    flex-direction: column;
    align-items: center;
    .antd-mobile-icon {
      color: #ff3141;
      font-size: 100px;
      text-align: center;
      margin: 40px;
    }
  }
  .text {
    color: #333333;
    font-size: 36px;
    text-align: center;
    line-height: 1.4;
    margin-bottom: 15px;
  }
  .info {
    font-size: 28px;
    color: #9da6b5;
  }
</style>
