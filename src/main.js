import Vue from 'vue'
import App from './App.vue'
import router from './router'

import ElementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './router/losty'
// 全局公共样式
// import './common/css/btn.css'
// axios
import axios from './common/axiosConfig'
import VueAxios from 'vue-axios'

Vue.config.productionTip = false
Vue.use(ElementUi)
Vue.use(VueAxios, axios);

// vue插件封装
import plugin from '@/encapsulation'
Vue.use(plugin)
if (module.hot) {
  module.hot.accept();
}
new Vue({
  el: '#app',
  render: h => h(App),
  router
})