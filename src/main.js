import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import vuetify from './plugins/vuetify';
import i18n from './i18n'
import axios from 'axios'
import VueAxios from 'vue-axios'


import VueI18n from 'vue-i18n'

import * as echarts from 'echarts'
Vue.prototype.$echarts = echarts

Vue.use(VueAxios, axios)
Vue.config.productionTip = false

Vue.use(VueI18n)


new Vue({
  store,
  router,
  vuetify,
  i18n,
  render: h => h(App)
}).$mount('#app')
