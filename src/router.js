import { createRouter, createWebHistory } from 'vue-router'
//管理者ページ
import Admin_create_page from './components/Admin/Admin_create_page.vue'
import Admin_edit_detail from './components/Admin/Admin_edit_detail.vue'
import Admin_edit_page from './components/Admin/Admin_edit_page.vue'
import Admin_login from './components/Admin/Admin_login.vue'
import Admin_page from './components/Admin/Admin_page.vue'
import Admin_signup from './components/Admin/Admin_signup.vue'

//ユーザーページ
import User_basic_page from './components/User/User_basic_page.vue'

const routes = [
    { path: '/', component: User_basic_page ,}, //TopPageを表示
    { path: '/:pathMatch(.*)*', redirect: '/' }, //存在しないパスにアクセスした場合はUser_basic_pageを表示
  ]

  const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router;