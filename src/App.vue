<template>
    <div id="app" style="background-color: #FAFAFA; ">
        <navigation/>
        <transition name="fade" mode="out-in">
            <router-view/>
        </transition>
        <scroll-to-top/>
        <footer/>
    </div>
</template>

<script>
    import Navigation from "./layout/Navigation";
    import Footer from "./layout/Footer";
    import ScrollToTop from "./components/ScrollToTop";

    export default {
        components: {
            Navigation,
            Footer,
            ScrollToTop
        },

        created() {
            this.checkUA();
            this.hello();
            this.getBlogInfo();
        },
        methods: {
            hello: async function () {
                const axios = require('axios');
                let ret = await axios.get("/blog",
                    { headers: {"authorization": localStorage.getItem("token")} }
                ).then(ret => {
                    if (localStorage.getItem("token") === "undefined" || localStorage.getItem("token") === null) {
                        localStorage.setItem("token", ret.headers.authorization);
                    }
                }).catch(error => {

                });
            },
            getBlogInfo: async function () {
                const axios = require('axios');
                let ret = await axios.get("/blog/info").then(ret => {
                    localStorage.setItem("blogName", ret.data.blogName);
                    localStorage.setItem("blogSubName", ret.data.blogSubName);
                    localStorage.setItem("blogDescription", ret.data.blogDescription);
                }).catch(error => {

                });
            },
            checkUA () {
                let UA = navigator.userAgent;
                console.log(UA);
                if (UA.indexOf('Quark') !== -1 || UA.indexOf('UCBrowser') !== -1) {
                    mdui.snackbar({
                        message: '检测到该浏览器内核版本过低，网页功能无法正常加载，请更换现代浏览器。',
                        timeout: 5000,
                        closeOnOutsideClick: false,
                    });
                }
            }
        }
    }
</script>