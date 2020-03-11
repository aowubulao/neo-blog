import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import('../views/Home')
const Category = () => import('../views/Category')
const Post = () => import('../views/Post')
const Admin = () => import('../views/Admin')
Vue.use(VueRouter)

const routes = [
  { path: '/', component: Home },
  { path: '/category/:postCategory', component: Category },
  { path: '/post/:postId', component: Post },
  { path: '/admin', component: Admin },
]

const router = new VueRouter({
  routes
})

export default router
