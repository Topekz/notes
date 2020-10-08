import Vue from 'vue';
import App from './App.vue';
import router from './router.js';

const VueCookie = require('vue-cookie');
Vue.use(VueCookie);

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
