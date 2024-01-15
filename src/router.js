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
import User_detail_page from './components/User/User_detail_page.vue'

//Tableのテンプレートページ
import Toilet_table from './components/Toilet_table.vue'


const routes = [
    { path: '/', component: Admin_login,}, //TopPageを表示
    { path: '/:pathMatch(.*)*', redirect: '/' }, //存在しないパスにアクセスした場合はUser_basic_pageを表示
    { path: '/Adminlogin', component:Admin_login,},
    { path: '/Adminsignup', component:Admin_signup,},
    { path: '/User_detail_page', component: User_detail_page },
    { path: '/User_basic_page', component: User_basic_page },
  ]
  const router = createRouter({
    history: createWebHistory(),
    routes,
  })

export default router;
