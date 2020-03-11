import axios from 'axios'
import NProgress from "nprogress";
import '../../src/assets/css/nprogress.css'

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

export default {
    NProgress
}