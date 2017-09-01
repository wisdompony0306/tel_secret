/**
 * Created by tanghaibo on 2017/8/29.
 */

import Request from '../service/request';
import { getSearchParam, getCookie } from '../utils/utils';

const infoId = getSearchParam('infoId');
const source = getSearchParam('source');
const os = getCookie('os');
const currentUrl = encodeURIComponent(location.href);

/**
 * 判断用户是否已登录，未登录则触发登录
 * @return promise： 已登录resolve(登录信息)，未登录调用登录并刷新页面
 */
function getLoginStateAndLogin () {
    return new Promise((resolve,reject) => {
        Request.getApi('checkLogin', {
          infoId: infoId,
          source: source,
        }).then((res)=> {
            console.log("getLogin res:", res);
            if(res && res.code == 0 && res.data) {
                let resData = res.data;
                if(!resData.islogin) {//登录
                    if(os) {//调用native登录
                        window.loginCallback=function(state) { 
                            if (state == 0) {
                                window.location.reload();
                            }else{//没有登录成功
                                WBAPP.goBack();
                            }
                        }
                        WBAPP.openMobileLogin('loginCallback');
                    } else {//调用m端登录
                        location.href = '//my.58.com/m/mobilebind?path=' + currentUrl;
                    }
                } else {//已经是登录状态
                    resolve(resData);
                }
            }
        }).catch((error) => {
            reject();
            console.log("getLogin error:", error)
        });
    });
}
/**
 * 绑定手机号
 */
function bindPhone() {
    if(os){
        //调native的绑定
        window.bindCallback = function(state){
               WBAPP.toastMsg(state);
               window.location.reload();
        };
        WBAPP.bind("PHONE", "bindCallback");
    } else {
        // m端的手机绑定
        let bind="//my.58.com/m/mobilebind?path="+currentUrl;//手机号绑定页面
        location.href = bind;
    }
}

/**
 * 获取验证码
 */
function getCode(num) {
    Request.getApi('getCode', {
      phone: num,
    }).then((res) => {
        if(res && res.code == 0) {
            
        } else {
            console.log('there is something wrong with the server:' ,res);
        }
    }).catch((error) => {
        console.log("getCode error:", error);
    })
}
/**
 * 检查电话号码是否合法
 */
function isValidPhone(num) {
    let flag = false,
         reg=/^1[34578]\d{9}$/;
    num.match(reg) ? flag = true : flag = false;
    return flag;
}

export {
    getLoginStateAndLogin,
    bindPhone,
    getCode,
    isValidPhone,
}