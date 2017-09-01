<template>
    <div>
        <div class="phone-input-container">
            <div class="phone-input">
                <input ref="phoneInput" type="tel" maxlength="11" :class="{ 'is-font-18': isNumberEmpty }" name="" placeholder="请输入手机号码" v-model="value.phoneNumber" @input="handleInput" />
                <i class="clear-btn" @click="clearNumber"></i>
            </div>
        </div>
       
        <div class="code" v-if="isDifferentPhone">
            <span class="left">
                <input type="text" name="" placeholder="请输入验证码" v-model="code" />
            </span>
            <span class="right" :class="{ 'is-gray': !this.value.isNumberValid }" @click="getCode">{{ codeBtnName }}</span>
        </div>
    </div>
</template>

<script>
    import { getCode, isValidPhone } from '../business/business.js';

    export default {
        name: 'phoneInput',
        props: {
            value: {
                type: Object,
            }
        },
        computed: {
            isNumberEmpty() {
                return this.value.phoneNumber.length === 0;
            },
            isDifferentPhone() {
                let num = this.value.phoneNumber;
                if(num.length === 11 && num != this.value.bindPhone && num != this.value.latePhone) {
                    return true;
                }
                return false;
            },
            codeBtnName() {
                if(this.timer > 0) {
                    setTimeout(() => {
                        this.timer -= 1;
                    }, 1000)
                    return this.timer + '秒后重发'
                } else {
                    return '获取验证码'
                }
            },
        },
        data() {
            return {
                code: '',
                timer: 0
            }
        },
        methods: {
            clearNumber() {
                this.value.phoneNumber = '';
                this.value.isNumberValid = false;
                this.$refs.phoneInput.focus();
                this.$emit('input', this.value);
            },
            handleInput(event) {
                this.value.isNumberValid = isValidPhone(event.target.value);
                this.$emit('input', this.value);
                //此处需要添加当电话号码变成11位的时候，判断是否为绑定电话或者最近电话逻辑
                //用来判断是否出现获取验证码的视图
            },
            checkIsDiffPhone() {
                if(this.value.phoneNumber === (this.value.bindPhone || this.value.latePhone)) {
                    return false;
                }
                return true;
            },
            getCode() {
                let isValid = isValidPhone(this.value.phoneNumber);
                if(isValid) {
                    getCode(this.value);
                    this.timer = 59;
                } else {
                    console.log('你输入的手机号码不合法');
                }
            },
        }
    }
</script>
<style lang='less'>
    .phone-input-container {
        width: 86.67%;
        margin: 0 auto;
        padding: 1.066667rem 0 0.506667rem 0;
        border-bottom: 1px solid #EAEAEA;
        .phone-input {
            text-align: center;
            position: relative;
            input {
                width: 7.36rem;
                height: 60px;
                line-height: 0.8rem;
                font-size: 30px;
                color: #000;
                text-align: center;
                border: none;
                &.is-font-18 {
                    font-size: 18px;
                }
            }
            .clear-btn {
                display: inline-block;
                width: 15px;
                height: 15px;
                border-radius: 15px;
                background: url('//img.58cdn.com.cn/fangrs/img/91ea6ae01325b72b14ca563d7564f7a0.png') center no-repeat;
                background-size: contain;
                position: absolute;
                right: 0;
                top: 50%;
                margin-top: -7.5px;
            }
        }
    }
    
    .code {
        overflow: hidden;
        width: 86.67%;
        height: 1.84rem;
        line-height: 1.84rem;
        margin: 0 auto;
        border-bottom: 1px solid #EAEAEA;
        .left {
            display: inline-block;
            width: 68%;
            height: 40px;
            line-height: 40px;
            border-right: 1px solid #EAEAEA;
            input {
                height: 100%;
                border: none;
                font-size: 18px;
            }
        }
        .right {
            display: inline-block;
            width: 30%;
            text-align: center;
            color: #FF552E;
            font-size: 14px;
            &.is-gray {
                color: #AAA;
            }
        }
    }
</style>