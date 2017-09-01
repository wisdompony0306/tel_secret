// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './views/app';
import hbcExt from './plugins/vue.ext';

Vue.config.productionTip = false;
Vue.use(hbcExt);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})
