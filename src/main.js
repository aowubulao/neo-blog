import Vue from 'vue'
import App from './App.vue'
import router from './router'
import '../src/assets/css/global.css'
import axios from "./plugins/axios";

//import md5 from 'js-md5'

Vue.config.productionTip = false

//Vue.prototype.$md5 = md5

new Vue({
    router,
    axios,
    render: h => h(App)
}).$mount('#app')
