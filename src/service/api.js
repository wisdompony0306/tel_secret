/**
 * Created by tanghaibo on 2017/8/29.
 */

export default {
    /**
    * 说明:获取手机号接口&&判断登录和绑定手机号的接口
    * 参数:
    * 
       infoId  int 整数  帖子id
       source  int 1或者2    角色（1:个人房源，2:公寓房源）
    * 返回值
       isbind  ：1或0 表示是否绑定手机
       islogin : 1或0 表示是否登录
       latePhone :空或者电话号码 表示最后一次呼叫通话号码
       phone :账号绑定电话号码
    */
    checkLogin: {
        host: '//houserent.m.58.com',
        url: '/telsecret/getBindPhone'
    },
     /**
     * 说明:获取验证码接口
     * 参数:
     *   phone  int 整数  发送验证码的电话号码
     * 返回数据格式：
        
        code    状态码 0为正常
        message 状态信息
        data    空

     */
    getCode: {
        host: '//houserent.m.58.com',
        url: '/telsecret/getPhoneCode'
    },
     /**
     * 说明:获取秘号手机号接口
     * 参数:
     *  phone  int 整数  手机号
        source  1或者2 整数 角色（1:个人房源，2:公寓房源）
        verCode 验证码（非更改手机号码无需传输）
        code   
     * 返回数据格式： 
        状态码
            0为正常
            1错误提示 怎么能和自己联系呢，不要调皮～
            2错误提示 系统出错啦 请稍后再试
            3错误提示 输入验证码有误
            4错误提示 检测到您的账号异常，请联系客服
            5错误提示 呼叫次数过多
        message 提示信息
        data:
        参数名称
        值
        isbind
        1或0 表示是否绑定手机
        islogin
        1或0 表示是否登录
        isverify
        1或0 是否校验验证
        secphone
        关系秘号
     */
    getSecretNumber: {//获取密号接口
        host: '//houserent.m.58.com',
        url: '/telsecret/getPhone'
    }
};
