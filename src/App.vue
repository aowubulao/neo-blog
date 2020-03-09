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
            this.getBlogInfo();
        },
        methods: {
            getBlogInfo: async function () {
                const axios = require('axios');
                let ret = await axios.get("/blog/info").then(ret => {
                    localStorage.setItem("blogName", ret.data.blogName);
                    localStorage.setItem("blogSubName", ret.data.blogSubName);
                    localStorage.setItem("blogDescription", ret.data.blogDescription);
                }).catch(error => {

                });
            }
        }
    }
</script>