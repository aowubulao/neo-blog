<template>
    <div style="min-width: 300px; max-width: 800px" class="mdui-center">
        <transition name="fade" mode="out-in">
            <div v-show="isShow">
                <div class="mdui-center" v-for="post in posts" :key="post">
                    <v-card class="mx-auto" width="100%">
                        <v-img height="200px"
                               :src="setPostImgUrl(post.postImgUrl)">
                        </v-img>
                        <v-card-title style="font-size: 1.4em;font-weight: 500; letter-spacing: 1px">{{ post.postTitle }}</v-card-title>

                        <v-card-text class="text--primary">
                            <div>{{ post.postExcerpt }}</div>
                        </v-card-text>

                        <v-card-actions>
                            <span style="color: gray; margin-left: 10px">{{ post.postDate }}</span>
                            <v-spacer/>
                            <v-btn color="#fc5185" text style="font-weight: 600" @click="goPost(post.postId)">
                                阅读全文
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                    <div style="margin-top: 20px"></div>
                </div>
            </div>
        </transition>

        <v-btn  v-if="hasMore"
                text  :loading="isGetMoreLoading"
                style="align-content: center" width="100%"
                @click="getMore">
            加载更多
        </v-btn>
        <div v-if="!hasMore" style="width: 100%; height: 30px; text-align: center; font-size: 14px">
            没有更多了
        </div>
    </div>
</template>

<script>
    import {
        VCard,
        VCardText,
        VCardTitle,
        VBtn,
        VImg,
        VCardActions,
        VSpacer,
    } from 'vuetify/lib'

    export default {
        components: {
            VCard,
            VCardText,
            VCardTitle,
            VBtn,
            VImg,
            VCardActions,
            VSpacer
        },
        data: () => ({
            currentPage: 1,
            totalPage: '',
            posts: {
                postTitle: '',
                postExcerpt: '',
                postDate: '',
                postImgUrl: '',
            },
            mid: '',
            isGetMoreLoading: true,
            hasMore: true,
            isShow: false,
        }),
        mounted() {
            this.getTotalPage();
            this.getPosts(this.currentPage);
        },
        methods: {
            getTotalPage: async function () {
                const axios = require('axios');
                let ret = await axios.get("/blog/posts/total").then(ret => {
                    this.totalPage = ret.data;
                }).catch(error => {

                });
            },
            getPosts: async function (page) {
                const axios = require('axios');
                let ret = await axios.get("/blog/posts/" + page.toString()).then(ret => {
                    this.isGetMoreLoading = false;
                    if (this.currentPage > 1) {
                        this.posts = this.posts.concat(ret.data);
                    } else {
                        this.posts = ret.data;
                        this.isShow = true;
                    }
                }).catch(error => {
                    this.isGetMoreLoading = false;
                });
            },
            getMore() {
                this.isGetMoreLoading = true;
                this.currentPage++;
                if (this.currentPage > this.totalPage) {
                    this.hasMore = false;
                } else {
                    this.getPosts(this.currentPage);
                }
            },
            setPostImgUrl(postImgUrl) {
                return postImgUrl === null ? "https://s2.ax1x.com/2020/03/08/3xzRnf.png" : postImgUrl;
            },
            goPost(id) {
                this.$router.push('/post/' + id);
            }
        }
    }
</script>