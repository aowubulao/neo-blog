<template>
    <div>
        <div class="mdui-appbar mdui-appbar-fixed" style="background-color: white; z-index: 9988">
            <div class="mdui-toolbar">
                <button class="mdui-btn mdui-btn-icon" mdui-drawer="{target: '#left-drawer'}">
                    <i class="mdui-icon material-icons">menu</i>
                </button>
                <span style="font-size: 1.5em; font-weight: 400">{{ blogName }}</span>
                <div class="mdui-toolbar-spacer"></div>
                <button class="mdui-btn mdui-btn-icon" mdui-drawer="{target: '#right-drawer'}"><i class="mdui-icon material-icons">more_vert</i></button>
            </div>
        </div>

        <div class="mdui-drawer" id="left-drawer" style="z-index: 9989">
            <img    style="width: 128px; height: 128px; margin-top: 30px; margin-left: 70px"
                    class="mdui-img-circle" src="https://s2.ax1x.com/2020/03/08/3xSwlt.png" alt="Neo" />
            <ul class="mdui-list" style="margin-top: 20px" mdui-collapse="{accordion: true}">
                <li class="mdui-list-item mdui-ripple">
                    <i class="mdui-list-item-icon mdui-icon material-icons" style="color: #1976D2">
                        move_to_inbox
                    </i>
                    <div class="mdui-list-item-content list-item-title" @click="goHome">首页</div>
                </li>
                <li class="mdui-collapse-item mdui-collapse-item-open">
                    <div class="mdui-collapse-item-header mdui-list-item mdui-ripple">
                        <i class="mdui-list-item-icon mdui-icon material-icons" style="color: #1976D2">
                            favorite
                        </i>
                        <div class="mdui-list-item-content list-item-title">分类</div>
                        <i class="mdui-collapse-item-arrow mdui-icon material-icons">keyboard_arrow_down</i>
                    </div>
                    <ul class="mdui-collapse-item-body mdui-list mdui-list-dense">
                        <li v-for="(category, i) in categories" :key="i" class="mdui-list-item mdui-ripple">
                            {{ category.categoryName }}
                        </li>
                    </ul>
                </li>
            </ul>
        </div>

        <div class="mdui-drawer mdui-drawer-right" id="right-drawer" style="z-index: 9989">
            <div class="mdui-textfield">
                <div    style="margin-top: 20px; margin-left: 20px;"
                        class="mdui-textfield mdui-textfield-floating-label">
                    <label class="mdui-textfield-label">搜索</label>
                    <input  v-model="text"
                            style="width: 210px;"
                            class="mdui-textfield-input"
                            @keyup.enter="search"/>
                </div>
            </div>
            <div style="margin-left: 20px; margin-top: 20px;">
                <div v-for="(post, i) in posts" :key="i">
                    <a class="mdui-btn" @click="goPost(post.postId)">{{ post.postTitle }}</a>
                    <br><br>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        data: () => ({
            leftDrawer: '',
            rightDrawer: '',
            categories: {
                categoryName: '',
            },
            text: '',
            posts: {
                postId: '',
                postTitle: '',
            },
        }),
        mounted() {
            this.getCategories();
            this.blogName = localStorage.getItem("blogName");
        },
        methods: {
            goHome() {
                if (this.$route.path !== ('/')) {
                    this.$router.push('/');
                }
            },
            getCategories: async function () {
                const axios = require('axios');
                let ret = await axios.get("/blog/category/").then(ret => {
                    this.categories = ret.data;
                }).catch(error => {

                });
            },
            search: async function () {
                const axios = require('axios');
                let ret = await axios.get("/blog/posts/content/" + this.text).then(ret => {
                    this.posts = ret.data;
                }).catch(error => {

                });
            },
            goPost(id) {
                this.$router.push({ path: '/post/' + id })
            }
        }
    }
</script>

<style>
    .list-item-title {
        font-size: 14px;
        margin-top: 2px;
    }
</style>