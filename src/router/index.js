import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import('../views/Home')
const Category = () => import('../views/Category')
const Post = () => import('../views/Post')

Vue.use(VueRouter)

const routes = [
  { path: '/', component: Home },
  { path: '/category/:postCategory', component: Category },
  { path: '/post/:postId', component: Post },
]

const router = new VueRouter({
  routes
})

export default router
