<template>
    <div>
        <transition name="scale">
            <v-btn absolute dark fab right bottom width="45px" height="45px"
                   v-show="!hidden"
                   color="#fc5185" style="margin-bottom: 155px; margin-right: 10px; position: fixed; z-index: 9999" @click="scrollToTop">
                <i style="margin-left: -2px" class="mdui-icon material-icons">arrow_upward</i>
            </v-btn>
        </transition>
    </div>
</template>

<script>
    import {
        VBtn,
    } from 'vuetify/lib'

    export default {
        components: {
            VBtn,
        },
        data () {
            return {
                hidden: true,
            }
        },
        mounted() {
            window.addEventListener('scroll', this.onScroll, true);
        },
        methods: {
            onScroll () {
                let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
                if (scrollTop > 200) {
                    this.hidden = false;
                }
                if (scrollTop <= 200) {
                    this.hidden = true;
                }
            },
            scrollToTop () {
                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });
            },
        }
    }
</script>