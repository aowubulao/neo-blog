<template>
    <div v-show="auth">
        <div>
            <span>this is a test doc</span>
        </div>
    </div>
</template>

<script>
    export default {
        data: () => ({
            auth: false,
        }),
        created() {
            let token = window.localStorage.getItem("token");
            if (token == null) {
                this.$router.push({ path: '/' });
            }
        },
        methods: {
            auth: async function () {
                let axios = require('axios');
                let ret = await axios.get("/blog/post/" + this.$route.params.postId).then(ret => {
                    if (ret.status === 200) {

                    }
                })
            }
        }
    }
</script>