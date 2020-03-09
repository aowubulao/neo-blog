<template>
    <div    class="mdui-container"
            style="padding-top: 30px; padding-left: 10px; padding-right: 10px">
        <div style="font-size: 1.8em">{{ post.postTitle }}</div>
        <div style="margin-top: 15px; color: gray">
            {{ post.postDate }} / {{ post.postCategory }}
        </div>
        <div style="background-color: #fc5185; width: 110px; height: 5px; margin-top: 15px"></div>
        <br><br>
        <mavon-editor :toolbarsFlag="false"
                      :subfield="false"
                      :editable="false"
                      defaultOpen="preview"
                      :boxShadow="false"
                      previewBackground="white"
                      codeStyle="github"
                      v-model="post.postContent"/>
    </div>
</template>

<script>
    import { mavonEditor } from 'mavon-editor'
    import 'mavon-editor/dist/css/index.css'

    export default {
        components: {
            mavonEditor
        },
        props: ['postId'],
        data: () => ({
            post: {
                postId: '',
                postAuthor: '',
                postTitle: '',
                postContent: '',
                postExcerpt: '',
                postStatus: '',
                postDate: '',
                commentStatus: '',
                postCategory: '',
            },
        }),
        created() {
            this.getPost();
        },
        beforeRouteUpdate(to, from, next) {
            next();
            this.getPost(to.params.postId);
        },
        methods: {
            getPost: async function () {
                let axios = require('axios');
                let ret = await axios.get("/blog/post/" + this.$route.params.postId).then(ret => {
                    if (ret.status === 200) {
                        this.post = ret.data;
                    }
                })
            }
        }
    }
</script>