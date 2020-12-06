import Vue from 'vue';
import App from './App.vue';
import router from './router.js';
import VueMathjax from 'vue-mathjax';

const VueCookie = require('vue-cookie');
Vue.use(VueCookie);
Vue.use(VueMathjax);

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
