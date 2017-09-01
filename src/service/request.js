/**
 * Created by lunachi on 2017/8/18.
 * 请求封装
 */
import Api from './api';

class Request {
    constructor() {
        //返回格式
        this.resDefault = {
            code: -1,
            message: ''
        };
    }

    /**
     * api请求封装
     * @param apiName: 后端数据请求apiName
     * @param data
     * @returns {*}
     */
    async getApi(apiName, data = {}) {
        let api = Api[apiName], url;
        if (!api) {
            let _message = 'api ' + apiName + ' is not defined!';
            throw new Error(_message);
            return Object.assign(this.resDefault, {
                message: _message
            });
        }
        if (typeof api == 'object') {
            url = (api.host || '') + api.url;
        } else {
            url = api;
        }
        return await this.jsonp(url, data);
    }

    /**
     * zepto数据请求jsonp
     * @param url
     * @param data
     * @param jsonp
     * @returns {Promise}
     */
    jsonp(url, data, jsonp = 'jsoncallback') {
        return new Promise(function (resolve, reject) {
            window.$.ajax({
                url: url,
                type: 'get',
                dataType: 'jsonp',
                jsonp: jsonp,
                data: data,
                success: res => {
                    resolve(res);
                },
                error: error => {
                    reject(error);
                }
            });
        });
    }

    /**
     * zepto数据请求get
     * @param url
     * @param data
     * @returns {Promise}
     */
    get(url, data) {
        return new Promise(function (resolve, reject) {
            window.$.ajax({
                url: url,
                type: 'get',
                dataType: 'json',
                data: data,
                success: res => {
                    resolve(res);
                },
                error: error => {
                    reject(error);
                }
            });
        });
    }

    /**
     * zepto数据请求post
     * @param url
     * @param data
     * @returns {Promise}
     */
    post(url, data) {
        return new Promise(function (resolve, reject) {
            window.$.ajax({
                url: url,
                type: 'post',
                dataType: 'json',
                data: data,
                success: res => {
                    resolve(res);
                },
                error: error => {
                    reject(error);
                }
            });
        });
    }
}

export default new Request();