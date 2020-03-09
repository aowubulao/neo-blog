import Vue from 'vue'
import App from './App.vue'
import router from './router'
import NProgress from 'nprogress'
import '../src/assets/css/nprogress.css'
import '../src/assets/css/global.css'
import axios from 'axios'

//import md5 from 'js-md5'

Vue.config.productionTip = false

//Vue.prototype.$md5 = md5
Vue.prototype.$nprogress = NProgress;

axios.interceptors.request.use(config => {
      NProgress.inc();
      return config;
    }, error => {
      NProgress.done();
      return Promise.reject(error)
    }
)
axios.interceptors.response.use(res => {
      NProgress.done();
      return res;
    }, error => {
      NProgress.done();
      return Promise.reject(error)
    }
)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
