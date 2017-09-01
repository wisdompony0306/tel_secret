/**
 * Created by lunachi on 2017/8/18.
 */

import Request from '../service/request';

exports.install = (Vue)=> {
    Object.defineProperty(Vue.prototype, '$request', {value: Request});
};
