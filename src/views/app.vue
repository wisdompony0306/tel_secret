<template>
  <div id="app">
    <div class="header">
      <span class="btn-back"></span>
      隐私通话
    </div>
    <div class="tip">
      <i class="secure"></i>
      <span>拨打对方电话，请先确认本机号码</span>
    </div>
    <phone-input v-model="phone"></phone-input>
    <a class="btn-call" :class="{ disabled: !phone.isNumberValid }" href="javascript:;" @click="callNow">
      <i class="icon-tel"></i>
      立即呼叫
    </a>
    <ul class="desc">
      <li class="single-desc">中转呼叫，对方无法查看您的真实电话</li>
      <li class="single-desc">使用本机号码才能拨通对方电话</li>
      <li class="single-desc">号码临时有效，可通过 APP拨打记录 再次联系</li>
      <li class="single-desc">通话不会产生额外费用，请放心拨打</li>
    </ul>
  </div>
</template>

<script>
import PhoneInput from '../components/phoneInput';
import { 
  getLoginStateAndLogin,
  bindPhone,
 } from '../business/business';

export default {
  name: 'app',
  computed: {
    
  },
  data() {
    return {
      phone: {
        isNumberValid: true,
        phoneNumber: '',
        bindPhone: '',
        latePhone: ''
      },
      isInApp: false,
      infoId: null,
      source: null,
      loginInfo: null,
    }
  },
  methods: {
    checkAndLogin(){
        getLoginStateAndLogin().then((res) => {
          console.log(res);
          this.loginInfo = res;
          this.phone.bindPhone = res.phone;
          this.phone.latePhone = res.latePhone;
          //检查是否绑定电话号码
          this.checkAndBind();
        });
    },
    checkAndBind() {
      this.loginInfo.isbind ? this.checkLatePhone() : this.bindPhone();
    },
    bindPhone() {
      console.log('去绑定吧');
      bindPhone();
    },
    checkLatePhone() {
      let phone = this.loginInfo.latePhone ? this.loginInfo.latePhone : this.loginInfo.phone;
      this.renderPhone(phone);
    },
    renderPhone(number) {
      this.phone.phoneNumber = number;
    },
    callNow() {
      if(this.phone.isNumberValid) {
        console.log('拨打电话');
        console.log(this.phone.phoneNumber);
      }
    }
  },
  components: {
    PhoneInput
  },
  created() {
    
  },
  mounted() {
    this.checkAndLogin();
  },
}
</script>

<style lang="less">
  @import '../assets/reset.less';
  @import './app.less';
</style>
